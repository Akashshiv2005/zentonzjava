import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ScrollReveal } from "./ScrollReveal";
import { useState, useEffect } from "react";

const pricingDataFallback = [
  { name: "Skin Care", price: "₹400+" },
  { name: "Facial Treatment", price: "₹1,150+" },
  { name: "Manicure & Pedicure", price: "₹519+" },
  { name: "Hair Care", price: "₹1,049+" },
  { name: "Hair Styling", price: "₹399+" },
  { name: "Bridal Makeup", price: "₹15,000+" },
  { name: "Nails", price: "₹999+" },
  { name: "Lice Removal", price: "₹4,999+" },
  { name: "Wart Removal", price: "₹119+" },
  { name: "Ear Piercing", price: "₹299+" },
];

export function PricingSection() {
  const [pricingData, setPricingData] = useState(pricingDataFallback);

  useEffect(() => {
    fetch('http://localhost:8081/api/services')
      .then(r => r.json())
      .then((data: any[]) => {
        const merged = pricingDataFallback.map(fallback => {
          let searchName = fallback.name;
          if (searchName === 'Manicure') searchName = 'Manicure & Pedicure';
          if (searchName === 'Pedicure') searchName = 'Manicure & Pedicure';
          
          const match = data.find(d => {
            const dTitle = d.title?.trim().toLowerCase() || '';
            const dCat = d.category?.trim().toLowerCase() || '';
            const sName = searchName.trim().toLowerCase();
            return dTitle === sName || dCat === sName;
          });
          if (match) {
            return { ...fallback, price: match.price };
          }
          return fallback;
        });
        setPricingData(merged);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="py-10 tb:py-16 dt:py-20 relative bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 tb:px-6 dt:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl tb:text-5xl font-black text-on-surface mb-6 uppercase tracking-tighter font-serif">
              Our <span className="text-primary">Pricing</span>
            </h2>
            <p className="text-on-surface/70 text-base tb:text-lg max-w-2xl mx-auto font-medium">
              Premium beauty doesn't have to be out of reach. We offer luxury
              treatments with transparent, honest pricing.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6">
          {pricingData.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.05}>
              <div className="flex justify-between items-center p-6 bg-background rounded-2xl border border-primary/10 hover:border-primary/30 transition-all shadow-sm group">
                <span className="text-lg tb:text-xl font-serif font-bold text-on-surface">
                  {item.name}
                </span>
                <div className="flex-1 border-b border-dotted border-on-surface/20 mx-4 translate-y-[-4px]" />
                <span className="text-lg tb:text-xl font-black text-primary">
                  Starting at {item.price}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="mt-16 text-center">
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-premium-outline px-10 py-4"
              >
                View Full Services & Pricing →
              </motion.button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
