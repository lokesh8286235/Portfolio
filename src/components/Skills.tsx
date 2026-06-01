import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SKILLS } from "../data";
import { Cpu, Terminal, Filter, ShieldCheck, Database, Award, Server, Layers, Search, Info } from "lucide-react";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "ai" | "programming" | "frontend" | "backend" | "cloud" | "databases">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSkill, setActiveSkill] = useState<string | null>("Claude API");

  // Re-group categories exactly as requested by user guidelines
  const categories = [
    { key: "all", label: "All Skills" },
    { key: "ai", label: "AI & LLMs" },
    { key: "programming", label: "Programming" },
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Full-Stack APIs" },
    { key: "cloud", label: "Cloud & DevOps" },
    { key: "databases", label: "Databases" }
  ];

  // Dynamic Skill Mapping to the user requested categories
  const mapSkillToCategory = (name: string, originalCat: string): "ai" | "programming" | "frontend" | "backend" | "cloud" | "databases" => {
    const lower = name.toLowerCase();
    
    // AI Grouping
    if (originalCat === "ai" || lower.includes("rag") || lower.includes("claude") || lower.includes("openai") || lower.includes("langchain") || lower.includes("prompt") || lower.includes("vector") || lower.includes("ml")) {
      return "ai";
    }
    // Programming Languages Grouping
    if (originalCat === "languages" || lower === "python" || lower === "java" || lower === "typescript" || lower === "go" || lower === "c++" || lower === "sql") {
      return "programming";
    }
    // Frontend Grouping
    if (lower.includes("react") || lower.includes("lwc") || lower.includes("html") || lower.includes("css") || lower.includes("js") || lower.includes("tailwind")) {
      return "frontend";
    }
    // Backend Grouping
    if (lower.includes("spring") || lower.includes("node") || lower.includes("express") || lower.includes("fastapi") || lower.includes("rest") || originalCat === "frameworks") {
      // Avoid letting React slip into backend
      if (lower.includes("react")) return "frontend";
      return "backend";
    }
    // Cloud & DevOps Grouping
    if (originalCat === "cloud" || lower.includes("aws") || lower.includes("docker") || lower.includes("kubernetes") || lower.includes("terraform") || lower.includes("action") || lower.includes("ci/cd")) {
      return "cloud";
    }
    // DB Grouping
    if (originalCat === "databases" || lower.includes("postgres") || lower.includes("mongo") || lower.includes("redis") || lower.includes("vector") || lower.includes("sql")) {
      return "databases";
    }

    return "programming";
  };

  // Skill use case cross-referencing matrix
  const getSkillCrossReference = (name: string) => {
    switch (name) {
      case "Claude API":
      case "LangChain":
      case "RAG Systems":
      case "AI Engineering":
        return {
          utilizedIn: "Enterprise RAG Pipeline Optimizer (91% accuracy)",
          context: "Architected custom vector similarity reranking algorithms to serve context-aware prompts in less than 3 seconds."
        };
      case "Python":
      case "FastAPI":
        return {
          utilizedIn: "Enterprise RAG Pipeline & REST APIs (1,000 queries/day)",
          context: "Optimized retrieval loops and authored clean ASGI pipelines."
        };
      case "Java":
      case "Spring Boot":
      case "REST APIs":
        return {
          utilizedIn: "High-Throughput Enterprise API Service & Opensoft SWE",
          context: "Designed scalable full-stack microservices and handled non-blocking connection pools on PostgreSQL."
        };
      case "TypeScript":
      case "React":
        return {
          utilizedIn: "High-Throughput Web Apps & Interactive Recruiter Dashboards",
          context: "Engineered responsive virtualized DOM state managers via Redux Toolkit and tailwind utility frames."
        };
      case "AWS":
      case "Docker":
      case "Kubernetes":
      case "Terraform":
      case "GitHub Actions":
        return {
          utilizedIn: "Cloud Native DevOps SRE Engine",
          context: "Provisioned automated AWS clusters, shrinking system replication and deployment windows from 2 hours to 20 minutes."
        };
      case "pgvector":
      case "PostgreSQL":
      case "Redis":
        return {
          utilizedIn: "Knowledge Ingestion Warehouses",
          context: "Computed high-density cosine-similarity coordinates and leveraged hot caching layers."
        };
      case "Apex / LWC":
      case "Salesforce CRM":
        return {
          utilizedIn: "CRM Lead Automation Gateway (Opensoft Technologies)",
          context: "Wired customized Lightning Web Components to trigger REST microservice webhook listeners."
        };
      default:
        return {
          utilizedIn: "Multiple full-stack software endpoints",
          context: "Employed standard clean object oriented structures or DevOps automation workflows across repositories."
        };
    }
  };

  // Filter skills based on Category select and Search inputs
  const filteredSkills = SKILLS.map(s => ({
    ...s,
    mappedCategory: mapSkillToCategory(s.name, s.category)
  })).filter(s => {
    const matchesCategory = selectedCategory === "all" || s.mappedCategory === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "programming": return <Terminal className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />;
      case "frontend": return <Layers className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />;
      case "backend": return <Server className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />;
      case "ai": return <Cpu className="w-4 h-4 text-indigo-400 animate-pulse" />;
      case "cloud": return <Award className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />;
      case "databases": return <Database className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />;
      default: return <ShieldCheck className="w-4 h-4 text-slate-500" />;
    }
  };

  const activeRefDetails = activeSkill ? getSkillCrossReference(activeSkill) : null;

  return (
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto border-t border-slate-200 select-none">
      
      {/* Header Info */}
      <div className="mb-14 text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono text-[9px] tracking-[0.25em] text-indigo-600 uppercase block mb-1 font-bold">
            TOOLKIT & SKILLS
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-1050 text-slate-900 tracking-tight">
            Interactive engineering dashboard
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mt-3 leading-relaxed">
            Filter, search, or select specific proficiencies. Click any card to run an interactive cross-reference query revealing exactly where Lokesh integrated that skill into his shipments.
          </p>
        </div>

        {/* Integrated Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search specific skill..."
            className="w-full bg-white border border-slate-200 hover:border-slate-350 focus:border-indigo-500 rounded-lg py-2 pl-9 pr-4 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Filter Category Grid (Vercel Style) */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200/80 pb-6 mb-10 w-full">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Interactive Grid Sheet (lg:col-span-8) */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((s) => {
              const isActive = activeSkill === s.name;
              return (
                <motion.div
                  layout
                  key={s.name}
                  onClick={() => setActiveSkill(s.name)}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 relative overflow-hidden group select-none ${
                    isActive 
                      ? "bg-slate-100/70 border-indigo-500 shadow-sm" 
                      : "bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-1.5 rounded-lg transition-colors ${isActive ? "bg-indigo-50 text-indigo-600" : "bg-slate-100/70 text-slate-500"}`}>
                      {getCategoryIcon(s.mappedCategory)}
                    </div>

                    {s.isCore && (
                      <span className="font-mono text-[8px] bg-indigo-50 text-indigo-650 border border-indigo-100/80 px-1.5 py-0.5 rounded tracking-widest font-bold uppercase">
                        Core
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="font-sans text-xs font-bold text-slate-900 block group-hover:text-indigo-650 transition-colors">
                      {s.name}
                    </span>
                    <span className="font-mono text-[8.5px] text-slate-500 uppercase block mt-1 tracking-wider">
                      {s.isCore ? "Production Expert" : "Advanced Build"}
                    </span>
                  </div>

                  {/* Understated bottom dynamic progress line */}
                  <div className="mt-3.5 w-full h-1 bg-slate-100 rounded-full overflow-hidden relative">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        s.isCore ? "bg-indigo-600" : "bg-slate-400"
                      }`}
                      style={{ width: s.isCore ? "90%" : "75%" }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right Active Cross Reference Console Output Panel (lg:col-span-4) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-white border border-slate-200 text-left sticky top-24 shadow-md">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
            <Info className="w-4 h-4 text-indigo-650 animate-pulse" />
            <span className="font-sans text-xs font-semibold text-slate-800 uppercase tracking-wider font-mono">
              Work telemetry compiler
            </span>
          </div>

          <AnimatePresence mode="wait">
            {activeSkill && activeRefDetails ? (
              <motion.div
                key={activeSkill}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-indigo-605 font-bold block">
                    ACTIVE SELECTION
                  </span>
                  <p className="font-sans text-lg font-extrabold text-slate-900 tracking-tight mt-1.5">
                    {activeSkill}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-150 space-y-1">
                  <span className="font-mono text-[8.5px] uppercase text-slate-400 block font-bold leading-none">
                    Verified Deployment target:
                  </span>
                  <span className="font-sans text-xs font-bold text-slate-800 block bg-white p-2 border border-slate-200 rounded mt-1.5 shadow-sm">
                    {activeRefDetails.utilizedIn}
                  </span>
                </div>

                <div className="space-y-1 leading-relaxed">
                  <span className="font-mono text-[8.5px] uppercase text-slate-400 block font-bold">
                    Case Context parameters:
                  </span>
                  <p className="font-sans text-xs text-slate-600 leading-relaxed mt-1">
                    {activeRefDetails.context}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="py-12 text-center text-slate-400 font-mono text-xs italic">
                // Click any tooling cell on the left to review telemetry trace map...
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
}
