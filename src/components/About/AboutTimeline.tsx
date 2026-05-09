import React, { useEffect } from "react";
import { Users, Package, BookOpen, Handshake } from "lucide-react";
import "./AboutTimeline.css";

const TIMELINE_DATA = [
  {
    year: "2020",
    title: "Freelance Journey",
    desc: "Started as a passionate freelance makeup artist, building a foundation of expertise.",
    icon: <Users size={22} />,
  },
  {
    year: "2022",
    title: "Lifestyle Influencer",
    desc: "Gained recognition as a lifestyle and beauty influencer, sharing trends and techniques with a wider audience.",
    icon: <BookOpen size={22} />,
  },
  {
    year: "2025",
    title: "Salon Founded",
    desc: "Zen Tonez Beauty Salon opens its doors in March 2025, bringing luxury beauty to life.",
    icon: <Package size={22} />,
  },
  {
    year: "Future",
    title: "Tamil Nadu Expansion",
    desc: "Aiming to become the most trusted premium beauty brand across the entire state.",
    icon: <Handshake size={22} />,
  },
];

const AboutTimeline: React.FC = () => {
  useEffect(() => {
    const items = document.querySelectorAll(".about-timeline li");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.isIntersecting
            ? e.target.classList.add("in-view")
            : e.target.classList.remove("in-view"),
        ),
      { threshold: 0.4 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="timeline-section py-10 sm:py-16 about-timeline">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-primary font-bold uppercase tracking-[0.4em] text-[9px] sm:text-[10px] mb-4 sm:mb-6 block">
            Experience the difference today
          </span>
          <h2 className="text-hero text-on-surface">
            Why We <br className="md:hidden" />
            <span className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-primary underline decoration-primary-container underline-offset-12 block md:inline-block md:mt-4">
              Stand Out ?
            </span>
          </h2>
        </div>
        <ul className="relative">
          {TIMELINE_DATA.map((item, index) => (
            <li key={index}>
              <div className="item-card">
                <time>{item.year}</time>
                <div className="discovery item-content">
                  <h1>{item.title}</h1>
                  <div className="text-primary mb-2">{item.icon}</div>
                </div>
                <div className="scientist item-content">
                  <h1>Benefit</h1>
                  <span>{item.desc}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutTimeline;
