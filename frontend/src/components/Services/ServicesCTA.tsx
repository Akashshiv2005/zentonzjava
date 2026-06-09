import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ServicesCTA: React.FC = () => {
  return (
    <section className="py-10 sm:py-16 lg:py-20 text-center relative px-4 sm:px-6 border-t border-slate-900/10">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 sm:mb-8 uppercase tracking-tighter font-serif leading-tight">
          Join the <br />
          <span className="text-primary">Zen Tonez Circle</span>
        </h2>
        <p className="text-base sm:text-lg text-on-surface/80 font-semibold max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4 sm:px-0">
          Become a member and enjoy priority booking, exclusive offers, and
          personalized beauty consultations tailored exclusively for you.
        </p>
        <Link to="/contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-premium-gold px-12 sm:px-20 py-4 text-base sm:text-lg"
          >
            Join Now →
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default ServicesCTA;
