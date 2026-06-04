import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  service: string;
  quote: string;
  rating: number;
  image?: string;
  imageName?: string;
}

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Kowsalya Shinchan",
    service: "Layer Cut & Hair Botox",
    quote:
      "I’m Kousi from Kulithalai. I had always wanted to try a haircut and treatment for years. I visited Zen Tonez Salon for the first time and got a layer cut and hair botox treatment. The service was very good, the team was friendly and engaging, and I loved the final result.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Kowsalya",
  },
  {
    id: 2,
    name: "Manoj Jeevagan",
    service: "Layer Cut & Styling",
    quote:
      "Visited Zen Tonez Salon with my wife and was truly impressed. The layer cutting and hairstyling were perfect. Stylist Yogapriya is skilled, friendly, and understands exactly what you want. Highly recommend for a stylish look in Trichy.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Priya",
  },
  {
    id: 3,
    name: "Meenakshi Janakiram",
    service: "Layer Cut",
    quote:
      "I wanted a layer cut and Yogapriya did exactly what I wanted. Good ambience with a warm gesture. She is really talented.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Meenakshi",
  },
  {
    id: 4,
    name: "Joe Anjali",
    service: "Facial & Threading",
    quote:
      "Facial service from Yoga was amazing. She explained each step clearly and the massage was very relaxing. My skin felt fresh and glowing. Eyebrow threading was done perfectly with a natural shape.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Anjali",
  },
  {
    id: 5,
    name: "Dharshini Malavika",
    service: "Facial & Haircut",
    quote:
      "Sarthaj did a great job. I went for facial, haircut, and eyebrows — everything was very good. Neat and clean services. Excellent experience.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Dharshini",
  },
  {
    id: 6,
    name: "Jenifer LD",
    service: "Threading",
    quote:
      "Very satisfied! Eyebrow threading was done very well and almost pain-free. I was never satisfied with other salons before, but here the result was perfect.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Jenifer",
  },
  {
    id: 7,
    name: "Vicky Sachithanantham",
    service: "Hair Spa & Cut",
    quote:
      "Layer haircut, hair spa, and eyebrow services were excellent. Very good service.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Vidhya",
  },
  {
    id: 8,
    name: "Sowmi Selvam",
    service: "Threading",
    quote:
      "I had an amazing experience. Threading was done neatly and painlessly. Ms. Sarthaj is polite, professional, and made me feel very comfortable.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Sowmi",
  },
  {
    id: 9,
    name: "Shyamaladevi Shyamala",
    service: "Facial & Threading",
    quote:
      "Facial and threading services were very good. Yogapriya’s service was excellent.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Shyamaladevi",
  },
  {
    id: 10,
    name: "Priyabanthavi Sivasubramanian",
    service: "Hair Spa",
    quote:
      "I visited this salon and had a wonderful experience. The hair spa was exactly as I wanted. Jerlin was polite and efficient.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Priyabanthavi",
  },
  {
    id: 11,
    name: "Gopi Harini",
    service: "Salon Service",
    quote:
      "Jerlin did wonderful work. She is very friendly and skillful. Great service!",
    rating: 5,
    image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Harini",
  },
  {
    id: 12,
    name: "Malathi Vinoth",
    service: "Salon Service",
    quote:
      "Excellent service by Revathi team. The staff are experienced and the salon atmosphere is very good.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Malathi",
  },
  {
    id: 13,
    name: "Thulasi Anand",
    service: "Salon Service",
    quote:
      "The service was fantastic. Everyone was welcoming and kind. They truly care about their clients.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Thulasi",
  },
  {
    id: 14,
    name: "Manesa Manesa",
    service: "Hair Spa",
    quote:
      "Yoga gave me a very nice hair spa session. Her service was very good.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Manesa",
  },
  {
    id: 15,
    name: "Sharmi Kalai",
    service: "Haircut & Facial",
    quote:
      "I visited Zen Tonez Salon for haircut and facial. Sarthaj handled everything with care and suggested the right services for my skin and hair. Overall, the service was excellent and I highly recommend it.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Sharmi",
  },
  {
    id: 16,
    name: "Swarnanjali Nagarajan",
    service: "Layer Cut",
    quote:
      "I got a layer haircut from Yogapriya. The service was very good. The staff are polite and handle customers very nicely.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Swarnanjali",
  },
  {
    id: 17,
    name: "Senthil Nathan",
    service: "Layer Cut & Treatment",
    quote:
      "Yasmin did dandruff treatment and a bouncy layer cut. She explained everything well and took great care. Very satisfying service.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Yasmin",
  },
  {
    id: 18,
    name: "Iswarya Sundaresan",
    service: "Anti-Dandruff Treatment",
    quote: "Anti-dandruff treatment by Yoga was very good.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Iswarya",
  },
  {
    id: 19,
    name: "Divya Sri",
    service: "Salon Service",
    quote:
      "I was confused about choosing a salon, but this was the best decision. Thank you Yoga Akka for the amazing care and excellent service.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Divya",
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial; delay: number }> = ({
  testimonial,
  delay,
}) => {
  const imageUrl = testimonial.imageName 
    ? `http://localhost:8081/api/gallery/images/${testimonial.imageName}` 
    : (testimonial.image || `https://api.dicebear.com/7.x/lorelei/svg?seed=${testimonial.name.split(' ')[0]}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
      className="bg-white/5 backdrop-blur-md rounded-3xl p-8 shadow-luxury-soft border border-white/10 flex flex-col h-full relative overflow-hidden group"
    >
      <Quote
        size={120}
        className="absolute -top-6 -left-6 text-[#B87333]/5 group-hover:text-[#B87333]/10 transition-colors duration-500"
      />

      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#B87333]/20 p-0.5">
          <img
            src={imageUrl}
            alt={testimonial.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <h4 className="font-bold text-black text-lg leading-tight">
            {testimonial.name}
          </h4>
          <p className="text-[#B87333] text-xs font-black tracking-widest uppercase mt-1">
            {testimonial.service}
          </p>
        </div>
      </div>

      <div className="flex gap-1 mb-4 relative z-10">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={14} className="text-[#B87333] fill-[#B87333]" />
        ))}
      </div>

      <p className="text-on-surface/70 leading-relaxed italic relative z-10 flex-grow">
        "{testimonial.quote}"
      </p>

      <div className="absolute inset-0 rounded-3xl group-hover:bg-[#B87333]/5 transition-colors pointer-events-none" />
    </motion.div>
  );
};

const AboutTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('http://localhost:8081/api/testimonials');
        const data = await res.json();
        if (data && data.length > 0) {
          setTestimonials(data);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
      }
    };
    fetchTestimonials();
  }, []);

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const row1 = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const row2 = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <section className="py-20 sm:py-32 bg-surface-dim relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 relative z-10">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#B87333] font-bold uppercase tracking-[0.4em] text-xs mb-4 block"
          >
            Voices of Elegance
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-serif text-on-surface font-black uppercase italic leading-none"
          >
            Client <span className="text-[#B87333]">Stories</span>
          </motion.h2>
          <div className="h-1 w-20 bg-[#B87333]/30 mx-auto mt-8 rounded-full" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-8">
        <div className={`flex ${isMobile ? "overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-4" : "overflow-hidden group"}`}>
          <motion.div
            animate={!isMobile ? { x: ["0%", "-50%"] } : {}}
            transition={!isMobile ? { x: { repeat: Infinity, repeatType: "loop", duration: 50, ease: "linear" } } : {}}
            className={`flex ${isMobile ? "" : "hover:[animation-play-state:paused]"}`}
          >
            {isMobile
              ? row1.map((t, i) => <div key={i} className="snap-center w-[85vw] sm:w-[400px] shrink-0 px-3 h-full"><TestimonialCard testimonial={t} delay={0} /></div>)
              : [...row1, ...row1].map((t, i) => <div key={i} className="w-[400px] shrink-0 px-4 h-full"><TestimonialCard testimonial={t} delay={0} /></div>)}
          </motion.div>
        </div>

        <div className="hidden lg:flex overflow-hidden group">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 60, ease: "linear" } }}
            className="flex hover:[animation-play-state:paused]"
          >
            {[...row2, ...row2].map((t, i) => <div key={i} className="w-[400px] shrink-0 px-4 h-full"><TestimonialCard testimonial={t} delay={0} /></div>)}
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:hidden gap-6 mt-8">
        {testimonials.slice(0, 4).map((testimonial, idx) => (
          <TestimonialCard
            key={`mobile-${testimonial.id}`}
            testimonial={testimonial}
            delay={idx * 0.1}
          />
        ))}
      </div>

      <div className="lg:hidden text-center mt-10">
        <p className="text-on-surface/40 text-[10px] uppercase font-bold tracking-widest">
          Swipe to explore more stories
        </p>
      </div>
    </section>
  );
};

export default AboutTestimonials;
