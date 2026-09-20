import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Github, Search, X, Layers3, Gauge, Code2 } from "lucide-react";

type Project = {
  title: string;
  category: string;
  tagline: string;
  description: string;
  metric?: string;
  tech: string[];
  architecture: string[];
  impact: string[];
  github?: string;
  demo?: string;
};

const PROJECTS: Project[] = [
  {
    title: "AETHER — Incident Intelligence Platform",
    category: "AI / Engineering Intelligence",
    tagline: "Evidence-driven incident investigation and AI-assisted root-cause analysis.",
    description: "Designed an incident intelligence workflow that turns production signals and historical cases into structured investigation context and ranked incident hypotheses.",
    metric: "94.2% Top-1 accuracy · 95.4% precision · 91.8% recall",
    tech: ["Python", "LLMs", "RAG", "Evaluation", "Observability", "FastAPI"],
    architecture: ["Incident intake", "Signal normalization", "Evidence retrieval", "Reasoning workflow", "Structured RCA output", "Evaluation loop"],
    impact: ["Evaluated across 840 real production cases.", "Focused outputs on evidence and reproducible investigation steps.", "Included false-positive and recall tracking for model evaluation."],
    github: "https://github.com/lokesh8286235/enterprise-rag-automation-platform"
  },
  {
    title: "Enterprise RAG Automation Platform",
    category: "AI / RAG",
    tagline: "Production retrieval, grounded generation, evaluation, and observability.",
    description: "Built an end-to-end knowledge retrieval platform that ingests large document collections, creates vector representations, retrieves relevant context, and generates grounded answers through an LLM workflow.",
    metric: "10K+ docs · 1,000+ queries/day · 91% accuracy",
    tech: ["Python", "LangChain", "Claude API", "PostgreSQL", "pgvector", "AWS", "Kubernetes"],
    architecture: ["Document ingestion", "Chunking + embeddings", "pgvector retrieval", "Top-k context selection", "Claude generation", "Prometheus monitoring"],
    impact: ["Improved answer accuracy from 78% to 91%.", "Reduced manual lookup time by 40%.", "Maintained 99.9% uptime in production."],
    github: "https://github.com/lokesh8286235/enterprise-rag-automation-platform"
  },
  {
    title: "Graph Compilation & Inference Optimization",
    category: "ML Systems",
    tagline: "Graph transformation and runtime optimization for faster model inference.",
    description: "Built a compilation pipeline that lowered PyTorch and ONNX models into optimized runtime representations using graph transformations, operator fusion, quantization, and profiling.",
    metric: "~40% higher throughput · ~35% lower latency",
    tech: ["Python", "PyTorch", "ONNX", "MLIR", "CUDA", "NVIDIA Nsight"],
    architecture: ["Model import", "Graph analysis", "Operator fusion", "Quantization", "Runtime lowering", "GPU profiling + benchmarking"],
    impact: ["Raised throughput from roughly 800 to 1,120 inferences/sec in the benchmark described.", "Reduced p99 latency from about 120ms to 78ms.", "Validated performance under sustained production-style traffic."]
  },
  {
    title: "India Food Delivery Price Comparator",
    category: "AI / Full-Stack",
    tagline: "Natural-language food ordering that compares delivery options before checkout.",
    description: "Built IFD to translate a user's food request into structured constraints, compare available delivery options, surface coupons and fees, and route the user toward the selected platform/cart.",
    metric: "Voice + constraints + cross-platform comparison",
    tech: ["Next.js", "React", "TypeScript", "AI", "MCP", "Vercel"],
    architecture: ["Natural-language request", "Constraint extraction", "Restaurant/item matching", "Price + fee comparison", "Offer optimization", "Platform/cart handoff"],
    impact: ["Designed around budget, delivery-time, party-size, and add-on constraints.", "Surfaces a small set of high-value options instead of forcing users to compare platforms manually.", "Built for an extensible MCP/agent workflow."],
    github: "https://github.com/lokesh8286235/IFD",
    demo: "https://ifd-mu.vercel.app/"
  },
  {
    title: "High-Throughput Event Processing System",
    category: "Distributed Systems",
    tagline: "Asynchronous event processing with retries, recovery, and observability.",
    description: "Engineered a distributed processing system focused on concurrency, queue-driven execution, failure recovery, and operational visibility.",
    metric: "Concurrency · retries · recovery · observability",
    tech: ["C++", "Concurrency", "Queues", "Distributed Systems", "Linux"],
    architecture: ["Event intake", "Queueing", "Worker scheduling", "Retry policy", "Failure recovery", "Metrics + tracing"],
    impact: ["Designed explicit failure paths instead of relying on happy-path processing.", "Separated ingestion from execution to support backpressure.", "Focused the implementation on predictable latency and recoverability."],
    github: "https://github.com/lokesh8286235/High-Throughput-Event-Processing-System"
  },
  {
    title: "Distributed Data Pipeline",
    category: "Systems / Data",
    tagline: "Scalable data movement with concurrency and performance-focused processing.",
    description: "Built a distributed data pipeline emphasizing parallel execution, scheduling, throughput, and reliable processing across pipeline stages.",
    metric: "Parallel processing · scheduling · throughput",
    tech: ["C++", "Concurrency", "Data Pipelines", "Algorithms", "Linux"],
    architecture: ["Input partitioning", "Task scheduling", "Parallel workers", "Aggregation", "Failure handling", "Performance measurement"],
    impact: ["Applied concurrency primitives to increase pipeline parallelism.", "Separated scheduling from processing for clearer system boundaries.", "Measured bottlenecks to guide performance work."],
    github: "https://github.com/lokesh8286235/Distributed-Data-Pipeline"
  }
];

const categories = ["All", "AI / RAG", "AI / Engineering Intelligence", "ML Systems", "AI / Full-Stack", "Distributed Systems", "Systems / Data"];

export default function Projects() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(() => PROJECTS.filter((p) => {
    const matchesCategory = category === "All" || p.category === category;
    const haystack = [p.title, p.tagline, p.description, p.category, ...p.tech].join(" ").toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  }), [query, category]);

  return (
    <main className="min-h-screen bg-[#07090d] text-white selection:bg-indigo-500/30">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_-10%,rgba(99,102,241,.18),transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="font-mono text-xs tracking-[.25em] text-white/50 uppercase">Lokesh / Projects</div>
          <a href="https://github.com/lokesh8286235" target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors">
            <Github className="h-5 w-5" />
          </a>
        </header>

        <section className="py-20 sm:py-28">
          <p className="font-mono text-xs uppercase tracking-[.3em] text-indigo-400">Selected Engineering Work</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-.04em] sm:text-7xl">
            Projects that show how I build.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
            AI systems, ML infrastructure, distributed systems, and full-stack products — presented through the problem, architecture, and measurable result.
          </p>
        </section>

        <section className="sticky top-0 z-20 -mx-5 border-y border-white/10 bg-[#07090d]/90 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((item) => (
                <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-wider transition-all ${category === item ? "border-indigo-400 bg-indigo-500/15 text-indigo-300" : "border-white/10 text-white/45 hover:border-white/20 hover:text-white/80"}`}>
                  {item}
                </button>
              ))}
            </div>
            <div className="relative shrink-0 lg:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects..." className="w-full rounded-full border border-white/10 bg-white/[.03] py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-white/25 focus:border-indigo-400/60" />
            </div>
          </div>
        </section>

        <section className="grid gap-5 py-10 md:grid-cols-2">
          {filtered.map((project, index) => (
            <motion.article key={project.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .04 }} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.025] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:bg-white/[.045]">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl transition-all group-hover:bg-indigo-500/20" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[.18em] text-indigo-400">{project.category}</span>
                  <Code2 className="h-4 w-4 text-white/20" />
                </div>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight">{project.title}</h2>
                <p className="mt-2 text-sm font-medium text-white/65">{project.tagline}</p>
                <p className="mt-4 min-h-20 text-sm leading-6 text-white/45">{project.description}</p>
                {project.metric && <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/5 px-3 py-1.5 font-mono text-[10px] text-emerald-300"><Gauge className="h-3.5 w-3.5" />{project.metric}</div>}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => <span key={tech} className="rounded-md border border-white/10 bg-white/[.025] px-2.5 py-1 font-mono text-[10px] text-white/45">{tech}</span>)}
                </div>
                <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                  <button onClick={() => setActive(project)} className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white">View case study <ArrowUpRight className="h-4 w-4" /></button>
                  <div className="flex gap-3">
                    {project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-white/30 hover:text-white"><Github className="h-4 w-4" /></a>}
                    {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="font-mono text-[10px] uppercase text-indigo-400 hover:text-indigo-300">Live</a>}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </section>

        {filtered.length === 0 && <div className="py-24 text-center font-mono text-xs text-white/35">No projects match your search.</div>}

        <footer className="border-t border-white/10 py-10 font-mono text-[10px] uppercase tracking-[.2em] text-white/25">Projects only · Naga Lokesh Sai Alla</footer>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md" onClick={() => setActive(null)}>
            <motion.div initial={{ opacity: 0, y: 20, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .98 }} onClick={(e) => e.stopPropagation()} className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0c1018] p-7 shadow-2xl sm:p-9">
              <div className="flex items-start justify-between gap-5">
                <div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-indigo-400">{active.category}</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">{active.title}</h2></div>
                <button onClick={() => setActive(null)} className="rounded-full border border-white/10 p-2 text-white/40 hover:text-white"><X className="h-4 w-4" /></button>
              </div>
              <p className="mt-5 text-sm leading-7 text-white/60">{active.description}</p>
              {active.metric && <p className="mt-5 font-mono text-xs text-emerald-300">{active.metric}</p>}
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div><div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/35"><Layers3 className="h-4 w-4" /> Architecture</div><div className="mt-4 space-y-2">{active.architecture.map((step, i) => <div key={step} className="rounded-xl border border-white/10 bg-white/[.025] p-3 text-sm text-white/60"><span className="mr-3 font-mono text-indigo-400">0{i + 1}</span>{step}</div>)}</div></div>
                <div><div className="font-mono text-[10px] uppercase tracking-widest text-white/35">Impact</div><div className="mt-4 space-y-3">{active.impact.map((item) => <div key={item} className="text-sm leading-6 text-white/60">• {item}</div>)}</div></div>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">{active.tech.map((tech) => <span key={tech} className="rounded-md border border-white/10 px-2.5 py-1 font-mono text-[10px] text-white/45">{tech}</span>)}</div>
              <div className="mt-8 flex gap-3">{active.github && <a href={active.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black"><Github className="h-4 w-4" /> Source</a>}{active.demo && <a href={active.demo} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/70">Live demo</a>}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
