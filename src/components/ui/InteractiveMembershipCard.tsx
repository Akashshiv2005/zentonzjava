import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Sparkles } from "lucide-react";

import zentonezLogo from "../../assets/zentonez-logo.png";

const compliments = [
  "You look stunning today! ✨",
  "Your beauty is unique and powerful. 💖",
  "Radiate confidence and grace. 🌟",
  "You deserve to be pampered. 💆‍♀️",
  "A little self-care goes a long way. 🌸",
  "Your smile is your best accessory. 😊",
  "True beauty starts from within. ❤️",
  "Be your own kind of beautiful. 🦋",
  "Your elegance is unmatched. 👑",
  "Shine bright like the diamond you are. 💎",
];

export const InteractiveMembershipCard: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [compliment, setCompliment] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const showCompliment = useCallback(() => {
    const randomCompliment =
      compliments[Math.floor(Math.random() * compliments.length)];
    setCompliment(randomCompliment);
    setTimeout(() => setCompliment(null), 3000);
  }, []);

  const [sparkles] = useState(() =>
    [...Array(6)].map((_, i) => ({
      id: i,
      x: Math.random() * 300,
      y: Math.random() * 200,
      duration: 1 + Math.random(),
      delay: Math.random() * 2,
      size: 12 + Math.random() * 8,
    })),
  );

  return (
    <div className="relative perspective-1000 w-full max-w-md mx-auto aspect-[1.6/1]">
      <motion.div
        className="w-full h-full relative cursor-pointer group"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePosition({ x: 0, y: 0 });
        }}
        onClick={showCompliment}
        animate={
          !isMobile
            ? {
                rotateX: mousePosition.y * 20,
                rotateY: mousePosition.x * -20,
              }
            : {}
        }
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Card Body */}
        <div className="absolute inset-0 rounded-[2.5rem] bg-linear-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#111111] border border-white/20 shadow-2xl overflow-hidden shadow-primary/20">
          {/* Premium Glow Overlay */}
          <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 h-full p-8 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <img
                  src={zentonezLogo}
                  alt="Zen Tonez Logo"
                  className="h-8 object-contain mb-1 filter brightness-0 invert"
                />
                <span className="text-[12px] font-black uppercase tracking-[0.3em] text-white">
                  Premium Membership
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-white backdrop-blur-md">
                <Crown size={24} className="fill-current" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 rounded-md bg-linear-to-br from-yellow-600 to-yellow-200 opacity-80" />
                <div className="text-white/40 font-mono text-sm tracking-widest">
                  **** **** **** 2024
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[8px] font-black uppercase tracking-widest text-white/50">
                    Card Holder
                  </p>
                  <p className="text-sm font-black uppercase tracking-widest text-white">
                    Zen Tonez Member
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-black uppercase tracking-widest text-white/50">
                    Expires
                  </p>
                  <p className="text-sm font-black text-white">12/25</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Sparkles on Hover */}
          <AnimatePresence>
            {isHovered && !isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none"
              >
                {sparkles.map((s) => (
                  <motion.div
                    key={s.id}
                    className="absolute text-primary"
                    initial={{
                      x: s.x,
                      y: s.y,
                      scale: 0,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      y: [null, "-20px"],
                    }}
                    transition={{
                      duration: s.duration,
                      repeat: Infinity,
                      delay: s.delay,
                    }}
                  >
                    <Sparkles size={s.size} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Compliment Tooltip/Message */}
        <AnimatePresence>
          {compliment && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: -40, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2, transition: { duration: 0.2 } }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-slate-900 px-6 py-3 rounded-full font-black text-sm shadow-2xl border border-primary/20 z-50 pointer-events-none"
            >
              {compliment}
              <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-primary/10" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Helper text */}
      <motion.p
        animate={{ opacity: isHovered ? 0.6 : 0.3 }}
        className="text-center mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-white"
      >
        Click the card for a little surprise ✨
      </motion.p>
    </div>
  );
};
