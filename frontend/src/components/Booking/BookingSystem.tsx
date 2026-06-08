import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Scissors, Droplets, CheckCircle, ChevronLeft, ShieldCheck, User, Phone, Clock } from 'lucide-react';

type ServiceType = {
  id: string;
  name: string;
  duration: string;
  price: string;
  icon: React.ReactNode;
};

const SERVICES_FALLBACK: ServiceType[] = [
  { id: 'hair-spa', name: 'Artisan Hair Spa', duration: '45 - 60 Min', price: '₹1,049', icon: <Droplets size={24} /> },
  { id: 'facial', name: 'Premium Facial', duration: '60 - 90 Min', price: '₹1,150', icon: <Sparkles size={24} /> },
  { id: 'skincare', name: 'Skin Care Ritual', duration: '45 - 60 Min', price: '₹400', icon: <Droplets size={24} /> },
  { id: 'hair-styling', name: 'Master Hair Styling', duration: '30 - 45 Min', price: '₹399', icon: <Scissors size={24} /> },
  { id: 'nails', name: 'Designer Nails', duration: '60 - 90 Min', price: '₹999', icon: <Sparkles size={24} /> },
  { id: 'manicure', name: 'Luxury Manicure', duration: '60 - 75 Min', price: '₹519', icon: <Droplets size={24} /> },
  { id: 'pedicure', name: 'Luxury Pedicure', duration: '60 - 75 Min', price: '₹699', icon: <Droplets size={24} /> },
  { id: 'lice-treatment', name: 'Lice Treatment', duration: '45 - 60 Min', price: '₹4,999', icon: <ShieldCheck size={24} /> },
  { id: 'bridal', name: 'Bridal Makeup', duration: '180 - 240 Min', price: '₹15,000', icon: <Sparkles size={24} /> },
  { id: 'wart-removal', name: 'Wart Removal', duration: '15 - 30 Min', price: '₹119', icon: <Sparkles size={24} /> },
  { id: 'ear-piercing', name: 'Artisan Ear Piercing', duration: '15 - 30 Min', price: '₹299', icon: <Sparkles size={24} /> },
];



interface BookingState {
  service: ServiceType | null;
  date: Date | null;
  time: string | null;
  user: { name: string; phone: string; notes: string };
}

export const BookingSystem: React.FC = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingState>({
    service: null,
    date: null,
    time: null,
    user: { name: '', phone: '', notes: '' }
  });

  const [services, setServices] = useState<ServiceType[]>(SERVICES_FALLBACK);

  useEffect(() => {
    fetch('http://localhost:8081/api/services')
      .then(res => res.json())
      .then((fetchedData: any[]) => {
        const merged = SERVICES_FALLBACK.map(fs => {
           let matchTitle = '';
           if (fs.id === 'hair-spa') matchTitle = 'Hair Care';
           else if (fs.id === 'facial') matchTitle = 'Facial Treatment';
           else if (fs.id === 'skincare') matchTitle = 'Skin Care';
           else if (fs.id === 'hair-styling') matchTitle = 'Hair Styling';
           else if (fs.id === 'nails') matchTitle = 'Nails';
           else if (fs.id === 'manicure' || fs.id === 'pedicure') matchTitle = 'Manicure & Pedicure';
           else if (fs.id === 'lice-treatment') matchTitle = 'Lice Removal';
           else if (fs.id === 'bridal') matchTitle = 'Bridal Makeup';
           else if (fs.id === 'wart-removal') matchTitle = 'Wart Removal';
           else if (fs.id === 'ear-piercing') matchTitle = 'Ear Piercing';

           const match = fetchedData.find(d => {
             const dTitle = d.title?.trim().toLowerCase() || '';
             const dCat = d.category?.trim().toLowerCase() || '';
             const sTitle = matchTitle.trim().toLowerCase();
             return dTitle === sTitle || dCat === sTitle;
           });
           if (match) {
              return { ...fs, price: match.price, duration: match.duration };
           }
           return fs;
        });
        setServices(merged);
      })
      .catch(console.error);
  }, []);

  const nextStep = () => setStep(s => Math.min(s + 1, 6));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const fetchBookedSlots = async (service: string, date: Date): Promise<string[]> => {
    try {
      const dateStr = date.toISOString().split('T')[0];
      const res = await fetch(`http://localhost:8081/api/reservations/booked-slots?service=${service}&date=${dateStr}`);
      return await res.json();
    } catch {
      return [];
    }
  };

  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isUrgentBooking = () => {
    if (!data.date || !data.time) return false;
    const now = new Date();
    if (data.date.toDateString() !== now.toDateString()) return false;

    const timeMatch = data.time.match(/(\d+):(\d+)\s+(AM|PM)/i);
    if (!timeMatch) return false;

    let hours = parseInt(timeMatch[1]);
    const minutes = parseInt(timeMatch[2]);
    const modifier = timeMatch[3].toUpperCase();

    if (hours === 12) {
      hours = modifier === 'PM' ? 12 : 0;
    } else if (modifier === 'PM') {
      hours += 12;
    }

    const selectedDate = new Date(data.date);
    selectedDate.setHours(hours, minutes, 0, 0);

    const diffInMinutes = (selectedDate.getTime() - now.getTime()) / 60000;
    // If the booking is within the next 20 minutes (or they are up to 15 mins late)
    return diffInMinutes >= -15 && diffInMinutes <= 20;
  };

  // Step 1: Services
  const renderStep1 = () => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-on-surface font-serif uppercase">Select Ritual</h2>
        <p className="text-on-surface/60 text-sm mt-2 font-medium">Choose your transformation journey</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map(service => {
          const isSelected = data.service?.id === service.id;
          return (
            <div
              key={service.id}
              onClick={() => {
                setData({ ...data, service });
                setTimeout(nextStep, 300); // Auto-advance
              }}
              className={`p-5 rounded-3xl cursor-pointer border-2 transition-all duration-300 flex items-center gap-4 ${isSelected
                  ? 'border-primary bg-primary/5 shadow-[0_0_20px_rgba(201,162,74,0.15)]'
                  : 'border-white/5 bg-on-surface/5 hover:bg-on-surface/10'
                }`}
            >
              <div className={`p-3 rounded-2xl ${isSelected ? 'bg-primary text-background' : 'bg-background text-primary'}`}>
                {service.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-on-surface text-lg">{service.name}</h3>
                <div className="flex gap-3 text-xs font-black uppercase tracking-widest text-on-surface/50 mt-1">
                  <span>{service.duration}</span>
                  <span>•</span>
                  <span className="text-primary">{service.price}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );

  // Step 2: Date
  const renderStep2 = () => {
    // Generate next 14 days
    const days = Array.from({ length: 14 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return d;
    });

    return (
      <motion.div
        key="step2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-on-surface font-serif uppercase">Select Date</h2>
          <p className="text-on-surface/60 text-sm mt-2 font-medium">When would you like to visit?</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {days.map((date, idx) => {
            const isToday = idx === 0;
            const isSelected = data.date?.toDateString() === date.toDateString();
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNum = date.getDate();
            const month = date.toLocaleDateString('en-US', { month: 'short' });

            return (
              <div
                key={idx}
                onClick={() => {
                  setData({ ...data, date });
                  if (data.service) fetchBookedSlots(data.service.id, date).then(setBookedSlots);
                  setTimeout(nextStep, 300);
                }}
                className={`flex flex-col items-center justify-center p-4 rounded-3xl cursor-pointer border-2 transition-all duration-300 ${isSelected
                    ? 'border-primary bg-primary text-background shadow-luxury-deep'
                    : 'border-white/5 bg-on-surface/5 text-on-surface hover:bg-on-surface/10'
                  }`}
              >
                <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isSelected ? 'text-background/80' : 'text-on-surface/50'}`}>
                  {isToday ? 'Today' : dayName}
                </span>
                <span className="text-2xl font-black">{dayNum}</span>
                <span className={`text-xs font-bold uppercase mt-1 ${isSelected ? 'text-background/90' : 'text-primary'}`}>
                  {month}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  // Step 3: Time Slots
  const renderStep3 = () => {
    const slots: string[] = [];
    if (data.date) {
      let current = new Date(data.date);
      current.setHours(10, 0, 0, 0); // 10:00 AM

      const endTime = new Date(data.date);
      endTime.setHours(21, 0, 0, 0); // 9:00 PM

      const now = new Date();
      const isToday = current.toDateString() === now.toDateString();

      while (current <= endTime) {
        if (!isToday || current >= now) {
          slots.push(current.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
        }
        // Increment by 15 minutes for the next available slot
        current = new Date(current.getTime() + 15 * 60000);
      }
    }

    return (
      <motion.div
        key="step3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-on-surface font-serif uppercase">Select Time</h2>
          <p className="text-on-surface/60 text-sm mt-2 font-medium">Available slots for {data.date?.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {slots.length > 0 ? slots.map((time, idx) => {
            const isSelected = data.time === time;
            const isBooked = bookedSlots.includes(time);
            return (
              <div
                key={idx}
                onClick={() => {
                  if (isBooked) return;
                  setData({ ...data, time });
                  setTimeout(nextStep, 300);
                }}
                className={`text-center p-4 rounded-2xl border-2 transition-all duration-300 font-bold tracking-widest text-sm ${
                  isBooked
                    ? 'border-red-500/30 bg-red-500/10 text-red-400 cursor-not-allowed'
                    : isSelected 
                    ? 'border-primary bg-primary text-background shadow-[0_0_15px_rgba(201,162,74,0.3)] cursor-pointer' 
                    : 'border-white/5 bg-on-surface/5 text-on-surface hover:border-primary/50 cursor-pointer'
                }`}
              >
                {isBooked ? `${time} (Booked)` : time}
              </div>
            );
          }) : (
            <p className="col-span-full text-center text-on-surface/50 font-medium py-4">No available slots for this date. Please select another date.</p>
          )}
        </div>
      </motion.div>
    );
  };

  // Step 4: Form
  const renderStep4 = () => (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-on-surface font-serif uppercase">Your Details</h2>
        <p className="text-on-surface/60 text-sm mt-2 font-medium">Final step to secure your appointment</p>
      </div>

      {isUrgentBooking() && (
        <div className="bg-orange-500/10 border border-orange-500/50 rounded-2xl p-4 flex items-start gap-3">
          <Clock className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-orange-500">Urgent Booking</h4>
            <p className="text-xs text-orange-500/80 mt-1">Your appointment is scheduled very soon. Please reach the salon quickly!</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-4">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/40 w-5 h-5" />
            <input
              type="text"
              value={data.user.name}
              onChange={e => {
                const val = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                setData({ ...data, user: { ...data.user, name: val } });
              }}
              className="w-full bg-on-surface/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter your name"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-4">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/40 w-5 h-5" />
            <input
              type="tel"
              required
              minLength={10}
              maxLength={10}
              pattern="[0-9]{10}"
              value={data.user.phone}
              onChange={e => {
                const val = e.target.value.replace(/\D/g, "");
                if (val.length <= 10) {
                  setData({ ...data, user: { ...data.user, phone: val } });
                }
              }}
              className="w-full bg-on-surface/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:border-primary transition-colors"
              placeholder="10-digit mobile number"
            />
          </div>
        </div>
        {/*
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-4">Special Requests</label>
          <textarea
            value={data.user.notes}
            onChange={e => setData({ ...data, user: { ...data.user, notes: e.target.value } })}
            className="w-full bg-on-surface/5 border border-white/10 rounded-2xl py-4 px-5 text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:border-primary transition-colors min-h-[120px] resize-none"
            placeholder="Any specific requests or conditions?"
          />
        </div>
        */}

        <button 
          onClick={async () => {
            setIsSubmitting(true);
            try {
              // 1. Send to Backend (to save in DB)
              const res = await fetch('http://localhost:8081/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  service: data.service?.id,
                  date: data.date?.toISOString().split('T')[0],
                  time: data.time,
                  name: data.user.name,
                  phone: data.user.phone,
                  notes: data.user.notes,
                }),
              });

              if (!res.ok) throw new Error('Failed to save booking');

              // 2. Build WhatsApp message
              const dateStr = data.date?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              });

              const text = `*New Ritual Booking - Zen Tonez*\n\n` +
                `*Service:* ${data.service?.name}\n` +
                `*Date:* ${dateStr}\n` +
                `*Time:* ${data.time}\n\n` +
                `*Customer Details:*\n` +
                `*Name:* ${data.user.name}\n` +
                `*Phone:* ${data.user.phone}\n` +
                `*Notes:* ${data.user.notes || 'None'}`;

              const phoneNumber = "919751231239";
              const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

              // 3. Open WhatsApp
              window.open(url, "_blank");
              setStep(6);
            } catch (err) {
              alert('Something went wrong. Please try again.');
            } finally {
              setIsSubmitting(false);
            }
          }}
          disabled={!data.user.name || data.user.phone.length !== 10 || isSubmitting}
          className="w-full mt-6 bg-primary text-background py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:shadow-[0_0_20px_rgba(201,162,74,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          <Sparkles size={18} />
          {isSubmitting ? 'Confirming...' : 'Confirm Appointment'}
        </button>
      </div>
    </motion.div>
  );

  /*
  // Step 5: Summary
  const renderStep5 = () => (
    <motion.div
      key="step5"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} />
        </div>
        <h2 className="text-3xl font-black text-on-surface font-serif uppercase">Confirm Ritual</h2>
        <p className="text-on-surface/60 text-sm mt-2 font-medium">Please review your selections</p>
      </div>

      {isUrgentBooking() && (
        <div className="bg-orange-500/10 border border-orange-500/50 rounded-2xl p-4 flex items-start gap-3">
          <Clock className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-orange-500">Urgent Booking</h4>
            <p className="text-xs text-orange-500/80 mt-1">Your appointment is scheduled very soon. Please reach the salon quickly!</p>
          </div>
        </div>
      )}

      <div className="bg-on-surface/5 rounded-3xl p-6 sm:p-8 space-y-6 border border-white/5">
        <div className="flex gap-4 items-center pb-6 border-b border-white/10">
          <div className="p-4 bg-primary text-background rounded-2xl">
            {data.service?.icon}
          </div>
          <div>
            <h4 className="text-xl font-bold text-on-surface">{data.service?.name}</h4>
            <p className="text-sm text-primary font-black uppercase tracking-widest mt-1">{data.service?.price} • {data.service?.duration}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 text-on-surface/80">
            <CalendarIcon className="w-5 h-5 text-primary" />
            <span className="font-medium">{data.date?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-4 text-on-surface/80">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-medium">{data.time}</span>
          </div>
          <div className="flex items-center gap-4 text-on-surface/80">
            <User className="w-5 h-5 text-primary" />
            <span className="font-medium">{data.user.name} ({data.user.phone})</span>
          </div>
        </div>
      </div>

      <button 
        onClick={async () => {
          setIsSubmitting(true);
          try {
            // 1. Send to Backend (to save in DB)
            const res = await fetch('http://localhost:8081/api/reservations', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                service: data.service?.id,
                date: data.date?.toISOString().split('T')[0],
                time: data.time,
                name: data.user.name,
                phone: data.user.phone,
                notes: data.user.notes,
              }),
            });

            if (!res.ok) throw new Error('Failed to save booking');

            // 2. Build WhatsApp message (Matching your flowchart)
            const dateStr = data.date?.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            });

            const text = `*New Ritual Booking - Zen Tonez*\n\n` +
              `*Service:* ${data.service?.name}\n` +
              `*Date:* ${dateStr}\n` +
              `*Time:* ${data.time}\n\n` +
              `*Customer Details:*\n` +
              `*Name:* ${data.user.name}\n` +
              `*Phone:* ${data.user.phone}\n` +
              `*Notes:* ${data.user.notes || 'None'}`;

            const phoneNumber = "919751231239";
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

            // 3. Open WhatsApp (Matching your flowchart)
            window.open(url, "_blank");
            nextStep();
          } catch (err) {
            alert('Something went wrong. Please try again.');
          } finally {
            setIsSubmitting(false);
          }
        }}
        disabled={isSubmitting}
        className="w-full bg-primary text-background py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:shadow-[0_0_20px_rgba(201,162,74,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <Sparkles size={18} />
        {isSubmitting ? 'Confirming...' : 'Confirm Appointment'}
      </button>
    </motion.div>
  );
  */

  // Step 6: Success
  const renderStep6 = () => (
    <motion.div
      key="step6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 flex flex-col items-center justify-center text-center py-10"
    >
      <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
        <CheckCircle size={48} />
      </div>
      <h2 className="text-3xl sm:text-4xl font-black text-on-surface font-serif uppercase">Booking Successful!</h2>

      <div className="max-w-md space-y-4 mt-6">
        <p className="text-on-surface/80 text-sm sm:text-base font-medium leading-relaxed">
          Your appointment for <span className="text-primary font-bold">{data.service?.name}</span> has been confirmed for <span className="text-primary font-bold">{data.date?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {data.time}</span>.
        </p>

        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-5 mt-6 text-left">
          <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
            <Sparkles size={16} /> Important Note
          </h4>
          <p className="text-sm text-on-surface/80 leading-relaxed">
            {isUrgentBooking() ? (
              "Please reach the salon quickly! Our staff may take about 10 minutes to prepare everything perfectly for your service once you arrive."
            ) : (
              "Please arrive on time for your appointment. Kindly note that our staff may need about 10 minutes to set up and prepare everything for your service."
            )}
          </p>
        </div>
      </div>

      <button
        onClick={() => {
          setStep(1);
          setData({ service: null, date: null, time: null, user: { name: '', phone: '', notes: '' } });
        }}
        className="mt-8 bg-on-surface/10 text-on-surface py-4 px-8 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary hover:text-background transition-all"
      >
        Book Another Appointment
      </button>
    </motion.div>
  );

  return (
    <div className="max-w-2xl mx-auto w-full bg-surface sm:bg-on-surface/[0.02] sm:border border-white/5 sm:rounded-[3rem] p-4 sm:p-10 shadow-luxury-deep">

      {/* Progress Header */}
      {step < 5 && (
        <div className="mb-10 flex items-center justify-between">
          {step > 1 && step < 5 ? (
            <button
              onClick={prevStep}
              className="flex items-center gap-2 text-on-surface/50 hover:text-primary transition-colors text-xs font-black uppercase tracking-widest"
            >
              <ChevronLeft size={16} />
              Back
            </button>
          ) : <div className="w-20"></div>}

          <div className="flex gap-2">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-primary' : i < step ? 'w-4 bg-primary/50' : 'w-4 bg-on-surface/10'
                  }`}
              />
            ))}
          </div>
          <div className="w-20 text-right text-[10px] font-black uppercase tracking-widest text-primary/50">
            Step {Math.min(step, 4)} / 4
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 6 && renderStep6()}
        </AnimatePresence>
      </div>

    </div>
  );
};
