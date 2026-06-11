import { cloneElement } from "react";
import type { ReactElement, SVGProps } from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Clock } from "lucide-react";
import interiorImage from "../../assets/hairspawebpimages/hairspa3.webp";

const AboutValues: React.FC = () => {
  const values = [
    {
      icon: <Award size={32} strokeWidth={1.5} />,
      title: "Artisanal Mastery",
      desc: "Every service is a unique ritual, crafted with high-precision techniques and a deep understanding of bespoke aesthetics.",
    },
    {
      icon: <ShieldCheck size={32} strokeWidth={1.5} />,
      title: "Sanctuary Standards",
      desc: "We adhere to medical-grade hygiene and safety protocols to ensure your well-being in a pristine environment.",
    },
    {
      icon: <Clock size={32} strokeWidth={1.5} />,
      title: "Bespoke Curation",
      desc: "We dedicate time to curate a personalized journey that celebrates your natural radiance and individual essence.",
    },
  ];

  return (
    <section className="py-10 sm:py-16 relative overflow-hidden bg-background">
      {/* SVG Gradient Definition */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient
            id="gold-gradient-3d"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#BF953F" />
            <stop offset="25%" stopColor="#FCF6BA" />
            <stop offset="50%" stopColor="#B38728" />
            <stop offset="75%" stopColor="#FBF5B7" />
            <stop offset="100%" stopColor="#AA771C" />
          </linearGradient>
          <filter id="3d-depth">
            <feDropShadow
              dx="0.5"
              dy="0.5"
              stdDeviation="0.2"
              floodColor="#000"
              floodOpacity="0.5"
            />
            <feDropShadow
              dx="-0.5"
              dy="-0.5"
              stdDeviation="0.2"
              floodColor="#fff"
              floodOpacity="0.2"
            />
          </filter>
        </defs>
      </svg>

      <div className="container mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-[9px] sm:text-xs mb-4 block">
            Our Philosophy
          </span>
          <h2 className="text-hero text-on-surface mb-6">
            The Standards of <span className="text-primary">Excellence</span>
          </h2>
          <div className="w-24 h-1 bg-primary-container mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12 mb-12 sm:mb-20">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                rotateX: 5,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group p-8 sm:p-10 bg-surface-dim rounded-3xl sm:rounded-4xl border border-primary-container/20 text-center hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-surface-dim to-background rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-[inset_0_0_15px_rgba(0,0,0,0.1),5px_5px_15px_rgba(0,0,0,0.1)] border border-white/5 group-hover:border-primary/30 transition-all duration-500">
                <div
                  className="relative transform-gpu group-hover:scale-110 transition-transform duration-500"
                  style={{
                    filter:
                      "drop-shadow(0 4px 6px rgba(0,0,0,0.2)) drop-shadow(0 10px 15px rgba(191,149,63,0.15))",
                  }}
                >
                  {cloneElement(
                    value.icon as ReactElement,
                    {
                      stroke: "url(#gold-gradient-3d)",
                      className: "drop-shadow-[1px_1px_0px_rgba(0,0,0,0.2)]",
                      style: { filter: "url(#3d-depth)" },
                    } as SVGProps<SVGSVGElement>,
                  )}
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-on-surface mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-on-surface/80 font-sans leading-relaxed text-sm sm:text-base font-medium">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust section */}
        <div className="bg-surface-dim/30 rounded-4xl sm:rounded-5xl p-6 sm:p-12 md:p-16 border border-primary-container/20 shadow-sm relative overflow-hidden text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div className="space-y-8 sm:space-y-12">
              <div>
                <h4 className="text-2xl sm:text-3xl font-serif text-on-surface mb-4 sm:mb-6 underline decoration-primary-container underline-offset-8">
                  The Zen Tonez Core
                </h4>
                <p className="text-on-surface/80 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base font-serif font-medium">
                  "Excellence isn't an act; it's a habit born from consistent
                  quality, unwavering discipline, and a genuine passion for the
                  art of beauty."
                </p>
              </div>
              <div className="space-y-4 sm:space-y-6 text-xs sm:text-sm font-bold tracking-widest uppercase text-on-surface/60">
                {[
                  "Medical-Grade Sanctuary Hygiene",
                  "Internationally Certified Master Artisans",
                  "Premium Authorized Product Portfolio",
                  "Transparent & Ethical Aesthetic Curation",
                ].map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 sm:gap-4 group"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform duration-300 shrink-0" />
                    <span className="group-hover:text-primary transition-colors duration-300">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.03 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-10 p-2 bg-primary/10 rounded-4xl sm:rounded-5xl shadow-2xl border border-primary/20"
              >
                <img
                  src={interiorImage}
                  alt="Salon Hygiene"
                  className="rounded-3xl sm:rounded-5xl w-full aspect-video object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
