import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  service: string;
  quote: string;
  rating: number;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
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

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="shrink-0 w-[300px] sm:w-[350px] p-6 mx-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-luxury-soft transition-all duration-300 group gpu-accelerated will-change-transform"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/20 bg-[#B87333]/10">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-black font-bold text-sm sm:text-base leading-none mb-1">
            {testimonial.name}
          </h4>
          <p className="text-[#B87333] text-[10px] uppercase font-bold tracking-widest">
            {testimonial.service}
          </p>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={12} className="fill-[#B87333] text-[#B87333]" />
        ))}
      </div>

      <div className="relative">
        <Quote className="absolute -top-2 -left-2 text-[#B87333]/20 w-8 h-8 -z-10" />
        <p className="text-[#B87333] text-sm leading-relaxed italic font-medium">
          "{testimonial.quote}"
        </p>
      </div>

      <div className="absolute inset-0 rounded-3xl group-hover:bg-[#B87333]/5 transition-colors pointer-events-none" />
    </motion.div>
  );
};

const AboutTestimonials: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const row1 = TESTIMONIALS.slice(0, 10);
  const row2 = TESTIMONIALS.slice(10, 19);

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
        {/* Row 1: Left to Right */}
        <div
          className={`flex ${isMobile ? "overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-4" : "overflow-hidden group"}`}
        >
          <motion.div
            animate={!isMobile ? { x: ["0%", "-50%"] } : {}}
            transition={
              !isMobile
                ? {
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 50,
                      ease: "linear",
                    },
                  }
                : {}
            }
            className={`flex ${isMobile ? "" : "hover:[animation-play-state:paused]"}`}
          >
            {isMobile
              ? row1.map((t, i) => (
                  <div key={i} className="snap-center">
                    <TestimonialCard testimonial={t} />
                  </div>
                ))
              : [...row1, ...row1].map((t, i) => (
                  <TestimonialCard key={i} testimonial={t} />
                ))}
          </motion.div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="hidden lg:flex overflow-hidden">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              },
            }}
            className="flex hover:[animation-play-state:paused]"
          >
            {[...row2, ...row2].map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile Swipe Text */}
      <div className="lg:hidden text-center mt-10">
        <p className="text-on-surface/40 text-[10px] uppercase font-bold tracking-widest">
          Swipe to explore more stories
        </p>
      </div>
    </section>
  );
};

export default AboutTestimonials;
