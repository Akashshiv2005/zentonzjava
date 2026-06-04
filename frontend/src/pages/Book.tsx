import React from 'react';
import { BookingSystem } from '../components/Booking/BookingSystem';
import ThreeDClock from '../components/Contact/ThreeDClock';

const Book: React.FC = () => {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-black tracking-[0.4em] uppercase text-xs mb-4 block">
            Reserve Your Time
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface font-serif uppercase tracking-tight mb-12">
            Book Appointment
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Select Service", desc: "Choose from our premium beauty rituals." },
              { step: "02", title: "Pick Your Slot", desc: "Find a time that fits your schedule perfectly." },
              { step: "03", title: "Relax & Prepare", desc: "We'll take care of the rest of the journey." }
            ].map((s, idx) => (
              <div key={idx} className="p-8 bg-white rounded-3xl border border-primary/20 shadow-sm text-left">
                <span className="text-4xl font-black text-primary/60 block mb-4 font-serif">{s.step}</span>
                <h3 className="text-xl font-black text-on-surface uppercase font-serif mb-2">{s.title}</h3>
                <p className="text-on-surface/90 text-sm font-medium">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center min-h-[200px] mt-8">
            <ThreeDClock />
          </div>
        </div>

        <div className="pt-8 sm:pt-16">
          <BookingSystem />
        </div>
      </div>
    </div>
  );
};

export default Book;
