import React from "react";
import { motion } from "motion/react";
import { EXPERIENCES } from "../data";
import { Briefcase, Calendar, Star, ShieldCheck, Cpu } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto border-t border-slate-200 select-none">
      
      {/* Header sections */}
      <div className="mb-14 text-left">
        <span className="font-mono text-[9px] tracking-[0.25em] text-indigo-605 uppercase block mb-1 font-bold">
          HISTORY & LEADERSHIP
        </span>
        <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Professional career trajectory
        </h2>
        <p className="text-slate-650 text-xs sm:text-sm max-w-xl mt-3 leading-relaxed">
          Leading engineering initiatives across systems design and AI operations. Ensuring perfect alignment between business goals and full-stack system architecture.
        </p>
      </div>

      {/* Main Experience line timeline */}
      <div className="relative max-w-3xl mx-auto pl-6 sm:pl-10 space-y-12">
        
        {/* Core Timeline connector column line */}
        <div className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-[1.5px] bg-slate-200 border-l border-dashed border-slate-300" />

        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={exp.company + exp.role}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
            className="relative"
          >
            {/* Timeline Dot highlight node */}
            <div className={`absolute -left-[30px] sm:-left-[43px] top-1.5 w-[11px] h-[11px] rounded-full transition-colors border duration-350 ${
                exp.type === "eng"
                  ? "bg-indigo-650 border-indigo-500 shadow-sm"
                  : "bg-slate-100 border-slate-300"
              }`} 
            />

            <div className="space-y-4 text-left">
              {/* Timeline Header (Company, Role, and Date row) */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 border-b border-slate-150 pb-3">
                <div className="space-y-1">
                  <h3 className="font-sans text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    {exp.company}
                    <span className="font-mono text-[9.5px] text-slate-500 font-normal tracking-wide">
                      ({exp.type === "eng" ? "FTE" : "Internship"})
                    </span>
                  </h3>
                  <div className="font-sans text-xs text-indigo-600 font-medium font-semibold">
                    {exp.role}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-slate-500 font-mono text-[10px] uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{exp.date}</span>
                </div>
              </div>

              {/* Work narrative bullet lists */}
              <div className="space-y-2.5 max-w-2xl">
                {exp.bullets.map((bullet, bid) => (
                  <div key={bid} className="flex items-start gap-3">
                    <span className="text-indigo-505 font-mono text-[11px] leading-none select-none mt-1">
                      →
                    </span>
                    <p className="font-sans text-xs sm:text-xs text-slate-655 leading-relaxed">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech Tags Row */}
              {exp.techTags && exp.techTags.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {exp.techTags.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[9px] text-indigo-650 border border-indigo-100 px-2 py-0.5 rounded bg-indigo-50/50 uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
