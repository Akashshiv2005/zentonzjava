import React, { useState, useEffect } from "react";
import AboutHero from "../components/About/AboutHero";
import AboutStory from "../components/About/AboutStory";
import AboutServicesGrid from "../components/About/AboutServicesGrid";
import AboutTimeline from "../components/About/AboutTimeline";
import AboutValues from "../components/About/AboutValues";
import AboutTeam from "../components/About/AboutTeam";

import AboutCTA from "../components/About/AboutCTA";
import { SocialSidebar } from "../components/ui/SocialSidebar";
import { Reveal } from "../components/ui/Reveal";

import { useSEO } from "../lib/useSEO";

const About: React.FC = () => {
  useSEO({
    title: "Best Makeup Artists & Hair Stylists in Trichy",
    description: "Learn about Zen Tonez, the best beauty parlour & luxury salon in Thillai Nagar, Trichy. Read our story, meet our expert team of professional makeup artists and stylists.",
    keywords: "best makeup artist in trichy, top beauty stylists trichy, zentonez story, hair experts trichy"
  });
  // Defer rendering of heavy below-the-fold components to prevent main-thread blocking lag
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50); // Small delay to let the browser paint the Hero section first
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-x-hidden bg-background text-on-surface font-sans selection:bg-primary-container selection:text-on-primary-container relative">
      
      <AboutHero />
      
      {isMounted && (
        <>
          <Reveal width="100%" direction="up" distance={80}>
            <AboutStory />
          </Reveal>
          
          <Reveal width="100%" direction="up">
            <AboutServicesGrid />
          </Reveal>
          
          <Reveal width="100%" direction="up">
            <AboutTimeline />
          </Reveal>
          
          <Reveal width="100%" direction="up">
            <AboutValues />
          </Reveal>
          
          <Reveal width="100%" direction="up">
            <AboutTeam />
          </Reveal>
          

          <Reveal width="100%" direction="up">
            <AboutCTA />
          </Reveal>
          
          <SocialSidebar />
        </>
      )}
    </div>
  );
};

export default About;
