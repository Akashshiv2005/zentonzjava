import React, { useEffect, useRef, useState } from "react";
import { DotLottie } from "@lottiefiles/dotlottie-web";
import { cn } from "../../lib/utils";

interface SparkleHeadingProps {
  text: string;
  className?: string;
  sparkleScale?: number;
}

const SPARKLE_URL = "https://lottie.host/aa8461b8-0395-40aa-9916-3aa8737d127d/wgZlYJ42zU.lottie";

export const SparkleHeading: React.FC<SparkleHeadingProps> = ({ text, className, sparkleScale = 1 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const playerRef    = useRef<any | null>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  const [isPulsing, setIsPulsing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [isExemptPage, setIsExemptPage] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      setIsMobile(window.innerWidth < 768);
      const path = window.location.pathname;
      setIsExemptPage(path.includes("/services") || path.includes("/gallery"));
    };
    checkStatus();
    window.addEventListener("resize", checkStatus);
    return () => window.removeEventListener("resize", checkStatus);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || isMobile || !isExemptPage) return;

    // Initialize DotLottie from the ESM URL
    playerRef.current = new DotLottie({
      canvas: canvasRef.current,
      src: SPARKLE_URL,
      loop: true,
      autoplay: false,
      backgroundColor: "transparent",
      renderConfig: {
        devicePixelRatio: Math.min(1.5, window.devicePixelRatio || 1),
      },
    });

    return () => {
      playerRef.current?.destroy();
    };
  }, [isMobile, isExemptPage]);

  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // ─── Auto-Pulse Heartbeat ───
  useEffect(() => {
    if (!isInView || isMobile || !isExemptPage) {
      playerRef.current?.pause();
      return;
    }

    const pulseHero = () => {
      if (isHovered) return; // Don't interrupt manual interaction

      setIsPulsing(true);
      playerRef.current?.play();

      setTimeout(() => {
        setIsPulsing(false);
        // Only pause if we're not hovered by now
        if (!isHovered) playerRef.current?.pause();
      }, 1000); // 1.0s pulse duration (optimized)
    };

    const interval = setInterval(pulseHero, 12000); // 12 seconds (Aggressive Optimization)
    
    // Initial pulse after 2s for immediate impact
    const initialDelay = setTimeout(pulseHero, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialDelay);
    };
  }, [isHovered, isInView, isMobile, isExemptPage]);

  useEffect(() => {
    if (!containerRef.current || isMobile) return;
    const parentGroup = containerRef.current.closest(".sparkle-group");
    if (!parentGroup) return;

    const handleGroupEnter = () => {
      setIsHovered(true);
      setIsPulsing(false);
      playerRef.current?.play();
    };

    const handleGroupLeave = () => {
      setIsHovered(false);
      playerRef.current?.pause();
    };

    parentGroup.addEventListener("mouseenter", handleGroupEnter);
    parentGroup.addEventListener("mouseleave", handleGroupLeave);

    return () => {
      parentGroup.removeEventListener("mouseenter", handleGroupEnter);
      parentGroup.removeEventListener("mouseleave", handleGroupLeave);
    };
  }, [isMobile]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsPulsing(false); // Stop auto-pulse
    playerRef.current?.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    playerRef.current?.pause();
  };

  // Split text into characters, handling spaces
  const words = text.split(" ");
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "spark-text-container group select-none", 
        (isPulsing && !isMobile) && "spark-force-animate",
        className
      )}
      onMouseEnter={!isMobile ? handleMouseEnter : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
    >
      {/* Lottie Canvas Wrapper */}
      <div 
        className="spark-canvas-wrapper"
        style={{ transform: `translate(-50%, -50%) scale(${sparkleScale})` }}
      >
        <canvas 
          ref={canvasRef} 
          className="spark-canvas" 
          width={600} 
          height={600} 
        />
      </div>

      {/* Characters */}
      <div className="relative inline-flex flex-wrap justify-center lg:justify-start gap-x-[0.05em] leading-[0.9] max-w-full">
        {words.map((word, wordIdx) => (
          <span key={wordIdx} className="inline-flex flex-wrap whitespace-normal wrap-break-word mr-[0.3em] last:mr-0">
            {word.split("").map((char, charIdx) => (
              <span 
                key={charIdx} 
                className="ch will-change-transform"
                style={{ 
                  transitionDelay: `${(wordIdx * 5 + charIdx) * 0.03}s` 
                }}
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
};
