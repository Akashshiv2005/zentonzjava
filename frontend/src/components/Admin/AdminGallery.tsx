import React, { useState, useEffect } from 'react';
import { ImagePlus, Trash2, Loader2 } from 'lucide-react';

interface GalleryImage {
  id: number;
  fileName: string;
  category: string;
}

export function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState('hair');

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8081/api/gallery');
      if (res.ok) setImages(await res.json());
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
    formData.append('category', category);

    try {
      const res = await fetch('http://localhost:8081/api/gallery/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setFile(null);
        fetchImages();
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      const res = await fetch(`http://localhost:8081/api/gallery/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchImages();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-on-surface/5 p-6 rounded-2xl mb-8 border border-white/10">
        <h3 className="text-xl font-bold mb-4 font-serif text-on-surface">Upload New Image</h3>
        <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-4 items-start md:items-end">
          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface/60 mb-2">Category</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-on-surface outline-none focus:border-primary transition-colors"
            >
              <option value="hair">Hair</option>
              <option value="skin">Skin</option>
              <option value="bridal">Bridal</option>
              <option value="spa">Spa</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface/60 mb-2">Select File</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-on-surface file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-primary file:text-background file:font-bold outline-none"
            />
          </div>
          <button 
            type="submit"
            disabled={!file || uploading}
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
            <div key={img.id} className="relative group rounded-2xl overflow-hidden aspect-square border border-white/10 bg-on-surface/5">
              <img 
                src={`http://localhost:8081/api/gallery/images/${img.fileName}`} 
                alt={img.fileName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {img.category}
                </span>
                <button 
                  onClick={() => handleDelete(img.id)}
                  className="bg-red-500/20 text-red-400 p-2 rounded-full hover:bg-red-500 hover:text-on-surface transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {images.length === 0 && (
            <div className="col-span-full text-center py-12 text-on-surface/40">
              No images uploaded yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
