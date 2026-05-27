import { useState } from "react";
import { ChevronDown, Plus, Minus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQItem } from "../types";

const FAQS: FAQItem[] = [
  {
    id: "beginner",
    question: "Is this beginner-friendly?",
    answer: "Absolutely! The toolkit is built for everyone—from students seeking their first internship to seasoned executives. We provide clear, plain-English instructions and exact copy-paste structures, so you can transform your resume in less than 30 minutes even if you have never optimized a CV in your life."
  },
  {
    id: "access",
    question: "Will I get instant access?",
    answer: "Yes, 100%. The moment your payment of ₹299 is securely finalized, you will be redirected to our premium dashboard to fetch the assets immediately. A direct backup high-speed download link is also instantly dispatched to your registered email address for lifetime usage."
  },
  {
    id: "editable",
    question: "Are the templates editable?",
    answer: "Yes, every single template comes as both a standard Microsoft Word editable file (.docx) and as a direct Google Docs template link. You do not need any graphic-designer software or technical knowledge. It is simple fill-in-the-blank writing."
  },
  {
    id: "ats",
    question: "Is this ATS compatible?",
    answer: "Strictly. Our template layouts have been rigorously tested against industry-standard enterprise applicant tracking systems (including Workday, Greenhouse, Taleo, and Lever). We guarantee the indexing engines can index 100% of your contact information, core credentials, and project sentences without OCR distortion errors."
  },
  {
    id: "industry",
    question: "Can I use this for any industry?",
    answer: "Yes. Though heavily leveraged by candidates in Tech, SaaS, Marketing, and Operations, the underlying structural psychology (Action verbs, metrics frameworks, layout clean hierarchies) is sector-agnostic. We include examples and vocabulary across engineering, healthcare, management, finance, creative media, and academy fields."
  },
  {
    id: "delivery",
    question: "How will I receive the files?",
    answer: "You will receive a compressed .zip file containing all organized sub-folders: templates (.docx + Google Doc links), the AI prompt guide text, the LinkedIn optimization map, and PDF resources for interviews and active power words. This remains in your possession permanently with free lifetime updates."
  }
];

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>("beginner");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div id="faq-section" className="max-w-3xl mx-auto py-4">
      <div className="space-y-4">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              id={`faq-item-${faq.id}`}
              key={faq.id}
              className={`rounded-xl transition-all border ${
                isOpen 
                  ? "bg-brand-card/70 border-brand-blue/30 shadow-[0_0_15px_rgba(0,240,255,0.05)]" 
                  : "bg-brand-dark/20 border-white/5 hover:border-white/10"
              }`}
            >
              <button
                id={`faq-trigger-${faq.id}`}
                onClick={() => toggleFaq(faq.id)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-white text-sm md:text-base focus:outline-none cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-brand-blue shrink-0" />
                  {faq.question}
                </span>
                <span className={`p-1 rounded-full bg-white/5 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-brand-blue" : ""}`}>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-gray-400 leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
