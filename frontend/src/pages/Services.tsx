import { useEffect } from "react";
import type { FC } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServicesHero from "../components/Services/ServicesHero";
import ServicesShowcase from "../components/Services/ServicesShowcase";
import BridalOffer from "../components/Services/BridalOffer";
import ServicesCTA from "../components/Services/ServicesCTA";
import { SocialSidebar } from "../components/ui/SocialSidebar";
import { Reveal } from "../components/ui/Reveal";

import { useSEO } from "../lib/useSEO";

const Services: FC = () => {
  useSEO({
    title: "Premium Beauty Services & Rituals",
    description: "Explore our full range of salon treatments at Zen Tonez: glow facials, specialized hair spa, luxury manicure/pedicures, acrylic nail art, and custom bridal makeup packages.",
    keywords: "hair spa Trichy, acrylic nails, glow facial, salon rituals, bridal makeup package"
  });
  const location = useLocation();

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const serviceKey = hash.replace("#", "");
      // Short delay to ensure elements are fully rendered and layout shifts are resolved
      setTimeout(() => {
        const elements = document.querySelectorAll(`[data-service="${serviceKey}"]`);
        let targetElement: HTMLElement | null = null;
        
        // Find the element that is actually visible in the DOM
        elements.forEach((el) => {
          if (el instanceof HTMLElement && el.offsetParent !== null) {
            targetElement = el;
          }
        });

        // Fallback to absolute query selector if offsetParent check yields nothing
        if (!targetElement) {
          targetElement = document.querySelector(hash);
        }

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    }
  }, [location.hash, location.pathname]);

  return (
    <div className="flex flex-col overflow-x-hidden bg-background text-on-surface font-sans selection:bg-primary-container transition-colors duration-1000 relative">
      
      <ServicesHero />
      
      <Reveal width="100%" direction="up" distance={100}>
        <ServicesShowcase />
      </Reveal>
      
      <Reveal width="100%" direction="up">
        <BridalOffer />
      </Reveal>
      
      <Reveal width="100%" direction="up">
        <ServicesCTA />
      </Reveal>
      
      <SocialSidebar />
    </div>
  );
};

export default Services;
