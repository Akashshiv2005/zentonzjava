import React, { useState, useEffect } from 'react';
import { ImagePlus, Trash2, Loader2 } from 'lucide-react';
import ConfirmModal from '../ui/ConfirmModal';
import { AdminToast } from '../ui/AdminToast';

interface GalleryImage {
  id: number;
  file_name: string;
  title: string;
  description: string;
  is_magazine?: boolean;
}

export function AdminMagazine() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
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
        setImages(data.filter((img: GalleryImage) => img.is_magazine));
      }
    } catch (err) {
      console.error("Failed to fetch magazine pages", err);
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
    formData.append('title', 'Magazine Page');
    formData.append('description', 'Magazine Page');
    formData.append('is_magazine', 'true');

    try {
      const res = await fetch('http://localhost:8081/api/gallery/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setFile(null);
        fetchImages();
        showToast("Magazine page uploaded successfully!");
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
        showToast("Magazine page deleted successfully!");
      } else {
        showToast("Failed to delete magazine page.", "error");
      }
    } catch (err) {
      console.error("Delete error:", err);
      showToast("An error occurred during deletion.", "error");
    }
  };

  const handleDelete = (id: number) => {
    setItemToDelete(id);
  };

  return (
    <div className="p-6">
      <div className="bg-on-surface/5 p-6 rounded-2xl mb-8 border border-white/10">
        <h3 className="text-xl font-bold mb-4 font-serif text-on-surface">Upload New Magazine Page</h3>
        <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-4 items-start md:items-end">
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
            disabled={!file || uploading}
            className="btn-premium-gold px-8 py-3 disabled:opacity-50 flex items-center gap-2"
          >
            {uploading ? <Loader2 size={18} className="animate-spin" /> : <ImagePlus size={18} />}
            Upload Image
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
              <div className="relative overflow-hidden aspect-square bg-black/20">
                <img 
                  src={`http://localhost:8081/api/gallery/images/${img.file_name}`} 
                  alt={img.file_name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="bg-background/80 backdrop-blur p-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-on-surface/50">Magazine Page</span>
                <button 
                  onClick={() => handleDelete(img.id)}
                  className="bg-red-500/20 text-red-400 p-2 rounded-xl hover:bg-red-500 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-bold"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
          {images.length === 0 && (
            <div className="col-span-full text-center py-12 text-on-surface/40">
              No magazine pages uploaded yet.
            </div>
          )}
        </div>
      )}

      <ConfirmModal 
        isOpen={itemToDelete !== null}
        message="Are you sure you want to delete this magazine page? This action cannot be undone."
        onConfirm={() => {
          if (itemToDelete !== null) {
            confirmDelete(itemToDelete);
          }
        }}
        onCancel={() => setItemToDelete(null)}
      />

      <AdminToast
        message={toast.message}
        type={toast.type}
        isOpen={toast.isOpen}
        onClose={() => setToast(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
