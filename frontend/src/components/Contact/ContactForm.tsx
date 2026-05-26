import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Send to Backend (to save in DB)
      await fetch("http://localhost:8081/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      // 2. Build WhatsApp message (Matching your flowchart)
      const text = `*New Contact Inquiry - Zen Tonez*\n\n` +
        `*Name:* ${formState.name}\n` +
        `*Email:* ${formState.email}\n` +
        `*Phone:* ${formState.phone}\n` +
        `*Service:* ${formState.service}\n` +
        `*Message:* ${formState.message}`;

      const phoneNumber = "919751231239";
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

      // 3. Open WhatsApp (Matching your flowchart)
      window.open(url, "_blank");

      // Show success state locally
      setIsSubmitted(true);
      setFormState({ name: "", email: "", phone: "", service: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative group w-full"
    >
      {/* Rotating Border Beam */}
      <div className="absolute inset-0 p-[2px] rounded-3xl tb:rounded-[3.5rem] overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="-inset-full bg-[conic-gradient(from_0deg,transparent_0,var(--color-primary)_40deg,transparent_100deg)] opacity-30 blur-[2px]"
        />
      </div>

      <div className="bg-surface/60 backdrop-blur-xl p-6 tb:p-12 dt:p-16 rounded-3xl tb:rounded-4xl shadow-luxury-deep border border-white/50 relative z-10 overflow-hidden transform-gpu">
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-20 bg-white/95 flex flex-col items-center justify-center p-8 text-center rounded-3xl tb:rounded-4xl"
          >
            <div className="p-5 tb:p-6 bg-primary rounded-2xl tb:rounded-4xl text-white mb-6 tb:mb-8 shadow-xl shadow-primary/20">
              <Sparkles size={40} />
            </div>
            <h3 className="text-2xl tb:text-4xl font-black text-[#302b27] mb-4 font-serif uppercase leading-tight">
              Message Sent!
            </h3>
            <p className="text-on-surface/80 font-semibold max-w-sm text-sm tb:text-base">
              Your message has been submitted successfully. Our team will respond shortly!
            </p>
          </motion.div>
        )}

        <h3 className="text-2xl tb:text-3xl font-black mb-8 tb:mb-12 uppercase font-serif tracking-tight">
          Send Us a <span className="text-primary">Message</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6 tb:space-y-8">
          {/* Name & Email */}
          <div className="grid grid-cols-1 tb:grid-cols-2 gap-6 tb:gap-8">
            <div className="space-y-2 tb:space-y-3">
              <label className="text-[9px] tb:text-[10px] uppercase tracking-[0.3em] font-black text-on-surface/60 block px-3 tb:px-4">Full Name</label>
              <input type="text" required
                className="w-full px-5 tb:px-8 bg-white/60 border border-on-surface/10 rounded-2xl tb:rounded-3xl outline-none transition-all duration-300 placeholder:text-on-surface/40 font-bold text-sm tb:text-base text-on-surface h-12 tb:h-[60px] form-input-unified hover:bg-white/80 hover:border-primary/40 focus:bg-white focus:border-primary/50 focus:scale-[1.01] focus:ring-4 focus:ring-primary/10 focus:shadow-[0_0_15px_rgba(201,162,74,0.15)]"
                placeholder="Your Name" value={formState.name}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                  setFormState({ ...formState, name: val });
                }} />
            </div>
            <div className="space-y-2 tb:space-y-3">
              <label className="text-[9px] tb:text-[10px] uppercase tracking-[0.3em] font-black text-on-surface/60 block px-3 tb:px-4">Email Address</label>
              <input type="email"
                className="w-full px-5 tb:px-8 bg-white/60 border border-on-surface/10 rounded-2xl tb:rounded-3xl outline-none transition-all duration-300 placeholder:text-on-surface/40 font-bold text-sm tb:text-base text-on-surface h-12 tb:h-[60px] form-input-unified hover:bg-white/80 hover:border-primary/40 focus:bg-white focus:border-primary/50 focus:scale-[1.01] focus:ring-4 focus:ring-primary/10 focus:shadow-[0_0_15px_rgba(201,162,74,0.15)]"
                placeholder="your@email.com" value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })} />
            </div>
          </div>

          {/* Phone & Service */}
          <div className="grid grid-cols-1 tb:grid-cols-2 gap-6 tb:gap-8">
            <div className="space-y-2 tb:space-y-3">
              <label className="text-[9px] tb:text-[10px] uppercase tracking-[0.3em] font-black text-on-surface/60 block px-3 tb:px-4">Phone Number</label>
              <input type="tel" required
                className="w-full px-5 tb:px-8 bg-white/60 border border-on-surface/10 rounded-2xl tb:rounded-3xl outline-none transition-all duration-300 placeholder:text-on-surface/40 font-bold text-sm tb:text-base text-on-surface h-12 tb:h-[60px] form-input-unified hover:bg-white/80 hover:border-primary/40 focus:bg-white focus:border-primary/50 focus:scale-[1.01] focus:ring-4 focus:ring-primary/10 focus:shadow-[0_0_15px_rgba(201,162,74,0.15)]"
                placeholder="10-digit mobile number" value={formState.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (val.length <= 10) {
                    setFormState({ ...formState, phone: val });
                  }
                }} />
            </div>
            <div className="space-y-2 tb:space-y-3">
              <label className="text-[9px] tb:text-[10px] uppercase tracking-[0.3em] font-black text-on-surface/60 block px-3 tb:px-4">Service Interested</label>
              <div ref={dropdownRef} className="relative w-full">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-5 tb:px-8 bg-white/60 border border-on-surface/10 rounded-2xl tb:rounded-3xl outline-none transition-all duration-300 font-bold text-sm tb:text-base text-on-surface h-12 tb:h-[60px] form-input-unified hover:bg-white/80 hover:border-primary/40 focus:bg-white focus:border-primary/50 focus:scale-[1.01] focus:ring-4 focus:ring-primary/10 focus:shadow-[0_0_15px_rgba(201,162,74,0.15)] flex items-center justify-between text-left"
                >
                  <span className={formState.service ? "text-on-surface" : "text-on-surface/40"}>
                    {formState.service || "Select a service"}
                  </span>
                  <svg className={`w-4 h-4 tb:w-5 tb:h-5 text-on-surface/50 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <input type="hidden" name="service" value={formState.service} required />

                {isDropdownOpen && (
                  <ul
                    className="absolute left-0 right-0 mt-2 bg-white border border-on-surface/10 rounded-2xl shadow-2xl z-50 py-2 max-h-[280px] overflow-y-auto no-scrollbar"
                    style={{ WebkitOverflowScrolling: "touch" }}
                  >
                    <li
                      onClick={() => {
                        setFormState({ ...formState, service: "" });
                        setIsDropdownOpen(false);
                      }}
                      className="px-5 py-3 hover:bg-primary/10 text-on-surface/40 font-bold text-sm cursor-pointer transition-colors"
                    >
                      Select a service
                    </li>
                    {[
                      "Hair Spa",
                      "Facial",
                      "Skin Care",
                      "Hair Styling",
                      "Nails",
                      "Manicure",
                      "Pedicure",
                      "Lice Treatment",
                      "Bridal Makeup"
                    ].map((service) => (
                      <li
                        key={service}
                        onClick={() => {
                          setFormState({ ...formState, service: service });
                          setIsDropdownOpen(false);
                        }}
                        className={`px-5 py-3 font-bold text-sm cursor-pointer transition-colors flex items-center justify-between ${
                          formState.service === service 
                            ? "bg-[#C9A24A]/20 text-[#C9A24A]" 
                            : "text-on-surface hover:bg-primary/10 hover:text-primary"
                        }`}
                      >
                        <span>{service}</span>
                        {formState.service === service && (
                          <svg className="w-4 h-4 text-[#C9A24A]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2 tb:space-y-3">
            <label className="text-[9px] tb:text-[10px] uppercase tracking-[0.3em] font-black text-on-surface/60 block px-3 tb:px-4">Your Message</label>
            <textarea rows={5} required
              className="w-full px-5 tb:px-8 py-4 tb:py-5 bg-white/60 border border-on-surface/10 rounded-2xl tb:rounded-3xl outline-none transition-all duration-300 placeholder:text-on-surface/40 font-bold resize-none text-sm tb:text-base text-on-surface hover:bg-white/80 hover:border-primary/40 focus:bg-white focus:border-primary/50 focus:scale-[1.01] focus:ring-4 focus:ring-primary/10 focus:shadow-[0_0_15px_rgba(201,162,74,0.15)]"
              placeholder="Tell us about your beauty goals..."
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })} />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-semibold text-center">{error}</p>
          )}

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
            disabled={isLoading}
            className="btn-premium-gold w-full flex items-center justify-center gap-3 py-5 tb:py-6 text-sm disabled:opacity-60">
            {isLoading ? "Sending..." : <>Send Message <Send size={16} /></>}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactForm;
