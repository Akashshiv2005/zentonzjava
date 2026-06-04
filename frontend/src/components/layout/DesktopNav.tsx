import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import "./DesktopNav.css";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Gallery", path: "/gallery" },
  { name: "Membership", path: "/membership" },
  { name: "Contact", path: "/contact" },
  { name: "Reserve", path: "/book" },
];

export function DesktopNav() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    // Hide when scrolling down, show when scrolling up
    // Added a small threshold (150px) so it doesn't hide immediately at the top
    if (latest > previous && latest > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <motion.nav
      className="desktop-nav-wrapper hidden lg:block"
      initial={{ y: 0, x: "-50%" }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
        x: "-50%",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <div className="desktop-nav-content glass-effect">
        <ul className="nav-list">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path} className="nav-item">
                <Link
                  to={link.path}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  <span className="nav-label">{link.name}</span>
                </Link>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="active-slider shadow-luxury-soft"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
}
