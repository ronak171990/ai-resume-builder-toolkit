import { useState, useEffect } from "react";
import { Sparkles, Download, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NotificationEvent {
  id: string;
  user: string;
  action: string;
  timeText: string;
  company?: string;
}

const EVENTS: NotificationEvent[] = [
  { id: "e1", user: "Rohan Patel", action: "just downloaded the AI Toolkit Collection", timeText: "2 mins ago" },
  { id: "e2", user: "Shreya Ghoshal", action: "got shortlisted at Swiggy", timeText: "6 mins ago", company: "Swiggy" },
  { id: "e3", user: "Anubhav K.", action: "optimized his LinkedIn and got 4 recruiter pings", timeText: "12 mins ago" },
  { id: "e4", user: "Pooja Hegde", action: "downloaded ATS templates bundle", timeText: "15 mins ago" },
  { id: "e5", user: "Siddharth S.", action: "unlocked standard HR interview playbook", timeText: "20 mins ago" },
  { id: "e6", user: "Deepak Chawla", action: "secured a senior software engineer callback", timeText: "32 mins ago" }
];

export default function NotificationToast() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show first toast after 4 seconds
    const startTimeout = setTimeout(() => {
      setVisible(true);
    }, 4000);

    // Swap toast notifications every 11 seconds
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActiveIdx((prev) => (prev + 1) % EVENTS.length);
        setVisible(true);
      }, 800);
    }, 11000);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, []);

  const event = EVENTS[activeIdx];

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-[320px] pointer-events-none hidden md:block">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="glass-panel p-3.5 rounded-xl border-brand-blue/30 bg-brand-slate shadow-[0_4px_30px_rgba(0,240,255,0.08)] flex items-start gap-3 pointer-events-auto select-none"
          >
            <div className="w-8 h-8 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue shrink-0">
              <Download className="w-4 h-4 animate-bounce" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-white truncate">{event.user}</span>
                <span className="text-[9px] font-mono text-gray-500 shrink-0">{event.timeText}</span>
              </div>
              <p className="text-[10px] text-gray-400 leading-normal mt-0.5">
                {event.action} {event.company && (
                  <strong className="text-brand-cyan">@{event.company}</strong>
                )}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
