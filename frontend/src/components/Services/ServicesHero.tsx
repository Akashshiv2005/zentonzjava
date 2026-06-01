import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { SparkleHeading } from "../ui/SparkleHeading";
import beautyHeroImage from "../../assets/south_indian_hero.png";

const ServicesHero: React.FC = () => {
  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    }
    const element = document.querySelector("#services-showcase");
    if (element instanceof HTMLElement) {
      if (window.lenisInstance) {
        window.lenisInstance.scrollTo(element, { offset: 30, duration: 1.5 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center bg-background overflow-hidden pt-16 tb:pt-24 dt:pt-32">
      <div className="max-w-7xl mx-auto px-4 tb:px-6 dt:px-8 py-10 tb:py-16 grid dt:grid-cols-2 gap-8 tb:gap-12 items-center relative z-10">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center dt:items-start transform-gpu backface-hidden pt-4 dt:pt-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-primary border border-secondary/30 shadow-sm mb-5 backface-hidden"
          >
            <Sparkles size={14} />
            <span className="font-bold uppercase tracking-widest text-[9px] tb:text-[10px]">
              Curated Excellence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-hero text-on-surface mb-4 normal-case glow-text text-center dt:text-left leading-tight sparkle-group"
          >
            <SparkleHeading text="Our Artisanal" className="text-on-surface" />
            <br className="dt:block hidden" />
            <SparkleHeading
              text="Beauty Rituals"
              className="text-primary"
              sparkleScale={1.3}
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-on-surface/90 text-lg tb:text-xl dt:text-2xl max-w-xl mb-6 tb:mb-8 leading-relaxed font-medium text-center dt:text-left px-4 mb:px-0"
          >
            "Experience a symphony of high-performance beauty rituals tailored
            to your unique essence and soul."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col mb:flex-row gap-3 tb:gap-4 w-full mb:w-auto px-4 mb:px-0"
          >
            <Link to="/book" className="w-full mb:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-premium-gold w-full mb:w-auto px-8 tb:px-10 py-3.5 tb:py-4 text-sm"
              >
                Book Appointment
              </motion.button>
            </Link>
            <motion.a
              href="#services-showcase"
              onClick={handleScroll}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-premium-outline w-full mb:w-auto px-8 tb:px-10 py-3.5 tb:py-4 text-sm bg-primary/5 border-primary/30 text-primary hover:bg-primary/10 transition-all text-center cursor-pointer"
            >
              View Services
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right – image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative will-change-transform transform-gpu backface-hidden mt-4 dt:mt-0"
        >
          <div className="relative rounded-3xl tb:rounded-5xl overflow-hidden shadow-2xl border-4 tb:border-8 border-white/50 aspect-4/5 tb:aspect-square transform-gpu backface-hidden max-w-[280px] mb:max-w-md mx-auto">
            <img
              src={beautyHeroImage}
              alt="Luxury Beauty Treatment"
              className="w-full h-full object-cover object-top"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHero;
