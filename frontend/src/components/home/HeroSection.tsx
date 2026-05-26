import { useEffect, useState, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import heroImage from "../../assets/hairwebp images/haircolor.webp";
import bridalImage from "../../assets/hairwebp images/butterfly cut.webp";
import hairImage from "../../assets/hairwebp images/shorthaircut.webp";
import skinImage from "../../assets/facialwebpimages/facial2.webp";
import spaImage from "../../assets/hairspawebpimages/hairspa1.webp";
import makeupImage from "../../assets/facialwebpimages/facial3.webp";
import nailImage from "../../assets/nailwebpimages/nail3.webp";
import liceImage from "../../assets/licewebpimages/lice4.webp";
import pedicureImage from "../../assets/pedicurewebpimages/manicure2.webp";
import interiorImage from "../../assets/hairspawebpimages/hairspa3.webp";

import { SparkleHeading } from "../ui/SparkleHeading";

const carouselImages = [
  heroImage,
  bridalImage,
  hairImage,
  skinImage,
  spaImage,
  makeupImage,
  nailImage,
  liceImage,
  pedicureImage,
  interiorImage,
];

const TextReveal = ({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const words = text.split(" ");

  return (
    <div className={`overflow-hidden flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.1,
            ease: [0.33, 1, 0.68, 1],
          }}
          className="inline-block mr-[0.2em]"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const rotate = useTransform(scrollY, [0, 500], [0, 3]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (previousIndex) => (previousIndex + 1) % carouselImages.length,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Mouse parallax for the image container
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 1024) return; // Disable on tablet/mobile
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  const springX = useSpring(mousePos.x, { stiffness: 100, damping: 30 });
  const springY = useSpring(mousePos.y, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 opacity-60 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(217,195,165,0.2),transparent_70%)] rounded-full blur-2xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(201,162,74,0.1),transparent_70%)] rounded-full blur-2xl" />
      </motion.div>

      <motion.div
        animate={!isMobile ? { y: [0, -20, 0], rotate: [0, 15, 0] } : {}}
        transition={
          !isMobile
            ? {
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }
            : {}
        }
        className="absolute top-32 tb:top-44 left-[5%] tb:left-[10%] text-primary opacity-30 hidden mb:block"
      >
        <Sparkles size={36} className="tb:hidden" />
        <Sparkles size={48} className="hidden tb:block" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 tb:px-6 dt:px-8 w-full grid grid-cols-1 dt:grid-cols-2 gap-8 dt:gap-12 items-center pt-32 pb-8 tb:pt-40 tb:pb-12 dt:pt-32 dt:pb-8 min-h-screen">
        {/* Left Column: Text */}
        <motion.div
          style={{ y: !isMobile ? y1 : 0 }}
          className="text-center dt:text-left pt-12 dt:pt-0"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="font-sans text-[10px] uppercase tracking-[0.3em] text-primary mb-4 block font-medium"
          >
            Zen Tonez - Exclusive Women's Salon
          </motion.span>

          <div className="relative">
            <h1 className="text-display text-on-surface mb-4 tb:mb-6 mt-2 normal-case relative z-10 font-bold sparkle-group">
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                >
                  <SparkleHeading
                    text="Where Beauty"
                    className="text-black hover:text-[#ff8531] transition-colors duration-300"
                  />
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                >
                  <SparkleHeading
                    text="Meets Luxury"
                    className="text-black hover:text-[#ff8531] transition-colors duration-300"
                    sparkleScale={1.8}
                  />
                </motion.div>
              </div>
            </h1>
          </div>

          <TextReveal
            delay={0.3}
            text="Experience premium skincare, bridal styling, and professional hair care — crafted exclusively for you, right here in Tamil Nadu."
            className="text-sm mb:text-base tb:text-lg dt:text-xl text-on-surface/80 font-medium leading-relaxed max-w-xl mx-auto dt:mx-0 mb-8 tb:mb-10 px-4 mb:px-0"
          />

          <motion.div
            className="flex flex-col mb:flex-row items-center gap-4 mb:gap-6 justify-center dt:justify-start px-4 mb:px-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link to="/book" className="w-full mb:w-auto">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(217,195,165,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="btn-premium-gold w-full mb:w-auto px-6 py-3 mb:px-10 mb:py-4 text-[10px] mb:text-xs shadow-luxury-soft"
              >
                CHECK AVAILABILITY →
              </motion.button>
            </Link>

            <Link to="/services" className="w-full mb:w-auto">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(217,195,165,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="btn-premium-outline w-full mb:w-auto px-6 py-3 mb:px-10 mb:py-4 border-primary/30 text-primary text-[10px] mb:text-xs"
              >
                Explore Our Services
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Column: Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            y: !isMobile ? y2 : 0,
            rotate: !isMobile ? rotate : 0,
            perspective: 1000,
            x: !isMobile ? springX : 0,
            rotateY: !isMobile ? springX : 0,
            rotateX: !isMobile ? springY : 0,
          }}
          className="relative flex justify-center w-full"
        >
          <div className="relative z-10 w-full aspect-square max-w-[280px] mb:max-w-sm tb:max-w-md dt:max-w-lg mx-auto rounded-3xl tb:rounded-4xl overflow-hidden shadow-luxury-deep border-4 border-white bg-surface">
            <AnimatePresence initial={false} mode="wait">
              <motion.img
                key={currentImageIndex}
                src={carouselImages[currentImageIndex]}
                alt={`Salon Hero ${currentImageIndex}`}
                fetchPriority="high"
                initial={{ opacity: 0, scale: 1.2, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 w-full h-full object-cover rounded-2xl tb:rounded-3xl"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent pointer-events-none z-10" />

            {/* Glossy overlay */}
            {!isMobile && (
              <motion.div
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] z-20 pointer-events-none"
              />
            )}
          </div>

          {/* Floating elements around the image */}
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 w-20 h-20 bg-primary/10 backdrop-blur-xl rounded-full border border-primary/20 z-0 hidden tb:block"
          />
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-container/10 backdrop-blur-xl rounded-full border border-primary/20 z-0 hidden tb:block"
          />
        </motion.div>
      </div>
    </section>
  );
}
