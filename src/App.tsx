import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
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

// Lazy Load Pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const Book = lazy(() => import("./pages/Book"));
const Membership = lazy(() => import("./pages/Membership"));
const Admin = lazy(() => import("./pages/Admin"));
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const lenis = window.lenisInstance;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
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
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
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
          </Suspense>
        </main>
        <Footer />

        {/* Global Mobile Bottom Navigation */}
        <MobileBottomNav />
      </div>
    </Router>
  );
};

export default App;
