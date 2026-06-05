import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';
import { defaultServices } from '../../data/defaultServices';

interface Service {
  id: number;
  title: string;
  category: string;
  description: string;
  price: string;
  duration: string;
  highlights: string;
  imageName: string;
}

const CATEGORIES = [
  "Skin Care", 
  "Facial Treatment", 
  "Hair Care", 
  "Bridal Makeup", 
  "Nail Artistry", 
  "Lice Removal", 
  "Threading & Waxing", 
  "Wart Removal"
];

const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service>>({
    title: '',
    category: CATEGORIES[0],
    description: '',
    price: '',
    duration: '',
    highlights: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchServices().then((fetchedServices) => {
      // Auto-select the first category and populate form
      if (fetchedServices) {
        handleCategoryClick(CATEGORIES[0], fetchedServices);
      }
    });
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/services');
      const data = await res.json();
      setServices(data);
      return data;
    } catch (err) {
      console.error("Failed to fetch services", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: string, currentServicesList: Service[] = services) => {
    setActiveCategory(category);
    
    // Check if there is an existing service in this category from the database
    const existing = currentServicesList.find(s => s.category === category);
    
    if (existing) {
      editService(existing);
    } else {
      // If not, pre-populate with the default hardcoded data for that category
      const fallback = defaultServices.find(f => f.title === category || f.category === category);
      if (fallback) {
        setCurrentService({
          title: fallback.title,
          category: category,
          description: fallback.description,
          price: fallback.price,
          duration: fallback.duration,
          highlights: fallback.highlights.join(', '),
        });
        setIsEditing(true); // User feels they are editing the default service!
        setSelectedFile(null);
      } else {
        resetForm();
        setCurrentService(prev => ({ ...prev, category }));
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('service', JSON.stringify(currentService));
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      const url = isEditing && currentService.id 
        ? `http://localhost:8081/api/services/${currentService.id}`
        : 'http://localhost:8081/api/services';
        
      const method = isEditing && currentService.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (res.ok) {
        resetForm();
        fetchServices();
        alert(isEditing ? "Service updated successfully!" : "New service created successfully!");
      } else {
        console.error("Failed to save service");
        alert("Failed to save service. Please try again.");
      }
    } catch (err) {
      console.error("Error saving service", err);
      alert("An error occurred while saving the service.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    
    try {
      const res = await fetch(`http://localhost:8081/api/services/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchServices();
        alert("Service deleted successfully!");
      } else {
        alert("Failed to delete service.");
      }
    } catch (err) {
      console.error("Error deleting service", err);
      alert("An error occurred while deleting the service.");
    }
  };

  const editService = (service: Service) => {
    setCurrentService(service);
    setIsEditing(true);
    setSelectedFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setCurrentService({
      title: '',
      category: CATEGORIES[0],
      description: '',
      price: '',
      duration: '',
      highlights: '',
    });
    setIsEditing(false);
    setSelectedFile(null);
  };

  const filteredServices = services.filter(s => s.category === activeCategory);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Categories Sidebar */}
      <div className="w-full lg:w-64 shrink-0 space-y-2">
        <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 px-4">Service Categories</h3>
        <div className="bg-surface rounded-3xl p-2 shadow-luxury border border-on-surface/5 flex flex-col gap-1">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeCategory === category
                  ? 'bg-primary text-background shadow-md'
                  : 'text-on-surface/60 hover:bg-on-surface/5 hover:text-on-surface'
              }`}
            >
              {category}
            </button>
          ))}
          <button
            onClick={() => {
              setActiveCategory('Custom');
              setCurrentService({
                title: '',
                category: 'Custom',
                description: '',
                price: '',
                duration: '',
                highlights: ''
              });
              setIsEditing(false);
              setSelectedFile(null);
            }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold tracking-wider transition-all flex items-center gap-2 mt-4 border border-dashed border-primary/50 ${
              activeCategory === 'Custom' && !isEditing
                ? 'bg-primary/10 text-primary'
                : 'text-primary hover:bg-primary/5'
            }`}
          >
            <Plus size={16} /> Add Custom Service
          </button>
        </div>
      </div>

      {/* Main Content Area (Form & Table) */}
      <div className="flex-1 space-y-8">
        {/* Add/Edit Form */}
        <div className="bg-surface rounded-3xl p-6 md:p-8 shadow-luxury border border-on-surface/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black font-serif text-on-surface flex items-center gap-2">
              {isEditing ? 'Edit Service' : 'Add New Service'}
              <span className="text-primary text-sm bg-primary/10 px-3 py-1 rounded-full font-sans uppercase tracking-widest">{activeCategory}</span>
            </h2>
            {isEditing && (
              <button onClick={resetForm} className="text-on-surface/50 hover:text-on-surface flex items-center gap-1">
                <X size={16} /> Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface/60 uppercase tracking-wider mb-2">Service Title</label>
                <input 
                  required
                  type="text" 
                  value={currentService.title || ''}
                  onChange={e => setCurrentService({...currentService, title: e.target.value})}
                  className="w-full bg-background border border-on-surface/10 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary"
                  placeholder="e.g. Signature Bridal Makeup"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface/60 uppercase tracking-wider mb-2">Price</label>
                  <input 
                    required
                    type="text" 
                    value={currentService.price || ''}
                    onChange={e => setCurrentService({...currentService, price: e.target.value})}
                    className="w-full bg-background border border-on-surface/10 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary"
                    placeholder="e.g. Rs. 5000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface/60 uppercase tracking-wider mb-2">Duration</label>
                  <input 
                    required
                    type="text" 
                    value={currentService.duration || ''}
                    onChange={e => setCurrentService({...currentService, duration: e.target.value})}
                    className="w-full bg-background border border-on-surface/10 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary"
                    placeholder="e.g. 60 min"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface/60 uppercase tracking-wider mb-2">Description</label>
                <textarea 
                  required
                  rows={3}
                  value={currentService.description || ''}
                  onChange={e => setCurrentService({...currentService, description: e.target.value})}
                  className="w-full bg-background border border-on-surface/10 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary"
                  placeholder="A luxurious experience..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface/60 uppercase tracking-wider mb-2">Highlights (Comma Separated)</label>
                <input 
                  type="text" 
                  value={currentService.highlights || ''}
                  onChange={e => setCurrentService({...currentService, highlights: e.target.value})}
                  className="w-full bg-background border border-on-surface/10 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary"
                  placeholder="e.g. Premium Products, Hot Towel, Free Consultation"
                />
              </div>

              </div>

            <div className="md:col-span-2 pt-4">
              <button type="submit" className="w-full md:w-auto px-8 py-4 bg-primary text-background font-black uppercase tracking-widest text-sm rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <Save size={18} />
                {isEditing ? 'Update Service' : 'Save New Service'}
              </button>
            </div>
          </form>
        </div>

        {/* Services List Table for Active Category */}
        <div className="bg-surface rounded-3xl overflow-hidden shadow-luxury border border-on-surface/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-background border-b border-on-surface/5">
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary">Service Info</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary">Price & Time</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-10 text-center text-on-surface/50">Loading services...</td>
                  </tr>
                ) : filteredServices.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-10 text-center text-on-surface/50">No services found in {activeCategory}. Add one above.</td>
                  </tr>
                ) : (
                  filteredServices.map(service => (
                    <tr key={service.id} className="border-b border-on-surface/5 hover:bg-background/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          {service.imageName ? (
                            <img src={`http://localhost:8081/api/gallery/images/${service.imageName}`} alt={service.title} className="w-12 h-12 rounded-xl object-cover" />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-on-surface/5 flex items-center justify-center text-on-surface/30">
                              <ImageIcon size={20} />
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-on-surface">{service.title}</div>
                            <div className="text-xs text-on-surface/50 font-bold tracking-wider uppercase mt-1">{service.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-on-surface">{service.price}</div>
                        <div className="text-sm text-on-surface/60">{service.duration}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => editService(service)} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors mr-2">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(service.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminServices;
