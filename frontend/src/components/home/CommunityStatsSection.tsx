import { ScrollReveal } from "./ScrollReveal";

const stats = [
  { label: "Professional Experience", value: "5+ Years" },
  { label: "Our Sanctuary", value: "Exclusive Women's Salon" },
  { label: "Premium Products Only", value: "High-End" },
  { label: "Hygienic Standards", value: "100%" },
  { label: "Personalized Service", value: "Bespoke" },
  { label: "Community-Focused", value: "Local" },
];

export function CommunityStatsSection() {
  return (
    <section className="py-8 tb:py-12 dt:py-16 relative bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 tb:px-6 dt:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10 tb:mb-16 dt:mb-20 px-4 mb:px-0">
            <h2 className="text-section-title font-black text-on-surface mb-4 tb:mb-6 uppercase tracking-tighter font-serif">
              Why{" "}
              <span className="text-primary underline decoration-secondary/30 underline-offset-8">
                Choose Us ?
              </span>
            </h2>
            <p className="text-base tb:text-lg dt:text-xl text-on-surface/80 max-w-2xl mx-auto font-medium leading-relaxed">
              We combine years of professional experience with medical-grade hygiene standards to provide a luxury experience you can trust.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 dt:grid-cols-3 gap-4 tb:gap-8 dt:gap-12 px-4 mb:px-0">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1} className="h-full">
              <div className="h-full flex flex-col justify-center text-center p-4 tb:p-6 dt:p-8 rounded-2xl tb:rounded-3xl bg-secondary/5 border border-secondary/10 shadow-luxury-soft transform-gpu transition-all duration-500 hover:shadow-luxury-deep hover:-translate-y-2">
                <div className="text-2xl tb:text-3xl dt:text-4xl font-black text-primary mb-2 tb:mb-4 font-serif">
                  {stat.value}
                </div>
                <div className="text-[9px] tb:text-xs font-bold text-on-surface uppercase tracking-widest opacity-80">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
