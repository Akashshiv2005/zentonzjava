import React, { useState, useEffect } from "react";
import { Crown, Sparkles, Wind, Gem, Leaf } from "lucide-react";



const InteractiveSelector: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [dynamicOptions, setDynamicOptions] = useState<any[]>([{
    title: "Zentonez Gallery",
    description: "Artisanal Beauty",
    image: "",
    icon: <Sparkles size={22} className="text-white" />
  }]);

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
      // Briefly pause auto-play when user interacts
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 10000);
    }
  };

  useEffect(() => {
    fetch('http://localhost:8081/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const galleryData = data.filter((img: any) => !img.is_magazine);
          const apiOptions = galleryData.map((img: any) => ({
            title: img.title || "Gallery Upload",
            description: img.description || "Uploaded Image",
            image: `http://localhost:8081/api/gallery/images/${img.file_name}`,
            icon: <Sparkles size={22} className="text-white" />,
            position: "contain"
          }));
          if (apiOptions.length > 0) {
            setDynamicOptions(apiOptions.slice(0, 7));
          }
        }
      })
      .catch(err => console.error("Error fetching gallery", err));
  }, []);

  useEffect(() => {
    const timers: number[] = [];

    dynamicOptions.forEach((_, i) => {
      const timer = window.setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [dynamicOptions]);

  // Auto-play interval logic
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % dynamicOptions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, dynamicOptions]);

  return (
    <div
      className="relative flex flex-col items-center justify-center py-20 bg-slate-950 font-sans text-white overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-container/20 blur-[120px] rounded-full" />
      </div>

      {/* Header Section */}
      <div className="w-full max-w-4xl px-6 mb-12 text-center z-10 flex flex-col items-center">
        <h3 className="text-primary font-mono text-sm uppercase tracking-[0.4em] mb-4 animate-fadeInTop">
          The Lookbook
        </h3>
        <h1 className="text-5xl md:text-7xl text-white mb-6 tracking-tight drop-shadow-lg animate-fadeInTop delay-300">
          Signature Chapters
        </h1>
        <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-10 animate-fadeInTop delay-600">
          A curated journey through the ethereal art of transformation. Each
          choice reveals a new facet of your bespoke beauty.
        </p>
        
        {/* New Interactive Hint */}
        <div className="hint-text animate-fadeInTop delay-800">
          <Sparkles size={14} className="text-primary" />
          <span>Select a chapter to expand</span>
          <Sparkles size={14} className="text-primary" />
        </div>
      </div>

      {/* Options Container */}
      <div className="options flex flex-row w-[95%] max-w-[1200px] h-[400px] mb:h-[450px] tb:h-[500px] dt:h-[600px] mx-auto items-stretch overflow-hidden relative z-10 rounded-2xl border border-white/10 shadow-2xl">
        {dynamicOptions.map((option, index) => (
          <div
            key={index}
            className={`
              option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out
              ${activeIndex === index ? "active" : ""}
            `}
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: "cover",
              backgroundPosition: option.position || "center",
              backfaceVisibility: "hidden",
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index)
                ? "translateX(0)"
                : "translateX(-60px)",
              margin: 0,
              cursor: "pointer",
              backgroundColor: "#020617", // slate-950
              flex: activeIndex === index ? "10 1 0%" : "1 1 0%",
              zIndex: activeIndex === index ? 10 : 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              position: "relative",
              willChange: "flex-grow, background-size",
              // Mobile specific overrides
              minWidth: activeIndex === index ? "70%" : "40px",
            }}
            onClick={() => handleOptionClick(index)}
          >
            {/* Dynamic Glass Overlay for Inactive States */}
            {activeIndex !== index && (
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] transition-opacity duration-500" />
            )}

            {/* Content Shadow */}
            <div
              className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent pointer-events-none transition-opacity duration-700"
              style={{
                opacity: activeIndex === index ? 1 : 0.3,
              }}
            ></div>

            {/* Label with icon and info */}
            <div
              className={`label absolute left-0 right-0 bottom-8 flex items-center justify-start h-16 z-2 pointer-events-none px-6 gap-4 w-full transition-all duration-500`}
            >
              <div
                className={`icon min-w-[50px] h-[50px] flex items-center justify-center rounded-full bg-[rgba(15,23,42,0.8)] backdrop-blur-md shadow-xl border border-white/20 shrink-0 transition-all duration-500 ${activeIndex === index ? "scale-110 border-primary/50" : "scale-90"}`}
              >
                {option.icon}
              </div>
              <div className="info text-white overflow-hidden">
                <div
                  className="main text-2xl md:text-3xl text-primary whitespace-nowrap transition-all duration-700 ease-in-out"
                  style={{
                    opacity: 1,
                    transform: "translateY(0)",
                  }}
                >
                  {option.title}
                </div>
                <div
                  className="sub text-sm md:text-base text-slate-300 font-medium whitespace-nowrap transition-all duration-700 ease-in-out"
                  style={{
                    opacity: 1,
                    transform: "translateY(0)",
                    transitionDelay: "0.1s",
                  }}
                >
                  {option.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global CSS for custom animations if tailwind config is not extended */}
      <style>{`
        @keyframes fadeInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInTop {
          opacity: 0;
          animation: fadeInFromTop 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }
        
        .delay-800 {
          animation-delay: 0.8s;
        }

        .option:hover .icon {
          border-color: rgba(var(--primary), 0.5);
          background: rgba(var(--primary), 0.1);
        }
      `}</style>
    </div>
  );
};

export default InteractiveSelector;
