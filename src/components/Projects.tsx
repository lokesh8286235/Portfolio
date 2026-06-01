import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS } from "../data";
import { Project } from "../types";
import { 
  Search, ArrowUpRight, Github, X, CheckSquare, Sparkles, 
  TrendingUp, Layers, SlidersHorizontal 
} from "lucide-react";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "ai" | "devops" | "fullstack" | "crm">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"default" | "impact" | "complexity">("default");

  const categories = [
    { key: "all", label: "All Work" },
    { key: "ai", label: "AI & RAG" },
    { key: "devops", label: "DevOps & Cloud" },
    { key: "fullstack", label: "Full-Stack Web" },
    { key: "crm", label: "Salesforce & CRM" }
  ];

  const getCategorizedKey = (cat: string) => {
    const l = cat.toLowerCase();
    if (l.includes("ai") || l.includes("rag")) return "ai";
    if (l.includes("devops") || l.includes("cloud")) return "devops";
    if (l.includes("full")) return "fullstack";
    return "crm";
  };

  const filteredProjects = PROJECTS.filter((p) => {
    const catCode = getCategorizedKey(p.category);
    const matchesCategory = selectedCategory === "all" || catCode === selectedCategory;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Apply sorting options based on user selected criteria
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "impact") {
      // Sort by numeric percentage value inside the metric (91% / 35% / etc.)
      const aVal = parseInt(a.metric?.replace(/\D/g, "") || "0");
      const bVal = parseInt(b.metric?.replace(/\D/g, "") || "0");
      return bVal - aVal;
    }
    if (sortBy === "complexity") {
      // Sort by quantity of tech stack tools utilized (larger stack = high complexity)
      return b.tech.length - a.tech.length;
    }
    return 0; // Default JSON array order
  });

  const activeProject = activeCaseStudyId !== null ? PROJECTS[activeCaseStudyId] : null;

  return (
    <section id="projects" className="py-32 px-6 max-w-7xl mx-auto border-t border-slate-200 select-none">
      
      {/* Header Info */}
      <div className="mb-14 text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono text-[9px] tracking-[0.25em] text-indigo-600 uppercase block mb-1 font-bold">
            SHIPMENTS & PORTFOLIO
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Production-grade shipments
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mt-3 leading-relaxed">
            Engineered software systems designed for high availability, security, and proven enterprise business delivery. Explore cases explaining the problems and architectural pipelines.
          </p>
        </div>
 
        {/* Search tool block */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title, tech stack..."
            className="w-full bg-white border border-slate-200 hover:border-slate-350 focus:border-indigo-500 rounded-lg py-2.5 pl-9 pr-4 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400 animate-fade-in"
          />
        </div>
      </div>

      {/* Categories filter and Sorting pill list (Linear-inspired controls) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/80 pb-6 mb-10 gap-4">
        
        {/* Category triggers */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setSelectedCategory(c.key as any)}
              className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === c.key
                  ? "bg-indigo-600 text-white font-bold shadow-sm"
                  : "bg-transparent text-slate-500 hover:text-slate-800 border border-transparent"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Sorting selection box */}
        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500 self-start sm:self-auto bg-slate-50 p-1 border border-slate-200 rounded-lg">
          <div className="flex items-center gap-1 px-2 text-slate-400">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Sort:</span>
          </div>
          {(["default", "impact", "complexity"] as const).map(opt => (
            <button
              key={opt}
              onClick={() => setSortBy(opt)}
              className={`px-2.5 py-1 rounded-md uppercase font-bold text-[9px] cursor-pointer transition-all ${
                sortBy === opt
                  ? "bg-white text-slate-850 border border-slate-200 shadow-sm"
                  : "text-slate-505 hover:text-slate-900"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {sortedProjects.length === 0 ? (
          <div className="col-span-2 text-center py-20 bg-slate-50 border border-slate-200 rounded-2xl select-none">
            <span className="font-mono text-xs text-slate-500 italic block">No active projects matching the query criteria...</span>
          </div>
        ) : (
          sortedProjects.map((p, idx) => (
            <motion.div
              layout
              key={p.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-8 rounded-3xl bg-white border border-slate-200/95 hover:border-indigo-300/80 hover:shadow-2xl transition-all duration-500 text-left flex flex-col justify-between group min-h-[350px] shadow-xs relative overflow-hidden bg-gradient-to-tr from-white to-slate-50/40"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[9px] tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase font-bold">
                    {p.category}
                  </span>
                  
                  {p.metric && (
                    <span className="font-mono text-[10px] text-emerald-650 uppercase tracking-widest font-extrabold flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {p.metric}
                    </span>
                  )}
                </div>

                <h3 className="font-sans text-lg font-extrabold text-slate-900 tracking-tight mt-4 group-hover:text-indigo-650 transition-colors">
                  {p.title}
                </h3>
                
                <p className="text-slate-600 text-xs sm:text-xs leading-relaxed mt-2.5 max-w-sm line-clamp-3">
                  {p.description}
                </p>
              </div>

              <div>
                {/* Technology list */}
                <div className="flex flex-wrap gap-1 mb-5">
                  {p.tech.slice(0, 4).map((t) => (
                    <span 
                      key={t}
                      className="font-mono text-[9px] text-slate-650 border border-slate-200/80 px-2 py-0.5 rounded bg-slate-50/80 uppercase"
                    >
                      {t}
                    </span>
                  ))}
                  {p.tech.length > 4 && (
                    <span className="font-mono text-[9px] text-indigo-600 px-1 py-0.5">
                      +{p.tech.length - 4} tools
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <button
                    onClick={() => setActiveCaseStudyId(PROJECTS.findIndex((proj) => proj.title === p.title))}
                    className="font-sans text-xs font-semibold uppercase tracking-wider text-indigo-650 hover:text-indigo-805 inline-flex items-center gap-1 cursor-pointer"
                  >
                    Review Case Study
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-3">
                    <a
                      href={p.gitHubLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-indigo-600 p-1 rounded-lg transition-colors cursor-pointer"
                      title="Inspect Source code on GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Detailed case study slide-over popup modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md select-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
              className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl overflow-hidden max-h-[88vh] flex flex-col justify-between shadow-2xl"
            >
              <div className="absolute top-0 inset-x-10 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[9px] text-indigo-600 uppercase tracking-widest font-bold bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded leading-none">
                    {activeProject.category}
                  </span>
                  {activeProject.metric && (
                    <span className="font-mono text-[9px] text-emerald-650 uppercase tracking-widest font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded leading-none">
                      {activeProject.metric}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setActiveCaseStudyId(null)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
                  title="Close presentation modeling"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-left text-sm text-slate-700">
                <div className="space-y-1">
                  <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {activeProject.title}
                  </h3>
                  <p className="text-slate-500 text-xs">
                    Thorough case breakdown detailing problem matrices, pipeline solutions, and validated achievements metrics.
                  </p>
                </div>

                <div className="w-full h-px bg-slate-100" />

                {/* Problem Statement block */}
                <div className="space-y-2">
                  <span className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider block">
                    THE ENGINEERING CHALLENGE (PROBLEM STATEMENT)
                  </span>
                  <p className="font-sans text-xs sm:text-xs text-slate-705 leading-relaxed bg-slate-50 border border-slate-205 p-4 rounded-xl">
                    {activeProject.problem}
                  </p>
                </div>

                {/* Solution Statement block */}
                <div className="space-y-2">
                  <span className="font-mono text-[9px] text-indigo-600 font-bold uppercase tracking-wider block">
                    THE ARCHITECTURAL SHIFT (SOLUTION COGNIZANCE)
                  </span>
                  <p className="font-sans text-xs sm:text-xs text-slate-705 leading-relaxed bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl">
                    {activeProject.solution}
                  </p>
                </div>

                {/* Step-by-step pathway flowchart */}
                <div className="space-y-3">
                  <span className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider block flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-600" />
                    STEP-BY-STEP DATA RUNTIME PATHWAY
                  </span>
                  <div className="space-y-2 sm:space-y-1.5 font-mono text-[10px] sm:text-[11px] text-slate-500">
                    {activeProject.architectureSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-150 rounded-lg hover:border-slate-250 transition-colors"
                      >
                        <span className="font-bold text-indigo-600 leading-none">
                          0{idx + 1}.
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Measurable impacts bullet points list */}
                <div className="space-y-3">
                  <span className="font-mono text-[9px] text-indigo-600 font-bold uppercase tracking-wider block flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    MEASURABLE BUSINESS IMPACT METRICS
                  </span>
                  <div className="space-y-2">
                    {activeProject.impactBullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-xs text-slate-655 font-sans leading-relaxed">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Framework listings */}
                <div className="space-y-2.5">
                  <span className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-widest block">
                    TECHNOLOGY COMPLIANCE MATRICES
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9.5px] text-slate-600 border border-slate-205 px-2.5 py-1 rounded-md bg-slate-50 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <span className="font-mono text-[9px] text-slate-400">
                  Deployment pipeline: production cloud server EKS
                </span>

                <div className="flex items-center gap-3">
                  <a
                    href={activeProject.gitHubLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    <Github className="w-3.5 h-3.5" />
                    Inspector Link
                  </a>
                  <button
                    onClick={() => setActiveCaseStudyId(null)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer font-bold"
                  >
                    Confirm Review
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
