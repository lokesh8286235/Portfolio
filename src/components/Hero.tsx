import React from "react";
import { motion } from "motion/react";
import { ArrowRight, FileText, Github, Linkedin, Briefcase, Check } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
  onRequestResume: () => void;
}

export default function Hero({ onExploreClick, onContactClick, onRequestResume }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden select-none">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-indigo-500/5 blur-[120px] animate-pulse-soft pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-mono text-[10px] tracking-wider uppercase backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>
          <span>Software Engineer · AI Systems · ML Infrastructure</span>
        </motion.div>

        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.04]"
          >
            I build AI systems that are
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-700">
              measurable, reliable, and fast.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-slate-600 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Naga Lokesh Sai Alla — Software Engineer focused on retrieval, evaluation, distributed systems, ML performance, and production engineering. I turn ambiguous AI problems into systems that can be run, tested, measured, observed, and improved.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-y-2 gap-x-5 text-slate-600 font-mono text-[10px] uppercase tracking-wider pt-1"
        >
          <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-indigo-600" /><span>RAG + Evaluation</span></div>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-indigo-600" /><span>C++ Systems</span></div>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-indigo-600" /><span>AWS + Kubernetes</span></div>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-indigo-600" /><span>Python + TypeScript + Java</span></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-3"
        >
          <button onClick={onExploreClick} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-xs font-semibold uppercase tracking-wider shadow-lg transition-all">
            <Briefcase className="w-3.5 h-3.5" />
            View engineering work
          </button>
          <button onClick={onRequestResume} className="flex items-center gap-1.5 px-5 py-3 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 transition-all font-sans text-xs font-semibold uppercase tracking-wider shadow-sm">
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            Resume
          </button>
          <a href="https://github.com/lokesh8286235" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-5 py-3 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 transition-all font-sans text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Github className="w-3.5 h-3.5 text-slate-600" />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/naga-lokesh-sai-alla-538242251/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-5 py-3 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 transition-all font-sans text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Linkedin className="w-3.5 h-3.5 text-indigo-700" />
            LinkedIn
          </a>
          <button onClick={onContactClick} className="flex items-center gap-1.5 px-5 py-3 rounded-lg bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent hover:border-slate-200 transition-all font-sans text-xs font-semibold uppercase tracking-wider">
            Contact <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="pt-8 max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-sm">
            <Stat value="91%" label="reported RAG accuracy" />
            <Stat value="40%" label="reported throughput gain" />
            <Stat value="840" label="incident eval cases" />
            <Stat value="4" label="flagship systems projects" />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white px-4 py-5 sm:px-5 text-center">
      <div className="font-sans font-extrabold text-xl sm:text-2xl text-indigo-600 tracking-tight">{value}</div>
      <div className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold mt-1 leading-relaxed">{label}</div>
    </div>
  );
}
