import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Cpu, Database, Sparkles, MessageSquare, Network, BarChart3, 
  Workflow, ArrowRight, Layers, Bookmark, Terminal, Play, CheckCircle2 
} from "lucide-react";

export default function AIEngineering() {
  const [activeTab, setActiveTab] = useState<"rag" | "agents" | "eval">("rag");

  // Flowchart animation state for live simulation
  const [simulationState, setSimulationState] = useState<"idle" | "embedding" | "querying" | "generation" | "completed">("idle");
  const [simLogs, setSimLogs] = useState<string[]>([]);

  const runSimulation = () => {
    if (simulationState !== "idle") return;
    
    setSimLogs(["[1/4] Loading document markdown vectors..."]);
    setSimulationState("embedding");

    setTimeout(() => {
      setSimLogs(prev => [...prev, "[2/4] Executing pgvector cosine-distance search (found 3 matches)..."]);
      setSimulationState("querying");
    }, 1500);

    setTimeout(() => {
      setSimLogs(prev => [...prev, "[3/4] Compressing context blocks. Dispatching secure query API to Claude..."]);
      setSimulationState("generation");
    }, 3000);

    setTimeout(() => {
      setSimLogs(prev => [...prev, "[4/4] LLM Response retrieved with 91.4% confidence evaluation! ✅"]);
      setSimulationState("completed");
    }, 4500);
  };

  const resetSimulation = () => {
    setSimulationState("idle");
    setSimLogs([]);
  };

  return (
    <section id="ai-engineering" className="py-24 px-6 max-w-6xl mx-auto border-t border-slate-200 select-none">
      
      {/* Label and title headers */}
      <div className="mb-14 text-left">
        <div className="flex items-center gap-1.5 mb-1 bg-indigo-50 border border-indigo-150 px-2.5 py-1 rounded w-fit text-indigo-700 font-mono text-[9px] uppercase tracking-wider font-bold">
          <Workflow className="w-3.5 h-3.5" />
          Core Competency Focus
        </div>
        <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1.5">
          AI Systems Engineering & ML Rails
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mt-3 leading-relaxed">
          Building deterministic guardrails around stochastic intelligence. Designing context-aligned vectors, agentic tools, structured JSON loops, and strict latency optimization.
        </p>
      </div>

      {/* Structural layout divided into Tabs/Insights and interactive Live Architectural Flowchart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Systems Capabilities Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            
            {/* RAG Card */}
            <div
              onClick={() => setActiveTab("rag")}
              className={`p-4.5 rounded-xl border transition-all duration-300 text-left cursor-pointer ${
                activeTab === "rag"
                  ? "bg-white border-indigo-500 shadow-sm"
                  : "bg-slate-50 border-slate-200/80 hover:border-slate-350 hover:bg-slate-100/10"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg transition-colors ${activeTab === "rag" ? "bg-indigo-50 text-indigo-650" : "bg-slate-100 text-slate-450"}`}>
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                    Structured RAG Architectures
                  </h3>
                  <p className="text-slate-605 text-xs sm:text-xs mt-1.5 leading-relaxed">
                    Connecting relational databases to vector indices via LangChain, utilizing cosine distances, similarity reranking, and metadata caching on Redis.
                  </p>
                </div>
              </div>
            </div>

            {/* Agentic Loop Card */}
            <div
              onClick={() => setActiveTab("agents")}
              className={`p-4.5 rounded-xl border transition-all duration-300 text-left cursor-pointer ${
                activeTab === "agents"
                  ? "bg-white border-indigo-500 shadow-sm"
                  : "bg-slate-50 border-slate-200/80 hover:border-slate-350 hover:bg-slate-100/10"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg transition-colors ${activeTab === "agents" ? "bg-indigo-50 text-indigo-650" : "bg-slate-100 text-slate-450"}`}>
                  <Network className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                    Agentic AI Routing Loops
                  </h3>
                  <p className="text-slate-605 text-xs sm:text-xs mt-1.5 leading-relaxed">
                    Executing multi-turn task planning loops, prompt chain state machines, fallback strategies, and function calling workflows utilizing secure API clients.
                  </p>
                </div>
              </div>
            </div>

            {/* AI Evaluation / Testing Card */}
            <div
              onClick={() => setActiveTab("eval")}
              className={`p-4.5 rounded-xl border transition-all duration-300 text-left cursor-pointer ${
                activeTab === "eval"
                  ? "bg-white border-indigo-500 shadow-sm"
                  : "bg-slate-50 border-slate-200/80 hover:border-slate-350 hover:bg-slate-100/10"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg transition-colors ${activeTab === "eval" ? "bg-indigo-50 text-indigo-650" : "bg-slate-100 text-slate-450"}`}>
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                    AI Evaluation & Prompt Rails
                  </h3>
                  <p className="text-slate-605 text-xs sm:text-xs mt-1.5 leading-relaxed">
                    Enforcing absolute compliance checking, strict output system parameters (safe JSON schema structures), prompt engineering assertions, and latency evaluations.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Technical Specs Summary */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-left text-[11px] font-mono text-slate-500">
            <span className="text-indigo-650 font-bold block uppercase text-[9px] tracking-wider mb-1">
              ENGINEER STATE NOTES:
            </span>
            <div className="flex justify-between border-b border-slate-150 pb-1.5">
              <span>Claude & GPT clients</span>
              <span className="text-slate-800 font-semibold">Strict JSON schema forcing</span>
            </div>
            <div className="flex justify-between border-b border-slate-150 pb-1.5">
              <span>Vector storage schemas</span>
              <span className="text-slate-800 font-semibold">pgvector with IVFFlat indices</span>
            </div>
            <div className="flex justify-between">
              <span>Caching pipeline</span>
              <span className="text-slate-800 font-semibold">Redis L2 vector similarity caches</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Architecture Diagram simulating RAG */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between relative overflow-hidden text-left shadow-md">
          
          {/* Faint ambient layout border overlay */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-650" />
              <span className="font-sans text-xs font-semibold text-slate-805">
                Live Retrieval Architecture Diagram
              </span>
            </div>
            <span className="font-mono text-[9px] text-indigo-650 uppercase tracking-widest font-bold bg-indigo-50 border border-indigo-120 px-2 py-0.5 rounded">
              Active Simulator
            </span>
          </div>

          {/* Dynamic Flow Map container */}
          <div className="flex-grow flex flex-col justify-center space-y-4 py-3">
            
            {/* Step 1: User Query Node */}
            <div className="flex items-center justify-between gap-4">
              <div className={`p-3 rounded-lg border flex-1 text-center transition-all duration-300 ${
                simulationState === "embedding" 
                  ? "bg-indigo-600 border-indigo-500 shadow-sm text-white"
                  : "bg-slate-50 border-slate-200 text-slate-500"
              }`}>
                <span className={`block font-mono text-[9.5px] uppercase font-bold leading-none mb-1 ${simulationState === "embedding" ? "text-white" : "text-slate-700"}`}>
                  1. Ingestion Node
                </span>
                <span className="text-[10px] font-sans">Tokenize query text</span>
              </div>
              <ArrowRight className={`w-3.5 h-3.5 text-slate-400 ${simulationState === "embedding" ? "text-indigo-600 animate-pulse" : ""}`} />
              
              {/* Step 2: Vector Table Index */}
              <div className={`p-3 rounded-lg border flex-1 text-center transition-all duration-300 ${
                simulationState === "querying" 
                  ? "bg-indigo-600 border-indigo-500 shadow-sm text-white"
                  : "bg-slate-50 border-slate-200 text-slate-500"
              }`}>
                <span className={`block font-mono text-[9.5px] uppercase font-bold leading-none mb-1 ${simulationState === "querying" ? "text-white" : "text-slate-700"}`}>
                  2. pgvector Index
                </span>
                <span className="text-[10px] font-sans">Calculate relevance</span>
              </div>
            </div>

            {/* Bridge connector vertical line style */}
            <div className="flex justify-around animate-fade-in">
              <div className="w-0.5 h-4 bg-slate-150" />
              <div className="w-0.5 h-4 bg-slate-150" />
            </div>

            {/* Step 3: Context and Step 4: Claude LLM API synthesis */}
            <div className="flex items-center justify-between gap-4">
              <div className={`p-3 rounded-lg border flex-1 text-center transition-all duration-300 ${
                simulationState === "generation" 
                  ? "bg-indigo-600 border-indigo-500 shadow-sm text-white"
                  : "bg-slate-50 border-slate-200 text-slate-500"
              }`}>
                <span className={`block font-mono text-[9.5px] uppercase font-bold leading-none mb-1 ${simulationState === "generation" ? "text-white" : "text-slate-700"}`}>
                  3. Claude API System
                </span>
                <span className="text-[10px] font-sans">Inject curated context</span>
              </div>
              <ArrowRight className={`w-3.5 h-3.5 text-slate-400 ${simulationState === "generation" ? "text-indigo-600 animate-pulse" : ""}`} />
              
              <div className={`p-3 rounded-lg border flex-1 text-center transition-all duration-300 ${
                simulationState === "completed" 
                  ? "bg-emerald-600 border-emerald-500 shadow-sm text-white"
                  : "bg-slate-50 border-slate-200 text-slate-500"
              }`}>
                <span className={`block font-mono text-[9.5px] uppercase font-bold leading-none mb-1 ${simulationState === "completed" ? "text-white" : "text-slate-700"}`}>
                  4. Evaluation Safe Output
                </span>
                <span className="text-[10px] font-sans leading-none">Output validated RAG answer</span>
              </div>
            </div>

          </div>

          {/* Controller console interface */}
          <div className="pt-4 border-t border-slate-100 mt-4 flex flex-col gap-3">
            <div className="bg-slate-50 rounded-xl border border-slate-150 p-3 flex flex-col gap-1.5 min-h-[90px] justify-between relative">
              <span className="absolute top-2.5 right-3 flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
              </span>
              
              <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-slate-400 animate-pulse" />
                EXECUTION_CONSOLE_STREAM:
              </div>

              <div className="space-y-1 mt-1 text-[10px] font-mono text-left">
                {simLogs.length === 0 ? (
                  <span className="text-slate-405 block italic">// Click run simulation to trigger query tracing workflow...</span>
                ) : (
                  simLogs.map((log, lid) => (
                    <span key={lid} className={`block ${lid === simLogs.length - 1 ? "text-indigo-650 font-bold animate-fade-in" : "text-slate-400"}`}>
                      {log}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Simulation controls */}
            <div className="flex items-center justify-between font-mono text-[9px] text-slate-400">
              <span>
                latency tracking specs: ~140ms embeddings
              </span>

              <div className="flex items-center gap-2">
                {simulationState !== "idle" && (
                  <button
                    onClick={resetSimulation}
                    className="px-3 py-1.5 rounded bg-white hover:bg-slate-55 border border-slate-200 text-slate-700 font-mono text-[10px] uppercase tracking-wide cursor-pointer shadow-xs"
                  >
                    Reset
                  </button>
                )}
                <button
                  onClick={runSimulation}
                  disabled={simulationState !== "idle"}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-[10px] font-bold uppercase tracking-wider disabled:opacity-40 cursor-pointer shadow-sm"
                >
                  <Play className="w-3 h-3 fill-white text-white" />
                  Run Simulation
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
