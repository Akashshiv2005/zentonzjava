import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react";
import logo from "../assets/zentonez-logo.png";

const Footer: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="bg-background relative overflow-hidden pt-6 tb:pt-12 border-t border-secondary/20">
      <div className="max-w-7xl mx-auto px-4 tb:px-6 dt:px-8 relative z-10">
        {/* ── Navigation Tier ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5%" }}
          className="grid grid-cols-2 dt:grid-cols-12 gap-x-4 gap-y-10 tb:gap-12 pb-6 tb:pb-12"
        >
          {/* Brand Info - Full width on smallest mobile, then grid */}
          <motion.div
            variants={itemVariants}
            className="col-span-2 dt:col-span-4 space-y-3 tb:space-y-4 dt:pr-12"
          >
            <Link
              to="/"
              className="flex items-center gap-2 group w-fit mx-auto mb:mx-0"
            >
              <img
                src={logo}
                alt="Zen Tonez"
                className="h-7 tb:h-9 w-auto drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-on-surface/70 leading-relaxed font-medium text-[11px] tb:text-[13px] text-center mb:text-left italic dt:max-w-xs px-4 mb:px-0">
              Where Beauty Meets Luxury. Zen Tonez is an exclusive women salon
              elevating the art of beauty through performance and soul.
            </p>
          </motion.div>

          {/* Quick Links - Side-by-side on mobile */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 dt:col-span-2 flex flex-col items-center mb:items-start"
          >
            <h3 className="text-[8px] tb:text-[9px] font-black uppercase tracking-[0.3em] text-[#C9A24A] border-b border-[#C9A24A]/20 pb-1.5 mb-3 w-full text-center mb:text-left">
              Explore
            </h3>
            <ul className="space-y-1.5 tb:space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "About", path: "/about" },
                { label: "Services", path: "/services" },
                { label: "Membership", path: "/membership" },
                { label: "Gallery", path: "/gallery" },
                { label: "Contact", path: "/contact" },
                { label: "Reserve", path: "/book" },
              ].map((item) => (
                <li
                  key={item.label}
                  className="flex justify-center mb:justify-start"
                >
                  <Link
                    to={item.path}
                    className="group text-on-surface/80 hover:text-[#C9A24A] transition-colors text-[8px] tb:text-[9px] font-black uppercase tracking-widest text-center mb:text-left"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services - Side-by-side on mobile */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 dt:col-span-3 flex flex-col items-center mb:items-start"
          >
            <h3 className="text-[8px] tb:text-[9px] font-black uppercase tracking-[0.3em] text-[#C9A24A] border-b border-[#C9A24A]/20 pb-1.5 mb-3 w-full text-center mb:text-left">
              Services
            </h3>
            <ul className="space-y-1.5 tb:space-y-3">
              {[
                { name: "Skin Care", hash: "#skin-care" },
                { name: "Facial Treatment", hash: "#facial-treatment" },
                { name: "Hair Care", hash: "#hair-care" },
                { name: "Bridal Makeup", hash: "#bridal-makeup" },
                { name: "Nail Artistry", hash: "#nails" },
                { name: "Lice Removal", hash: "#lice-removal" },
                { name: "Wart Removal", hash: "#wart-removal" },
              ].map((s) => (
                <li
                  key={s.name}
                  className="flex justify-center mb:justify-start"
                >
                  <Link
                    to={`/services${s.hash}`}
                    className="group text-on-surface/80 hover:text-[#C9A24A] transition-colors text-[8px] tb:text-[9px] font-black uppercase tracking-widest text-center mb:text-left"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info - Full width on smallest mobile */}
          <motion.div
            variants={itemVariants}
            className="col-span-2 dt:col-span-3 flex flex-col items-center mb:items-start"
          >
            <h3 className="text-[8px] tb:text-[9px] font-black uppercase tracking-[0.3em] text-[#C9A24A] border-b border-[#C9A24A]/20 pb-1.5 mb-3 w-full text-center mb:text-left">
              Visit Us
            </h3>
            <ul className="space-y-2 tb:space-y-3 w-full flex flex-col items-center mb:items-start">
              <li className="flex flex-col mb:flex-row items-center mb:items-start gap-1.5 text-center mb:text-left">
                <MapPin className="text-[#C9A24A] shrink-0 w-2.5 h-2.5 tb:w-3 tb:h-3 tb:mt-0.5" />
                <span className="text-on-surface/80 text-[8px] tb:text-[10px] font-black uppercase tracking-widest">
                  Rishi Complex, West Thillai Nagar, Tennur, Trichy
                </span>
              </li>
              <div className="flex flex-row mb:flex-col gap-4 tb:gap-3 justify-center">
                <li className="flex flex-col mb:flex-row items-center mb:items-start gap-1.5 group cursor-pointer text-center mb:text-left">
                  <Phone className="text-[#C9A24A] w-2.5 h-2.5 tb:w-3 tb:h-3" />
                  <a
                    href="tel:9751231239"
                    className="text-on-surface/80 text-[8px] tb:text-[10px] group-hover:text-[#C9A24A] transition-colors font-black uppercase tracking-widest"
                  >
                    9751231239
                  </a>
                </li>
                <li className="flex flex-col mb:flex-row items-center mb:items-start gap-1.5 group cursor-pointer text-center mb:text-left">
                  <Mail className="text-[#C9A24A] w-2.5 h-2.5 tb:w-3 tb:h-3" />
                  <a
                    href="mailto:zentonezsalon@gmail.com"
                    className="text-on-surface/80 text-[8px] tb:text-[10px] group-hover:text-[#C9A24A] transition-colors font-black uppercase tracking-widest"
                  >
                    zentonezsalon@gmail.com
                  </a>
                </li>
              </div>

              {/* Social Media Icons - Moved under Visit Us with Brand Colors and Larger Size */}
              <div className="flex space-x-3 pt-6 justify-center mb:justify-start">
                {[
                  {
                    Icon: Instagram,
                    href: "https://www.instagram.com/zentonezsalon/?hl=en",
                    label: "Instagram",
                    brandColor: "bg-[#E4405F]",
                    borderColor: "border-[#E4405F]/30",
                  },
                  {
                    Icon: Facebook,
                    href: "https://www.facebook.com/profile.php?id=61576338394684",
                    label: "Facebook",
                    brandColor: "bg-[#1877F2]",
                    borderColor: "border-[#1877F2]/30",
                  },
                  {
                    Icon: MessageCircle,
                    href: "https://wa.me/919751231239",
                    label: "WhatsApp",
                    brandColor: "bg-[#25D366]",
                    borderColor: "border-[#25D366]/30",
                  },
                  {
                    Icon: Phone,
                    href: "tel:9751231239",
                    label: "Call Us",
                    brandColor: "bg-[#0EA5E9]",
                    borderColor: "border-[#0EA5E9]/30",
                  },
                ].map(({ Icon, href, label, brandColor, borderColor }, i) => (
                  <motion.a
                    whileHover={{
                      y: -6,
                      scale: 1.2,
                      filter: "brightness(1.1)",
                      boxShadow: "0 10px 20px -5px rgba(0,0,0,0.3)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`p-2.5 ${brandColor} text-white rounded-xl transition-all duration-500 border ${borderColor} shadow-lg hover:shadow-2xl`}
                  >
                    <Icon size={18} className="tb:w-5 tb:h-5" />
                  </motion.a>
                ))}
              </div>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom Tier ── */}
      <div className="relative border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto flex flex-col tb:flex-row justify-between items-center px-6 py-3 tb:py-5 gap-2 relative z-20">
          <p className="text-on-surface/40 text-[7px] tb:text-[9px] font-black uppercase tracking-[0.2em]">
            © 2025 Zen Tonez Beauty Salon. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 tb:gap-4 text-[7px] tb:text-[9px] uppercase font-black tracking-[0.2em] text-on-surface/40">
            <span className="hover:text-[#C9A24A] cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="opacity-30">|</span>
            <span className="hover:text-[#C9A24A] cursor-pointer transition-colors">
              Terms
            </span>
          </div>
        </div>

        {/* Oversized Background Text - Subtler on mobile */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none select-none z-0 overflow-hidden opacity-[0.03] tb:opacity-5 translate-y-1/2">
          <h1 className="text-[14vw] tb:text-[15vw] font-black font-serif text-white/5 leading-none tracking-tighter">
            ZENTONEZ
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
