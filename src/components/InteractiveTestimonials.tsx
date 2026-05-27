import { Star, ShieldCheck, Quote } from "lucide-react";
import { Testimonial } from "../types";

const TESTIMONIAL_DATA: Testimonial[] = [
  {
    id: "rahul",
    name: "Rahul Sharma",
    role: "Software Engineer",
    company: "Deloitte India",
    quote: "I was rejected by 40+ ATS filters before getting this toolkit. Spent one hour applying the 'Spring Boot' optimization parameters and XYZ templates. Ended up pulling 3 interviews in a single week! Unbelievable ROI.",
    rating: 5,
    avatarSeed: "RS",
    tag: "Placed Developer"
  },
  {
    id: "priya",
    name: "Priya Varghese",
    role: "MBA Graduate",
    company: "HDFC Bank",
    quote: "The ATS templates and objective-line rewrite rules literally changed the dynamic. I looked like an amateur before; now my summary radiates extreme business-owner impact. Worth 10x the small price.",
    rating: 5,
    avatarSeed: "PV",
    tag: "Marketing Associate"
  },
  {
    id: "aman",
    name: "Aman Kapoor",
    role: "Data Analyst",
    company: "ZS Associates",
    quote: "My LinkedIn optimization instructions alone are gold. I followed the secondary skill indexing strategy, and within days, two external executive recruiters pinged me on LinkedIn about active unlisted positions.",
    rating: 5,
    avatarSeed: "AK",
    tag: "Career Switcher"
  },
  {
    id: "tanya",
    name: "Tanya Sen",
    role: "Product Designer",
    company: "Zepto",
    quote: "The HR Negotiation guide prepared me to counter their initial low-bracket offer elegantly. Ended up sealing a 45% increase on my final onboarding salary CTC. Essential toolkit for every job hunter.",
    rating: 5,
    avatarSeed: "TS",
    tag: "CTC Scaled"
  }
];

export default function InteractiveTestimonials() {
  return (
    <div id="testimonials-section" className="py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TESTIMONIAL_DATA.map((t) => (
          <div
            id={`testimonial-card-${t.id}`}
            key={t.id}
            className="glass-panel p-6 rounded-2xl border-white/5 hover:border-brand-blue/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden bg-gradient-to-b from-brand-card/90 to-brand-dark/40"
          >
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 bg-brand-blue/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div className="relative">
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-white/5 absolute -top-2 -right-1" />
              
              <p className="text-sm text-gray-300 italic mb-6 leading-relaxed relative z-10">
                “{t.quote}”
              </p>
            </div>

            <div className="flex items-center gap-3 border-t border-white/5 pt-4">
              {/* User Avatar Circle */}
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-brand-blue/30 to-brand-cyan/20 border border-brand-blue/30 flex items-center justify-center font-bold text-xs text-brand-blue font-mono shrink-0 select-none">
                {t.avatarSeed}
              </div>
              
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white tracking-wide truncate">{t.name}</p>
                <p className="text-[10px] text-gray-400 truncate">{t.role} @ <span className="text-brand-cyan">{t.company}</span></p>
                <span className="text-[9px] font-mono font-medium px-1.5 py-0.2 rounded bg-brand-blue/10 text-brand-blue border border-brand-blue/10 inline-block mt-1">
                  {t.tag}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
