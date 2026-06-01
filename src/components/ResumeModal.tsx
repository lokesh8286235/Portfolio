import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Briefcase, GraduationCap, Award, Check, MapPin, Calendar, Sparkles
} from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md select-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
          className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between shadow-2xl"
        >
          {/* Subtle accent line */}
          <div className="absolute top-0 inset-x-12 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

          {/* Modal Header controls */}
          <div className="p-4.5 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-sans text-xs font-extrabold text-slate-800 uppercase tracking-widest font-mono">
                Verified Interactive Dossier
              </span>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-650 p-1.5 rounded-lg border border-transparent hover:border-slate-250 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close resume review"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Core Panel Contents */}
          <div className="flex-grow overflow-y-auto bg-white p-6 sm:p-8">
            <div className="space-y-8 select-text text-left">
              {/* Name and Header Block */}
              <div className="border-b border-slate-150 pb-6 flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Alla Naga Lokesh Sai
                  </h2>
                  <p className="text-indigo-600 text-xs sm:text-sm font-bold mt-1">
                    Software Engineer & AI Systems Developer
                  </p>
                  <div className="mt-2.5 text-xs text-slate-500 font-sans flex flex-wrap gap-x-4 gap-y-1.5 font-medium">
                    <span className="flex items-center gap-1">
                      <span className="font-bold text-slate-300">✉</span> lokesh8286235@gmail.com
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-1">
                      <span className="font-bold text-slate-300">☏</span> +1 (484) 253-5918
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-450" /> USA
                    </span>
                  </div>
                </div>
                
                {/* Credentials badge */}
                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-left space-y-1 max-w-[240px] shadow-3xs">
                  <span className="font-mono text-[8px] uppercase text-indigo-600 tracking-wider font-bold block flex items-center gap-1">
                    <Award className="w-3 h-3" /> OFFICIAL CREDENTIAL
                  </span>
                  <span className="text-xs font-bold text-slate-900 block">
                    Salesforce Certified Administrator
                  </span>
                  <span className="font-mono text-[9px] text-slate-500 block">
                    ADM-201 Credential Active
                  </span>
                </div>
              </div>

              {/* Dual columns for content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left 2/3: Education + Career */}
                <div className="md:col-span-2 space-y-8">
                  
                  {/* WORK EXPERIENCE */}
                  <div className="space-y-4">
                    <h4 className="font-sans text-xs text-slate-450 font-extrabold uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                      <Briefcase className="w-4 h-4 text-indigo-600" />
                      Professional Experience
                    </h4>

                    <div className="space-y-6">
                      {/* Job 1 */}
                      <div className="relative pl-5 border-l border-indigo-500/10 hover:border-indigo-500/35 transition-all">
                        <div className="absolute top-[5px] -left-[4.5px] w-2 h-2 rounded-full bg-indigo-600" />
                        <div className="flex flex-wrap justify-between items-baseline gap-1.5">
                          <span className="font-sans text-xs sm:text-sm font-extrabold text-slate-900 uppercase">
                            Opensoft Technologies
                          </span>
                          <span className="font-mono text-[9.5px] text-slate-550 font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                            <Calendar className="w-3" /> Sep 2021 — Aug 2023
                          </span>
                        </div>
                        <div className="text-indigo-650 font-mono text-[11px] font-bold mt-1">
                          Software Engineer <span className="text-slate-400 font-normal">| Plainsboro, NJ</span>
                        </div>
                        <ul className="list-disc list-outside mt-2.5 text-xs text-slate-650 space-y-2 pl-4 leading-relaxed font-medium">
                          <li>Engineered full-stack responsive microservices and asynchronous REST endpoints using Java Spring Boot & Python to serve scalable operations.</li>
                          <li>Designed retrieval-augmented generation (RAG) datasets leveraging Anthropic's Claude API and LangChain, supporting 1,000 queries daily with 91% precision.</li>
                          <li>Coded dynamic CI/CD automated platform loops utilizing Terraform, Docker, and Kubernetes clusters on AWS infrastructure, shrinking manual releases from 2 hours to 20 minutes (83% efficiency gain).</li>
                          <li>Formed Salesforce CRM Lightning Web Components (LWC) integrations & Apex SQL loops, translating into a direct 35% client lead conversion lift.</li>
                        </ul>
                      </div>

                      {/* Job 2 */}
                      <div className="relative pl-5 border-l border-indigo-500/10 hover:border-indigo-500/35 transition-all">
                        <div className="absolute top-[5px] -left-[4.5px] w-2 h-2 rounded-full bg-slate-400" />
                        <div className="flex flex-wrap justify-between items-baseline gap-1.5">
                          <span className="font-sans text-xs sm:text-sm font-extrabold text-slate-900 uppercase">
                            Opensoft Technologies
                          </span>
                          <span className="font-mono text-[9.5px] text-slate-550 font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                            <Calendar className="w-3" /> Mar 2021 — Sep 2021
                          </span>
                        </div>
                        <div className="text-indigo-655 font-mono text-[11px] font-bold mt-1">
                          Software Engineer Intern II <span className="text-slate-400 font-normal">| USA (Remote)</span>
                        </div>
                        <ul className="list-disc list-outside mt-2.5 text-xs text-slate-650 space-y-2 pl-4 leading-relaxed font-medium">
                          <li>Cooperated with senior software staff to audit Python/Java full-stack routing modules and optimize database indexing speeds.</li>
                          <li>Authored thorough API validation frameworks ensuring flawless server parity across cloud storage nodes.</li>
                        </ul>
                      </div>

                      {/* Job 3 */}
                      <div className="relative pl-5 border-l border-indigo-500/10 hover:border-indigo-500/35 transition-all">
                        <div className="absolute top-[5px] -left-[4.5px] w-2 h-2 rounded-full bg-slate-350" />
                        <div className="flex flex-wrap justify-between items-baseline gap-1.5">
                          <span className="font-sans text-xs sm:text-sm font-extrabold text-slate-900 uppercase">
                            Opensoft Technologies
                          </span>
                          <span className="font-mono text-[9.5px] text-slate-550 font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                            <Calendar className="w-3" /> Aug 2020 — Feb 2021
                          </span>
                        </div>
                        <div className="text-indigo-655 font-mono text-[11px] font-bold mt-1">
                          Software Engineer Intern I <span className="text-slate-400 font-normal">| USA (Remote)</span>
                        </div>
                        <ul className="list-disc list-outside mt-2.5 text-xs text-slate-650 space-y-2 pl-4 leading-relaxed font-medium">
                          <li>Mastered corporate continuous test execution pipelines, Docker images, and GitHub tracking rules.</li>
                          <li>Refactored beautiful responsive React frontend components adhering strictly to clean styling principles.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* EDUCATION BACKGROUND */}
                  <div className="space-y-4">
                    <h4 className="font-sans text-xs text-slate-450 font-extrabold uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                      <GraduationCap className="w-4 h-4 text-indigo-600" />
                      Academic Education
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-150 hover:border-slate-200 duration-200 transition-colors shadow-3xs text-xs">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>Villanova University</span>
                          <span className="font-mono text-slate-400 font-normal">USA</span>
                        </div>
                        <div className="text-indigo-600 font-bold mt-1">MS in Computer Science</div>
                        <div className="text-slate-500 mt-2 font-semibold">Expected 2024 / 2025 • GPA: 3.5</div>
                        <div className="text-slate-600 mt-2 leading-relaxed">
                          Focus: Artificial Intelligence, Deep Learning Systems, Distributed Datasets, Cloud Infrastructure SRE. RAG evaluation & safe routing.
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-150 hover:border-slate-200 duration-200 transition-colors shadow-3xs text-xs">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>Vel Tech University</span>
                          <span className="font-mono text-slate-400 font-normal">Chennai, India</span>
                        </div>
                        <div className="text-indigo-600 font-bold mt-1">BTech in CS & Engineering</div>
                        <div className="text-slate-500 mt-2 font-semibold">Aug 2017 — May 2021 • GPA: 4.0</div>
                        <div className="text-slate-600 mt-2 leading-relaxed">
                          Graduated with Honors / First Class Distinction. Thesis on optimized SQL lookup query execution matrices and REST design.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FEATURED SHIPMENTS & CLOUD ARTIFACTS */}
                  <div className="space-y-4">
                    <h4 className="font-sans text-xs text-slate-450 font-extrabold uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      Featured Architectural Shipments
                    </h4>

                    <div className="space-y-3.5 text-xs animate-fade-in">
                      <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/20 text-left space-y-1.5">
                        <div className="flex justify-between items-baseline">
                          <span className="font-bold text-slate-900 font-sans">Enterprise RAG Pipeline Optimizer</span>
                          <span className="font-mono text-[9px] text-emerald-600 font-bold uppercase tracking-wider">91% Precision</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed font-medium">
                          Created secure context-aware Knowledge Retrieval Engine syncing fragmented archives using Claude API, LangChain and pgvector. Served over 1,000 daily query sessions securely.
                        </p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {["Python", "Claude API", "LangChain", "pgvector", "Redis", "AWS"].map(t => (
                            <span key={t} className="font-mono text-[8.5px] bg-white text-slate-500 px-1.5 py-0.5 rounded border border-slate-200/80 font-bold">{t}</span>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/20 text-left space-y-1.5">
                        <div className="flex justify-between items-baseline">
                          <span className="font-bold text-slate-900 font-sans">DevOps Orchestration & Deploy Engine</span>
                          <span className="font-mono text-[9px] text-emerald-600 font-bold uppercase tracking-wider">Deploy: 2hr to 20min</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed font-medium">
                          Standardized microservices via reusable Terraform resources, Kubernetes orchestration, and continuous Docker testing workflows with 99.9% overall platform uptime.
                        </p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {["Terraform", "Kubernetes", "Docker", "AWS", "GitHub Actions"].map(t => (
                            <span key={t} className="font-mono text-[8.5px] bg-white text-slate-500 px-1.5 py-0.5 rounded border border-slate-200/80 font-bold">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right 1/3: Skill clouds and work status */}
                <div className="space-y-6">
                  
                  {/* Work authorization */}
                  <div className="p-4.5 rounded-xl bg-slate-50 border border-slate-150 space-y-3 shadow-3xs text-xs">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-indigo-600 font-bold block">
                      WORK AUTHORIZATION STATUS
                    </span>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-slate-700 font-semibold">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>USA OPT Authorized</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 font-semibold">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Immediate Start Available</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 font-semibold">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Relocation / Remote Open</span>
                      </div>
                    </div>
                  </div>

                  {/* System Skills Indexes */}
                  <div className="p-4.5 rounded-xl bg-slate-50 border border-slate-150 space-y-4 shadow-3xs text-xs text-left">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold block">
                      SYSTEM TOOLSETS INDEX
                    </span>
                    
                    <div className="space-y-4">
                      <div>
                        <span className="text-slate-900 font-bold block mb-1.5 font-sans leading-none">Core Languages:</span>
                        <div className="flex flex-wrap gap-1">
                          {["Python", "Java", "TypeScript", "Go", "C++", "SQL", "Apex"].map(t => (
                            <span key={t} className="font-mono text-[9px] bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200 font-bold">{t}</span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-900 font-bold block mb-1.5 font-sans leading-none">AI & Retrieval Stack:</span>
                        <div className="flex flex-wrap gap-1">
                          {["Claude API", "RAG Systems", "LangChain", "Vector Indexes", "Prompt Engineering", "pgvector"].map(t => (
                            <span key={t} className="font-mono text-[9px] bg-indigo-55 bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100 font-bold whitespace-nowrap">{t}</span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-900 font-bold block mb-1.5 font-sans leading-none">Cloud & Deployment:</span>
                        <div className="flex flex-wrap gap-1">
                          {["AWS Services", "Kubernetes (EKS)", "Docker", "Terraform", "GitHub Actions", "CI/CD"].map(t => (
                            <span key={t} className="font-mono text-[9px] bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200 font-extrabold">{t}</span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-900 font-bold block mb-1.5 font-sans leading-none">Web Ecosystem:</span>
                        <div className="flex flex-wrap gap-1">
                          {["React", "Node.js", "Express", "FastAPI", "Tailwind CSS", "LWC"].map(t => (
                            <span key={t} className="font-mono text-[9px] bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200 font-bold">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Modal Actions Footer */}
          <div className="p-4.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <span className="font-mono text-[9px] text-slate-500 hidden sm:block font-bold">
              ★ Villanova MS CS Verified candidates checklist. Relocation open.
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white uppercase tracking-wider transition-all duration-150 cursor-pointer w-full sm:w-auto shadow-sm"
              >
                Close View
              </button>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
