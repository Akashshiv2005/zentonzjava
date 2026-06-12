import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, Star } from "lucide-react";
import { Lightbox } from "../ui/Lightbox";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import skinCare from "../../assets/facialwebpimages/facial1.webp";
import facialTreatment from "../../assets/facialwebpimages/facial2.webp";
import maniPedi from "../../assets/pedicurewebpimages/manicure1.webp";
import hairSpa from "../../assets/hairspawebpimages/hairspa3.webp";
import bridalMakeup from "../../assets/bridalwebpimages/bridal1.webp";
import nails from "../../assets/nailwebpimages/nail.jpeg";
import liceRemoval from "../../assets/licewebpimages/lice4.webp";
import hairStyle from "../../assets/hairwebp images/curlyhairstyle.webp";
import wartRemoval from "../../assets/wartremovalwebpimages/wartdarkimg1.webp";
import earPiercing from "../../assets/earpiercingimages/earpiercing.webp";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: number;
  title: string;
  category: string;
  description: string;
  price: string;
  duration: string;
  review: string;
  clientName: string;
  highlights: string[];
  image: string;
  icon: React.ReactNode;
  color: string;
  promo?: {
    title: string;
    subtitle: string;
  };
  objectPosition?: string;
}

const fallbackServices: Service[] = [
  {
    id: 1,
    title: "Skin Care",
    category: "Skin Wellness",
    description:
      "Maintain radiant and healthy skin with our personalized skincare solutions.",
    price: "₹400+",
    duration: "45 - 60 Mins",
    review:
      "The facial was divine! My skin has never felt so hydrated and glowing. Truly a premium experience.",
    clientName: "Deepika S.",
    highlights: ["Deep Cleansing", "Hydrating Mask", "Facial Massage"],
    image: skinCare,
    color: "#FB7185",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="currentColor"
          fillOpacity="0.9"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Facial Treatment",
    category: "Advanced Therapy",
    description:
      "Refresh and rejuvenate your skin with our advanced facial therapies.",
    price: "₹1,150+",
    duration: "60 - 90 Mins",
    review:
      "Results were visible after just one session. The therapist was so professional and knowledgeable.",
    clientName: "Ananya K.",
    highlights: ["Vitamin C Infusion", "Anti-aging"],
    image: facialTreatment,
    color: "#38BDF8",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.9" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Manicure & Pedicure",
    category: "Nail Care",
    description: "Pamper your hands and feet with our relaxing therapies.",
    price: "₹599+",
    duration: "60 - 75 Mins",
    review:
      "The best mani-pedi in town! The attention to detail and the relaxing atmosphere are unbeatable.",
    clientName: "Meera V.",
    highlights: ["Sea Salt Scrub", "Paraffin Wax", "Gel Polish"],
    image: maniPedi,
    color: "#FB923C",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 11c-1.1 0-2 .9-2 2v3c0 1.1-.9 2-2 2s-2-.9-2-2v-3c0-1.1-.9-2-2-2s-2 .9-2 2v3c0 3.3 2.7 6 6 6s6-2.7 6-6v-3c0-1.1-.9-2-2-2z"
          fill="currentColor"
          fillOpacity="0.9"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Hair Care",
    category: "Hair Health",
    description:
      "Revitalize your hair with nourishing spa treatments designed to repair damage.",
    price: "₹899+",
    duration: "45 - 60 Mins",
    review:
      "My hair feels like silk! The treatment really addressed my dryness and frizz issues.",
    clientName: "Sneha P.",
    highlights: ["Steam Treatment", "Nourishing Mask", "Scalp Massage"],
    image: hairSpa,
    color: "#0EA5E9",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
          fill="currentColor"
          fillOpacity="0.9"
        />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Bridal Makeup",
    category: "Luxury Bridal",
    description:
      "Look stunning on your special day with our professional bridal makeup services.",
    price: "₹15,000+",
    duration: "180 - 240 Mins",
    review:
      "The best bridal care in Tamil Nadu. My look was absolutely radiant and stayed perfect all day.",
    clientName: "Priya R.",
    highlights: ["HD Makeup", "Hairstyling", "Saree Draping"],
    image: bridalMakeup,
    objectPosition: "top",
    color: "#D97706",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5Z"
          fill="currentColor"
          fillOpacity="0.9"
        />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Nails",
    category: "Nail Artistry",
    description:
      "Exquisite nail art and extensions to express your unique style.",
    price: "₹1,500+",
    duration: "60 - 90 Mins",
    review:
      "Incredible nail art! They perfectly captured the design I wanted. So many compliments!",
    clientName: "Varsha M.",
    highlights: ["Extensions", "Hand-painted Art", "3D Accents"],
    image: nails,
    color: "#8B5CF6",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C7 2 3 6 3 11v8c0 1.7 1.3 3 3 3h12c1.7 0 3-1.3 3-3v-8c0-5-4-9-9-9z"
          fill="currentColor"
          fillOpacity="0.9"
        />
      </svg>
    ),
  },
  {
    id: 7,
    title: "Lice Removal",
    category: "Scalp Care",
    description:
      "Gentle and effective treatments to ensure a healthy, lice-free scalp.",
    price: "₹5,000+",
    duration: "45 - 60 Mins",
    review:
      "Very professional and discreet. The treatment was effective and painless. Highly recommend for kids.",
    clientName: "Lakshmi T.",
    highlights: ["Natural Treatment", "Discreet Service", "Scalp Health"],
    image: liceRemoval,
    color: "#10B981",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
          fill="currentColor"
          fillOpacity="0.9"
        />
      </svg>
    ),
  },
  {
    id: 8,
    title: "Hair Styling",
    category: "Hair Artistry",
    description:
      "Expert hair styling for every occasion, from elegant updos to modern trends.",
    price: "₹1,500+",
    duration: "30 - 45 Mins",
    review:
      "Loved my hair for the party! It stayed perfectly in place all night.",
    clientName: "Ritu G.",
    highlights: ["Elegant Updos", "Modern Braids", "Event Styling"],
    image: hairStyle,
    objectPosition: "top",
    color: "#EC4899",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 0V8a2 2 0 0 1 2-2h1m10 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 0V8a2 2 0 0 0-2-2h-1M12 18v-5m0-4V4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 9,
    title: "Wart Removal",
    category: "Specialized Care",
    description:
      "Safe and effective removal of warts and skin tags using advanced techniques.",
    price: "₹119+",
    duration: "15 - 30 Mins",
    review:
      "The procedure was quick and practically painless. The results are amazing!",
    clientName: "Vikram J.",
    highlights: ["Quick Procedure", "Minimal Scarring", "Expert Care"],
    image: wartRemoval,
    color: "#EA580C",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.9" />
        <path
          d="M12 7v10M7 12h10"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 10,
    title: "Ear Piercing",
    category: "Specialized Care",
    description:
      "Safe and precise ear piercing using professional, sterilized equipment.",
    price: "₹299+",
    duration: "15 - 30 Mins",
    review:
      "The process was so quick and hygienic. I felt very comfortable throughout.",
    clientName: "Pooja S.",
    highlights: ["Safe & Hygienic", "Expert Piercer", "Aftercare Support"],
    image: earPiercing,
    color: "#F472B6",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.9" />
        <circle cx="12" cy="12" r="3" fill="white" />
      </svg>
    ),
  },
];

const ServicesShowcase: React.FC = () => {
  const [services, setServices] = React.useState<Service[]>(fallbackServices);
  
  useEffect(() => {
    fetch('http://localhost:8081/api/services')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const dynamicServices = data.map((s: any, idx: number) => {
            let fallbackMatch = fallbackServices.find(f => 
              f.title.toLowerCase().trim() === s.title.toLowerCase().trim()
            );
            if (!fallbackMatch) {
              fallbackMatch = fallbackServices.find(f => 
                f.category === s.category || 
                f.title.toLowerCase().trim() === s.category.toLowerCase().trim()
              );
            }
            if (!fallbackMatch) {
              fallbackMatch = fallbackServices[idx % fallbackServices.length];
            }
             const imageName = s.image_name || s.imageName;
             return {
              id: 100 + s.id,
              title: s.title,
              category: s.category,
              description: s.description,
              price: s.price,
              duration: s.duration,
              highlights: s.highlights ? s.highlights.split(',').map((h:string)=>h.trim()) : [],
              image: imageName ? `http://localhost:8081/api/gallery/images/${imageName}` : fallbackMatch.image,
              color: fallbackMatch.color,
              icon: fallbackMatch.icon,
              review: fallbackMatch.review,
              clientName: fallbackMatch.clientName,
              _originalId: fallbackMatch.id
            };
          });

          // Preserve the original order of fallbackServices
          const orderedServices: any[] = [];
          
          fallbackServices.forEach(f => {
            const matches = dynamicServices.filter((d: any) => d._originalId === f.id);
            if (matches.length > 0) {
              orderedServices.push(...matches);
            } else {
              orderedServices.push(f);
            }
          });

          // In case any dynamic service didn't match anything (which shouldn't happen with our modulo fallback, but just in case)
          dynamicServices.forEach((d: any) => {
            if (!orderedServices.some((o: any) => o.id === d.id)) {
              orderedServices.push(d);
            }
          });

          setServices(orderedServices);
        }
      })
      .catch(err => console.error("Error fetching services", err));
  }, []);

  const [selectedImage, setSelectedImage] = React.useState<{
    url: string;
    title: string;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".showcase-info") as HTMLElement[];
      const images = gsap.utils.toArray(".showcase-img") as HTMLElement[];

      // Initial state
      gsap.set(images, { opacity: 0, scale: 1, zIndex: 0 });
      if (images[0]) gsap.set(images[0], { opacity: 1, zIndex: 1 });

      sections.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              // Reset all images z-index and opacity instantly
              gsap.set(images, { zIndex: 0, opacity: 0 });
              // Bring active image to top and make it visible instantly
              gsap.set(images[i], {
                zIndex: 1,
                opacity: 1,
                overwrite: true,
              });
              // Keep the subtle scale animation if desired, or remove it too
              gsap.fromTo(
                images[i],
                { scale: 1.05 },
                {
                  scale: 1,
                  duration: 0.8,
                  ease: "power2.out",
                  overwrite: true,
                },
              );
            }
          },
        });
      });

      // Pin the right column container while the left column scrolls
      if (rightColRef.current && containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 80px",
          end: "bottom bottom",
          pin: rightColRef.current,
          pinSpacing: false,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [services]);

  return (
    <div id="services-showcase" className="services-arch bg-surface-dim relative overflow-hidden" ref={containerRef}>
      {/* Mobile/Tablet Layout */}
      <div className="dt:hidden py-12 tb:py-20 px-4 tb:px-8 space-y-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl tb:text-5xl font-black text-on-surface uppercase tracking-tighter italic font-serif">
            Signature <span className="text-primary italic">Services</span>
          </h2>
        </div>

        {services.map((service) => {
          const serviceKey = service.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return (
            <div
              key={service.id}
              id={`mobile-${serviceKey}`}
              data-service={serviceKey}
              className="group relative bg-white rounded-[3rem] overflow-hidden shadow-luxury border border-on-surface/10 scroll-mt-24"
            >
            <div
              className="aspect-square relative overflow-hidden cursor-zoom-in group"
              onClick={() =>
                setSelectedImage({ url: service.image, title: service.title })
              }
            >
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: service.objectPosition || "center" }}
              />
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/20 flex items-center gap-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <Star className="text-white fill-white" size={12} />
                <span className="text-white text-[9px] font-black uppercase tracking-wider">
                  Click to View
                </span>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white text-primary rounded-xl shadow-lg border border-primary/20">
                  {service.icon}
                </div>
                <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                  {service.category}
                </span>
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black text-on-surface uppercase italic font-serif">
                  {service.title}
                </h3>
                <p className="text-on-surface/80 text-sm leading-relaxed font-medium">
                  {service.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {service.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-on-surface/5 rounded-full text-[9px] font-black uppercase tracking-widest text-on-surface/70 border border-on-surface/10"
                  >
                    {h}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-on-surface/10">
                <div className="flex gap-6 tb:gap-10">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-widest text-on-surface/40">
                      Investment
                    </span>
                    <span className="text-2xl font-black text-on-surface">
                      {service.price}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-widest text-on-surface/40">
                      Duration
                    </span>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Clock size={15} className="text-primary" />
                      <span className="text-xs font-black text-on-surface uppercase tracking-widest">
                        {service.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <Link to="/book">
                  <button className="btn-premium-gold px-6 py-3 text-xs">
                    Book Ritual
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
      </div>

      {/* Desktop Layout */}
      <div className="hidden dt:grid max-w-7xl mx-auto px-6 grid-cols-2 gap-10 xl:gap-16 pb-32">
        {/* Left Column: Rich Content */}
        <div className="space-y-0 flex flex-col items-center">
          {services.map((service) => {
            const serviceKey = service.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            return (
              <div
                key={service.id}
                id={`desktop-${serviceKey}`}
                data-service={serviceKey}
                className="showcase-info h-[calc(100vh-80px)] flex items-center justify-center text-center scroll-mt-24"
              >
              <div className="max-w-md space-y-5 flex flex-col items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-white text-primary rounded-2xl shadow-luxury-deep border border-primary/20">
                    {service.icon}
                  </div>
                  <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">
                    {service.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-4xl xl:text-5xl font-black text-on-surface leading-none uppercase italic font-serif">
                    {service.title}
                  </h2>
                  <p className="text-on-surface/90 text-base leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-3 py-1">
                  <div className="flex flex-wrap justify-center gap-2 w-full">
                    {service.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 bg-on-surface/5 rounded-full text-[9px] font-black uppercase tracking-widest text-on-surface/80 border border-on-surface/10"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <Clock size={14} />
                    <span className="font-black text-xs uppercase tracking-widest">
                      {service.duration}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 pt-2 w-full">
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-on-surface/60 mb-0.5">
                      Ritual Investment
                    </span>
                    <span className="text-3xl font-black text-on-surface italic font-serif tracking-tight">
                      {service.price}
                    </span>
                  </div>
                  <Link to="/book" className="w-full">
                    <button className="btn-premium-gold w-full py-3.5 text-xs tracking-widest">
                      Book Ritual
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
        </div>

        {/* Right Column: Pinned Visualization */}
        <div
          className="h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden pt-12 pb-8"
          ref={rightColRef}
        >
          <div className="relative w-full max-w-[320px] xl:max-w-[360px] aspect-4/5 rounded-[3rem] overflow-hidden shadow-luxury-deep border-4 border-white bg-white group cursor-zoom-in">
            {services.map((service) => (
              <div
                key={service.id}
                className="showcase-img absolute inset-0 z-0"
                onClick={() =>
                  setSelectedImage({ url: service.image, title: service.title })
                }
              >
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: service.objectPosition || "center" }}
                />
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/20 flex items-center gap-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <Star className="text-white fill-white" size={14} />
                  <span className="text-white text-[10px] font-black uppercase tracking-wider">
                    Click to View
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        image={selectedImage?.url || ""}
        title={selectedImage?.title || ""}
      />
    </div>
  );
};

export default ServicesShowcase;
