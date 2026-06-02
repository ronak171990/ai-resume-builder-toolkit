import { useState, useEffect } from "react";
import { Play, Sparkles, AlertTriangle, CheckCircle2, ShieldAlert, Cpu, ListChecks } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PresetResume {
  name: string;
  role: string;
  originalText: string;
  initialScore: number;
  optimizedScore: number;
  failReasons: string[];
  fixes: string[];
  criticalKeywordsMissing: string[];
}

const PRESETS: PresetResume[] = [
  {
    name: "Rahul S.",
    role: "Software Engineer (2 yrs exp)",
    originalText: "Responsibilities: Worked on Java team. Wrote code for several screens. Fixed bugs and did maintenance. Attended daily standups. Responsible for database queries.",
    initialScore: 34,
    optimizedScore: 92,
    failReasons: [
      "No measurable impact or metrics (e.g. % improvement, revenue, time saved)",
      "Vague 'responsibilities' descriptions rather than active achievement verbs",
      "Missing crucial keyword tokens (e.g. 'Microservices', 'Spring Boot', 'Database Opt')",
      "Non-ATS friendly formatting (unlabelled sections, vague headers)"
    ],
    fixes: [
      "Architected back-end RESTful APIs using Spring Boot, improving query efficiency by 42%",
      "Spearheaded database optimization protocols for complex queries, saving 15 hours of weekly latency",
      "Refined codebase structures, cutting deployment bugs by 27% using comprehensive automated CI/CD checks"
    ],
    criticalKeywordsMissing: ["Spring Boot", "REST APIs", "CI/CD", "Query Tuning", "Asynchronous"]
  },
  {
    name: "Priya V.",
    role: "MBA Marketing Graduate",
    originalText: "Objective: Enthusiastic MBA student looking for a good opportunity in marketing sector to utilize my theoretical knowledge and excel in a reputed company.",
    initialScore: 28,
    optimizedScore: 89,
    failReasons: [
      "Outdated 'Objective Statement' which wastes valuable recruiter visual real estate",
      "No focus on keyword indexing for role-specific skills (e.g., CAC, LTV, ROAS, Funnels)",
      "Fails to show hands-on campaign results or data-driven achievements"
    ],
    fixes: [
      "Pioneered customer acquisition strategy resulting in a 3.4x ROAS and 15% drop in overall CAC",
      "Replaced outdated objective with a high-impact 'Professional Summary' tailored with core growth tokens",
      "Constructed comprehensive dashboard for campaign tracking, shifting analytics decision speed by 2x"
    ],
    criticalKeywordsMissing: ["ROAS (Return on Ad Spend)", "CAC Optimization", "Growth Funnels", "Data Analytics"]
  },
  {
    name: "Aman K.",
    role: "Data Analyst / Switcher",
    originalText: "Summary: I want to transition from customer service to data analysis. I have learned SQL on YouTube and got a certificate.",
    initialScore: 41,
    optimizedScore: 91,
    failReasons: [
      "Informal phrasing and mention of learning platforms lowers professional authority",
      "No reference to enterprise-scale database interactions or analytic pipelines",
      "Fails to present real analytical project outcomes"
    ],
    fixes: [
      "Engineered analytical pipelines using SQL and Tableau to resolve client retention bottlenecks",
      "Formulated predictive modeling frameworks that forecasted customer churn with 88% precision",
      "Synthesized large-scale customer support datasets into automated reporting dashboards, reducing decision latency"
    ],
    criticalKeywordsMissing: ["Tableau Dashboards", "Predictive Modeling", "SQL Query Opt", "ETL Pipelines"]
  }
];

export default function AtsSimulator() {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [customText, setCustomText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [hasScanned, setHasScanned] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [optimizerActive, setOptimizerActive] = useState(false);

  const activePreset = PRESETS[selectedPresetIndex];

  const handleScan = () => {
    setIsScanning(true);
    setScanStep(0);
    setHasScanned(false);
    setOptimizerActive(false);
  };

  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      setScanStep((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            setHasScanned(true);
            // Animate score count
            let scoreValue = 0;
            const scoreInterval = setInterval(() => {
              if (scoreValue >= activePreset.initialScore) {
                clearInterval(scoreInterval);
              } else {
                scoreValue += 1;
                setCurrentScore(scoreValue);
              }
            }, 15);
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [isScanning, activePreset]);

  // Handle the active preset changes to reset state
  useEffect(() => {
    setHasScanned(false);
    setOptimizerActive(false);
    setCurrentScore(0);
  }, [selectedPresetIndex]);

  const handleApplyToolkit = () => {
    setOptimizerActive(true);
    let scoreValue = activePreset.initialScore;
    const scoreInterval = setInterval(() => {
      if (scoreValue >= activePreset.optimizedScore) {
        clearInterval(scoreInterval);
      } else {
        scoreValue += 1;
        setCurrentScore(scoreValue);
      }
    }, 15);
  };

  const scanPhrases = [
    "Analyzing document hierarchy & font encoding...",
    "Crawling section headers & indexing tokens...",
    "Scanning keyword densities against 120+ HR filters...",
    "Evaluating semantic impact metrics & power verbs...",
    "Compiling ATS compliance profile..."
  ];

  return (
    <div id="ats-simulator" className="glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden text-white border border-brand-blue/20">
      {/* Glow background decoration */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
        <div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-brand-blue/10 text-brand-blue border border-brand-blue/20 font-bold uppercase tracking-wider">
            Live Interactive Simulator
          </span>
          <h3 className="text-2xl font-display font-medium text-white mt-2">
            Test Your Resume Against ATS Systems
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p, idx) => (
            <button
              id={`preset-btn-${idx}`}
              key={idx}
              onClick={() => {
                if (!isScanning) setSelectedPresetIndex(idx);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedPresetIndex === idx
                  ? "bg-brand-blue text-brand-dark shadow-[0_0_15px_rgba(0,240,255,0.3)] font-semibold"
                  : "bg-brand-card text-gray-400 hover:text-white border border-white/5"
              }`}
            >
              {p.role.split(" ")[0]} Profile
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Grid: Input Screen */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex justify-between items-center text-xs font-mono text-gray-400">
            <span>RESUME EXTRACT PREVIEW ({activePreset.role})</span>
            <span className="text-brand-blue">Editable Sample</span>
          </div>

          <div className="relative flex-1">
            <textarea
              id="ats-resume-input"
              value={customText || activePreset.originalText}
              onChange={(e) => {
                setCustomText(e.target.value);
                setHasScanned(false);
                setOptimizerActive(false);
              }}
              className="w-full min-h-[160px] bg-brand-dark/80 text-sm p-4 rounded-xl border border-white/10 focus:border-brand-blue/50 focus:outline-none focus:ring-1 focus:ring-brand-blue/30 font-mono text-gray-300 resize-none transition-all placeholder:text-gray-600"
              placeholder="Paste custom resume bullets or edit this preset draft..."
            />
            {isScanning && (
              <div className="absolute inset-0 bg-brand-dark/95 flex flex-col items-center justify-center p-6 rounded-xl border border-brand-blue/30 overflow-hidden">
                {/* Horizontal scanner light line */}
                <div className="absolute left-0 right-0 h-0.5 bg-brand-blue/80 shadow-[0_0_12px_#00f0ff] scan-animation" />
                <Cpu className="w-10 h-10 text-brand-blue animate-spin mb-4" />
                <div className="text-center">
                  <p className="text-sm font-mono text-brand-blue neon-glow-blue h-6">
                    {scanPhrases[scanStep]}
                  </p>
                  <div className="w-48 bg-white/10 h-1 rounded-full overflow-hidden mx-auto mt-3">
                    <div
                      className="bg-brand-blue h-full transition-all duration-700"
                      style={{ width: `${(scanStep + 1) * 20}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              id="ats-scan-btn"
              onClick={handleScan}
              disabled={isScanning}
              className="flex-1 bg-brand-card hover:bg-brand-blue hover:text-brand-dark text-brand-blue hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] border border-brand-blue/30 active:scale-98 font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Analyze ATS Compliance</span>
            </button>
          </div>
        </div>

        {/* Right Grid: Results Screen */}
        <div className="lg:col-span-5 flex flex-col justify-between glass-panel p-5 rounded-xl border border-white/5 min-h-[300px]">
          {!hasScanned && !isScanning && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-400">
              <Sparkles className="w-12 h-12 text-brand-blue/40 mb-3 animate-pulse" />
              <p className="text-sm font-medium text-gray-200">Ready for Scan</p>
              <p className="text-xs text-gray-400 mt-1 max-w-[240px]">
                Trigger the compliance check to review ATS success rate and critical scoring factors.
              </p>
            </div>
          )}

          {isScanning && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-500 animate-pulse">
              <p className="text-sm font-mono text-brand-blue">Evaluating algorithms...</p>
            </div>
          )}

          {hasScanned && (
            <div className="flex-1 flex flex-col justify-between">
              {/* Score ring column */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-gray-400">BENCHMARK RATIO</span>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    currentScore < 45 ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  }`}>
                    {currentScore < 50 ? "CRITICAL REJECTION" : "APPROVED SUCCESS"}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-5">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    {/* SVG Circular scoring bar */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        className="stroke-white/10"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        className={`transition-all duration-500 ${
                          optimizerActive ? "stroke-brand-cyan" : "stroke-red-500"
                        }`}
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 40}
                        strokeDashoffset={2 * Math.PI * 40 * (1 - currentScore / 100)}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-display font-bold">{currentScore}%</span>
                      <span className="text-[9px] font-mono text-gray-400">ATS SCORE</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-mono text-gray-400">REPORTS ANALYSIS</p>
                    <h4 className="text-sm font-semibold text-white mt-0.5">
                      {optimizerActive ? "Excellent Interview Call Rate!" : "High Risk of Instant Rejection"}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      {optimizerActive
                        ? "Optimized with tailored keywords and result-driven achievements. Passing 98% of standard business filters."
                        : "Most applicant systems require a minimum 80% to dispatch your file to a real recruiter."}
                    </p>
                  </div>
                </div>

                {/* Score analysis details */}
                <div className="border-t border-white/5 pt-4">
                  <p className="text-[11px] font-mono text-gray-400 mb-2">
                    {optimizerActive ? "OPTIMIZED KEYWORDS DETECTED" : "CRITICAL DETECTED MISSES"}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {optimizerActive ? (
                      activePreset.criticalKeywordsMissing.map((kw, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                          {kw} ✓
                        </span>
                      ))
                    ) : (
                      activePreset.criticalKeywordsMissing.map((kw, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-300 border border-red-500/20">
                          Missing: {kw} ✗
                        </span>
                      ))
                    )}
                  </div>

                  <p className="text-[11px] font-mono text-gray-400 mb-2 font-semibold">
                    {optimizerActive ? "ATS CONSOLIDATED CORRECTIONS" : "REJECTION THREATS"}
                  </p>

                  <ul className="text-xs space-y-1.5 text-gray-300">
                    {optimizerActive
                      ? activePreset.fixes.slice(0, 2).map((item, id) => (
                          <li key={id} className="flex gap-2 items-start">
                            <span className="text-brand-cyan mt-0.5">✔</span>
                            <span className="text-gray-300 italic">“{item}”</span>
                          </li>
                        ))
                      : activePreset.failReasons.slice(0, 2).map((item, id) => (
                          <li key={id} className="flex gap-2 items-start">
                            <span className="text-red-400 mt-0.5">✗</span>
                            <span className="text-gray-400 text-[11px]">{item}</span>
                          </li>
                        ))}
                  </ul>
                </div>
              </div>

              {/* Apply optimizer CTA inside simulator */}
              <div className="mt-5 pt-4 border-t border-white/5">
                {!optimizerActive ? (
                  <button
                    id="apply-toolkit-btn"
                    onClick={handleApplyToolkit}
                    className="w-full bg-linear-to-r from-brand-blue to-brand-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] text-brand-dark font-bold py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Optimize with Toolkit (32% → 91%)</span>
                  </button>
                ) : (
                  <div className="text-center p-2 rounded bg-brand-cyan/10 text-brand-cyan text-xs font-semibold border border-brand-cyan/20">
                    🎉 Match Quality Upgraded! Shortlist rate increased by +300%
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}