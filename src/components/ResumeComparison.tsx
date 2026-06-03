import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Mail, Phone, MapPin, Linkedin, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ResumeComparison() {
  const [activeTab, setActiveTab] = useState<"before" | "after">("after");
  const [scoreVal, setScoreVal] = useState(32);

  // Auto-animate score when mounting or toggling active tab
  useEffect(() => {
    let target = activeTab === "after" ? 91 : 32;
    let start = activeTab === "after" ? 32 : 91;
    let current = start;
    
    const interval = setInterval(() => {
      if (current === target) {
        clearInterval(interval);
      } else {
        current = target > start ? current + 1 : current - 1;
        setScoreVal(current);
      }
    }, 12);
    
    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div id="before-after-section" className="py-8">
      {/* Tab controls for mobile, visual comparison for desktop */}
      <div className="flex justify-center md:hidden gap-2 mb-6">
        <button
          id="compare-tab-before"
          onClick={() => setActiveTab("before")}
          className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all ${
            activeTab === "before"
              ? "bg-red-500/10 text-red-400 border-red-500/30"
              : "bg-brand-card text-gray-500 border-white/5"
          }`}
        >
          Before Resume (32%)
        </button>
        <button
          id="compare-tab-after"
          onClick={() => setActiveTab("after")}
          className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all ${
            activeTab === "after"
              ? "bg-brand-blue/10 text-brand-blue border-brand-blue/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]"
              : "bg-brand-card text-gray-500 border-white/5"
          }`}
        >
          After Resume (91%)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Side: Before Resume (Hidden on mobile if tab is 'after') */}
        <div className={`flex flex-col h-full ${activeTab === "after" ? "hidden md:flex" : "flex"}`}>
          <div className="glass-panel p-6 rounded-2xl border-red-500/10 bg-brand-dark/40 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-xs font-mono text-red-400 font-bold tracking-wider uppercase">
                    32% ATS Match Score (FAIL)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-gray-500">Unreadable Structure</span>
              </div>

              {/* Mock Bad Resume Layout */}
              <div className="bg-white text-gray-800 p-6 rounded-xl font-serif text-[11px] leading-relaxed relative min-h-[360px] overflow-hidden shadow-2xl">
                {/* Red outline overlays on bad sections */}
                <div className="absolute top-4 right-4 bg-red-100 text-red-600 border border-red-200 px-1.5 py-0.5 rounded text-[8px] font-mono select-none">
                  Times New Roman Font ✗
                </div>
                
                <h4 className="text-sm font-bold text-center underline tracking-wide text-black font-semibold">JOHNSON DOE</h4>
                <p className="text-center text-[10px] text-gray-500 mb-4">johnsondoe1998@gmail.com | 0987654321 | Delhi, India</p>
                
                <div className="border-t border-gray-300 pt-2 mb-3">
                  <div className="relative">
                    <h5 className="font-bold underline text-[10px] text-black">OBJECTIVE STATEMENT</h5>
                    <div className="mt-1 bg-red-500/5 border-l-2 border-red-400 pl-2 py-1">
                      <span className="text-[8px] text-red-500 block font-mono font-bold">Wastes 15% recruiter attention space ✗</span>
                    </div>
                  </div>
                  <p className="text-gray-600 italic pl-1 mt-1">
                    Seeking a challenging software engineer position where I can apply my academic parameters and learn more.
                  </p>
                </div>

                <div className="border-t border-gray-300 pt-2 mb-3">
                  <div className="relative">
                    <h5 className="font-bold underline text-[10px] text-black">WORK HISTORY</h5>
                    <div className="mt-1 bg-red-500/5 border-l-2 border-red-400 pl-2 py-1">
                      <span className="text-[8px] text-red-500 block font-mono font-bold">No quantitative metric achievements or business value ✗</span>
                    </div>
                  </div>
                  <p className="font-semibold text-[10px] text-black">Associate Developer at tech solution firm (2023 - Present)</p>
                  <ul className="list-disc pl-4 text-gray-600 mt-1 space-y-0.5">
                    <li>Developed web features and was in charge of server upkeep.</li>
                    <li>Wrote functions in React, and ran testing scripts occasionally.</li>
                    <li>Contributed to database schemas and backend services.</li>
                  </ul>
                </div>

                <div className="border-t border-gray-300 pt-2">
                  <div className="relative">
                    <h5 className="font-bold underline text-[10px] text-black">INTERESTS & SKILLS</h5>
                    <div className="mt-1 bg-red-500/5 border-l-2 border-red-400 pl-2 py-1">
                      <span className="text-[8px] text-red-500 block font-mono font-bold">Undifferentiated blocks cannot be scanned by parser ✗</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-1">Cricket, Travel, Coding, CSS, Java, Python, HTML, communication.</p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/5">
              <p className="text-xs text-gray-400">
                ⚠️ <span className="font-bold text-red-400">Why it fails:</span> Outdated format, passive responsibility-based phrases, soft hobbies wasting visual weight, zero quantifiable metrics. Replaced instantly by modern HR index files.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: After Resume (Hidden on mobile if tab is 'before') */}
        <div className={`flex flex-col h-full ${activeTab === "before" ? "hidden md:flex" : "flex"}`}>
          <div className="glass-panel p-6 rounded-2xl border-brand-blue/30 bg-brand-slate relative flex-1 flex flex-col justify-between">
            {/* Glowing borders */}
            <div className="absolute inset-0 border border-brand-blue/15 rounded-2xl pointer-events-none" />
            <div className="absolute -top-3 right-8 px-3 py-0.5 rounded bg-brand-cyan text-brand-dark text-[10px] font-mono font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,245,212,0.3)] select-none">
              Toolkit Activated
            </div>

            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-ping" />
                  <span className="text-xs font-mono text-brand-cyan font-bold tracking-wider uppercase">
                    {scoreVal}% Match Score (PASSED)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-brand-blue font-bold">ATS Optimized Parsing</span>
              </div>

              {/* Mock Good Resume Layout */}
              <div className="bg-slate-50 text-slate-800 p-6 rounded-xl font-sans text-[11px] leading-relaxed relative min-h-[360px] shadow-[0_0_35px_rgba(0,240,255,0.15)] select-text border border-white">
                
                {/* Visual highlights of good attributes */}
                <div className="absolute top-4 left-4 bg-brand-cyan/20 text-brand-cyan font-mono border border-brand-cyan/40 px-1.5 py-0.5 rounded text-[8.5px] font-bold select-none">
                  Inter (Clean Sans-Serif) ✓
                </div>

                <div className="flex justify-between items-start border-b border-slate-300 pb-4 mb-4 pt-4">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 tracking-tight leading-none uppercase">JOHNSON DOE</h4>
                    <span className="text-[9px] font-semibold text-brand-blue tracking-wide block mt-1 uppercase">LEAD FULL-STACK SOFTWARE ENGINEER</span>
                  </div>
                  <div className="text-right text-[8.5px] text-slate-600 leading-tight space-y-0.5">
                    <p className="flex items-center justify-end gap-1"><Mail className="w-2.5 h-2.5 text-brand-blue" /> info@johnsondoe.dev</p>
                    <p className="flex items-center justify-end gap-1"><Phone className="w-2.5 h-2.5 text-brand-blue" /> +91 98765 43210</p>
                    <p className="flex items-center justify-end gap-1"><MapPin className="w-2.5 h-2.5 text-brand-blue" /> New Delhi, DL</p>
                    <p className="flex items-center justify-end gap-1"><Linkedin className="w-2.5 h-2.5 text-brand-blue" /> linkedin.com/in/johndoe</p>
                  </div>
                </div>

                <div className="mb-3.5">
                  <h5 className="font-bold text-[9px] tracking-wider text-slate-900 uppercase border-b border-slate-200 pb-0.5 mb-1.5 font-sans">
                    PROFESSIONAL SUMMARY
                  </h5>
                  <p className="text-slate-600 text-[10.5px]">
                    Performance-driven Software Engineer with 2+ years of enterprise deployment experience. Optimized core backend pipelines to drive <span className="font-bold text-slate-900 underline decoration-cyan-400">+42% query acceleration</span> and secure highly scalable micro-service structures. High fluency in React architecture and automated CI/CD protocols.
                  </p>
                </div>

                <div className="mb-3">
                  <h5 className="font-bold text-[9px] tracking-wider text-slate-900 uppercase border-b border-slate-200 pb-0.5 mb-1.5 font-sans">
                    PROFESSIONAL EXPERIENCE
                  </h5>
                  <div>
                    <div className="flex justify-between font-bold text-[10px] text-slate-900">
                      <span>Associate Full-Stack Developer | InnovateTech</span>
                      <span className="text-slate-500">2023 — Present</span>
                    </div>
                    <ul className="list-disc pl-4 text-slate-600 mt-1 space-y-1">
                      <li>
                        <span className="font-bold text-slate-800">Engineered microservices</span> with React, boosting visual interface responsive speed by <span className="font-bold text-slate-900 underline decoration-cyan-400">27%</span> across heavy transaction screens.
                      </li>
                      <li>
                        <span className="font-bold text-slate-800">Synthesized MySQL query trees</span> to eliminate connection leaks, reducing background processing time by <span className="font-bold text-slate-900 underline decoration-cyan-400">15 hours weekly</span>.
                      </li>
                      <li>
                        <span className="font-bold text-slate-800">Bootstrapped automated GitHub integration</span> checkpoints, securing defect-free distributions.
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h5 className="font-bold text-[9px] tracking-wider text-slate-900 uppercase border-b border-slate-200 pb-0.5 mb-1.5 font-sans">
                    TECHNICAL CORE COMPETENCIES
                  </h5>
                  <div className="grid grid-cols-3 gap-y-1 text-slate-600 font-mono text-[9px]">
                    <div><span className="text-brand-blue font-bold">⚡ languages:</span> Java, JavaScript, Python</div>
                    <div><span className="text-brand-blue font-bold">⚡ framework:</span> React, Spring Boot, Node</div>
                    <div><span className="text-brand-blue font-bold">⚡ operations:</span> CI/CD, Git, MySQL, AWS</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-400">
              <span>🚀 <span className="font-bold text-brand-cyan">Why it wins:</span> Modern sans-serif, high-impact active metrics, searchable subgrid indexing, zero soft filler fluff.</span>
              <a
                href="#pricing-card-section"
                className="text-brand-blue hover:text-brand-cyan font-bold inline-flex items-center gap-1 shrink-0 transition-colors"
              >
                Get templates
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-8 text-center">
        <a
          href="#pricing-card-section"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold bg-linear-to-r from-brand-blue to-brand-cyan hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] text-brand-dark transition-all scale-100 hover:scale-[1.02] cursor-pointer"
        >
          Transform Your Resume Today — Only ₹99
        </a>
      </div>
    </div>
  );
}
