import React, { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Check,
  X,
  Star,
  Gift,
  Sparkles,
  ShieldCheck,
  Clock,
  Zap,
} from "lucide-react";
import { LuxuryMembershipHero } from "../components/ui/LuxuryMembershipHero";
import { Reveal } from "../components/ui/Reveal";
import { API_BASE_URL, loadRazorpayCheckout } from "../lib/payments";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

const Membership: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const [formState, setFormState] = useState({
    customerName: "",
    phone: "",
    email: "",
  });
  const [isPaying, setIsPaying] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = useMemo(
    () => Boolean(formState.customerName.trim() && formState.phone.trim()),
    [formState]
  );

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setError("");
    setIsPaying(true);

    try {
      await loadRazorpayCheckout();

      const orderRes = await fetch(`${API_BASE_URL}/api/membership/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!orderRes.ok) {
        const message = await orderRes.text();
        throw new Error(message || "Unable to start payment.");
      }

      const order = await orderRes.json();
      const razorpay = window.Razorpay
        ? new window.Razorpay({
            key: order.keyId,
            amount: order.amount,
            currency: order.currency,
            name: "Zen Tonez",
            description: `${order.planName} - 1 Year`,
            order_id: order.orderId,
            prefill: {
              name: formState.customerName,
              contact: formState.phone,
              email: formState.email,
            },
            theme: {
              color: "#B87333",
            },
            modal: {
              ondismiss: () => setIsPaying(false),
            },
            handler: async (response: Record<string, string>) => {
              try {
                const verifyRes = await fetch(
                  `${API_BASE_URL}/api/membership/verify-payment`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      ...formState,
                      razorpayOrderId: response.razorpay_order_id,
                      razorpayPaymentId: response.razorpay_payment_id,
                      razorpaySignature: response.razorpay_signature,
                    }),
                  }
                );

                if (!verifyRes.ok) {
                  const message = await verifyRes.text();
                  throw new Error(message || "Payment verification failed.");
                }

                setIsPurchased(true);
                setFormState({ customerName: "", phone: "", email: "" });
              } catch (verificationError) {
                setError(
                  verificationError instanceof Error
                    ? verificationError.message
                    : "Payment verification failed."
                );
              } finally {
                setIsPaying(false);
              }
            },
          })
        : null;

      if (!razorpay) {
        throw new Error("Razorpay checkout is unavailable.");
      }

      razorpay.open();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while opening payment."
      );
      setIsPaying(false);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-x-hidden bg-[#FDFCF0] text-[#1A1A1A] font-sans selection:bg-[#B87333]/20 relative min-h-screen pb-20"
    >
      <LuxuryMembershipHero
        title="Exclusive Membership"
        subtitle="The ultimate key to consistent beauty and luxury. Join our exclusive inner circle and transform your salon experience with unrivaled privileges."
        ctaText="JOIN NOW - Rs.199/YEAR"
        ctaLink="#join"
      />

      <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 tb:px-6 dt:px-8 relative z-10">
          <Reveal width="100%" direction="up">
            <div className="text-center mb-16 lg:mb-24">
              <h2 className="text-4xl lg:text-6xl font-black text-[#1A1A1A] mb-6 uppercase tracking-tighter font-serif">
                Unrivaled <span className="text-[#B87333]">Privileges</span>
              </h2>
              <p className="text-slate-600 text-lg lg:text-xl max-w-2xl mx-auto font-medium">
                Being a member at Zen Tonez is more than just a discount. It is
                a commitment to your long-term beauty journey.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                icon: Zap,
                title: "15% Flat Discount",
                desc: "Get an immediate 15% reduction on every service, from basic beauty to premium bridal packages.",
              },
              {
                icon: Clock,
                title: "Priority Booking",
                desc: "Skip the queue with exclusive access to priority time slots, even during peak festive seasons.",
              },
              {
                icon: Gift,
                title: "Birthday Rewards",
                desc: "Celebrate your special day with a complimentary surprise treatment or double discounts.",
              },
              {
                icon: ShieldCheck,
                title: "Valid for 365 Days",
                desc: "Enjoy your benefits all year round without any usage limits or blackout dates.",
              },
              {
                icon: Star,
                title: "Other Brand Products for Sale",
                desc: "Be the first to try our upcoming in-house performance-driven beauty product line.",
              },
              {
                icon: Sparkles,
                title: "Member Events",
                desc: "Invites to exclusive beauty workshops, masterclasses, and transformation sessions.",
              },
            ].map((benefit, i) => (
              <Reveal key={i} delay={i * 0.1} direction="up" width="100%">
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#B87333] shadow-sm mb-6 group-hover:rotate-12 transition-transform">
                    <benefit.icon size={28} />
                  </div>
                  <h3 className="text-xl font-black text-[#1A1A1A] uppercase tracking-tight mb-3 font-serif">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    {benefit.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-slate-50 overflow-hidden relative">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.1 }}
          className="absolute -left-20 top-1/2 -translate-y-1/2 text-[20vw] font-black text-[#B87333] pointer-events-none select-none whitespace-nowrap uppercase tracking-tighter"
        >
          Compare
        </motion.div>

        <div className="max-w-5xl mx-auto px-4 tb:px-6 dt:px-8 relative z-10">
          <Reveal width="100%" direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-[#1A1A1A] mb-6 uppercase tracking-tighter font-serif">
                Comparison <span className="text-[#B87333]">Guide</span>
              </h2>
            </div>
          </Reveal>

          <Reveal width="100%" direction="up">
            <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-6 lg:p-10 text-xs font-black uppercase tracking-widest">
                      Benefit
                    </th>
                    <th className="p-6 lg:p-10 text-xs font-black uppercase tracking-widest text-center bg-slate-800">
                      Guest
                    </th>
                    <th className="p-6 lg:p-10 text-xs font-black uppercase tracking-widest text-center text-[#B87333] bg-[#1A1A1A]">
                      Zen Tonez Member
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    {
                      feature: "Service Pricing",
                      guest: "Standard",
                      member: "15% Discount",
                    },
                    { feature: "Yearly Fee", guest: "Rs.0", member: "Rs.199" },
                    {
                      feature: "Booking Priority",
                      guest: "Standard",
                      member: "Priority Lane",
                    },
                    {
                      feature: "Birthday Gift",
                      guest: "None",
                      member: "Included",
                    },
                    {
                      feature: "Product Early Access",
                      guest: "No",
                      member: "Yes",
                    },
                    {
                      feature: "Usage Limit",
                      guest: "N/A",
                      member: "Unlimited",
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="p-6 lg:p-10 text-sm font-bold text-slate-700">
                        {row.feature}
                      </td>
                      <td className="p-6 lg:p-10 text-sm font-medium text-slate-500 text-center">
                        {row.guest === "No" ? (
                          <X className="mx-auto text-slate-300" size={20} />
                        ) : (
                          row.guest
                        )}
                      </td>
                      <td className="p-6 lg:p-10 text-sm font-black text-[#1A1A1A] text-center bg-[#B87333]/5">
                        {row.member === "Yes" ? (
                          <Check className="mx-auto text-[#B87333]" size={20} />
                        ) : (
                          row.member
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-8 mt-16">
            <Reveal width="100%" direction="left">
              <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm h-full">
                <h4 className="text-lg font-black text-slate-900 uppercase mb-4 flex items-center gap-2">
                  <Star size={20} className="text-[#B87333]" /> Pros of
                  Membership
                </h4>
                <ul className="space-y-3">
                  {[
                    "Unbeatable ROI: Pays for itself in 1-2 visits",
                    "Consistent savings on all beauty routines",
                    "Feeling valued as a long-term partner",
                    "No hidden costs or complex tiers",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="text-sm font-medium text-slate-600 flex items-start gap-2"
                    >
                      <div className="w-1.5 h-1.5 bg-[#B87333] rounded-full mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal width="100%" direction="right">
              <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm h-full">
                <h4 className="text-lg font-black text-slate-900 uppercase mb-4 flex items-center gap-2">
                  <Star size={20} className="text-slate-400" /> Things to
                  Consider
                </h4>
                <ul className="space-y-3">
                  {[
                    "One-time upfront fee of Rs.199",
                    "Discount does not stack with other promos",
                    "Non-transferable to other individuals",
                    "Valid only at our signature locations",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="text-sm font-medium text-slate-600 flex items-start gap-2"
                    >
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 tb:px-6 dt:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal width="100%" direction="left">
              <div className="space-y-8">
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tighter font-serif leading-none">
                  Services <span className="text-[#B87333]">Covered</span>
                </h2>
                <p className="text-slate-600 text-lg font-medium leading-relaxed">
                  Your membership discount applies to almost our entire service
                  catalog. Whether it is a monthly refresh or a once-in-a-lifetime
                  transformation.
                </p>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    "Skin Care",
                    "Facial Treatment",
                    "Manicure & Pedicure",
                    "Hair Care",
                    "Bridal Makeup",
                    "Nail Artistry",
                    "Lice Removal",
                    "Hair Styling",
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 py-3 border-b border-slate-100"
                    >
                      <Check size={16} className="text-[#B87333]" />
                      <span className="text-sm font-bold text-slate-800">
                        {s}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal width="100%" direction="right">
              <div className="bg-[#1A1A1A] rounded-[3rem] p-12 lg:p-16 text-white space-y-8 relative overflow-hidden group">
                <Sparkles
                  size={150}
                  className="absolute -bottom-10 -right-10 text-white/5 group-hover:text-white/10 transition-colors duration-700"
                />
                <h3 className="text-3xl font-serif font-black uppercase italic leading-none">
                  Ready to join the inner circle?
                </h3>
                <p className="text-white/60 font-medium leading-relaxed">
                  Join thousands of women who have already unlocked the Zen
                  Tonez Membership experience. It is time to reward yourself.
                </p>
                <div className="space-y-4 pt-4">
                  {[
                    "Buy your card securely online",
                    "Receive payment confirmation instantly",
                    "Unlock 15% OFF on your visits",
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-4 cursor-default"
                    >
                      <div className="w-10 h-10 bg-[#B87333] rounded-full flex items-center justify-center text-white font-black shadow-lg">
                        {i + 1}
                      </div>
                      <p className="text-sm font-bold">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="join"
        className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200"
      >
        <div className="max-w-6xl mx-auto px-4 tb:px-6 dt:px-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
            <Reveal width="100%" direction="left">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tighter font-serif leading-none">
                  Purchase <span className="text-[#B87333]">Membership</span>
                </h2>
                <p className="text-slate-600 text-lg font-medium leading-relaxed">
                  Customers can purchase the membership card directly from the
                  website. We collect their details, create a secure payment
                  order on the backend, and confirm the purchase after payment
                  verification.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: "Plan", value: "1 Year Card" },
                    { label: "Price", value: "Rs.199" },
                    { label: "Discount", value: "15% OFF" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-white border border-slate-200 rounded-3xl p-5"
                    >
                      <div className="text-[11px] uppercase tracking-[0.25em] text-slate-400 font-black">
                        {item.label}
                      </div>
                      <div className="mt-2 text-xl font-black text-slate-900">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal width="100%" direction="right">
              <div className="bg-white border border-slate-200 rounded-[2rem] p-6 lg:p-8 shadow-xl">
                {isPurchased ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Check size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase font-serif">
                      Membership Purchased
                    </h3>
                    <p className="text-slate-600 font-medium">
                      Payment has been verified and the membership purchase was
                      saved in the backend.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handlePurchase} className="space-y-5">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 uppercase font-serif">
                        Buy Online
                      </h3>
                      <p className="text-sm text-slate-500 font-medium mt-2">
                        Enter customer details and continue to secure checkout.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-[0.25em] text-slate-500 font-black block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.customerName}
                        onChange={(e) =>
                          setFormState((prev) => ({
                            ...prev,
                            customerName: e.target.value,
                          }))
                        }
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#B87333] outline-none transition-colors font-semibold"
                        placeholder="Customer name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-[0.25em] text-slate-500 font-black block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#B87333] outline-none transition-colors font-semibold"
                        placeholder="+91 00000 00000"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-[0.25em] text-slate-500 font-black block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#B87333] outline-none transition-colors font-semibold"
                        placeholder="customer@email.com"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-600 font-semibold">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={!canSubmit || isPaying}
                      className="w-full bg-[#1A1A1A] text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-sm disabled:opacity-60"
                    >
                      {isPaying ? "Processing..." : "Pay Rs.199"}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Membership;
