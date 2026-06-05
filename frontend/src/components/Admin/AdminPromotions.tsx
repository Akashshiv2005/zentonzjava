import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Check, X, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Promotion {
  id: number;
  isActive: boolean;
  tagText: string;
  titlePart1: string;
  titlePart2: string;
  description: string;
  offerTag: string;
  offerTitle: string;
  discountValue: string;
  discountSuffix: string;
  features: string;
  imageName: string;
}

const API_BASE_URL = "http://localhost:8081/api/promotions";
const UPLOAD_URL = "http://localhost:8081/api/promotions/upload";
const GALLERY_IMAGE_URL = "http://localhost:8081/api/gallery/uploads";

const defaultPromotion: Promotion = {
  id: 0,
  isActive: true,
  tagText: "Exclusive Loyalty Reward",
  titlePart1: "Bridal",
  titlePart2: "Makeup Offer",
  description: "A special celebration of our regular clients. Experience the peak of bridal artistry with an exclusive reward.",
  offerTag: "Limited Time",
  offerTitle: "Loyalty Benefit",
  discountValue: "20%",
  discountSuffix: "OFF",
  features: "Exclusive for Regular Customers, Complete Bridal Transformation",
  imageName: ""
};

const AdminPromotions: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [currentPromo, setCurrentPromo] = useState<Partial<Promotion>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error("Failed to fetch promotions");
      const data = await response.json();
      
      if (data && data.length > 0) {
        setPromotions(data);
      } else {
        // Show default data if DB is empty
        setPromotions([defaultPromotion]);
      }
    } catch (err: any) {
      console.error(err);
      // Fallback to default data on network error
      setPromotions([defaultPromotion]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentPromo({
      isActive: false,
      tagText: "",
      titlePart1: "",
      titlePart2: "",
      description: "",
      offerTag: "",
      offerTitle: "",
      discountValue: "",
      discountSuffix: "",
      features: "",
      imageName: ""
    });
    setSelectedFile(null);
    setIsEditing(true);
  };

  const handleEdit = (promo: Promotion) => {
    setCurrentPromo(promo);
    setSelectedFile(null);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this promotion?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      fetchPromotions();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleToggleActive = async (promo: Promotion) => {
    try {
      const updatedPromo = { ...promo, isActive: !promo.isActive };
      const response = await fetch(`${API_BASE_URL}/${promo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPromo)
      });
      if (!response.ok) throw new Error("Failed to update status");
      fetchPromotions();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let finalImageName = currentPromo.imageName;

      // Upload image if a new file is selected
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const uploadRes = await fetch(UPLOAD_URL, {
          method: "POST",
          body: formData
        });
        if (!uploadRes.ok) throw new Error("Failed to upload image");
        finalImageName = await uploadRes.text();
      }

      const promoToSave = { ...currentPromo, imageName: finalImageName };

      const method = promoToSave.id ? "PUT" : "POST";
      const url = promoToSave.id ? `${API_BASE_URL}/${promoToSave.id}` : API_BASE_URL;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(promoToSave)
      });

      if (!response.ok) throw new Error("Failed to save promotion");
      
      setIsEditing(false);
      fetchPromotions();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) return <div className="text-on-surface/60 p-8 text-center animate-pulse">Loading promotions...</div>;
  if (error) return <div className="text-red-400 bg-red-900/20 p-4 rounded-xl border border-red-500/20">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-surface-dim/30 p-6 rounded-2xl border border-white/5">
        <div>
          <h2 className="text-xl font-bold text-on-surface">Manage Offers</h2>
          <p className="text-sm text-on-surface/60 mt-1">Create and manage your special offers and discounts.</p>
        </div>
        <button onClick={handleAddNew} className="btn-premium flex items-center gap-2">
          <Plus size={18} />
          New Offer
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-surface-light rounded-2xl p-6 border border-white/10 shadow-luxury"
          >
            <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
              <Gift size={20} />
              {currentPromo.id ? "Edit Offer" : "Create New Offer"}
            </h3>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface/60 uppercase tracking-wider">Top Tagline</label>
                  <input type="text" value={currentPromo.tagText || ""} onChange={e => setCurrentPromo({...currentPromo, tagText: e.target.value})} className="input-field" placeholder="e.g. Exclusive Loyalty Reward" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface/60 uppercase tracking-wider">Title Part 1</label>
                    <input type="text" value={currentPromo.titlePart1 || ""} onChange={e => setCurrentPromo({...currentPromo, titlePart1: e.target.value})} className="input-field" placeholder="e.g. Bridal" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-primary uppercase tracking-wider">Title Part 2 (Highlight)</label>
                    <input type="text" value={currentPromo.titlePart2 || ""} onChange={e => setCurrentPromo({...currentPromo, titlePart2: e.target.value})} className="input-field border-primary/30 focus:border-primary/60" placeholder="e.g. Makeup Offer" required />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-on-surface/60 uppercase tracking-wider">Description</label>
                  <textarea value={currentPromo.description || ""} onChange={e => setCurrentPromo({...currentPromo, description: e.target.value})} className="input-field min-h-[80px]" placeholder="Brief description of the offer..." required />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface/60 uppercase tracking-wider">Offer Tag (Small)</label>
                  <input type="text" value={currentPromo.offerTag || ""} onChange={e => setCurrentPromo({...currentPromo, offerTag: e.target.value})} className="input-field" placeholder="e.g. Limited Time" required />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface/60 uppercase tracking-wider">Offer Title</label>
                  <input type="text" value={currentPromo.offerTitle || ""} onChange={e => setCurrentPromo({...currentPromo, offerTitle: e.target.value})} className="input-field" placeholder="e.g. Loyalty Benefit" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface/60 uppercase tracking-wider">Discount Value</label>
                    <input type="text" value={currentPromo.discountValue || ""} onChange={e => setCurrentPromo({...currentPromo, discountValue: e.target.value})} className="input-field font-bold text-primary" placeholder="e.g. 20%" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface/60 uppercase tracking-wider">Discount Suffix</label>
                    <input type="text" value={currentPromo.discountSuffix || ""} onChange={e => setCurrentPromo({...currentPromo, discountSuffix: e.target.value})} className="input-field" placeholder="e.g. OFF" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface/60 uppercase tracking-wider">Features (Comma Separated)</label>
                  <input type="text" value={currentPromo.features || ""} onChange={e => setCurrentPromo({...currentPromo, features: e.target.value})} className="input-field" placeholder="Feature 1, Feature 2" />
                </div>

                
                
                <div className="space-y-2 md:col-span-2 flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="isActive" 
                    checked={currentPromo.isActive || false}
                    onChange={e => setCurrentPromo({...currentPromo, isActive: e.target.checked})}
                    className="w-5 h-5 rounded bg-surface border-white/20 text-primary focus:ring-primary focus:ring-offset-surface-dim"
                  />
                  <label htmlFor="isActive" className="text-sm font-bold text-on-surface">Set as Active Offer (will deactivate others)</label>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-full font-bold text-on-surface/60 hover:bg-white/5 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isUploading} className="btn-premium flex items-center gap-2 min-w-[120px] justify-center">
                  {isUploading ? <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span> : <Check size={18} />}
                  {isUploading ? 'Saving...' : 'Save Offer'}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promotions.length === 0 ? (
              <div className="col-span-2 py-12 text-center text-on-surface/40 bg-surface-dim/20 rounded-2xl border border-white/5 border-dashed">
                <Gift size={48} className="mx-auto mb-4 opacity-20" />
                <p>No offers added yet. Click 'New Offer' to create one.</p>
              </div>
            ) : (
              promotions.map(promo => (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`bg-surface-light rounded-2xl overflow-hidden border ${promo.isActive ? 'border-primary shadow-[0_0_15px_rgba(201,162,74,0.1)]' : 'border-white/5'}`}
                >
                  <div className="h-32 relative bg-surface-dim overflow-hidden">
                    {promo.imageName ? (
                      <img src={`${GALLERY_IMAGE_URL}/${promo.imageName}`} alt={promo.titlePart1} className="w-full h-full object-cover opacity-60" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-on-surface/20">
                        <ImageIcon size={32} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-light to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <div className="text-[10px] font-bold text-primary uppercase tracking-widest">{promo.tagText}</div>
                      <div className="text-xl font-black">{promo.titlePart1} <span className="text-primary">{promo.titlePart2}</span></div>
                    </div>
                  </div>
                  
                  <div className="p-5 space-y-4">
                    <div className="flex justify-between items-center p-3 bg-surface rounded-xl border border-white/5">
                      <div>
                        <div className="text-[10px] text-on-surface/50 uppercase font-bold">{promo.offerTitle}</div>
                        <div className="text-xl font-black text-primary">{promo.discountValue} <span className="text-sm text-on-surface/50">{promo.discountSuffix}</span></div>
                      </div>
                      <button 
                        onClick={() => handleToggleActive(promo)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${promo.isActive ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-surface-dim text-on-surface/40 hover:text-on-surface'}`}
                      >
                        {promo.isActive ? 'Active' : 'Set Active'}
                      </button>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button onClick={() => handleEdit(promo)} className="p-2 rounded-lg bg-white/5 text-on-surface/60 hover:text-white hover:bg-white/10 transition-colors" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(promo.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPromotions;
