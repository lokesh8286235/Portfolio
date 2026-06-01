import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AIEngineering from "./components/AIEngineering";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import GithubShowcase from "./components/GithubShowcase";
import Experience from "./components/Experience";
import ResumeSection from "./components/ResumeSection";
import LookingFor from "./components/LookingFor";
import Contact from "./components/Contact";
import Chatbot from "./components/Chatbot";
import RecruiterDossier from "./components/RecruiterDossier";
import ResumeModal from "./components/ResumeModal";
import { motion, AnimatePresence } from "motion/react";
import { Star, ShieldAlert, Award, FileText, X, AlertTriangle, ArrowRight } from "lucide-react";

export default function App() {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  // Forced Manual Page-Load UX Fix to start perfectly at the top of the Hero Section
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as any
    });
  }, []);

  const toggleRecruiterMode = () => {
    setRecruiterMode((prev) => {
      const next = !prev;
      if (next) {
        // Scroll smoothly to recruiter section on active toggle
        setTimeout(() => {
          const el = document.getElementById("recruiter-fast-facts");
          el?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 150);
      }
      return next;
    });
  };

  const handleScrollToId = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-bg-base text-text-main min-h-screen relative font-sans antialiased overflow-x-hidden selection:bg-indigo-500/30 selection:text-[#F8FAFC]">
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col min-h-screen"
      >
        {/* Header Nav */}
        <Navbar
          theme="light"
          onToggleTheme={() => {}}
          recruiterMode={recruiterMode}
          onToggleRecruiter={toggleRecruiterMode}
          onRequestResume={() => handleScrollToId("resume")}
        />

        {/* Premium Resume Modal overlay */}
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />

        {/* Glowing Recruiter Notification Top Banner when mode is active */}
        <AnimatePresence>
          {recruiterMode && (
            <motion.div
              initial={{ opacity: 0, y: -45 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -45 }}
              className="fixed top-15 sm:top-16 left-0 right-0 z-30 bg-indigo-600 text-white py-2 px-6 flex items-center justify-between text-[11px] font-mono font-bold uppercase tracking-wider shadow-lg cursor-pointer"
              onClick={() => handleScrollToId("recruiter-fast-facts")}
            >
              <div className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 fill-white text-white animate-spin-slow" />
                <span>★ Recruiter Dossier is active — facts overview unlocked below</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="underline select-none">Quick Fact Dashboard</span>
                <ArrowRight className="w-3" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Primary Layout sections */}
        <main className="flex-grow">
          
          {/* Hero Section */}
          <Hero 
            onExploreClick={() => handleScrollToId("projects")} 
            onContactClick={() => handleScrollToId("contact")} 
            onRequestResume={() => setResumeOpen(true)}
          />

          {/* Recruiter Quick Fact Sheet Block (displays when Recruiter Mode is active) */}
          <AnimatePresence>
            {recruiterMode && (
              <RecruiterDossier
                onClose={() => setRecruiterMode(false)}
                onRequestResume={() => setResumeOpen(true)}
                onScrollToContact={() => handleScrollToId("contact")}
              />
            )}
          </AnimatePresence>

          {/* In-view banner testimonials quote of Lokesh Alla */}
          <div className="py-8 bg-slate-50 border-t border-b border-slate-200 block overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 text-center select-none">
              <p className="font-sans italic text-slate-650 text-xs sm:text-sm tracking-wide">
                "Lokesh shipped our RAG pipeline in 3 weeks. It now handles 1,000 queries a day at 91% accuracy."
              </p>
              <span className="font-mono text-[9px] uppercase tracking-wider text-indigo-600 tracking-widest mt-1.5 block font-bold">
                — Engineering Lead, Opensoft Technologies
              </span>
            </div>
          </div>

          {/* Dedicated AI Engineering workflow diagrams & benchmarks */}
          <AIEngineering />

          {/* Tooling Skills filtered cloud */}
          <Skills />

          {/* Projects portfolio showcase (RAG, cloud deploy pipelines, full stack databases) */}
          <Projects />

          {/* Live synchronized Github Profile stats & Commits */}
          <GithubShowcase />

          {/* Trajectory Work History timeline */}
          <Experience />

          {/* Interactive digital Resume searchable section */}
          <ResumeSection />

          {/* Position bounds and Authorizations */}
          <LookingFor onContactClick={() => handleScrollToId("contact")} />

          {/* Form Transmission Contact block */}
          <Contact onRequestResume={() => setResumeOpen(true)} />

        </main>

        {/* Footer content */}
        <footer className="border-t border-slate-205 border-slate-200 py-10 text-center text-[10px] font-mono text-slate-500 tracking-wider bg-slate-50">
          <span>
            Designed with absolute craftsmanship. Powered securely via proxy endpoint models. <br />
            Alla Naga Lokesh Sai • Software Engineer • USA OPT Work Authorized • {new Date().getFullYear()}
          </span>
        </footer>

        {/* Floating chat assistant widget */}
        <Chatbot />

      </motion.div>
    </div>
  );
}
