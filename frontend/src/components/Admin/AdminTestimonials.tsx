import React, { useState, useEffect } from 'react';
import { Save, X, Edit2, Trash2, Image as ImageIcon, Star } from 'lucide-react';
import ConfirmModal from '../ui/ConfirmModal';

interface Testimonial {
  id: number;
  name: string;
  service: string;
  quote: string;
  rating: number;
  imageName: string;
}

const AdminTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<Testimonial>>({
    name: '',
    service: '',
    quote: '',
    rating: 5,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/testimonials');
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      console.error("Failed to fetch testimonials", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('testimonial', JSON.stringify(currentTestimonial));
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      const url = isEditing && currentTestimonial.id
        ? `http://localhost:8081/api/testimonials/${currentTestimonial.id}`
        : 'http://localhost:8081/api/testimonials';

      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (res.ok) {
        resetForm();
        fetchTestimonials();
        alert(isEditing ? "Client story updated successfully!" : "New client story added successfully!");
      } else {
        console.error("Failed to save testimonial");
        alert("Failed to save client story. Please try again.");
      }
    } catch (err) {
      console.error("Error saving testimonial", err);
    }
  };

  const confirmDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:8081/api/testimonials/${id}`, {
        method: 'DELETE',
      });
      setItemToDelete(null);
      fetchTestimonials();
    } catch (err) {
      console.error("Error deleting testimonial", err);
    }
  };

  const handleDelete = (id: number) => {
    setItemToDelete(id);
  };

  const editTestimonial = (testimonial: Testimonial) => {
    setCurrentTestimonial(testimonial);
    setIsEditing(true);
    setSelectedFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setCurrentTestimonial({
      name: '',
      service: '',
      quote: '',
      rating: 5,
    });
    setIsEditing(false);
    setSelectedFile(null);
  };

  return (
    <div className="space-y-8">
      {/* Add/Edit Form */}
      <div className="bg-surface rounded-3xl p-6 md:p-8 shadow-luxury border border-on-surface/5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black font-serif text-on-surface">
            {isEditing ? 'Edit Client Story' : 'Add New Client Story'}
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
              <label className="block text-xs font-bold text-on-surface/60 uppercase tracking-wider mb-2">Client Name</label>
              <input
                required
                type="text"
                value={currentTestimonial.name || ''}
                onChange={e => setCurrentTestimonial({ ...currentTestimonial, name: e.target.value })}
                className="w-full bg-background border border-on-surface/10 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary"
                placeholder="e.g. Kowsalya "
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface/60 uppercase tracking-wider mb-2">Service Received</label>
              <input
                required
                type="text"
                value={currentTestimonial.service || ''}
                onChange={e => setCurrentTestimonial({ ...currentTestimonial, service: e.target.value })}
                className="w-full bg-background border border-on-surface/10 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary"
                placeholder="e.g. Layer Cut & Hair Botox"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface/60 uppercase tracking-wider mb-2">Star Rating</label>
              <select
                value={currentTestimonial.rating || 5}
                onChange={e => setCurrentTestimonial({ ...currentTestimonial, rating: parseInt(e.target.value) })}
                className="w-full bg-background border border-on-surface/10 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary"
              >
                {[5, 4, 3, 2, 1].map(num => <option key={num} value={num}>{num} Stars</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface/60 uppercase tracking-wider mb-2">Review Quote</label>
              <textarea
                required
                rows={4}
                value={currentTestimonial.quote || ''}
                onChange={e => setCurrentTestimonial({ ...currentTestimonial, quote: e.target.value })}
                className="w-full bg-background border border-on-surface/10 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary"
                placeholder="The service was very good..."
              />
            </div>

          </div>

          <div className="md:col-span-2 pt-4">
            <button type="submit" className="w-full md:w-auto px-8 py-4 bg-primary text-background font-black uppercase tracking-widest text-sm rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <Save size={18} />
              {isEditing ? 'Update Client Story' : 'Save New Story'}
            </button>
          </div>
        </form>
      </div>

      {/* Testimonials List Table */}
      <div className="bg-surface rounded-3xl overflow-hidden shadow-luxury border border-on-surface/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-background border-b border-on-surface/5">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary">Client</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary">Review</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-on-surface/50">Loading client stories...</td>
                </tr>
              ) : testimonials.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-on-surface/50">No client stories found. Add one above.</td>
                </tr>
              ) : (
                testimonials.map(testimonial => (
                  <tr key={testimonial.id} className="border-b border-on-surface/5 hover:bg-background/50 transition-colors">
                    <td className="px-6 py-6 min-w-[200px]">
                      <div className="flex items-center gap-4">
                        {testimonial.imageName ? (
                          <img src={`http://localhost:8081/api/gallery/images/${testimonial.imageName}`} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-on-surface/5 flex items-center justify-center text-on-surface/30">
                            <ImageIcon size={20} />
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-on-surface">{testimonial.name}</div>
                          <div className="text-xs text-on-surface/50 font-bold tracking-wider uppercase mt-1">{testimonial.service}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex text-primary mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={12} fill="currentColor" />
                        ))}
                      </div>
                      <p className="text-sm text-on-surface/80 line-clamp-2 max-w-lg">{testimonial.quote}</p>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <button onClick={() => editTestimonial(testimonial)} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors mr-2">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(testimonial.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
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

      <ConfirmModal 
        isOpen={itemToDelete !== null}
        message="Are you sure you want to delete this Client Story? This action cannot be undone."
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

export default AdminTestimonials;
