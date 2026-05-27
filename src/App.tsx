import { useState, useEffect } from "react";
import {
  Sparkles,
  Download,
  ChevronRight,
  AlertOctagon,
  Award,
  Check,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import AtsSimulator from "./components/AtsSimulator";
import ToolkitVideoWalkthrough from "./components/ToolkitVideoWalkthrough";
import ResumeComparison from "./components/ResumeComparison";
import ToolkitWalkthrough from "./components/ToolkitWalkthrough";
import FaqAccordion from "./components/FaqAccordion";
import InteractiveTestimonials from "./components/InteractiveTestimonials";
import PricingCard from "./components/PricingCard";

export default function App() {
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [buyerEmail, setBuyerEmail] = useState("");
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400 && window.innerWidth < 768) {
        setShowStickyCta(true);
      } else {
        setShowStickyCta(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePurchaseSuccess = (email: string) => {
    setBuyerEmail(email);
    setPurchaseSuccess(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-brand-dark text-slate-100 font-sans tech-grid relative overflow-hidden">

      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[70px] pointer-events-none pulse-slow" />

      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-[80px] pointer-events-none pulse-slow" />

      {/* HEADER */}
      <header className="border-b border-white/5 bg-brand-dark/80 backdrop-blur-md sticky top-0 z-40">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-2">

            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-brand-blue to-brand-cyan flex items-center justify-center font-black text-brand-dark">
              AI
            </div>

            <div>
              <span className="font-display font-bold text-white text-sm sm:text-base">
                AI Resume Builder
              </span>

              <span className="text-[10px] uppercase font-mono text-brand-cyan font-bold block leading-none">
                Toolkit Suite
              </span>
            </div>

          </div>

          {/* NAVIGATION */}
          <div className="hidden md:flex items-center gap-6 text-xs font-mono font-medium text-gray-300">

            <a href="#ats-simulator" className="hover:text-brand-blue transition-colors">
              ATS Scanner
            </a>

            <a href="#before-after-section" className="hover:text-brand-blue transition-colors">
              Before vs After
            </a>

            <a href="#toolkit-walkthrough" className="hover:text-brand-blue transition-colors">
              Package Tour
            </a>

            <a href="#testimonials-section" className="hover:text-brand-blue transition-colors">
              Testimonials
            </a>

            <a href="#faq-section" className="hover:text-brand-blue transition-colors">
              FAQs
            </a>

          </div>

          {/* HEADER CTA */}
          <a
            href="#pricing-card-section"
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-brand-blue border border-white/10 hover:border-brand-blue/30 text-xs font-bold text-white hover:text-brand-dark uppercase transition-all flex items-center gap-1.5"
          >
            <span>Get Access</span>

            <ChevronRight className="w-3" />
          </a>

        </div>
        
      <!-- Meta Pixel Code -->
      <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '4487749324829680');
      fbq('track', 'PageView');
      </script>
      <noscript><img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=4487749324829680&ev=PageView&noscript=1"
      /></noscript>
      <!-- End Meta Pixel Code -->

      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 md:py-16 relative">

        <AnimatePresence mode="wait">

          {purchaseSuccess ? (

            /* SUCCESS SCREEN */
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="glass-panel p-8 md:p-12 rounded-3xl border-brand-cyan/30 bg-brand-slate max-w-5xl mx-auto text-center space-y-8 relative overflow-hidden"
            >

              <div className="space-y-4">

                <div className="w-16 h-16 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan mx-auto">
                  <Award className="w-8 h-8" />
                </div>

                <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
                  Your Toolkit Is Ready
                </h2>

                <p className="text-sm text-gray-400 max-w-xl mx-auto">
                  Your files have been sent to{" "}
                  <strong className="text-brand-blue">
                    {buyerEmail}
                  </strong>
                </p>

              </div>

              <div className="p-6 bg-brand-dark/60 rounded-2xl border border-white/5 max-w-md mx-auto">

                <button
                  onClick={() => alert("Download started")}
                  className="w-full bg-linear-to-r from-brand-blue to-brand-cyan text-brand-dark font-black py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Toolkit Bundle
                </button>

              </div>

            </motion.div>

          ) : (

            /* LANDING PAGE */
            <div className="space-y-14 sm:space-y-20">

              {/* HERO SECTION */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start pt-2 md:pt-6">

                {/* LEFT HERO */}
                <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left">

                  {/* BADGE */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-[12px] sm:text-xs font-mono text-brand-blue font-bold uppercase tracking-wider">

                    <Sparkles className="w-3.5 h-3.5" />

                    <span>The Ultimate Job Shortlist Catalyst</span>

                  </div>

                  {/* HERO TITLE */}
                  <div className="space-y-4">

                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.05]">

                      Land More Interviews <br />

                      With{" "}

                      <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-blue to-brand-cyan neon-glow-blue">
                        AI Premium 🚀
                      </span>

                    </h1>

                    <p className="text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed">

                      ATS Resume Templates • AI Rewriter Prompts • LinkedIn Search
                      Optimization • Salary Negotiation Frameworks.

                    </p>

                  </div>

                  {/* ALERT */}
                  <p className="text-xs sm:text-sm text-red-400/90 font-mono flex items-start gap-1.5 max-w-xl italic leading-relaxed">

                    <AlertOctagon className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />

                    <span>
                      Most resumes get rejected before a recruiter even reads them.
                    </span>

                  </p>

                  {/* CTA BUTTONS */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                    <a
                      href="#pricing-card-section"
                      className="w-full sm:w-auto min-w-[220px] px-6 py-4 rounded-xl font-bold bg-linear-to-r from-brand-blue to-brand-cyan text-brand-dark text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center"
                    >
                      Get Instant Access — ₹299
                    </a>

                    <a
                      href="#ats-simulator"
                      className="w-full sm:w-auto min-w-[220px] px-6 py-4 rounded-xl font-bold bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm uppercase tracking-widest border border-white/10 flex items-center justify-center"
                    >
                      Try Interactive Simulator
                    </a>

                  </div>

                  {/* TRUST BADGES */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/5 pt-6">

                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <Check className="w-4 h-4 text-brand-cyan" />
                      ATS-Friendly
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <Check className="w-4 h-4 text-brand-cyan" />
                      Instant Download
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <Check className="w-4 h-4 text-brand-cyan" />
                      Fully Editable
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <Check className="w-4 h-4 text-brand-cyan" />
                      Lifetime Access
                    </div>

                  </div>

                </div>

                {/* RIGHT VIDEO */}
                <div className="lg:col-span-5 relative">

                  <div className="relative group">

                    <div className="absolute -inset-1.5 bg-linear-to-r from-brand-blue to-brand-cyan rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition duration-1000" />

                    <ToolkitVideoWalkthrough />

                  </div>

                </div>

              </section>

              {/* ATS SECTION */}
              <section id="ats-simulator" className="pt-6 md:pt-10">

                <div className="max-w-5xl mx-auto relative group">

                  <div className="absolute -inset-1.5 bg-linear-to-r from-brand-blue to-brand-cyan rounded-2xl blur-xl opacity-30 group-hover:opacity-40 transition duration-1000" />

                  <AtsSimulator />

                </div>

              </section>

              {/* BEFORE AFTER */}
              <section id="before-after-section" className="border-t border-white/5 pt-12 md:pt-16">
                <ResumeComparison />
              </section>

              {/* TOOLKIT */}
              <section id="toolkit-walkthrough" className="border-t border-white/5 pt-12 md:pt-16">
                <ToolkitWalkthrough />
              </section>

              {/* TESTIMONIALS */}
              <section id="testimonials-section" className="border-t border-white/5 pt-12 md:pt-16">
                <InteractiveTestimonials />
              </section>

              {/* FAQ */}
              <section id="faq-section" className="border-t border-white/5 pt-12 md:pt-16">
                <FaqAccordion />
              </section>

              {/* PRICING */}
              <section id="pricing-card-section" className="border-t border-white/5 pt-12 md:pt-16">
                <PricingCard onSuccess={handlePurchaseSuccess} />
              </section>

            </div>

          )}

        </AnimatePresence>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-brand-dark/90 py-6 md:py-8 text-xs text-gray-500 text-center space-y-3 font-mono">

        <p>
          © 2026 AI Resume Builder Toolkit. All rights reserved.
        </p>

      </footer>

      {/* MOBILE STICKY CTA */}
      <AnimatePresence>

        {showStickyCta && !purchaseSuccess && (

          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-brand-slate/95 backdrop-blur-md border-t border-brand-blue/30 p-3.5 flex items-center justify-between gap-4 md:hidden"
          >

            <div>

              <p className="text-[10px] uppercase font-mono text-gray-400">
                Launch Price
              </p>

              <div className="flex items-baseline gap-1.5 leading-none mt-0.5">

                <span className="text-lg font-display font-bold text-white">
                  ₹299
                </span>

                <span className="text-[9px] line-through text-gray-500 font-mono">
                  ₹2343
                </span>

              </div>

            </div>

            <a
              href="#pricing-card-section"
              className="flex-1 bg-linear-to-r from-brand-blue to-brand-cyan text-brand-dark text-[12px] font-black uppercase tracking-wider py-3 px-4 rounded-xl text-center"
            >
              Get Instant Access
            </a>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}