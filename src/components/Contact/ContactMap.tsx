import { useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { useInView } from "framer-motion";

const ContactMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "200px" });
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="py-12 sm:py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Elegant Map Frame */}
        <div
          ref={containerRef}
          className="relative group p-2 sm:p-3 bg-[#B87333]/5 rounded-4xl sm:rounded-5xl border border-[#B87333]/10 shadow-soft overflow-hidden"
        >
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full overflow-hidden rounded-3xl sm:rounded-5xl border border-[#B87333]/20 shadow-inner bg-slate-100">
            {/* Loading Placeholder */}
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-[#B87333]/20 border-t-[#B87333] rounded-full animate-spin" />
                  <p className="text-[#B87333] text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
                    Loading Boutique Location...
                  </p>
                </div>
              </div>
            )}

            {/* Real Google Maps Integration - Loads only when in view */}
            {isInView && (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.784523314!2d78.683567!3d10.8264819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf5c6ab3ec563%3A0xb6e4149c8e7aa646!2sZEN%20TONEZ%20SALON!5e0!3m2!1sen!2sin!4v1714210000000!5m2!1sen!2sin"
                className={`absolute inset-0 w-full h-full contrast-[1.05] transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                referrerPolicy="no-referrer-when-downgrade"
                title="Zen Tonez Location"
              />
            )}
          </div>

          {/* Elegant Floating Address Card */}
          <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-xl px-2 sm:px-0">
            <div className="bg-white/95 backdrop-blur-lg p-4 sm:p-5 rounded-2xl sm:rounded-4xl shadow-2xl border border-[#B87333]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#B87333]/10 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <MapPin className="text-[#B87333] w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-black uppercase text-[10px] sm:text-xs tracking-widest text-slate-900 leading-none mb-1">
                    ZENTONEZ WOMEN EXCLUSIVE SALON
                  </h4>
                  <p className="text-slate-600 text-[10px] sm:text-[11px] leading-tight font-bold">
                    First Floor, Rishi Complex, 15A & 6B, 1st Cross Rd, West
                    Thillai Nagar, Tennur, Trichy - 620018
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="h-8 w-px bg-slate-200 hidden sm:block" />
                <div className="text-center sm:text-left">
                  <span className="block text-[7px] font-black uppercase tracking-widest text-[#B87333] mb-0.5">
                    Location
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-black text-slate-800 uppercase">
                    Tamil Nadu
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
