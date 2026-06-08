import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SparkleHeading } from "../ui/SparkleHeading";
import BookGallery from "../ui/BookGallery";
import "./Gallery.css";

gsap.registerPlugin(ScrollTrigger);

const GalleryBookHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    
    const mm = gsap.matchMedia();
    const bookHero = heroRef.current;

    if (!bookHero) return;

    const bookScaleContainer = bookHero.querySelector(".galeria-book-3d");
    const pages = gsap.utils.toArray<HTMLElement>(".book-page", bookHero);

    if (bookScaleContainer && pages.length > 0) {
      mm.add(
        {
          isMobile: "(max-width: 640px)",
          isTablet: "(min-width: 641px) and (max-width: 1023px)",
          isDesktop: "(min-width: 1024px)",
        },
        (context) => {
          const { isMobile, isTablet } = context.conditions as {
            isMobile: boolean;
            isTablet: boolean;
          };

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: bookHero,
              start: "top top",
              end: isMobile ? `+=${pages.length * 100}%` : `+=${pages.length * 80}%`,
              scrub: 1,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
            },
          });

          // Fine-tuned "Magic Number" for perfect centering: 60% shift
          // This ensures the open spread has equal gaps on both sides
          const shiftPercent = 60;

          // Initial reset for stability - starts hidden at the bottom
          gsap.set(bookScaleContainer, { x: 0, xPercent: 0, y: isMobile ? 400 : 800, scale: isMobile ? 0.6 : 0.4, opacity: 0 });

          // Fade out hero text, scroll guide and dark overlay at the start
          tl.to(
            [
              bookHero.querySelector(".book-text-overlay"),
              bookHero.querySelector(".mobile-hero-overlay"),
              bookHero.querySelector(".scroll-guide"),
            ],
            {
              opacity: 0,
              y: -50,
              duration: 1.5,
              ease: "power2.inOut",
              stagger: 0.1, // Slightly staggered for a nicer feel
            },
            0,
          );

          // Step 1: Fly up, fade in, expand & shift
          tl.to(
            bookScaleContainer,
            {
              y: 0,
              opacity: 1,
              xPercent: shiftPercent,
              scale: isMobile ? 1.2 : 1.3,
              duration: 2,
              ease: "power2.inOut",
              force3D: true,
            },
            0.3, // Start as soon as text starts fading
          ).addLabel("expandEnd");

          // Step 2: Open Book (Starts strictly after expandEnd on mobile)
          pages.forEach((page, i) => {
            // Set initial 3D properties
            gsap.set(page, { rotationY: 0, transformPerspective: 1200 });

            // Force the first page flip to align with the expansion logic more tightly
            const position = i === 0 ? "expandEnd-=0.5" : "-=0.2";

            tl.to(
              page,
              {
                rotationY: -180,
                duration: 1.5,
                ease: "power1.inOut",
                onStart: () => {
                  gsap.set(page, { zIndex: 20 + i });
                },
                onReverseComplete: () => {
                  gsap.set(page, { zIndex: 10 - i });
                },
              },
              position,
            );
          });

          tl.to({}, { duration: 1 });
        },
      );
    }

      // Refresh ScrollTrigger once images start loading and on resize
      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener('resize', handleResize);

      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1000);

      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(timer);
        mm.revert();
      };
  }, [isLoaded]);

  return (
    <section
      ref={heroRef}
      className="snap-section book-hero-section min-h-svh! relative overflow-hidden"
    >
      {/* Mobile-only dark overlay for better text legibility - added pointer-events-none to prevent scroll blocking */}
      <div className="absolute inset-0 bg-slate-900/60 z-15 sm:hidden pointer-events-none mobile-hero-overlay" />

      <div className="absolute inset-0 flex flex-col items-center justify-center tb:justify-start pt-12 tb:pt-32 px-4 text-center z-20 pointer-events-none book-text-overlay">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="glow-text pointer-events-auto"
        >
          <h1 className="text-display text-white sm:text-slate-900 mb-4 tb:mb-6 normal-case glow-text mt-8 tb:mt-12 sparkle-group">
            <SparkleHeading text="The Artisanal" className="text-white sm:text-slate-900" />
            <br className="dt:block hidden" />
            <SparkleHeading
              text="Chapters"
              className="text-primary"
              sparkleScale={1.3}
            />
          </h1>
          <p className="text-base tb:text-xl dt:text-2xl text-white/90 sm:text-slate-600/80 leading-relaxed max-w-2xl mx-auto px-4 mb:px-0 font-medium sm:font-normal">
            "A curated journey through the ethereal art of transformation. Each
            chapter reveals a new facet of bespoke beauty and soul."
          </p>
        </motion.div>
      </div>

      {/* Interactive Scroll Guide */}
      <div className="scroll-guide flex flex-col items-center">
        <div className="mouse-icon" />
        <span className="scroll-text">Scroll to Flip Chapters</span>
      </div>
      <div className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <BookGallery onLoaded={() => setIsLoaded(true)} />
      </div>
    </section>
  );
};

export default GalleryBookHero;
