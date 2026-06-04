import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Crown, Gift } from "lucide-react";
import bridalOfferImage from "../../assets/bridal_offer.png";

interface Promotion {
  id: number;
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

const BridalOffer: React.FC = () => {
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8081/api/promotions/active")
      .then((res) => {
        if (res.status === 204) {
          return null;
        }
        return res.json();
      })
      .then((data) => {
        setPromotion(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch promotion, using default", err);
        setLoading(false);
      });
  }, []);

  // Use dynamic data if available, otherwise use fallback static data
  const tagText = promotion?.tagText || "Exclusive Loyalty Reward";
  const titlePart1 = promotion?.titlePart1 || "Bridal";
  const titlePart2 = promotion?.titlePart2 || "Makeup Offer";
  const description = promotion?.description || "A special celebration of our regular clients. Experience the peak of bridal artistry with an exclusive reward.";
  const offerTag = promotion?.offerTag || "Limited Time";
  const offerTitle = promotion?.offerTitle || "Loyalty Benefit";
  const discountValue = promotion?.discountValue || "20%";
  const discountSuffix = promotion?.discountSuffix || "OFF";
  
  const featuresList = promotion?.features 
    ? promotion.features.split(',').map(f => f.trim()) 
    : ["Exclusive for Regular Customers", "Complete Bridal Transformation"];

  const imageUrl = promotion?.imageName 
    ? `http://localhost:8081/api/gallery/uploads/${promotion.imageName}` 
    : bridalOfferImage;

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-surface-dim/30">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 tb:px-6 dt:px-8 relative z-10">
        <div className="grid dt:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 text-center dt:text-left"
          >
            {tagText && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm mb-4">
                <Gift size={16} />
                <span className="font-bold uppercase tracking-widest text-[10px]">
                  {tagText}
                </span>
              </div>
            )}

            <div className="space-y-4">
              <h2 className="text-5xl lg:text-7xl font-black text-on-surface uppercase tracking-tighter leading-[0.85] font-serif">
                {titlePart1} <span className="text-primary block">{titlePart2}</span>
              </h2>
              <p className="text-on-surface/80 text-lg lg:text-xl font-medium max-w-xl mx-auto dt:mx-0 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Offer Card */}
            <div className="relative group max-w-md mx-auto dt:mx-0">
              <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/30 transition-colors rounded-3xl" />
              <div className="relative bg-white/80 backdrop-blur-md border border-white p-8 rounded-3xl shadow-luxury-deep space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white text-primary rounded-2xl shadow-luxury border border-primary/20">
                      <Crown size={24} fill="var(--primary)" fillOpacity={0.2} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/40">
                        {offerTag}
                      </span>
                      <span className="text-xl font-black text-on-surface uppercase">
                        {offerTitle}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-black text-primary">{discountValue}</span>
                    <span className="text-[10px] block font-bold uppercase text-on-surface/60">
                      {discountSuffix}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 border-t border-on-surface/10 pt-4">
                  {featuresList.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-on-surface/70 text-sm font-semibold">
                      <Sparkles size={14} className="text-primary" fill="var(--primary)" fillOpacity={0.2} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-md mx-auto dt:mx-0 flex justify-center">
              <Link to="/contact" className="w-full mb:w-auto">
                <button className="btn-premium-gold px-12 py-4 text-sm w-full mb:w-auto">
                  Claim Offer
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right: Immersive Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square dt:aspect-4/3 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/50 group">
              <img
                src={imageUrl}
                alt="Premium Promotion"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 mix-blend-overlay" />
            </div>
            {/* Floating particle effects */}
            <div className="absolute top-10 right-10 w-4 h-4 bg-primary/40 rounded-full blur-[2px] animate-pulse" />
            <div className="absolute bottom-10 left-10 w-6 h-6 bg-primary/30 rounded-full blur-[3px] animate-pulse delay-700" />
            <div className="absolute top-1/2 -left-4 w-3 h-3 bg-[#C9A24A]/50 rounded-full blur-[1px] animate-pulse delay-300" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BridalOffer;
