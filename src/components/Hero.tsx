import React from "react";
import { motion } from "motion/react";
import { ArrowRight, FileText, Github, Linkedin, Briefcase, ChevronRight, Check } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
  onRequestResume: () => void;
}

export default function Hero({ onExploreClick, onContactClick, onRequestResume }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden select-none">
      
      {/* Vercel-style subtle background grid and ambient glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
      
      {/* Dynamic drifting glow orb */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-indigo-500/5 blur-[120px] animate-pulse-soft pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        
        {/* Top subtle status pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-mono text-[10px] tracking-wider uppercase backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span>USA OPT Authorized • Seeking SWE / AI Systems Roles</span>
        </motion.div>

        {/* Primary Premium 2026 Typography Headline */}
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-sans text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.08]"
          >
            Software Engineer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-700">
              Building AI Systems <br />
            </span>
            <span className="text-slate-900">That Create Real Impact</span>
          </motion.h1>
        </div>

        {/* Informative Sub-Headline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          MS Computer Science candidate with experience building AI systems, full-stack applications, cloud platforms, and production software solutions. Experienced in deploying RAG systems, secure APIs, and responsive UI structures.
        </motion.p>

        {/* Highlight Key Strengths Block (Understated, clean badges) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-slate-600 font-mono text-[10px] uppercase tracking-wider pt-2"
        >
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-indigo-600" />
            <span>91% Context RAG Accuracy</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-indigo-600" />
            <span>K8S & Terraform Automation</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-indigo-600" />
            <span>Spring Boot Microservices</span>
          </div>
        </motion.div>

        {/* Buttons and Interactions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-4"
        >
          {/* Primary Explore Shipments trigger */}
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-xs font-semibold uppercase tracking-wider shadow-[0_4px_14px_rgba(79,70,229,0.25)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.35)] transition-all duration-300 cursor-pointer"
          >
            <Briefcase className="w-3.5 h-3.5" />
            Explore Shipments
          </button>

          {/* Secondary View Resume Modal trigger */}
          <button
            onClick={onRequestResume}
            className="flex items-center gap-1.5 px-5 py-3 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-slate-300 transition-all duration-300 font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            View Resume
          </button>

          {/* Secondary GitHub link */}
          <a
            href="https://github.com/lokesh8286235"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-5 py-3 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-slate-300 transition-all duration-300 font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-sm"
          >
            <Github className="w-3.5 h-3.5 text-slate-600" />
            GitHub
          </a>

          {/* Secondary LinkedIn link */}
          <a
            href="https://www.linkedin.com/in/naga-lokesh-sai-alla-538242251/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-5 py-3 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-slate-300 transition-all duration-300 font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-sm"
          >
            <Linkedin className="w-3.5 h-3.5 text-indigo-700" />
            LinkedIn
          </a>

          {/* Contact Button */}
          <button
            onClick={onContactClick}
            className="flex items-center gap-1.5 px-5 py-3 rounded-lg bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent hover:border-slate-200 transition-all duration-300 font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            Contact
          </button>
        </motion.div>

        {/* High-Credibility GitHub Statistics with Counting Animations */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="pt-8 max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-3 gap-4 sm:gap-6 p-5 sm:p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-2xs">
            
            {/* Stat 1: Projects */}
            <div className="flex flex-col items-center justify-center text-center">
              <AnimatedCounter target={15} suffix="+" />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-1 block">
                Projects Shipped
              </span>
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-slate-200 self-center justify-self-center" />

            {/* Stat 2: Commits */}
            <div className="flex flex-col items-center justify-center text-center">
              <AnimatedCounter target={400} suffix="+" />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-1 block">
                Verified Commits
              </span>
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-slate-200 self-center justify-self-center" />

            {/* Stat 3: Tech domain */}
            <div className="flex flex-col items-center justify-center text-center">
              <span className="font-sans font-extrabold text-lg sm:text-xl text-indigo-600 leading-none py-1 block">
                AI & Cloud
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-1.5 block">
                Systems Focus
              </span>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Understated animated decorative lines */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
}

// Buttery smooth animation counter using requestAnimationFrame
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTime: number | null = null;
    const duration = 1500; // ms

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function: outQuad
      const easedProgress = progress * (2 - progress);
      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
    return () => { startTime = null; };
  }, [target]);

  return (
    <span className="font-sans font-extrabold text-2xl sm:text-3.5xl text-indigo-600 tracking-tight leading-none tabular-nums">
      {count}{suffix}
    </span>
  );
}
