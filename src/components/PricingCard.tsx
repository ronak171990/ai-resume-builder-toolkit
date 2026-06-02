import { useState, useEffect, FormEvent } from "react";
import { Check, ShieldCheck, Mail, Lock, Star, Sparkles, Download, Clock, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

declare const fbq: any;

interface PricingProps {
  onSuccess: (email: string) => void;
}

export default function PricingCard({ onSuccess }: PricingProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutOpened, setCheckoutOpened] = useState(false);
  const [timeLeft, setTimeLeft] = useState(865); // 14 mins 25 secs initially

  // Ticking countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 865));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s < 10 ? "0" : ""}${s}s`;
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    
    setIsSubmitting(true);
    
    // Simulate payment authorization
    setTimeout(() => {
      setIsSubmitting(false);
      setCheckoutOpened(false);
      onSuccess(email);
    }, 1800);
  };

  return (
    <div id="pricing-card-section" className="max-w-2xl mx-auto py-6">
      <div className="glass-panel rounded-3xl border-brand-blue/40 bg-gradient-to-b from-brand-slate to-brand-dark overflow-hidden relative shadow-[0_0_50px_rgba(0,240,255,0.15)]">
        
        {/* Urgent Launch Ribbon */}
        <div className="bg-brand-blue text-brand-dark font-sans text-xs font-black uppercase text-center py-2.5 tracking-widest flex items-center justify-center gap-1.5 shadow-md">
          <Zap className="w-3.5 h-3.5 fill-current animate-bounce" />
          <span>87% OFF Launch Discount • Lifetime Access Left</span>
        </div>

        <div className="p-8 md:p-10">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/20 font-bold">
                  Limited-Time Offer
                </span>
                <span className="flex items-center gap-1 font-mono text-xs text-brand-blue font-bold">
                  <Clock className="w-3.5 h-3.5 text-brand-blue animate-spin" />
                  Price rises soon in {formatTime(timeLeft)}
                </span>
              </div>
              <h4 className="text-3xl font-display font-bold text-white mt-2">
                AI Resume Builder Toolkit
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                The comprehensive career-level breakthrough suite
              </p>
            </div>
            
            <div className="text-left md:text-right shrink-0">
              <span className="text-xs text-gray-500 line-through block font-mono">
                Original Price ₹2,343
              </span>
              <p className="flex items-baseline md:justify-end gap-1.5">
                <span className="text-4xl font-display font-extrabold text-white">₹99</span>
                <span className="text-xs font-bold text-brand-cyan font-mono">LIFETIME</span>
              </p>
              <span className="text-[10px] text-brand-cyan font-mono block mt-0.5">
                One-Time Payment • No Recurrent Fees
              </span>
            </div>
          </div>

          {/* Included Features Bulletproof details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="space-y-3.5 text-xs text-gray-300">
              <div className="flex gap-2.5 items-start">
                <div className="w-4 h-4 rounded-full bg-brand-blue/20 flex items-center justify-center mt-0.5 text-brand-blue shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>ATS-Optimized Resume Templates (Word + Google Docs)</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="w-4 h-4 rounded-full bg-brand-blue/20 flex items-center justify-center mt-0.5 text-brand-blue shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>AI-Powered Resume Rewrite Prompts for ChatGPT & Gemini</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="w-4 h-4 rounded-full bg-brand-blue/20 flex items-center justify-center mt-0.5 text-brand-blue shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>LinkedIn Profile Optimization System for Recruiter Visibility</span>
              </div>
            </div>
            <div className="space-y-3.5 text-xs text-gray-300">
              <div className="flex gap-2.5 items-start">
                <div className="w-4 h-4 rounded-full bg-brand-blue/20 flex items-center justify-center mt-0.5 text-brand-blue shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>HR Interview Question & Salary Negotiation Playbook</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="w-4 h-4 rounded-full bg-brand-blue/20 flex items-center justify-center mt-0.5 text-brand-blue shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>High-Converting Cover Letter Templates & Frameworks</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="w-4 h-4 rounded-full bg-brand-blue/20 flex items-center justify-center mt-0.5 text-brand-blue shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Lifetime Updates + Instant Access to Future Toolkit Improvements</span>
              </div>
            </div>
          </div>

          {/* Secure Purchase Trigger button */}
          <button
            id="checkout-trigger-btn"
            onClick={() => {

              fbq('track', 'InitiateCheckout', {
                  value: 99,
                  currency: 'INR'
              });

              window.open("https://rzp.io/rzp/KRO069uU", "_blank");
            }}
            className="w-full bg-linear-to-r from-brand-blue to-brand-cyan hover:shadow-[0_0_35px_rgba(0,240,255,0.4)] text-brand-dark font-black py-4 rounded-2xl text-sm uppercase tracking-widest transition-all scale-100 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Get Instant Access Now — ₹99</span>
          </button>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-y-2 gap-x-5 mt-6 text-[10px] text-gray-400 font-mono">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" /> Secure SSL Connection
            </span>
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-brand-cyan" /> 256-bit AES Encryption
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-brand-cyan" /> 100% Satisfaction Assured
            </span>
          </div>

        </div>
      </div>

      {/* Floating Checkout Modal Checkout */}
      <AnimatePresence>
        {checkoutOpened && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel w-full max-w-md bg-brand-slate border border-brand-blue/30 rounded-2xl relative overflow-hidden text-white"
            >
              <div className="bg-brand-blue/10 border-b border-brand-blue/20 p-5">
                <div className="flex justify-between items-center">
                  <h5 className="font-display font-bold text-lg text-white">Secure Portal Checkout</h5>
                  <button
                    id="close-checkout"
                    onClick={() => setCheckoutOpened(false)}
                    className="text-gray-400 hover:text-white font-mono text-sm uppercase p-1.5 hover:bg-white/5 rounded cursor-pointer"
                  >
                    ✕ Close
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  You are purchasing: AI Resume Builder Toolkit for <strong className="text-brand-blue">₹99</strong>
                </p>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-4">
                <div>
                  <label className="text-xs text-gray-400 font-mono block mb-1">Full Name *</label>
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    className="w-full bg-brand-dark/80 rounded-xl border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue transition-all"
                    placeholder="E.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-mono block mb-1">Email Coordinates *</label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    className="w-full bg-brand-dark/80 rounded-xl border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue transition-all"
                    placeholder="rahul@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="text-[9px] text-gray-500 block mt-1">Required to dispatch file links immediately</span>
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-mono block mb-1">Phone Number (Optional)</label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    className="w-full bg-brand-dark/80 rounded-xl border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue transition-all"
                    placeholder="+91 99999 88888"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="bg-brand-dark/50 p-3 rounded-lg flex items-center justify-between text-[11px] font-mono text-gray-400 border border-white/5">
                  <span>Net Amount due:</span>
                  <strong className="text-white text-base">₹99</strong>
                </div>

                <button
                  id="checkout-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-cyan hover:bg-brand-blue text-brand-dark font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      <span>Authorizing Sandbox Secure SSL...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Authorize Payment & Download Suite</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
