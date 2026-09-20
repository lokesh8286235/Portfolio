import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Github, Play, Search, X, ExternalLink, ChevronRight } from "lucide-react";

type Project = {
  title: string;
  category: string;
  eyebrow: string;
  description: string;
  metric: string;
  tech: string[];
  architecture: string[];
  impact: string[];
  github?: string;
  demo?: string;
};

const PROJECTS: Project[] = [
  {
    title: "AETHER",
    category: "AI & Intelligence",
    eyebrow: "INCIDENT INTELLIGENCE PLATFORM",
    description: "An evidence-driven incident investigation platform that turns production signals and historical cases into structured context, ranked hypotheses, and reproducible root-cause workflows.",
    metric: "94.2% Top-1 · 95.4% precision · 91.8% recall",
    tech: ["Python", "LLMs", "RAG", "FastAPI", "Evaluation", "Observability"],
    architecture: ["Incident intake", "Signal normalization", "Evidence retrieval", "Reasoning workflow", "Structured RCA", "Evaluation loop"],
    impact: ["Evaluated across 840 real production cases.", "Designed outputs around evidence and reproducible investigation steps.", "Tracked precision, recall, and false-positive behavior."],
    github: "https://github.com/lokesh8286235/incident-intelligence-platform"
  },
  {
    title: "Enterprise RAG",
    category: "AI & Intelligence",
    eyebrow: "RETRIEVAL AUTOMATION PLATFORM",
    description: "Production retrieval and grounded-generation infrastructure for large document collections, with evaluation and observability built into the workflow.",
    metric: "10K+ docs · 1,000+ queries/day · 91% accuracy",
    tech: ["Python", "LangChain", "Claude API", "pgvector", "PostgreSQL", "AWS", "Kubernetes"],
    architecture: ["Document ingestion", "Chunking + embeddings", "Vector retrieval", "Context selection", "LLM generation", "Prometheus"],
    impact: ["Improved answer accuracy from 78% to 91%.", "Reduced manual lookup time by 40%.", "Maintained 99.9% production uptime."],
    github: "https://github.com/lokesh8286235/enterprise-rag-automation-platform"
  },
  {
    title: "Graph Compiler",
    category: "ML Infrastructure",
    eyebrow: "INFERENCE OPTIMIZATION",
    description: "A model compilation pipeline that lowers PyTorch and ONNX graphs into optimized runtime representations using graph transforms, fusion, quantization, and GPU profiling.",
    metric: "~40% throughput gain · ~35% lower latency",
    tech: ["Python", "PyTorch", "ONNX", "MLIR", "CUDA", "NVIDIA Nsight"],
    architecture: ["Model import", "Graph analysis", "Operator fusion", "Quantization", "Runtime lowering", "GPU profiling"],
    impact: ["Raised throughput from roughly 800 to 1,120 inferences/sec.", "Reduced p99 latency from about 120ms to 78ms.", "Benchmarked under sustained production-style traffic."]
  },
  {
    title: "IFD",
    category: "Products & Full-Stack",
    eyebrow: "INDIA FOOD DELIVERY COMPARISON",
    description: "A natural-language food ordering experience that translates requests into constraints, compares delivery options, surfaces offers and fees, and hands the user off to the selected platform.",
    metric: "Voice + AI constraints + cross-platform comparison",
    tech: ["Next.js", "React", "TypeScript", "AI", "MCP", "Vercel"],
    architecture: ["Natural-language request", "Constraint extraction", "Item matching", "Price comparison", "Offer optimization", "Cart handoff"],
    impact: ["Supports budget, delivery-time, party-size, and add-on constraints.", "Reduces manual comparison across delivery platforms.", "Designed for extensible agent/MCP workflows."],
    github: "https://github.com/lokesh8286235/IFD",
    demo: "https://ifd-mu.vercel.app/"
  },
  {
    title: "Event Processing",
    category: "Distributed Systems",
    eyebrow: "HIGH-THROUGHPUT SYSTEM",
    description: "An asynchronous event-processing system focused on concurrency, queue-driven execution, failure recovery, retries, and operational visibility.",
    metric: "Concurrency · retries · recovery · observability",
    tech: ["C++", "Concurrency", "Queues", "Distributed Systems", "Linux"],
    architecture: ["Event intake", "Queueing", "Worker scheduling", "Retry policy", "Failure recovery", "Metrics"],
    impact: ["Separated ingestion from execution to support backpressure.", "Designed explicit recovery paths for failed work.", "Focused on predictable processing behavior."]
    ,
    github: "https://github.com/lokesh8286235/High-Throughput-Event-Processing-System"
  },
  {
    title: "Distributed Pipeline",
    category: "Distributed Systems",
    eyebrow: "PARALLEL DATA PROCESSING",
    description: "A performance-focused data pipeline emphasizing parallel execution, scheduling, throughput, and reliable processing across pipeline stages.",
    metric: "Parallel processing · scheduling · throughput",
    tech: ["C++", "Concurrency", "Data Pipelines", "Algorithms", "Linux"],
    architecture: ["Input partitioning", "Task scheduling", "Parallel workers", "Aggregation", "Failure handling", "Benchmarking"],
    impact: ["Applied concurrency primitives for pipeline parallelism.", "Separated scheduling from processing.", "Used bottleneck measurement to guide optimization."],
    github: "https://github.com/lokesh8286235/Distributed-Data-Pipeline"
  }
];

const rows = [
  { title: "All Projects", items: PROJECTS },
  { title: "AI & Intelligence", items: PROJECTS.filter(p => p.category === "AI & Intelligence") },
  { title: "ML Infrastructure", items: PROJECTS.filter(p => p.category === "ML Infrastructure") },
  { title: "Products & Full-Stack", items: PROJECTS.filter(p => p.category === "Products & Full-Stack") },
  { title: "Distributed Systems", items: PROJECTS.filter(p => p.category === "Distributed Systems") }
];

const POSTER_ART: Record<string, string> = {
  "AETHER": "radial-gradient(circle at 50% 25%, rgba(30,136,229,.95), transparent 24%), radial-gradient(circle at 70% 60%, rgba(123,31,162,.8), transparent 38%), linear-gradient(145deg,#06111f,#08080c 58%,#17070b)",
  "Enterprise RAG": "radial-gradient(circle at 48% 30%, rgba(0,188,212,.9), transparent 18%), linear-gradient(135deg,#071521,#0b2740 48%,#090909)",
  "Graph Compiler": "linear-gradient(145deg,#071a2a,#0b3550 45%,#070b12), radial-gradient(circle at 70% 25%,rgba(118,255,3,.55),transparent 22%)",
  "IFD": "radial-gradient(circle at 50% 35%,rgba(255,87,34,.8),transparent 18%), linear-gradient(145deg,#261006,#111111 60%,#09212b)",
  "Event Processing": "radial-gradient(circle at 45% 35%,rgba(255,23,68,.65),transparent 22%), linear-gradient(145deg,#16090d,#0b111c 60%,#050505)",
  "Distributed Pipeline": "radial-gradient(circle at 55% 35%,rgba(41,121,255,.85),transparent 22%), linear-gradient(145deg,#061327,#101b34 55%,#06070a)"
};

function ProjectRow({ title, items, onOpen }: { title: string; items: Project[]; onOpen: (project: Project) => void }) {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    scroller.current?.scrollBy({ left: direction === "right" ? 520 : -520, behavior: "smooth" });
  };

  return (
    <motion.div
      className="group/row mb-14"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
          <ChevronRight className="h-5 w-5 text-white/50" />
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-[9px] uppercase tracking-[.18em] text-white/30 sm:block">Scroll to explore</span>
          <button onClick={() => scroll("left")} aria-label={`Scroll ${title} left`} className="hidden h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur transition hover:bg-white/20 hover:text-white md:flex">
            <ChevronRight className="h-4 w-4 rotate-180" />
          </button>
          <button onClick={() => scroll("right")} aria-label={`Scroll ${title} right`} className="hidden h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur transition hover:bg-white/20 hover:text-white md:flex">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div ref={scroller} className="flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-visible py-3 pb-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((project, index) => (
          <motion.button
            key={project.title}
            onClick={() => onOpen(project)}
            whileHover={{ scale: 1.09, y: -10 }}
            transition={{ duration: .18 }}
            className="group/card relative min-w-[190px] snap-start overflow-visible rounded-md text-left sm:min-w-[220px] lg:min-w-[245px]"
          >
            <div
              className="relative aspect-[2/3] overflow-hidden rounded-md border border-white/10 shadow-2xl transition-shadow duration-300 group-hover/card:border-white/30 group-hover/card:shadow-[0_20px_60px_rgba(0,0,0,.7)]"
              style={{ background: POSTER_ART[project.title] }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.08),transparent_40%,rgba(0,0,0,.9))]" />
              <div className="absolute left-3 top-3 font-mono text-[9px] font-bold tracking-[.2em] text-white/65">{String(index + 1).padStart(2, "0")}</div>
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-5 text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full border border-white/15 bg-black/20 opacity-60 backdrop-blur-sm transition-all duration-300 group-hover/card:scale-110 group-hover/card:opacity-100">
                  <div className="flex h-full items-center justify-center text-2xl font-black tracking-[-.08em] text-white/80">{project.title.slice(0, 2).toUpperCase()}</div>
                </div>
                <p className="font-mono text-[8px] font-bold tracking-[.2em] text-red-400">{project.eyebrow}</p>
                <h3 className="mt-2 text-2xl font-black leading-none tracking-[-.04em] text-white">{project.title}</h3>
              </div>
              <div className="absolute inset-x-3 bottom-3">
                <p className="line-clamp-2 text-[10px] leading-4 text-white/70">{project.metric}</p>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full w-[38%] rounded-full bg-red-600 transition-all duration-300 group-hover/card:w-[82%]" />
                </div>
              </div>
              <div className="absolute right-3 top-3 flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-xl transition-all duration-300 group-hover/card:scale-100 group-hover/card:opacity-100">
                <Play className="h-3.5 w-3.5 fill-current" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const filteredRows = useMemo(() => rows.map(row => ({
    ...row,
    items: row.items.filter(p => {
      const haystack = [p.title, p.category, p.eyebrow, p.description, ...p.tech].join(" ").toLowerCase();
      return haystack.includes(query.toLowerCase());
    })
  })).filter(row => row.items.length), [query]);

  const featured = PROJECTS[0];

  return (
    <main className="min-h-screen bg-[#080808] text-white selection:bg-red-600/40">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_0%,rgba(229,9,20,.18),transparent_35%)]" />

      <nav className="fixed top-0 z-40 w-full bg-gradient-to-b from-black/95 via-black/70 to-transparent px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between">
          <div className="text-2xl font-black tracking-[-.06em] text-white">NAGA LOKESH SAI</div>
          <div className="flex items-center gap-5 text-xs font-medium text-white/70">
            <span className="hidden sm:block text-white">PROJECTS</span>
            <button onClick={() => setSearchOpen(v => !v)} aria-label="Search projects"><Search className="h-5 w-5" /></button>
            <a href="https://github.com/lokesh8286235" target="_blank" rel="noreferrer" aria-label="GitHub"><Github className="h-5 w-5" /></a>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[76vh] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(99,102,241,.22),transparent_32%),linear-gradient(90deg,#080808_15%,rgba(8,8,8,.62)_52%,rgba(8,8,8,.15)),linear-gradient(0deg,#080808_2%,transparent_55%)]" />
        <div className="relative mx-auto flex min-h-[82vh] max-w-[1500px] items-end px-5 pb-20 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="mb-4 font-mono text-[11px] font-semibold tracking-[.28em] text-red-400">NAGA LOKESH SAI · SOFTWARE ENGINEER</p>
            <h1 className="text-6xl font-black tracking-[-.055em] sm:text-8xl lg:text-[9rem]">{featured.title}</h1>
            <p className="mt-3 text-xs font-bold tracking-[.25em] text-white/70">{featured.eyebrow}</p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">{featured.description}</p>
            <p className="mt-5 font-mono text-xs text-white/85">{featured.metric}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => setActive(featured)} className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-black hover:bg-white/85"><Play className="h-4 w-4 fill-current" /> Explore Project</button>
              <a href={featured.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-white/15 px-6 py-3 text-sm font-bold backdrop-blur hover:bg-white/25"><Github className="h-4 w-4" /> Source Code</a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[1500px] px-5 pb-16 sm:px-8 lg:px-12">
        {searchOpen && (
          <div className="mb-10 flex items-center gap-3 border-b border-white/15 pb-3">
            <Search className="h-5 w-5 text-white/50" />
            <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Search AI, C++, RAG, Next.js..." className="w-full bg-transparent text-lg outline-none placeholder:text-white/25" />
            {query && <button onClick={() => setQuery("")}>Clear</button>}
          </div>
        )}

        {filteredRows.map(row => (
          <ProjectRow key={row.title} title={row.title} items={row.items} onOpen={setActive} />
        ))}
            </div>
          </motion.div>
        ))}
      </section>

      <footer className="border-t border-white/10 px-5 py-10 text-center font-mono text-[9px] uppercase tracking-[.25em] text-white/25">
        NAGA LOKESH SAI · ENGINEERING PROJECTS · AI · ML SYSTEMS · DISTRIBUTED SYSTEMS
      </footer>

      <AnimatePresence>
        {active && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 backdrop-blur-md sm:p-10" onClick={() => setActive(null)}>
            <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} exit={{opacity:0,y:25}} onClick={e=>e.stopPropagation()} className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-lg border border-white/10 bg-[#181818] shadow-2xl">
              <div className="relative min-h-[300px] bg-[radial-gradient(circle_at_75%_25%,rgba(99,102,241,.35),transparent_35%),linear-gradient(135deg,#111827,#080808)] p-7 sm:p-10">
                <button onClick={() => setActive(null)} className="absolute right-5 top-5 rounded-full bg-black/70 p-2 text-white/70 hover:text-white"><X className="h-5 w-5" /></button>
                <p className="font-mono text-[10px] tracking-[.2em] text-red-400">{active.eyebrow}</p>
                <h2 className="mt-3 text-5xl font-black tracking-[-.04em] sm:text-7xl">{active.title}</h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65">{active.description}</p>
                <p className="mt-5 font-mono text-xs text-emerald-300">{active.metric}</p>
              </div>
              <div className="grid gap-10 p-7 sm:grid-cols-2 sm:p-10">
                <div><h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Architecture</h3><div className="mt-4 space-y-2">{active.architecture.map((s,i)=><div key={s} className="rounded border border-white/10 bg-white/[.025] p-3 text-sm text-white/65"><span className="mr-3 font-mono text-red-500">0{i+1}</span>{s}</div>)}</div></div>
                <div><h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Impact</h3><div className="mt-4 space-y-3">{active.impact.map(x=><p key={x} className="text-sm leading-6 text-white/65">• {x}</p>)}</div><div className="mt-7 flex flex-wrap gap-2">{active.tech.map(t=><span key={t} className="rounded border border-white/10 px-2 py-1 font-mono text-[9px] text-white/45">{t}</span>)}</div></div>
              </div>
              <div className="flex gap-3 border-t border-white/10 p-7 sm:p-10">
                {active.github && <a href={active.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-black"><Github className="h-4 w-4" /> Source Code</a>}
                {active.demo && <a href={active.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-red-600 px-5 py-3 text-sm font-bold"><ExternalLink className="h-4 w-4" /> Live Demo</a>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
