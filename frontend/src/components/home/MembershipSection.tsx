import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star } from "lucide-react";
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
      {/* Premium Glow Effect */}
      <div className="absolute inset-0 bg-primary/20 blur-3xl group-hover:bg-primary/40 transition-all duration-500 rounded-[2.5rem]" />

      <div className="relative h-full bg-linear-to-br from-[#B87333] via-[#C9A24A] to-[#8B5E34] rounded-[2.5rem] p-8 lg:p-12 shadow-2xl border border-white/20 flex flex-col justify-between overflow-hidden">
        <div className="space-y-8 relative z-10">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight font-serif">
                Membership Card
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">₹199</span>
                <span className="text-white/80 font-bold text-sm uppercase tracking-widest">
                  / Year
                </span>
              </div>
            </div>
            <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white text-[9px] font-black uppercase tracking-widest">
              Most Popular
            </div>
          </div>

          <div className="space-y-4">
            {[
              "15% discount on all salon services",
              "Valid for 1 year",
              "Applicable for all premium services",
              "Exclusive member benefits & priority",
            ].map((benefit, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-white font-bold text-sm"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-white" />
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <Link to="/membership" className="relative z-10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-12 w-full py-5 bg-white text-[#B87333] rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:shadow-2xl transition-all duration-300"
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
              className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-white text-slate-900 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl border border-primary/20"
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
