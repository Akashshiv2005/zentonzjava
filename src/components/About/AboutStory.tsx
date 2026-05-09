import React, { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import ownerImage from "../../assets/ownerimage/image.png";

const AboutStory: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-6 mb:py-8 tb:py-12 dt:py-16 bg-background overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: !isMobile ? "-10%" : "0%" }}
        className="max-w-7xl mx-auto px-4 mb:px-6 tb:px-8 dt:px-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb:gap-8 tb:gap-10 dt:gap-12 items-center">
          <motion.div variants={itemVariants} className="relative">
            <div className="relative z-10 rounded-3xl sm:rounded-4xl overflow-hidden shadow-luxury-deep aspect-4/5 max-w-sm tb:max-w-md mx-auto">
              <img
                src={ownerImage}
                alt="Zen Tonez Owner"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <div className="space-y-4 sm:space-y-6">
            <motion.div
              variants={itemVariants}
              className="inline-block px-4 py-2 bg-[#B87333]/10 text-[#B87333] rounded-full text-xs font-bold uppercase tracking-widest border border-[#B87333]/20"
            >
              Our Journey
            </motion.div>

            <h2 className="text-hero text-on-surface leading-tight">
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                A Dream Built on <span className="text-[#B87333]">Passion</span>
                <br />
                Since 2025
              </motion.div>
            </h2>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-on-surface/80 font-sans leading-relaxed"
            >
              Founded in March 2025 by a seasoned makeup artist with over five
              years of expertise, Zen Tonez Beauty Salon was envisioned to bring
              refined luxury beauty within reach of every woman in Tamil Nadu,
              evolving seamlessly from a bespoke freelance journey into a
              full-service premium salon.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 py-2"
            >
              <div>
                <h4 className="text-lg sm:text-xl font-serif text-on-surface mb-2">
                  Our Vision
                </h4>
                <p className="text-sm text-on-surface/80 leading-relaxed font-medium">
                  To expand across Tamil Nadu as a trusted premium brand, making
                  luxury beauty services accessible to every woman.
                </p>
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-serif text-on-surface mb-2">
                  Our Mission
                </h4>
                <p className="text-sm text-on-surface/80 leading-relaxed font-medium">
                  Delivering high-quality service and personalized experiences,
                  while maintaining stringent hygiene standards and building our
                  own performance-driven product line.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link to="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-premium-gold px-8 py-3.5"
                >
                  Discover Our Services
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutStory;
