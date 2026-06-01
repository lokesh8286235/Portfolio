import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Menu, X, Command } from "lucide-react";

interface NavbarProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  recruiterMode: boolean;
  onToggleRecruiter: () => void;
  onRequestResume: () => void;
}

export default function Navbar({ theme, onToggleTheme, recruiterMode, onToggleRecruiter, onRequestResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 border-b border-slate-200/80 backdrop-blur-md py-3"
            : "bg-transparent border-b border-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-650 group-hover:border-indigo-400 transition-colors">
              <Command className="w-4 h-4 animate-pulse" />
            </div>
            <span className="font-sans text-sm font-bold tracking-tight text-slate-900">
              Alla Naga Lokesh Sai <span className="font-mono text-[9px] text-slate-600 font-normal tracking-wide bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded ml-1.5">v2.6</span>
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6 text-[11px] font-mono tracking-wider text-slate-500 uppercase list-none m-0 p-0">
              <li>
                <button
                  onClick={() => handleNavClick("ai-engineering")}
                  className="hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  AI Stack
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("skills")}
                  className="hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Skills
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("projects")}
                  className="hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("experience")}
                  className="hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Experience
                </button>
              </li>
              <li>
                <button
                  onClick={onRequestResume}
                  className="hover:text-indigo-700 transition-colors cursor-pointer font-bold border-b border-dashed border-indigo-500/40 text-slate-700"
                >
                  Resume
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("contact")}
                  className="hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>

            {/* Recruiter fast dashboard mode selector */}
            <button
              onClick={onToggleRecruiter}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer border ${
                recruiterMode
                  ? "bg-indigo-600 text-white border-indigo-500 shadow-md hover:bg-indigo-500"
                  : "bg-white text-indigo-600 border-slate-200 shadow-sm hover:border-indigo-400 hover:bg-indigo-50/50"
              }`}
            >
              <Star className={`w-3 h-3 ${recruiterMode ? "fill-white text-white" : ""}`} />
              {recruiterMode ? "Dossier: On" : "Recruiter Mode"}
            </button>
          </div>

          {/* Mobile responsive switches */}
          <div className="flex items-center gap-2 md:hidden">
            <button
               onClick={onToggleRecruiter}
               className={`p-2 border rounded-lg transition-all cursor-pointer ${
                 recruiterMode
                   ? "bg-indigo-600 text-white border-indigo-500"
                   : "bg-white text-indigo-600 border-slate-200"
               }`}
               title="Toggle fast rec mode"
            >
              <Star className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[65px] left-0 right-0 z-30 bg-white border-b border-slate-200 shadow-xl p-6 flex flex-col gap-6 md:hidden select-none"
          >
            <ul className="flex flex-col gap-3.5 text-xs font-mono tracking-wider text-slate-600 uppercase list-none m-0 p-0 text-left">
              <li>
                <button
                  onClick={() => handleNavClick("ai-engineering")}
                  className="hover:text-indigo-600 transition-colors text-left w-full cursor-pointer"
                >
                  AI Engineering
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("skills")}
                  className="hover:text-indigo-600 transition-colors text-left w-full cursor-pointer"
                >
                  Tooling Skills
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("projects")}
                  className="hover:text-indigo-600 transition-colors text-left w-full cursor-pointer"
                >
                  Shipments & Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("experience")}
                  className="hover:text-indigo-600 transition-colors text-left w-full cursor-pointer"
                >
                  Work History
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onRequestResume();
                  }}
                  className="hover:text-indigo-805 text-left w-full cursor-pointer text-indigo-600 font-bold"
                >
                  PDF Document Resume
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("contact")}
                  className="hover:text-indigo-600 transition-colors text-left w-full cursor-pointer"
                >
                  Transmit Message
                </button>
              </li>
            </ul>
            <div className="w-full h-px bg-slate-100" />
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onToggleRecruiter();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 border border-indigo-100 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-mono uppercase tracking-wider font-semibold cursor-pointer hover:bg-indigo-100/50"
            >
              <Star className="w-3.5 h-3.5 fill-indigo-400 text-indigo-550" />
              {recruiterMode ? "Turn Off Recruiter Dashboard" : "Turn On Recruiter Mode"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
