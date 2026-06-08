import React, { useState, useEffect } from 'react';
import { Trash2, Save, X, Check, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { defaultServices } from '../../data/defaultServices';
import ConfirmModal from '../ui/ConfirmModal';

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

const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All Services");
  
  // Dynamically compute categories from services
  const CATEGORIES = ["All Services", ...Array.from(new Set(services.map(s => s.category).filter(Boolean)))];
  
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service>>({
    title: '',
    category: CATEGORIES[0],
    description: '',
    price: '',
    duration: '',
    highlights: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

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
    setShowForm(false);
    
    // Reset form for a new entry in this category instead of auto-editing the first item
    setCurrentService({
      title: '',
      category: category === "All Services" ? "" : category,
      description: '',
      price: '',
      duration: '',
      highlights: '',
    });
    setIsEditing(false);
    setSelectedFile(null);
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
        if (!isEditing) {
          resetForm();
        }
        fetchServices();
        showToast(isEditing ? "Service updated successfully!" : "New service created successfully!");
      } else {
        console.error("Failed to save service");
        showToast("Failed to save service. Please try again.");
      }
    } catch (err) {
      console.error("Error saving service", err);
      showToast("An error occurred while saving the service.");
    }
  };

  const confirmDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8081/api/services/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setItemToDelete(null);
        fetchServices();
      } else {
        console.error("Failed to delete service");
      }
    } catch (err) {
      console.error("Error deleting service", err);
    }
  };

  const handleDelete = (id: number) => {
    setItemToDelete(id);
  };

  const editService = (service: Service) => {
    setCurrentService(service);
    setIsEditing(true);
    setShowForm(true);
    setSelectedFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setCurrentService({
      title: '',
      category: activeCategory === "All Services" ? "" : activeCategory,
      description: '',
      price: '',
      duration: '',
      highlights: '',
    });
    setIsEditing(false);
    setSelectedFile(null);
  };

  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };

  const filteredServices = activeCategory === "All Services" 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="flex flex-col lg:flex-row gap-8 relative">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 right-8 bg-[#1A1A1A] border border-primary/20 text-primary px-6 py-4 rounded-xl shadow-[0_0_40px_rgba(212,175,55,0.15)] flex items-center gap-3 z-[100] font-bold tracking-wider text-sm backdrop-blur-xl"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Check size={16} className="text-primary" />
            </div>
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

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
        </div>
      </div>

      <div className="flex-1 space-y-8">
        <div className="flex justify-between items-center bg-surface-dim/30 p-6 rounded-2xl border border-white/5">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Manage {activeCategory}</h2>
            <p className="text-sm text-on-surface/60 mt-1">Select a service to edit or add a new one.</p>
          </div>
          {!showForm && (
            <button onClick={handleAddNew} className="btn-premium flex items-center gap-2 text-sm px-4 py-2">
              <Plus size={16} />
              New Service
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-light rounded-2xl p-6 border border-white/10 shadow-luxury"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                  {isEditing ? 'Edit Service' : 'Add New Service'}
                  <span className="text-primary text-xs bg-primary/10 px-2 py-1 rounded-full font-sans uppercase tracking-widest">{activeCategory}</span>
                </h2>
                <button type="button" onClick={() => setShowForm(false)} className="p-2 text-on-surface/50 hover:text-white bg-surface rounded-full hover:bg-white/10 transition-colors">
                  <X size={18} />
                </button>
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
            </div>

            {/* Hidden extra fields */}


            <div className="md:col-span-2 pt-4 flex gap-4">
              <button type="submit" className="flex-1 md:flex-none px-8 py-4 bg-primary text-background font-black uppercase tracking-widest text-sm rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <Save size={18} />
                {isEditing ? 'Update Service' : 'Save New Service'}
              </button>
              {isEditing && currentService.id && (
                <button 
                  type="button"
                  onClick={() => handleDelete(currentService.id!)}
                  className="px-6 py-4 bg-red-500/10 text-red-500 font-black uppercase tracking-widest text-sm rounded-2xl flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              )}
            </div>
          </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Existing Services List */}
        {filteredServices.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 px-2">Manage {activeCategory} Services</h3>
            <div className="grid grid-cols-1 gap-4">
              {filteredServices.map(service => (
                <div key={service.id} className="bg-surface rounded-2xl p-4 border border-white/5 flex items-center justify-between hover:border-primary/30 transition-colors group">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">{service.title}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-primary font-black tracking-widest text-sm">{service.price}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => editService(service)}
                      className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-background transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(service.id!)}
                      className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <ConfirmModal 
        isOpen={itemToDelete !== null}
        message="Are you sure you want to delete this service? This action cannot be undone."
        onConfirm={() => {
          if (itemToDelete !== null) {
            confirmDelete(itemToDelete);
          }
        }}
        onCancel={() => setItemToDelete(null)}
      />
    </div>
  );
};

export default AdminServices;
