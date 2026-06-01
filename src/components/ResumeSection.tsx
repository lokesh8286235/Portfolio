import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, GraduationCap, Briefcase, Award, 
  MapPin, Check, Search, Calendar, ChevronRight, HelpCircle 
} from "lucide-react";

export default function ResumeSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "experience" | "education" | "credentials">("all");
  const [iframeHeight, setIframeHeight] = useState<number>(850);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const education = [
    {
      institution: "Villanova University",
      degree: "Master of Science in Computer Science",
      gpa: "GPA: 3.5 / 4.0",
      location: "USA",
      period: "Expected 2024 / 2025",
      highlights: [
        "Advanced course focus: Artificial Intelligence, Deep Learning Systems, Distributed Datasets, Cloud Infrastructure SRE.",
        "Developing automated RAG evaluations and dynamic safe routing integrations."
      ]
    },
    {
      institution: "Vel Tech University",
      degree: "Bachelor of Technology in Computer Science & Engineering",
      gpa: "GPA: 4.0 / 4.0 (9.1 CGPA)",
      location: "Chennai, India",
      period: "Aug 2017 — May 2021",
      highlights: [
        "Graduated with Honors / First Class Distinction.",
        "Completed thesis on optimized SQL lookup query execution matrices and REST design."
      ]
    }
  ];

  const experience = [
    {
      company: "Opensoft Technologies",
      role: "Software Engineer",
      period: "Sep 2021 — Aug 2023",
      location: "Plainsboro, NJ",
      bullets: [
        "Engineered full-stack responsive microservices and asynchronous REST endpoints using Java Spring Boot & Python to serve scalable operations.",
        "Designed context retrieval augmented generation (RAG) datasets leveraging Anthropic's Claude API and LangChain, supporting 1,000 queries daily with 91% precision.",
        "Coded dynamic CI/CD automated platform loops utilizing Terraform, Docker, and Kubernetes clusters on AWS infrastructure, shrinking manual releases from 2 hours to 20 minutes (83% efficiency gain).",
        "Formed Salesforce CRM Lightning Web Components (LWC) integrations & Apex SQL loops, translating into a direct 35% client lead conversion lift."
      ]
    },
    {
      company: "Opensoft Technologies",
      role: "Software Engineer Intern II",
      period: "Mar 2021 — Sep 2021",
      location: "USA (Remote)",
      bullets: [
        "Cooperated with senior software staff to audit Python/Java endpoint queries and optimize database indexing speeds.",
        "Authored thorough API validation frameworks ensuring flawless server parity across cloud storage nodes."
      ]
    },
    {
      company: "Opensoft Technologies",
      role: "Software Engineer Intern I",
      period: "Aug 2020 — Feb 2021",
      location: "USA (Remote)",
      bullets: [
        "Mastered corporate continuous test execution pipelines, Docker images, and git hub tracking rules.",
        "Refactored beautiful responsive React frontend components adhering strictly to clean styling principles."
      ]
    }
  ];

  const credentials = [
    {
      name: "Salesforce Certified Administrator",
      issuer: "Salesforce Trailhead Academy",
      code: "Credential ID ADM-201 (Verify Code Active)",
      description: "Mastery of Sales Core objects, security parameters, system customization, flows, Lightning App integrations, and Apex REST integration boundaries."
    }
  ];

  // Logic to highlight or filter by matching query text
  const matchQuery = (text: string) => {
    if (!searchQuery.trim()) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const hasMatches = (section: any[]) => {
    return section.some(item => {
      const matchTitle = Object.values(item).some(val => 
        typeof val === "string" && matchQuery(val)
      );
      const matchBullets = (item.bullets || item.highlights || []).some((b: string) => 
        matchQuery(b)
      );
      return matchTitle || matchBullets;
    });
  };

  // Filter lists based on tab selection and search query
  const filteredExperience = experience.filter(exp => 
    (activeTab === "all" || activeTab === "experience") &&
    (matchQuery(exp.company) || matchQuery(exp.role) || exp.bullets.some(b => matchQuery(b)))
  );

  const filteredEducation = education.filter(edu => 
    (activeTab === "all" || activeTab === "education") &&
    (matchQuery(edu.institution) || matchQuery(edu.degree) || edu.highlights.some(h => matchQuery(h)))
  );

  const filteredCredentials = credentials.filter(cred => 
    (activeTab === "all" || activeTab === "credentials") &&
    (matchQuery(cred.name) || matchQuery(cred.issuer) || matchQuery(cred.description))
  );

  return (
    <section id="resume" className="py-24 px-6 max-w-4xl mx-auto border-t border-slate-200 select-none">
      
      {/* Header Section */}
      <div className="mb-14 text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono text-[9px] tracking-[0.25em] text-indigo-600 uppercase block mb-1 font-bold">
            DOCUMENTATION & RESUME
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Resume Dossier
          </h2>
          <p className="text-slate-650 text-xs sm:text-sm max-w-xl mt-3 leading-relaxed">
            Search, highlight, and review history directly on-page below. Use the filter tabs or type keywords to instantly isolate key achievements.
          </p>
        </div>
      </div>

      {/* Interactive Search Onpage Dossier */}
      <div className="w-full space-y-6 flex flex-col justify-between">
        
        {/* Filter, Search components */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-4 text-left justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:max-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keywords (e.g. RAG, Java)..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Quick filter buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-50 border border-slate-200/90 max-w-full overflow-x-auto">
            {(["all", "experience", "education", "credentials"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg font-mono text-[9px] uppercase tracking-wider font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800 bg-transparent border border-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

        </div>

        <div className="space-y-6 flex-grow text-left select-text max-w-3xl mx-auto w-full pt-4">
          
          {/* Section: Professional Experience */}
          {filteredExperience.length > 0 && (
            <div className="space-y-4">
              <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-indigo-600 block pb-1 border-b border-indigo-100">
                ★ Professional Experience History
              </span>

              <div className="space-y-6">
                {filteredExperience.map((exp, expId) => (
                  <div key={expId} className="relative pl-5 border-l border-indigo-500/10 hover:border-indigo-500/40 transition-all">
                    <div className="absolute top-[6px] -left-[5.5px] w-2.5 h-2.5 rounded-full bg-indigo-500 border border-white" />
                    
                    <div className="flex flex-wrap justify-between items-baseline gap-2">
                      <span className="font-sans text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-tight">{exp.company}</span>
                      <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[11px] font-mono text-indigo-650 font-bold mt-1">
                      <span>{exp.role}</span>
                      <span className="text-slate-500 flex items-center gap-1 font-semibold">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {exp.location}
                      </span>
                    </div>

                    <ul className="list-disc list-inside mt-3 text-xs text-slate-650 space-y-2.5 pl-1 leading-relaxed">
                      {exp.bullets.map((bullet, idx) => {
                        const isMatch = searchQuery && bullet.toLowerCase().includes(searchQuery.toLowerCase());
                        return (
                          <li 
                            key={idx} 
                            className={`list-item transition-all duration-300 ${isMatch ? "bg-indigo-55 bg-indigo-100/50 text-indigo-950 font-medium border-l-2 border-indigo-600 pl-1 py-0.5 rounded-r" : ""}`}
                          >
                            {bullet}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Education history */}
          {filteredEducation.length > 0 && (
            <div className="space-y-4 pt-4">
              <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-indigo-600 block pb-1 border-b border-indigo-100">
                ★ Education background
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEducation.map((edu, eduId) => (
                  <div key={eduId} className="p-5 rounded-2xl bg-white border border-slate-205 border-slate-150 hover:border-slate-300 shadow-sm transition-colors flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap justify-between font-bold text-slate-800 gap-2 text-xs">
                        <span>{edu.institution}</span>
                        <span className="font-mono text-slate-500 font-normal text-[10px]">{edu.location}</span>
                      </div>
                      
                      <div className="text-indigo-650 font-sans text-xs mt-1.5 font-extrabold">{edu.degree}</div>
                      
                      <div className="flex justify-between font-mono text-[10px] text-slate-500 mt-2.5 border-b border-slate-100 pb-2 font-semibold">
                        <span>{edu.gpa}</span>
                        <span>{edu.period}</span>
                      </div>
                    </div>

                    <ul className="mt-3 text-[11px] text-slate-650 leading-relaxed space-y-1.5 pl-1 font-medium">
                      {edu.highlights.map((ref, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-indigo-600 font-bold leading-none select-none mt-0.5">&#8250;</span>
                          <span>{ref}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Certifications */}
          {filteredCredentials.length > 0 && (
            <div className="space-y-4 pt-4">
              <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-indigo-600 block pb-1 border-b border-indigo-100">
                ★ Professional Credentials
              </span>

              <div className="space-y-3">
                {filteredCredentials.map((cred, credId) => (
                  <div key={credId} className="p-5 rounded-2xl bg-indigo-50/40 border border-indigo-100 text-left">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-indigo-600" />
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans">
                        {cred.name}
                      </h4>
                    </div>
                    <span className="text-slate-600 font-mono text-[10.5px] block mt-1.5 font-semibold">{cred.issuer} • {cred.code}</span>
                    <p className="text-slate-650 text-xs leading-relaxed mt-2.5 p-3.5 bg-white rounded-xl border border-slate-200">
                      {cred.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        <div className="p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/50 text-left font-mono text-[10px] text-indigo-600 tracking-wide mt-4 font-bold shadow-3xs max-w-3xl mx-auto w-full">
          🚀 PRO TIP: Use keywords in search input (e.g., "RAG", "K8s", "LWC") to instantly locate accomplishments.
        </div>

      </div>

    </section>
  );
}
