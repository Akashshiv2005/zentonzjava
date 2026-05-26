import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SparkleHeading } from "../ui/SparkleHeading";
import ThreeDClock from "./ThreeDClock";

const ContactHero: React.FC = () => {
  return (
    <section className="relative pt-24 tb:pt-36 pb-10 tb:pb-16 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 tb:px-6 dt:px-8 relative z-10">
        <div className="grid grid-cols-1 dt:grid-cols-2 gap-12 dt:gap-20 items-center">
          {/* Left Column: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center dt:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-primary border border-secondary/30 shadow-sm mb-6 tb:mb-10">
              <Sparkles size={14} />
              <span className="font-bold uppercase tracking-widest text-[9px] tb:text-[10px]">
                Connect With The Atelier
              </span>
            </div>
            <h1 className="text-display text-on-surface mb-6 tb:mb-10 normal-case leading-[0.95] sparkle-group">
              <SparkleHeading text="Begin Your" className="text-on-surface" />
              <br />
              <SparkleHeading
                text="Transformation"
                className="text-primary"
                sparkleScale={1.2}
              />
            </h1>
            <p className="text-base tb:text-lg dt:text-xl text-on-surface/90 leading-relaxed max-w-xl tb:max-w-2xl mx-auto dt:mx-0 font-medium px-4 mb:px-0">
              "Reach out to reserve your personalized ritual or to discover more
              about our high-performance beauty philosophy."
            </p>
          </motion.div>

          {/* Right Column: Floating 3D Clock */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center min-h-[300px] tb:min-h-[400px]"
          >
            <ThreeDClock />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
