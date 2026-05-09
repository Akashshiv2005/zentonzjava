import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutCTA: React.FC = () => {
  return (
    <section className="py-8 mb:py-12 tb:py-16 dt:py-20 bg-surface-dim/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb:px-6 tb:px-8">
        <div className="relative bg-primary/5 rounded-3xl mb:rounded-4xl tb:rounded-[3rem] p-6 mb:p-12 tb:p-16 dt:p-24 overflow-hidden border border-primary/20 shadow-xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 space-y-4 mb:space-y-6 tb:space-y-8"
          >
            <h2 className="text-2xl mb:text-3xl tb:text-5xl dt:text-6xl font-serif leading-[1.1] text-on-surface px-2">
              Begin Your Journey to <br className="hidden mb:block" />
              <span className="text-primary tracking-tight">
                Unrivaled Radiance
              </span>
            </h2>
            <p className="text-xs mb:text-base tb:text-lg text-on-surface/60 font-sans max-w-xl tb:max-w-2xl mx-auto leading-relaxed px-2 mb:px-0">
              Experience the perfect blend of artisanal skill and modern luxury.
              Your transformation awaits at Zen Tonez.
            </p>
            <div className="pt-4 mb:pt-6 tb:pt-8 flex justify-center">
              <Link to="/contact" className="w-full mb:w-auto px-4 mb:px-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-premium-gold w-full mb:w-auto px-4 mb:px-12 tb:px-16 py-3 mb:py-4 text-[9px] mb:text-sm tracking-widest whitespace-nowrap"
                >
                  Book Your Appointment
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
