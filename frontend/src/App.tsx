import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    lenisInstance?: Lenis | null;
  }
}

import Footer from "./components/Footer";
import { MobileBottomNav } from "./components/layout/MobileBottomNav";
import { BrandLogo } from "./components/layout/BrandLogo";
import { DesktopNav } from "./components/layout/DesktopNav";
import { MobileBookingButton } from "./components/layout/MobileBookingButton";
import { SmoothScroll } from "./components/ui/SmoothScroll";
import { Scene3D } from "./components/ui/Scene3D";

// Eager Load Pages for instant navigation
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Book from "./pages/Book";
import Membership from "./pages/Membership";
import Admin from "./pages/Admin";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    // Force native instant scroll synchronously before the browser paints the new route.
    // This prevents IntersectionObservers (like Framer Motion's useInView) from firing
    // at the old scroll position and then firing again at the top, causing massive lag.
    window.scrollTo(0, 0);
    
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
      const lenis = window.lenisInstance;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <SmoothScroll />
      <Scene3D />
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-background relative">
        <BrandLogo />
        <DesktopNav />
        <MobileBookingButton />

        <main className="grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book" element={<Book />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
        </main>
        <Footer />

        {/* Global Mobile Bottom Navigation */}
        <MobileBottomNav />
      </div>
    </Router>
  );
};

export default App;
