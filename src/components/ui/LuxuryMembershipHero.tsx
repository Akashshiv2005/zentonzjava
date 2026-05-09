import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface LuxuryMembershipHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export const LuxuryMembershipHero: React.FC<LuxuryMembershipHeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Parallax Tilt Effects
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Map mouse position to rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden bg-[#FDFCF0]">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#B87333]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#B87333]/10 rounded-full blur-[150px]" />

        {/* Subtle Texture/Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B87333' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-[#B87333]/20 text-[#B87333] mb-8"
            >
              <Sparkles size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Zen Elite Program
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-8xl font-black text-[#1A1A1A] leading-[0.85] uppercase tracking-tighter font-serif mb-6"
            >
              {title.split(" ").map((word, i) => (
                <span key={i} className={i === 1 ? "text-[#B87333]" : ""}>
                  {word} {i === 0 && <br />}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-[#4A4A4A] font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed mb-4"
            >
              {subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs font-black uppercase tracking-[0.5em] text-[#B87333] mb-12"
            >
              — Zen Tonez Women Salon —
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
            >
              <a
                href={ctaLink}
                className="group relative inline-flex items-center justify-center px-10 py-5 bg-[#1A1A1A] text-white overflow-hidden rounded-full font-black tracking-widest text-xs transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">{ctaText}</span>
                <div className="absolute inset-0 bg-[#B87333] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </a>

              <div className="flex items-center gap-3 group cursor-pointer">
                <span className="text-sm font-black uppercase tracking-widest text-[#B87333]">
                  Learn Benefits
                </span>
                <div className="w-10 h-10 rounded-full border border-[#B87333]/30 flex items-center justify-center group-hover:bg-[#B87333] group-hover:text-white transition-all duration-300">
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - High-Performance Interactive Card */}
          <div className="flex-1 w-full max-w-[600px] perspective-[1000px]">
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative group cursor-pointer"
            >
              {/* Dynamic Shadow that shifts with mouse */}
              <motion.div
                className="absolute inset-0 bg-black/40 blur-3xl rounded-3xl -z-10"
                style={{
                  x: useTransform(mouseXSpring, [-0.5, 0.5], [25, -25]),
                  y: useTransform(mouseYSpring, [-0.5, 0.5], [25, -25]),
                  opacity: isHovered ? 0.6 : 0.3,
                  scale: 0.9,
                }}
              />

              {/* High-End Shine/Glare Overlay */}
              <motion.div
                className="absolute inset-0 z-20 pointer-events-none rounded-3xl overflow-hidden"
                style={{
                  background: useTransform(
                    mouseXSpring,
                    [-0.5, 0.5],
                    [
                      "linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.2) 40%, transparent 60%)",
                      "linear-gradient(110deg, transparent 40%, rgba(255, 255, 255, 0.2) 60%, transparent 80%)",
                    ],
                  ),
                  opacity: isHovered ? 1 : 0,
                }}
              />

              <img
                src="/src/assets/membershipcard.png"
                alt="Zen Tonez Premium Membership Card"
                className="w-full h-auto rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[#B87333]/20 relative z-10"
              />

              {/* Premium Outer Glow */}
              <div className="absolute -inset-4 bg-[#B87333]/15 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-20" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
