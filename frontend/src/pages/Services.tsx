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
    title: "Best Hair, Skin & Nail Services in Trichy",
    description: "Explore the best salon services in Trichy at Zen Tonez. Professional hair spa, glow facials, luxury pedicure, manicures, custom nail art, and bridal makeup package rates.",
    keywords: "best salon services trichy, top hair spa in trichy, best nail art in trichy, bridal packages trichy, salon price list"
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
      let serviceKey = hash.replace("#", "");
      // Map 'lice-removal' hash to 'lice-treatment' to match the database service title
      if (serviceKey === "lice-removal") {
        serviceKey = "lice-treatment";
      }
      
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
          // If we mapped to lice-treatment but need to fallback, try both
          targetElement = document.querySelector(`#mobile-${serviceKey}`) || 
                          document.querySelector(`#desktop-${serviceKey}`) ||
                          document.querySelector(hash);
        }

        if (targetElement) {
          const lenis = (window as any).lenisInstance;
          if (lenis) {
            lenis.scrollTo(targetElement, { offset: -80, duration: 1.5 });
          } else {
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }, 600);
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
