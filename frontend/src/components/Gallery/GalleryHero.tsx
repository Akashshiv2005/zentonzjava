import React from "react";
import { motion } from "framer-motion";
import { SparkleHeading } from "../ui/SparkleHeading";
import { Reveal } from "../ui/Reveal";

const GalleryHero: React.FC = () => {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden bg-slate-950">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-container/10 blur-[100px] rounded-full" />
        <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
               backgroundSize: '40px 40px' 
             }} 
        />
      </div>

      <div className="container max-w-5xl mx-auto text-center relative z-10">
        <Reveal width="100%" direction="up" distance={30}>
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-mono tracking-[0.3em] uppercase text-primary border border-primary/20 rounded-full bg-primary/5 backdrop-blur-sm">
            Curated Visuals
          </span>
        </Reveal>

        <Reveal width="100%" direction="up" distance={40} delay={0.2}>
          <h1 className="text-display text-white mb-6 leading-[1.1] sparkle-group">
            <SparkleHeading text="The Artisanal" className="text-white" />
            <br />
            <SparkleHeading text="Chapters" className="text-primary" sparkleScale={1.3} />
          </h1>
        </Reveal>

        <Reveal width="100%" direction="up" distance={50} delay={0.4}>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            "A curated journey through the ethereal art of transformation. Each chapter reveals a new facet of bespoke beauty and soul."
          </p>
        </Reveal>

        <Reveal width="100%" direction="up" distance={20} delay={0.6}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-900 overflow-hidden bg-slate-800 shadow-xl">
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                    Z{i}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-400 font-medium">
              Join <span className="text-white">500+</span> luxury transformations
            </p>
          </div>
        </Reveal>
      </div>

      {/* Elegant scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Discover</span>
        <div className="w-px h-12 bg-linear-to-b from-primary/50 to-transparent" />
      </motion.div>
    </section>
  );
};

export default GalleryHero;
