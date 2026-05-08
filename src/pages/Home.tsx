import { CommunityStatsSection } from "../components/home/CommunityStatsSection";
import { HeroSection } from "../components/home/HeroSection";
import { ParallaxServicesSection } from "../components/home/ParallaxServicesSection";
import { PromoQuoteSection } from "../components/home/PromoQuoteSection";
import { ServicesSection } from "../components/home/ServicesSection";
import { PricingSection } from "../components/home/PricingSection";
import MembershipSection from "../components/home/MembershipSection";
import { SocialSidebar } from "../components/ui/SocialSidebar";
import { Reveal } from "../components/ui/Reveal";


function Home() {
  return (
    <div className="overflow-x-hidden bg-background text-on-surface font-sans selection:bg-primary-container selection:text-on-primary-container relative">
      
      <HeroSection />
      
      <Reveal width="100%" direction="up" distance={100}>
        <ServicesSection />
      </Reveal>
      
      <Reveal width="100%" direction="up">
        <CommunityStatsSection />
      </Reveal>
      
      <Reveal width="100%" direction="up">
        <PricingSection />
      </Reveal>
      
      <Reveal width="100%" direction="up">
        <MembershipSection />
      </Reveal>
      
      <ParallaxServicesSection />
      
      <Reveal width="100%" direction="up">
        <PromoQuoteSection />
      </Reveal>
      
      <SocialSidebar />
    </div>
  );
}

export default Home;
