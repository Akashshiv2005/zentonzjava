import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "./ScrollReveal";

const compliments = [
  "You look stunning today! ✨",
  "Your beauty is unique and powerful. 💖",
  "Radiate confidence and grace. 🌟",
  "You deserve to be pampered. 💆‍♀️",
  "A little self-care goes a long way. 🌸",
];

const MembershipSection: React.FC = () => {
  return (
    <section
      id="membership"
      className="py-20 lg:py-32 bg-background relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 tb:px-6 dt:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16 lg:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm mb-6">
              <Star size={14} className="fill-current" />
              <span className="font-bold uppercase tracking-[0.2em] text-[10px]">
                Exclusive Benefits
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-on-surface mb-6 uppercase tracking-tighter font-serif leading-none">
              Choose Your <span className="text-primary">Membership</span> Plan
            </h2>
            <p className="text-on-surface/70 text-base lg:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Save more on every salon visit with our exclusive membership card.
              <br className="hidden lg:block" />
              Elevate your beauty routine with premium rewards.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Non-Membership Card */}
          <ScrollReveal delay={0.2}>
            <motion.div
              whileHover={{ y: -10 }}
              className="h-full bg-white rounded-[2.5rem] p-8 lg:p-12 border border-slate-200 shadow-xl flex flex-col justify-between group transition-all duration-500"
            >
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight font-serif">
                    Non-Membership
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900">
                      Standard
                    </span>
                    <span className="text-slate-500 font-bold text-sm uppercase tracking-widest">
                      Pricing
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    "No yearly fee",
                    "Pay normal service charges",
                    "No discounts available",
                    "Regular booking access",
                  ].map((benefit, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-slate-600 font-bold text-sm"
                    >
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-slate-400" />
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="mt-12 w-full py-5 rounded-2xl border-2 border-slate-900 text-slate-900 font-black uppercase tracking-widest text-xs hover:bg-slate-900 hover:text-white transition-all duration-300">
                Continue as Guest
              </button>
            </motion.div>
          </ScrollReveal>

          {/* Membership Card - Highlighted */}
          <ScrollReveal delay={0.4}>
            <MembershipCard />
          </ScrollReveal>
        </div>

        {/* Footnote */}
        <ScrollReveal delay={0.6}>
          <p className="text-center mt-12 text-on-surface/40 text-[10px] font-bold uppercase tracking-widest">
            * Membership discounts cannot be combined with other promotional
            offers.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

const MembershipCard: React.FC = () => {
  const [compliment, setCompliment] = React.useState<string | null>(null);

  const showCompliment = () => {
    const randomCompliment =
      compliments[Math.floor(Math.random() * compliments.length)];
    setCompliment(randomCompliment);
    setTimeout(() => setCompliment(null), 3000);
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      onClick={showCompliment}
      className="h-full relative group cursor-pointer"
    >
      {/* Premium Outer Glow */}
      <div className="absolute -inset-4 bg-[#B87333]/20 blur-3xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

      <div className="relative h-full bg-[#0a0a0a] rounded-[2.5rem] p-8 lg:p-12 shadow-2xl border border-[#B87333]/30 flex flex-col justify-between overflow-hidden">
        {/* Subtle noise/leather texture overlay */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />
        
        {/* Gold Light Flare Top Left */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#B87333]/20 blur-[60px] rounded-full pointer-events-none" />
        
        {/* Gold Light Flare Bottom Right */}
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#B87333]/20 blur-[60px] rounded-full pointer-events-none" />

        {/* Giant ZT Watermark */}
        <div className="absolute -right-12 top-1/2 -translate-y-1/2 text-[180px] font-serif font-black italic text-transparent bg-clip-text bg-gradient-to-br from-[#B87333]/15 to-transparent pointer-events-none select-none drop-shadow-2xl z-0 leading-none">
          ZT
        </div>

        <div className="space-y-4 relative z-10">
          {/* Card Header with Logo and Crown */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              {/* Stylish ZT Logo */}
              <div className="text-5xl font-serif font-black italic text-transparent bg-clip-text bg-gradient-to-br from-[#E5C158] via-[#C9A24A] to-[#8B5E34] drop-shadow-lg leading-none pb-1">
                ZT
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[20px] font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-[#E5C158] via-[#C9A24A] to-[#8B5E34] uppercase leading-none drop-shadow-md">
                  Zen Tonez
                </span>
                <span className="text-[7px] font-bold tracking-[0.4em] text-[#B87333]/90 uppercase mt-1 flex items-center gap-1.5">
                  <span className="h-[1px] bg-[#B87333]/40 flex-1"></span>
                  Women Salon
                  <span className="h-[1px] bg-[#B87333]/40 flex-1"></span>
                </span>
              </div>
            </div>
            
            {/* Crown Icon Container */}
            <div className="w-12 h-12 rounded-xl border border-[#C9A24A]/40 flex items-center justify-center bg-gradient-to-br from-[#C9A24A]/10 to-transparent shadow-[inset_0_0_15px_rgba(201,162,74,0.15)]">
              <Crown className="text-[#E5C158]" size={22} />
            </div>
          </div>

          <div className="flex items-end justify-between">
            {/* Credit Card Chip */}
            <div className="w-12 h-8 rounded-md bg-gradient-to-br from-[#E5C158] via-[#C9A24A] to-[#8B5E34] relative overflow-hidden border border-[#E5C158]/60 shadow-[0_4px_15px_rgba(0,0,0,0.5)] flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/30 mix-blend-overlay"></div>
              <div className="absolute w-full h-[1px] bg-black/40 top-1/2 -translate-y-1/2 shadow-[0_1px_0_rgba(255,255,255,0.2)]"></div>
              <div className="absolute h-full w-[1px] bg-black/40 left-1/2 -translate-x-1/2 shadow-[1px_0_0_rgba(255,255,255,0.2)]"></div>
              <div className="absolute w-[35%] h-full border-x border-black/40"></div>
              <div className="w-5 h-4 border border-black/40 rounded-sm bg-gradient-to-br from-[#E5C158]/50 to-transparent shadow-[inset_0_0_5px_rgba(0,0,0,0.5)]"></div>
            </div>

            <div className="text-right space-y-0.5">
              <h3 className="text-[10px] uppercase tracking-[0.35em] text-[#C9A24A] font-bold">
                Premium Membership
              </h3>
              <div className="flex items-baseline justify-end gap-1.5">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#E5C158] via-[#C9A24A] to-[#8B5E34] drop-shadow-md">
                  ₹199
                </span>
                <span className="text-[#C9A24A]/80 font-bold text-[10px] uppercase tracking-widest">
                  / Year
                </span>
              </div>
            </div>
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 py-1 opacity-60">
            <div className="h-px bg-gradient-to-r from-transparent via-[#C9A24A] to-transparent flex-1" />
            <Star size={10} className="text-[#C9A24A] fill-[#C9A24A]" />
            <div className="h-px bg-gradient-to-r from-transparent via-[#C9A24A] to-transparent flex-1" />
          </div>

          <div className="space-y-3">
            {[
              "15% discount on all salon services",
              "Valid for 1 year",
              "Applicable for all premium services",
              "Exclusive member benefits & priority",
            ].map((benefit, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-slate-200 font-bold text-xs"
              >
                <div className="w-4 h-4 rounded-full bg-[#C9A24A]/20 border border-[#C9A24A]/40 flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(201,162,74,0.3)]">
                  <Check size={8} className="text-[#E5C158]" />
                </div>
                <span className="drop-shadow-md">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <Link to="/membership" className="relative z-10 mt-6 block">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-[#8B5E34] via-[#C9A24A] to-[#8B5E34] text-white rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-[0_10px_30px_rgba(201,162,74,0.3)] hover:shadow-[0_10px_40px_rgba(201,162,74,0.5)] transition-all duration-300 border border-[#E5C158]/50"
          >
            Get Membership
          </motion.button>
        </Link>

        {/* Compliment Tooltip */}
        <AnimatePresence>
          {compliment && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-[#0a0a0a] text-[#E5C158] px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(229,193,88,0.4)] border border-[#E5C158]/50"
            >
              {compliment}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MembershipSection;
