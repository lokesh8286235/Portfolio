import React from "react";
import { motion } from "motion/react";
import { Check, Compass, Target, ArrowRight } from "lucide-react";

interface LookingForProps {
  onContactClick: () => void;
}

export default function LookingFor({ onContactClick }: LookingForProps) {
  const points = [
    { title: "AI Engineering & LLM Rails", desc: "Building structured retrieval-augmented systems (RAG), orchestrating planning agentic loops, and optimizing context tokens." },
    { title: "Full-Stack Product Engineering", desc: "React, TypeScript, Java Spring Boot, and Python microservice integrations emphasizing responsive UI rendering, high-performance APIs, and secure state caching." },
    { title: "Cloud Native Lifecycle Orchestration", desc: "Terraform configurations, container clusters (Kubernetes EKS), automated continuous pipelines, and custom systems log metrics." },
  ];

  return (
    <section id="looking-for" className="py-24 px-6 max-w-6xl mx-auto border-t border-slate-200 select-none">
      <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 text-left relative overflow-hidden shadow-md">
        
        {/* Subtle decorative circles */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="flex-1 space-y-4">
            <span className="font-mono text-[9px] tracking-[0.25em] text-indigo-600 uppercase block font-bold">
              CURRENT FOCUS & DRIVES
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Target Position parameters
            </h2>
            <p className="text-slate-650 text-xs sm:text-xs leading-relaxed max-w-sm">
              Actively pursuing **Software Engineer** or **AI Systems Developer** roles offering end-to-end service responsibility. I build clean microservices and reliable AI-augmented features.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <span className="font-mono text-[9px] uppercase tracking-wider text-indigo-650 border border-indigo-100 px-2.5 py-1 rounded bg-indigo-50 font-bold">
                USA OPT Work Authorized
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-705 border border-emerald-100 px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-bold">
                Open to Relocation / Hybrid
              </span>
            </div>
            
            <div className="pt-4">
              <button
                onClick={onContactClick}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm"
              >
                Let's discuss my fit
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bullet columns */}
          <div className="flex-1 w-full space-y-4">
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-450 block mb-4 font-bold flex items-center gap-1.5 justify-start">
              <Compass className="w-4 h-4 text-slate-450" />
              Target Technology domains
            </span>

            <div className="space-y-3.5">
              {points.map((p) => (
                <div
                  key={p.title}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-150 flex items-start gap-4 shadow-xs"
                >
                  <div className="p-1 h-5 w-5 rounded-full bg-indigo-50 text-indigo-605 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-indigo-150/50">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                      {p.title}
                    </h4>
                    <p className="text-slate-600 text-[11px] mt-1.5 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
