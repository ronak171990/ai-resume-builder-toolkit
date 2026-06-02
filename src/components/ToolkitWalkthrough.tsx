import { useState } from "react";
import { 
  FileText, Terminal, Linkedin, UserCheck, MessageSquarePlus, 
  Flame, CheckSquare, Sparkles, Copy, Check, ChevronRight, Play, Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ToolkitTopic {
  id: string;
  title: string;
  shortDesc: string;
  icon: any;
  color: string;
  tag: string;
}

const TOPICS: ToolkitTopic[] = [
  {
    id: "templates",
    title: "ATS Resume Templates",
    shortDesc: "Word & Google Doc templates thoroughly optimized to pass ATS parsers and grab headhunter eyes.",
    icon: FileText,
    color: "text-brand-blue",
    tag: "High-Parse Layouts"
  },
  {
    id: "prompts",
    title: "AI Resume Prompts",
    shortDesc: "Copy-paste prompts engineered for ChatGPT & Gemini to translate experience bullets into massive wins.",
    icon: Terminal,
    color: "text-brand-cyan",
    tag: "Gemini / ChatGPT Ready"
  },
  {
    id: "linkedin",
    title: "LinkedIn Optimization",
    shortDesc: "Step-by-step framework to trigger search algorithms and have recruiter inboxes ring automatically.",
    icon: Linkedin,
    color: "text-blue-500",
    tag: "Recruiter Magnet"
  },
  {
    id: "interview",
    title: "HR Interview Guide",
    shortDesc: "The high-stakes question playbook. Master 'Tell me about yourself' and double your salary negotiation power.",
    icon: UserCheck,
    color: "text-purple-400",
    tag: "Salary Multiplier"
  },
  {
    id: "letters",
    title: "Cover Letter Templates",
    shortDesc: "High-impact narrative structures that link your experiences natively to standard JD requirements.",
    icon: MessageSquarePlus,
    color: "text-amber-400",
    tag: "Instant Conversions"
  },
  {
    id: "words",
    title: "Resume Power Words",
    shortDesc: "Eliminate passive terms. Replace 'Responsible for', 'Helped', or 'Participated' with action verbs.",
    icon: Flame,
    color: "text-rose-400",
    tag: "Action vocabulary"
  },
  {
    id: "checklist",
    title: "ATS Resume Checklist",
    shortDesc: "A systematic, step-by-step checklist to review every line before clicking standard submit fields.",
    icon: CheckSquare,
    color: "text-emerald-400",
    tag: "Bulletproof Guard"
  }
];

export default function ToolkitWalkthrough() {
  const [activeTopicId, setActiveTopicId] = useState("templates");
  const [copiedText, setCopiedText] = useState("");
  const [activeTemplateStyle, setActiveTemplateStyle] = useState("catalyst");
  
  // States for sub interactive components
  const [promptJobTitle, setPromptJobTitle] = useState("Software Engineer");
  const [promptImpact, setPromptImpact] = useState("reduced api latency by 40%");
  
  const [answeredInterview, setAnsweredInterview] = useState<string | null>(null);
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => {
      setCopiedText("");
    }, 1500);
  };

  const getAiPromptText = () => {
    return `Act as an expert technical CV writer. I will give you a weak resume bullet point. Rewrite it using active verbs, metrics-driven achievements, and optimal technical keyword tokens for the role of ${promptJobTitle}. 

Weak bullet: "${promptImpact}"

Structure the rewritten response following the XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]" and provide three variations with matching core tokens.`;
  };

  return (
    <div id="toolkit-walkthrough" className="py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Topic Navigation Menu */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <p className="text-xs font-mono text-brand-blue uppercase tracking-wider font-bold">
            Interactive Product Tour
          </p>
          <h3 className="text-3xl font-display font-medium text-white mb-4">
            Peek Under The Hood Of The Toolkit
          </h3>
          
          <div className="flex flex-col gap-2.5">
            {TOPICS.map((topic) => {
              const Icon = topic.icon;
              const isActive = topic.id === activeTopicId;
              
              return (
                <button
                  id={`btn-topic-${topic.id}`}
                  key={topic.id}
                  onClick={() => setActiveTopicId(topic.id)}
                  className={`w-full text-left p-4 rounded-xl flex items-start gap-4 transition-all relative overflow-hidden group cursor-pointer border ${
                    isActive
                      ? "bg-brand-card/90 border-brand-blue/30 shadow-[0_0_15px_rgba(0,240,255,0.08)]"
                      : "bg-brand-dark/20 border-white/5 hover:border-white/10"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue" />
                  )}
                  <div className={`p-2 rounded-lg bg-white/5 ${isActive ? topic.color : "text-gray-400"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold transition-colors ${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                        {topic.title}
                      </span>
                      <span className="text-[9px] font-mono font-medium px-1.5 py-0.2 rounded bg-white/5 text-gray-400">
                        {topic.tag}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                      {topic.shortDesc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Immersive Interactive Demo Panel */}
        <div className="lg:col-span-12 xl:col-span-7 glass-panel p-6 md:p-8 rounded-2xl border-white/10 min-h-[460px] flex flex-col justify-between">
          <div>
            {/* ATS Templates Interactive Module */}
            {activeTopicId === "templates" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h4 className="font-display font-medium text-lg text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-blue" />
                    Interactive Template Sandbox
                  </h4>
                  <div className="flex gap-1.5">
                    {["catalyst", "executive", "minimal"].map((style) => (
                      <button
                        id={`template-style-btn-${style}`}
                        key={style}
                        onClick={() => setActiveTemplateStyle(style)}
                        className={`text-[10px] px-2.5 py-1 rounded font-medium border uppercase tracking-wider transition-all ${
                          activeTemplateStyle === style
                            ? "bg-brand-blue/15 border-brand-blue text-brand-blue font-bold"
                            : "bg-white/5 border-white/5 text-gray-400"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  Clean, minimalist grid layouts built directly inside accessible .docx & Google Doc formats. Engineered to exceed standard machine parsing guidelines with a beautiful typographic rhythm for manual HR review.
                </p>

                {/* Simulated Template Canvas preview */}
                <div className="bg-slate-900 border border-white/10 rounded-xl p-4 font-mono text-[11px] leading-relaxed relative overflow-hidden text-gray-300">
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-brand-cyan/20 px-2 py-0.5 rounded text-[8px] text-brand-cyan border border-brand-cyan/20">
                    <Sparkles className="w-2.5 h-2.5" /> Tested: Passed and shortlisting
                  </div>

                  {activeTemplateStyle === "catalyst" && (
                    <div className="space-y-3">
                      <div className="border-b border-brand-cyan/30 pb-2">
                        <p className="text-sm font-bold tracking-tight text-white uppercase font-sans">Catalyst Modern Template</p>
                        <p className="text-[10px] text-brand-blue mt-0.5 font-sans">TECH • SAAS • ENGINEERING COMPLIANT</p>
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-2 w-1/3 bg-brand-blue/35 rounded" />
                        <div className="h-2.5 w-full bg-white/10 rounded" />
                        <div className="h-2.5 w-11/12 bg-white/10 rounded" />
                      </div>
                      <div className="border-t border-white/5 pt-2">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-gray-400">Core tokens configured:</span>
                          <span className="text-brand-cyan">Kubernetes, API pipelines, CI/CD</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTemplateStyle === "executive" && (
                    <div className="space-y-3">
                      <div className="border-b border-amber-400/30 pb-2">
                        <p className="text-sm font-bold tracking-tight text-white uppercase font-serif">Executive Class Design</p>
                        <p className="text-[10px] text-amber-300 mt-0.5 font-serif">MANAGEMENT • DIRECTORS • CONSULTING</p>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-white/5 rounded border-l-2 border-amber-400 p-1 text-[9px] flex items-center">
                          Strategic Leadership & Operational Growth Summary Block
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded" />
                        <div className="h-2 w-5/6 bg-white/10 rounded" />
                      </div>
                      <div className="border-t border-white/5 pt-2">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-gray-400">Layout index strategy:</span>
                          <span className="text-amber-400">Double-column split grid optimized for OCR</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTemplateStyle === "minimal" && (
                    <div className="space-y-3">
                      <div className="border-b border-gray-400/30 pb-2">
                        <p className="text-sm font-bold tracking-tight text-white uppercase font-sans">Aesthetic Minimalist Form</p>
                        <p className="text-[10px] text-gray-400 mt-0.5 font-sans">FRESHERS • ACADEMICS • OPERATIONS</p>
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-2 w-1/4 bg-gray-400 rounded" />
                        <div className="h-2 bg-white/10 rounded" />
                        <div className="h-2 bg-white/10 rounded" />
                        <div className="h-2 bg-white/10 rounded" />
                      </div>
                      <div className="border-t border-white/5 pt-2">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-gray-400">Font styling recommendation:</span>
                          <span className="text-gray-300">Century Gothic or Georgia (Size 10-11)</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* AI Resume Prompts Sandbox */}
            {activeTopicId === "prompts" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h4 className="font-display font-medium text-lg text-white flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-brand-cyan" />
                    AI Prompt Generator Sandbox
                  </h4>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded">
                    Adjust Variables to See Live Query Changes
                  </span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  We engineered elite prompt constructs that instruct AI systems to bypass simple explanations and generate metric-dense, high-impact XYZ templates for any profession.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-1">
                  <div>
                    <label className="text-[10px] text-gray-400 font-mono block mb-1">Target Job Title</label>
                    <input
                      id="prompt-job-input"
                      type="text"
                      className="w-full bg-brand-dark/80 rounded border border-white/10 px-2 py-1.5 text-xs text-white focus:outline-none focus:border-brand-blue"
                      value={promptJobTitle}
                      onChange={(e) => setPromptJobTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 font-mono block mb-1">Your Loose Experience Core</label>
                    <input
                      id="prompt-impact-input"
                      type="text"
                      className="w-full bg-brand-dark/80 rounded border border-white/10 px-2 py-1.5 text-xs text-white focus:outline-none focus:border-brand-blue"
                      value={promptImpact}
                      onChange={(e) => setPromptImpact(e.target.value)}
                    />
                  </div>
                </div>

                <div className="bg-brand-dark/80 border border-white/10 rounded-xl p-4 relative font-mono text-[11px] leading-relaxed select-text text-gray-300">
                  <div className="absolute top-3 right-3">
                    <button
                      id="prompt-copy-btn"
                      onClick={() => handleCopy(getAiPromptText())}
                      className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                      title="Copy Prompt"
                    >
                      {copiedText === getAiPromptText() ? <Check className="w-3.5 h-3.5 text-brand-cyan" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <span className="text-[9px] font-mono text-brand-cyan font-bold block mb-1">PROMPT PROTOTYPE</span>
                  <div className="overflow-y-auto max-h-[140px] text-left pr-2 whitespace-pre-wrap text-gray-400">
                    {getAiPromptText()}
                  </div>
                </div>
              </div>
            )}

            {/* LinkedIn Optimization Checklist */}
            {activeTopicId === "linkedin" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h4 className="font-display font-medium text-lg text-white flex items-center gap-2">
                    <Linkedin className="w-5 h-5 text-blue-500 animate-pulse" />
                    LinkedIn Recruiter Optimization
                  </h4>
                  <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded font-bold">
                    +540% Recruiter Sourcing
                  </span>
                </div>

                <p className="text-xs text-gray-300">
                  LinkedIn handles over 100 million recruiter searches globally weekly. This guide shows how to strategically stack secondary SEO skills so your profile triggers premium search filters instantly.
                </p>

                <div className="space-y-2.5">
                  <div className="p-3 bg-brand-dark/40 border border-white/5 rounded-xl flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5 text-blue-400 text-xs font-bold font-mono">1</div>
                    <div>
                      <p className="text-xs font-semibold text-white">The SEO Keyword Headline Formula</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Stop using "Student at..." or "Seeking job". Swap in: "[Target Role] | [Core Technical Skills Stack] | [Quantified Achievement metric]."</p>
                    </div>
                  </div>
                  <div className="p-3 bg-brand-dark/40 border border-white/5 rounded-xl flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5 text-blue-400 text-xs font-bold font-mono">2</div>
                    <div>
                      <p className="text-xs font-semibold text-white">The Creator Mode Indexing Strategy</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Learn how toggling custom Creator Tags flags your profile in search algorithms for specialized requirements (e.g. #MySQL, #FullStack, #PerformanceOptimization).</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* HR Interview Guide Playbook */}
            {activeTopicId === "interview" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h4 className="font-display font-medium text-lg text-white flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-purple-400" />
                    Negotiation & Interview Guide
                  </h4>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-400/10 border border-purple-400/20 px-2 py-0.5 rounded font-bold uppercase">
                    Salary Catalyst
                  </span>
                </div>

                <p className="text-xs text-gray-300">
                  Getting the interview call is phase 1. Converting that call into a premium 6-figure offer is phase 2. Master high-impact answer frameworks with our interactive question analysis playground:
                </p>

                <div className="bg-brand-dark/80 p-4 border border-white/5 rounded-xl space-y-3">
                  <p className="text-xs font-bold text-white font-mono">HR: "What is your current salary & salary expectation?"</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    <button
                      id="opt-ans-a"
                      onClick={() => setAnsweredInterview("a")}
                      className={`p-3 rounded-lg text-left text-xs transition-all border ${
                        answeredInterview === "a"
                          ? "bg-red-500/10 border-red-500 text-red-300"
                          : "bg-white/5 border-white/5 hover:border-white/10 text-gray-300"
                      }`}
                    >
                      <span className="font-bold block mb-1">Classic Response (Fail) ✗</span>
                      "My last CTC was ₹6 LPA, and I'm aiming for standard 30% increment which is ₹7.8 LPA."
                    </button>
                    <button
                      id="opt-ans-b"
                      onClick={() => setAnsweredInterview("b")}
                      className={`p-3 rounded-lg text-left text-xs transition-all border ${
                        answeredInterview === "b"
                          ? "bg-brand-cyan/15 border-brand-cyan text-white"
                          : "bg-white/5 border-white/5 hover:border-white/10 text-gray-300"
                      }`}
                    >
                      <span className="font-bold text-brand-cyan block mb-1">The Toolkit Anchor Value (Win) ✓</span>
                      "I'm looking of high-value alignment. Currently evaluating market packages of ₹12 to ₹15 LPA based on core business contribution."
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {answeredInterview && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className={`text-[11px] p-2.5 rounded mt-3 leading-relaxed border ${
                          answeredInterview === "a"
                            ? "bg-red-500/5 border-red-500/20 text-gray-300"
                            : "bg-brand-cyan/5 border-brand-cyan/20 text-brand-cyan"
                        }`}
                      >
                        {answeredInterview === "a" ? (
                          <span>❌ <strong>Why this loses:</strong> You instantly bracketed yourself at the absolute floor of their budget, locking out further scaling. You anchored your worth purely to outdated numbers rather than role complexity.</span>
                        ) : (
                          <span>✨ <strong>Why this wins:</strong> Absolute professional frame. You didn't leak historical numbers, anchored the benchmark high based on industry indices, and immediately shifted alignment from passive cost-centers to investment value.</span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Other topics placeholder detailed summaries (Cover Letters, Power words, Checklist) */}
            {["letters", "words", "checklist"].includes(activeTopicId) && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h4 className="font-display font-medium text-lg text-white font-semibold">
                    {TOPICS.find(t => t.id === activeTopicId)?.title} Preview
                  </h4>
                  <span className="text-[10px] font-mono text-gray-400 tracking-wide">Included in Toolkit Package</span>
                </div>

                <div className="p-4 bg-brand-dark/40 border border-white/5 rounded-xl">
                  {activeTopicId === "letters" && (
                    <div className="space-y-2 text-xs">
                      <p className="font-semibold text-brand-blue">✍ High-Conversion Narrative Hooks:</p>
                      <p className="text-gray-400">Tear down generic "As an enthusiastic coder..." openings. Implement dynamic introduction frameworks that tie your background instantly to corporate pain points, guaranteeing higher reading rates.</p>
                      <div className="bg-brand-dark/80 p-3 rounded font-mono text-[10px] leading-relaxed border border-white/5 text-gray-400">
                        <span className="text-brand-cyan">Opening hook:</span> "With companies scaling database operations to handle +300% spikes, I was excited to see how your backend team manages query bottlenecks..."
                      </div>
                    </div>
                  )}

                  {activeTopicId === "words" && (
                    <div className="space-y-2 text-xs">
                      <p className="font-semibold text-brand-cyan">🔥 Action-First Verb Replacements:</p>
                      <p className="text-gray-400">Swap passive, weak descriptors with high-authority technical synonyms to give your bullet sentences professional density:</p>
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mt-2">
                        <div className="p-2 rounded bg-red-500/10 text-red-300 border border-red-500/20 text-center">✗ "Responsible for DB stuff"</div>
                        <div className="p-2 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-center">✓ "Spearheaded query trees"</div>
                        <div className="p-2 rounded bg-red-500/10 text-red-300 border border-red-500/20 text-center">✗ "Helped with REST APIs"</div>
                        <div className="p-2 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-center">✓ "Orchestrated backend endpoints"</div>
                      </div>
                    </div>
                  )}

                  {activeTopicId === "checklist" && (
                    <div className="space-y-3 text-xs">
                      <p className="font-semibold text-brand-blue">🚀 Bulletproof Submission Review Guard:</p>
                      <div className="space-y-2 text-[11px]">
                        <div className="flex gap-2 items-center text-gray-300">
                          <input type="checkbox" defaultChecked className="accent-brand-blue" />
                          <span>Verify zero nested tables, icons, or complex vector text in header blocks (ATS OCR blind spots)</span>
                        </div>
                        <div className="flex gap-2 items-center text-gray-300">
                          <input type="checkbox" defaultChecked className="accent-brand-blue" />
                          <span>Ensure direct date alignments using standard, clean format keywords (e.g. "MMM YYYY")</span>
                        </div>
                        <div className="flex gap-2 items-center text-gray-300">
                          <input type="checkbox" defaultChecked className="accent-brand-blue" />
                          <span>Validate that core project summaries lead off with active tech tokens before verbs</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 pt-5 mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
              <span className="text-xs text-gray-300">Included as editable Word + Google formats in the core bundle.</span>
            </div>
            <a
              href="#pricing-card-section"
              className="px-5 py-2.5 rounded bg-brand-blue hover:bg-brand-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] text-brand-dark font-bold text-xs tracking-wide transition-all uppercase flex items-center gap-1.5 scale-100 hover:scale-[1.03] cursor-pointer"
            >
              <span>Secure All Components for ₹99</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
