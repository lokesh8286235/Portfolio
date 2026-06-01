import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Star, Copy, Check, FileDown, PhoneCall, MailOpen, Map, 
  Sparkles, Award, GraduationCap, Code, Layers, FileClock 
} from "lucide-react";

interface RecruiterDossierProps {
  onClose: () => void;
  onRequestResume: () => void;
  onScrollToContact: () => void;
}

export default function RecruiterDossier({ onClose, onRequestResume, onScrollToContact }: RecruiterDossierProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.messages) {
          setMessages(data.messages);
        }
      })
      .catch((err) => console.error("Error loading messages from local database:", err));
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <motion.section
      id="recruiter-fast-facts"
      initial={{ opacity: 0, scale: 0.98, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -20 }}
      transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
      className="max-w-6xl mx-auto py-12 px-6 select-none"
    >
      <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-lg relative overflow-hidden">
        
        {/* Understated background overlay lights */}
        <div className="absolute top-0 right-0 w-[400px] h-[200px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[200px] h-[100px] bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Dashboard Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-6 mb-8 gap-4 text-left">
          <div className="space-y-1">
            <span className="font-mono text-[9px] tracking-[0.25em] text-indigo-600 font-bold uppercase block">
              RECRUITER CONTROL SYSTEM
            </span>
            <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              ★ Fast Facts Dossier Panel
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              An aggregated high-density layout compiling core deliverables, qualifications, and direct contacts.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-800 p-1 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            title="Minimize facts panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
          
          {/* Column 1: Candidate fast facts data (md:col-span-5) */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-450 font-bold block mb-2">
              System Parameters
            </span>

            <ul className="space-y-3.5 text-xs m-0 p-0 list-none font-sans">
              
              {/* Full Name */}
              <li className="flex justify-between items-baseline border-b border-slate-100 pb-1.5 pt-0.5">
                <span className="font-mono text-[9.5px] uppercase text-slate-450 font-bold">FullName</span>
                <span className="font-bold text-slate-800">Alla Naga Lokesh Sai</span>
              </li>

              {/* Target Role */}
              <li className="flex justify-between items-baseline border-b border-slate-100 pb-1.5 pt-0.5">
                <span className="font-mono text-[9.5px] uppercase text-slate-450 font-bold">Target Role</span>
                <span className="font-bold text-indigo-650">Software Engineer / AI Systems</span>
              </li>

              {/* Work Auth */}
              <li className="flex justify-between items-baseline border-b border-slate-100 pb-1.5 pt-0.5">
                <span className="font-mono text-[9.5px] uppercase text-slate-450 font-bold">Work Auth status</span>
                <span className="font-bold text-indigo-650 uppercase bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 text-[9px] tracking-wider">
                  USA OPT Work Authorized
                </span>
              </li>

              {/* Academics */}
              <li className="flex flex-col gap-1.5 border-b border-slate-100 pb-2 pt-0.5">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[9.5px] uppercase text-slate-450 font-bold">Academics</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-650" />
                    MS CS Villanova (GPA 3.5)
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-[10px] text-slate-500">
                  <span>BTech CS (GPA 4.0 / Honours)</span>
                  <span>Vel Tech University</span>
                </div>
              </li>

              {/* Certified Salesforce */}
              <li className="flex justify-between items-baseline border-b border-slate-100 pb-1.5 pt-0.5">
                <span className="font-mono text-[9.5px] uppercase text-slate-450 font-bold">Key Credentials</span>
                <span className="font-bold text-indigo-650 flex items-center gap-1 text-[11px]">
                  <Award className="w-3.5 h-3.5 text-indigo-650" />
                  Salesforce Certified ADM-201
                </span>
              </li>

              {/* Relocation */}
              <li className="flex justify-between items-baseline pt-0.5">
                <span className="font-mono text-[9.5px] uppercase text-slate-450 font-bold">Relocation</span>
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Map className="w-3.5 h-3.5 text-slate-450" />
                  Open to Remote, Hybrid, Physical
                </span>
              </li>

            </ul>
          </div>

          {/* Column 2: Specific High Impact Metric Badges (md:col-span-4) */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-450 font-bold block mb-2">
              Valid Technical Deliverables
            </span>

            <div className="space-y-3 font-sans">
              
              {/* Deliverable 1 */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-150 shadow-xs flex items-start gap-3">
                <div className="p-1 rounded bg-indigo-50 text-indigo-600 mt-0.5">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                    RAG Optimizations
                  </h4>
                  <p className="text-slate-600 text-[11px] leading-relaxed mt-1">
                    Configured secure multi-agent loops and Claude API routes delivering 91% factual accuracy at 1k+ query volumes.
                  </p>
                </div>
              </div>

              {/* Deliverable 2 */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-150 shadow-xs flex items-start gap-3">
                <div className="p-1 rounded bg-indigo-50 text-indigo-600 mt-0.5">
                  <Code className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                    Cloud Native SRE
                  </h4>
                  <p className="text-slate-600 text-[11px] leading-relaxed mt-1">
                    Standardized developer clusters on AWS EKS with Terraform. Compressed system replication timers from 2 hours to 20 minutes.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Column 3: Quick Recruiter copy shortcuts & fast pathways (md:col-span-3) */}
          <div className="md:col-span-3 p-4.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="space-y-3 text-left">
              <span className="font-mono text-[9px] uppercase tracking-wider text-slate-455 font-bold block">
                Quick Action Panel
              </span>

              {/* PDF Resume trigger */}
              <button
                onClick={onRequestResume}
                className="w-full flex items-center gap-2 px-3 py-2 border border-slate-200 hover:border-slate-300 rounded-lg bg-white text-slate-750 hover:text-slate-900 font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              >
                <FileClock className="w-3.5 h-3.5 text-indigo-600" />
                Review PDF Resume
              </button>

              {/* Auto copy cell phone */}
              <button
                onClick={() => handleCopy("+14842535918", "cell")}
                className="w-full flex items-center justify-between px-3 py-2 border border-slate-200 hover:border-slate-300 rounded-lg bg-white text-left text-slate-750 hover:text-slate-900 font-sans text-xs transition-colors cursor-pointer shadow-sm"
              >
                <div className="flex items-center gap-2 font-bold leading-none">
                  <PhoneCall className="w-3.5 h-3.5 text-indigo-650" />
                  +1 (484) 253-5918
                </div>
                {copiedText === "cell" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-400" />
                )}
              </button>

              {/* Auto copy mailbox */}
              <button
                onClick={() => handleCopy("lokesh8286235@gmail.com", "mail")}
                className="w-full flex items-center justify-between px-3 py-2 border border-slate-200 hover:border-slate-300 rounded-lg bg-white text-left text-slate-750 hover:text-slate-900 font-sans text-[11px] transition-colors cursor-pointer truncate shadow-sm"
              >
                <div className="flex items-center gap-2 font-bold truncate max-w-[85%] leading-none">
                  <MailOpen className="w-3.5 h-3.5 text-indigo-650 flex-shrink-0" />
                  <span className="truncate">lokesh8286235@gmail.com</span>
                </div>
                {copiedText === "mail" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-400" />
                )}
              </button>
            </div>

            <button
              onClick={onScrollToContact}
              className="mt-4 w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-xs font-bold uppercase tracking-wider text-center transition-colors cursor-pointer shadow-sm"
            >
              Direct Conversation
            </button>
          </div>

        </div>

        {/* Dynamic Sent Messages Stream Feed for Alla Naga Lokesh Sai */}
        {messages.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-150 text-left">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-indigo-600 font-bold block mb-3.5">
              📥 SERVER MESSAGE ARCHIVE FEED ({messages.length})
            </span>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {[...messages].reverse().map((msg, index) => (
                <div key={msg.id || index} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed font-sans text-xs flex flex-col gap-1.5 shadow-2xs">
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="font-bold text-slate-800 break-all">{msg.email}</span>
                    <span className="font-mono text-[9px] text-slate-400 font-medium">
                      {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : ""}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-indigo-600 font-bold">
                    Subject: {msg.subject}
                  </div>
                  <p className="text-slate-600 text-xs mt-1 whitespace-pre-wrap select-text">
                    {msg.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </motion.section>
  );
}
