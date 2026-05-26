import { motion } from "framer-motion";
import { Droplets, Heart, Scissors, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import skinImage from "../../assets/facialwebpimages/facial1.webp";
import facialImage from "../../assets/facialwebpimages/facial2.webp";
import manicureImage from "../../assets/pedicurewebpimages/manicure1.webp";
import hairSpaImage from "../../assets/hairspawebpimages/hairspa3.webp";
import bridalImage from "../../assets/bridalwebpimages/bridal1.webp";
import nailImage from "../../assets/nailwebpimages/nail.jpeg";
import liceImage from "../../assets/licewebpimages/lice4.webp";
import wartRemovalImage from "../../assets/wartremovalwebpimages/wartremovalimg.webp";

import VoyageSlider from "../VoyageSlider/VoyageSlider";
import { ScrollReveal } from "./ScrollReveal";

const services = [
  {
    title: "Skin Care",
    description:
      "Maintain radiant and healthy skin with our personalized skincare solutions.",
    image: skinImage,
    icon: <Droplets size={24} />,
    buttonClass: "btn-premium-gold",
  },
  {
    title: "Facial Treatment",
    description:
      "Refresh and rejuvenate your skin with our advanced facial therapies.",
    image: facialImage,
    icon: <Sparkles size={24} />,
    buttonClass: "btn-premium-gold",
  },
  {
    title: "Manicure & Pedicure",
    description: "Pamper your hands and feet with our relaxing therapies.",
    image: manicureImage,
    icon: <Droplets size={24} />,
    buttonClass: "btn-premium-gold",
  },
  {
    title: "Hair Care",
    description:
      "Revitalize your hair with nourishing spa treatments designed to repair damage.",
    image: hairSpaImage,
    icon: <Scissors size={24} />,
    buttonClass: "btn-premium-gold",
  },
  {
    title: "Bridal Makeup",
    description:
      "Look stunning on your special day with our professional bridal makeup services.",
    image: bridalImage,
    icon: <Heart size={24} />,
    buttonClass: "btn-premium-gold",
    objectPosition: "top",
  },
  {
    title: "Nails",
    description:
      "Exquisite nail art and extensions to express your unique style.",
    image: nailImage,
    icon: <Sparkles size={24} />,
    buttonClass: "btn-premium-gold",
  },
  {
    title: "Lice Removal",
    description:
      "Gentle and effective treatments to ensure a healthy, lice-free scalp.",
    image: liceImage,
    icon: <Scissors size={24} />,
    buttonClass: "btn-premium-gold",
  },
  {
    title: "Wart Removal",
    description:
      "Safe and effective removal of warts and skin tags using advanced techniques.",
    image: wartRemovalImage,
    icon: <Sparkles size={24} />,
    buttonClass: "btn-premium-gold",
  },
];

export function ServicesSection() {
  return (
    <section className="py-8 tb:py-12 dt:py-16 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 tb:px-6 dt:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10 tb:mb-16 dt:mb-20">
            <h2 className="text-section-title font-black text-on-surface mb-4 tb:mb-6 uppercase tracking-wider font-serif">
              <span className="underline decoration-primary/30 underline-offset-8">
                What <span className="text-primary">We Offer</span>
              </span>
            </h2>
            <p className="text-base tb:text-lg text-on-surface/80 max-w-xl tb:max-w-2xl mx-auto font-medium leading-relaxed px-4 mb:px-0">
              From everyday glow to bridal perfection — Zen Tonez has got you
              covered with expert treatments and premium products.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-8 sm:mt-12">
          <VoyageSlider slides={services} />
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 sm:mt-16 lg:mt-20 text-center">
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="btn-premium-gold px-8 py-3.5"
              >
                View All Treatments
              </motion.button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
