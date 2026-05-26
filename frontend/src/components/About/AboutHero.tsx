import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { SparkleHeading } from "../ui/SparkleHeading";

// Assets
import interiorImage from "../../assets/hairspawebpimages/hairspa3.webp";
import hairImage from "../../assets/hairwebp images/butterfly cut.webp";
import skinImage from "../../assets/facialwebpimages/facial1.webp";
import spaImage from "../../assets/hairspawebpimages/hairspa1.webp";

const archImages = [interiorImage, hairImage, skinImage, spaImage];

const AboutHero: React.FC = () => {
  const [currentArchIndex, setCurrentArchIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentArchIndex((prev) => (prev + 1) % archImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector("#our-journey");
    if (element instanceof HTMLElement) {
      if (window.lenisInstance) {
        window.lenisInstance.scrollTo(element, { offset: -30, duration: 1.5 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center pt-12 tb:pt-16 pb-6 tb:pb-10 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 tb:px-6 dt:px-12 relative z-10">
        <div className="grid grid-cols-1 dt:grid-cols-2 gap-8 tb:gap-12 dt:gap-16 items-center">
          {/* Left Column: Narrative */}
          <motion.div
            initial={!isMobile ? { opacity: 0, x: -30 } : { opacity: 1 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: !isMobile ? 0.8 : 0.4 }}
            className="space-y-4 tb:space-y-6 text-center dt:text-left pt-6 dt:pt-0"
          >
            <div>
              <h1 className="text-display text-on-surface mb-6 glow-text leading-[0.95] normal-case sparkle-group">
                <SparkleHeading
                  text="More Than a Salon"
                  className="text-on-surface"
                />
                <br />
                <SparkleHeading
                  text="A Beauty Sanctuary"
                  className="text-primary"
                  sparkleScale={1.11}
                />
              </h1>

              <p className="text-sm mb:text-base tb:text-lg dt:text-xl text-on-surface/90 leading-relaxed max-w-xl mx-auto dt:mx-0 mb-6 font-medium px-4 mb:px-0">
                Beauty is confidence, self-love, and feeling truly seen. Zen
                Tonez is an exclusive women's salon, a sanctuary where luxury
                meets personal care.
              </p>

              <div className="flex flex-col mb:flex-row items-center gap-4 mb:gap-6 justify-center dt:justify-start px-4 mb:px-0">
                <Link to="/contact" className="w-full mb:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-premium-gold px-6 py-3 mb:px-10 mb:tb:px-12 w-full mb:w-auto text-[10px] mb:text-xs shadow-xl"
                  >
                    Book Your Ritual
                  </motion.button>
                </Link>
                <motion.a
                  href="#our-journey"
                  onClick={handleScroll}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-3 text-[9px] tb:text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/60 hover:text-on-surface transition-colors duration-300 cursor-pointer"
                >
                  <span className="pb-1 border-b-2 border-on-surface/10 group-hover:border-primary transition-all duration-300">
                    Learn Our Story
                  </span>
                  <span className="text-lg group-hover:translate-x-2 transition-transform duration-300">
                    →
                  </span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Arch */}
          <motion.div
            initial={!isMobile ? { opacity: 0, x: 30 } : { opacity: 1 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: !isMobile ? 0.8 : 0.4,
              delay: !isMobile ? 0.2 : 0,
            }}
            className="relative flex items-center justify-center dt:justify-end mt-4 dt:mt-0"
          >
            {/* The Arch Shape */}
            <div className="relative w-full max-w-[280px] mb:max-w-[450px] aspect-4/5 rounded-t-full border-8 border-primary/5 p-4 tb:p-6 shadow-2xl bg-surface/95 overflow-visible">
              <div className="w-full h-full rounded-t-full overflow-hidden shadow-inner border border-primary/20 relative">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={currentArchIndex}
                    src={archImages[currentArchIndex]}
                    alt="Salon Luxury"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* Decorative Dots */}
              <div className="absolute top-1/4 -right-4 w-2 h-2 rounded-full bg-primary/40" />
              <div className="absolute bottom-1/3 -left-4 w-3 h-3 rounded-full border border-primary/40" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
