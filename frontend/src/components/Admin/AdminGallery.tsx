import React, { useState, useEffect } from 'react';
import { ImagePlus, Trash2, Loader2, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmModal from '../ui/ConfirmModal';
import { AdminToast } from '../ui/AdminToast';

interface GalleryImage {
  id: number;
  file_name: string;
  title: string;
  description: string;
  is_magazine?: boolean;
}

export function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isOpen: boolean }>({
    message: '',
    type: 'success',
    isOpen: false
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, isOpen: true });
  };

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8081/api/gallery');
      if (res.ok) {
        const data = await res.json();
        setImages(data.filter((img: GalleryImage) => !img.is_magazine));
      }
    } catch (err) {
      console.error("Failed to fetch gallery images", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const res = await fetch('http://localhost:8081/api/gallery/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setFile(null);
        setTitle('');
        setDescription('');
        fetchImages();
        showToast("Gallery image uploaded successfully!");
      } else {
        showToast("Upload failed.", "error");
      }
    } catch (err) {
      console.error("Upload error:", err);
      showToast("An error occurred during upload.", "error");
    } finally {
      setUploading(false);
    }
  };

  const confirmDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8081/api/gallery/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setItemToDelete(null);
        fetchImages();
        showToast("Gallery image deleted successfully!");
      } else {
        showToast("Failed to delete gallery image.", "error");
      }
    } catch (err) {
      console.error("Delete error:", err);
      showToast("An error occurred during deletion.", "error");
    }
  };

  const handleDelete = (id: number) => {
    setItemToDelete(id);
  };

  const handleEditClick = (img: GalleryImage) => {
    setEditingId(img.id);
    setEditTitle(img.title);
    setEditDescription(img.description);
  };

  const handleUpdate = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8081/api/gallery/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription
        }),
      });
      if (res.ok) {
        setEditingId(null);
        fetchImages();
        showToast("Gallery image updated successfully!");
      } else {
        showToast("Update failed.", "error");
      }
    } catch (err) {
      console.error("Update error:", err);
      showToast("An error occurred during update.", "error");
    }
  };

  return (
    <div className="p-6">
      <div className="bg-on-surface/5 p-6 rounded-2xl mb-8 border border-white/10">
        <h3 className="text-xl font-bold mb-4 font-serif text-on-surface">Upload New Gallery Image</h3>
        <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-4 items-start md:items-end">
          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface/60 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Couture Nails"
              required
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-on-surface outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface/60 mb-2">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Precision and detail"
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-on-surface outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface/60 mb-2">Select File</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-on-surface file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-primary file:text-background file:font-bold outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={!file || !title || uploading}
            className="btn-premium-gold px-8 py-3 disabled:opacity-50 flex items-center gap-2"
          >
            {uploading ? <Loader2 size={18} className="animate-spin" /> : <ImagePlus size={18} />}
            Upload
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div key={img.id} className="relative group rounded-2xl overflow-hidden border border-white/10 bg-on-surface/5 flex flex-col h-full">
              {itemToDelete === img.id && (
                <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-sm font-bold text-on-surface mb-4">Delete this image?</span>
                  <div className="flex gap-2 w-full max-w-[180px]">
                    <button 
                      onClick={() => setItemToDelete(null)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold bg-on-surface/5 text-on-surface hover:bg-on-surface/10 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => confirmDelete(img.id)}
                      className="flex-1 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
              <div className="relative overflow-hidden aspect-square bg-black/20">
                <img
                  src={`http://localhost:8081/api/gallery/images/${img.file_name}`}
                  alt={img.file_name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="bg-background/80 backdrop-blur p-4 border-t border-white/10 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="text-on-surface font-bold text-sm truncate">{img.title}</h4>
                  {img.description && <p className="text-on-surface/60 text-xs truncate mt-1">{img.description}</p>}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => handleEditClick(img)}
                    className="flex-1 bg-primary/10 text-primary py-1.5 rounded-lg text-xs font-bold uppercase hover:bg-primary hover:text-background transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit2 size={12} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="bg-red-500/20 text-red-400 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {images.length === 0 && (
            <div className="col-span-full text-center py-12 text-on-surface/40">
              No gallery images uploaded yet.
            </div>
          )}
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editingId !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#2B2B2B]/40 backdrop-blur-md"
              onClick={() => setEditingId(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="relative bg-[#FAF9F6] border border-[#C9A24A]/30 p-8 rounded-2xl shadow-luxury-deep max-w-md w-full overflow-hidden z-10 text-[#2B2B2B]"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C9A24A] via-primary to-[#C9A24A]" />

              <h3 className="text-2xl font-serif font-bold mb-4 text-[#2B2B2B] tracking-wide">
                Edit Image Details
              </h3>

              {(() => {
                const editingImage = images.find(img => img.id === editingId);
                return editingImage ? (
                  <div className="mb-6 rounded-xl overflow-hidden max-h-40 flex justify-center items-center bg-black/5 relative border border-[#C9A24A]/10 mx-auto w-fit">
                    <img
                      src={`http://localhost:8081/api/gallery/images/${editingImage.file_name}`}
                      alt="Preview"
                      className="max-h-48 w-auto object-contain block rounded-lg shadow-sm"
                    />
                  </div>
                ) : null;
              })()}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#2B2B2B]/60 mb-2">Title</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    className="w-full bg-white border border-[#2B2B2B]/10 rounded-xl px-4 py-3 text-[#2B2B2B] outline-none focus:border-primary transition-colors font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#2B2B2B]/60 mb-2">Description</label>
                  <textarea
                    value={editDescription}
                    onChange={e => setEditDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-white border border-[#2B2B2B]/10 rounded-xl px-4 py-3 text-[#2B2B2B] outline-none focus:border-primary transition-colors font-semibold resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#2B2B2B]/10">
                <button
                  onClick={() => setEditingId(null)}
                  className="px-6 py-2.5 rounded-full font-bold text-[#2B2B2B]/60 hover:bg-[#2B2B2B]/5 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdate(editingId)}
                  className="btn-premium-gold px-6 py-2.5 text-sm"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AdminToast
        message={toast.message}
        type={toast.type}
        isOpen={toast.isOpen}
        onClose={() => setToast(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}

