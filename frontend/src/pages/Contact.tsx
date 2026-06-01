import React, { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactHero from "../components/Contact/ContactHero";
import ContactForm from "../components/Contact/ContactForm";
import ContactMap from "../components/Contact/ContactMap";
import { FloatingSocialMenu } from "../components/ui/FloatingSocialMenu";
import { Reveal } from "../components/ui/Reveal";

const Contact: React.FC = () => {
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="overflow-x-hidden bg-background text-on-surface font-sans selection:bg-primary-container relative min-h-screen">
      
      <ContactHero />

      {/* ─── CONTENT ─── */}
      <Reveal width="100%" direction="up" distance={50}>
        <section className="py-4 tb:py-12 px-4 tb:px-6 dt:px-8">
          <div className="max-w-4xl mx-auto">
            <ContactForm />
          </div>
        </section>
      </Reveal>

      <Reveal width="100%" direction="up">
        <ContactMap />
      </Reveal>
      
      <FloatingSocialMenu />
    </div>
  );
};

export default Contact;
