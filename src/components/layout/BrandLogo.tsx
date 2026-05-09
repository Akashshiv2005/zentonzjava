import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../../assets/zentonez-logo.png";

export function BrandLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-4 left-4 lg:top-8 lg:left-8 z-60 pointer-events-auto"
    >
      <Link to="/" className="group block focus:outline-none">
        <div className="relative flex items-center gap-3">
          {/* Logo Image */}
          <div className="h-10 md:h-12 lg:h-16 w-auto overflow-hidden transition-transform duration-500 group-hover:scale-105">
            <img
              src={logo}
              alt="ZenTonez Logo"
              className="h-full w-auto object-contain drop-shadow-md"
            />
          </div>

          {/* Optional: Subtle backdrop or glow effect on hover */}
          <div className="absolute -inset-4 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      </Link>
    </motion.div>
  );
}
