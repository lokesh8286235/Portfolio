import { Skill, Project, Experience } from "./types";

export const SKILLS: Skill[] = [
  // Core Languages
  { name: "Python", category: "languages", isCore: true },
  { name: "Java", category: "languages", isCore: true },
  { name: "TypeScript", category: "languages", isCore: true },
  { name: "Go", category: "languages", isCore: true },
  { name: "C++", category: "languages" },
  { name: "SQL", category: "languages" },
  
  // Frameworks
  { name: "React", category: "frameworks", isCore: true },
  { name: "Spring Boot", category: "frameworks", isCore: true },
  { name: "Node.js", category: "frameworks" },
  { name: "Express", category: "frameworks" },
  { name: "FastAPI", category: "frameworks" },

  // AI & ML
  { name: "AI Engineering", category: "ai", isCore: true },
  { name: "Machine Learning", category: "ai", isCore: true },
  { name: "LLMs", category: "ai", isCore: true },
  { name: "RAG Systems", category: "ai", isCore: true },
  { name: "Claude API", category: "ai", isCore: true },
  { name: "OpenAI API", category: "ai", isCore: true },
  { name: "LangChain", category: "ai", isCore: true },
  { name: "Vector Search", category: "ai" },
  { name: "Prompt Eng.", category: "ai" },
  { name: "AI Evaluation", category: "ai" },
  
  // Cloud & DevOps
  { name: "AWS", category: "cloud", isCore: true },
  { name: "Docker", category: "cloud", isCore: true },
  { name: "Kubernetes", category: "cloud", isCore: true },
  { name: "Terraform", category: "cloud" },
  { name: "GitHub Actions", category: "cloud" },

  // Databases
  { name: "PostgreSQL", category: "databases", isCore: true },
  { name: "MongoDB", category: "databases" },
  { name: "Redis", category: "databases" },
  { name: "pgvector", category: "databases" },

  // CRM & Others
  { name: "Apex / LWC", category: "other", isCore: true },
  { name: "Salesforce CRM", category: "other" },
  { name: "REST APIs", category: "other" },
];

export const PROJECTS: Project[] = [
  {
    title: "Enterprise RAG Pipeline Optimizer",
    category: "AI Engineering / RAG Architecture",
    description: "Architected a secure, context-aware Knowledge Retrieval Engine to sync fragmented internal archives, cutting search latency and improving enterprise search accuracy in real-time.",
    tech: ["Python", "Claude API", "LangChain", "PostgreSQL", "pgvector", "Redis", "AWS"],
    metric: "91% Precision / 1k daily queries",
    problem: "Corporate documentation libraries were stored in fragmented markdown and PDF silos. Developers wasted up to 2 hours matching APIs manually, and standard keyword search failed to solve contextual code queries, while public LLMs lacked internal system definitions.",
    solution: "Designed a multi-source collection layout with pgvector indexing. Used LangChain to extract context chunks, rank similarities via custom threshold algorithms, cache hot queries using corporate Redis clusters, and route secured structured prompts to Claude API.",
    architectureSteps: [
      "Document Splitting: Ingested system specs and chunked utilizing custom token density thresholds.",
      "Vector Embeddings: Calculated high-density vectors and mapped into PostgreSQL pgvector.",
      "Reranking Matrix: Executed similarity cosine matching to obtain the top 4 highly relevant context references.",
      "Secure Proxying: Wrapped context alongside localized user prompts and dispatched to safe internal Claude API nodes."
    ],
    impactBullets: [
      "Demonstrated 91% contextual accuracy evaluated by blind peer review.",
      "Minimized average team search times from 2 hours of exploration to less than 3 seconds.",
      "Served over 1,000 distinct daily employee technical query sessions securely."
    ],
    gitHubLink: "https://github.com/",
    liveDemoLink: "#"
  },
  {
    title: "DevOps Orchestration & Deploy Engine",
    category: "Cloud Native / DevOps",
    description: "Configured clean cluster replication and automated pipeline architectures to standardize multi-zone development clusters and streamline system consistency.",
    tech: ["Terraform", "Kubernetes", "Docker", "AWS", "GitHub Actions", "Prometheus"],
    metric: "Deploy cycles: 2hr to 20min",
    problem: "Inconsistent server environments created high runtime testing overhead. Manual system deployments were fragile, taking up to 2 hours of developer oversight and contributing to a 15% rate of custom container drift.",
    solution: "Coded standard reusable infrastructure-as-code modules via Terraform. Standardized web application services in Docker containers and coordinated high-availability deployment routing with Kubernetes on Amazon Elastic Kubernetes Service (EKS).",
    architectureSteps: [
      "Build Verification: Triggered Docker compilation checks on push within GitHub Actions workflows.",
      "Container Registry: Uploaded signed compiled container assets securely to protected AWS ECR warehouses.",
      "Terraform Provisioning: Calculated dynamic infra modifications and altered physical cloud resources.",
      "K8s Rolling Update: Distributed workload containers to hot node nodes without a single millisecond of downtime."
    ],
    impactBullets: [
      "Secured an 83% compression in deployment times, plunging cycles from 2 hours to 20 minutes.",
      "Achieved a 99.9% overall platform uptime with automated cluster health-checks.",
      "Guaranteed absolute parity across three distinct cloud runtime environments (Dev, Test, Prod)."
    ],
    gitHubLink: "https://github.com/",
    liveDemoLink: "#"
  },
  {
    title: "High-Throughput Enterprise API Service",
    category: "Full Stack Development",
    description: "Designed a highly reactive, responsive platform engineered in React and Spring Boot to support user interactions with enterprise databases.",
    tech: ["React", "TypeScript", "Java", "Spring Boot", "PostgreSQL", "Tailwind CSS"],
    metric: "99.9% Uptime / 200k session capacity",
    problem: "Legacy monolithic routing models used heavy blocking procedures, choking under spikes of search traffic and contributing to database thread locking and significant frontend visual lag.",
    solution: "Re-engineered a modular, asynchronous Java Spring Boot routing microservices architecture secured by state-validation tokens, matched with a beautiful React UI using Redux Toolkit.",
    architectureSteps: [
      "UI Event Dispatch: Triggered atomic state changes in React, handled via Redux Toolkit.",
      "JWT Security: Handled stateless token validation via Spring Security configurations.",
      "Non-blocking Queries: Leveraged JPA Page-selectors and optimized database index structures in PostgreSQL.",
      "Virtual DOM Updates: Rendered visual data nodes cleanly in UI lists with optimized frame transitions."
    ],
    impactBullets: [
      "Boosted page interactivity scores by 45% for over 200,000 monthly active users.",
      "Decreased heavy database transaction blocking queries by 60% through custom connection pooling.",
      "Saved the engineering group 30 hours of monthly development efforts with modular UI systems."
    ],
    gitHubLink: "https://github.com/",
    liveDemoLink: "#"
  },
  {
    title: "CRM Lead Automation Gateway",
    category: "CRM & Cloud Integration",
    description: "Programmed deep synchronization layers utilizing Lightning Web Components (LWC) and Apex classes to feed critical client queries directly into CRM lead targets.",
    tech: ["Apex", "LWC", "Salesforce Core", "SOQL", "REST APIs", "CI/CD"],
    metric: "Boosted conversions by 35%",
    problem: "Customer interest and web application inquiries were disjointed. Sync lags of up to 4 hours caused sales managers to lose immediate contact with valuable high-intent inbound client targets.",
    solution: "Formed a lightning-fast Salesforce integration. Engineered highly customized screen components with Lightning Web Components (LWC) backed by Apex query handlers and dedicated webhook receivers.",
    architectureSteps: [
      "Event Listening: Reciprocated incoming lead inquiries using scalable RESTful JSON listeners.",
      "Apex Processing: Validated records against database locks using SOQL optimization practices.",
      "UI Notification: Handled live notifications dynamically in client dashboards using LWC event-bubbles.",
      "CI/CD validation: Enforced strict Apex code coverage checks via customized terminal runners."
    ],
    impactBullets: [
      "Amplified user lead conversion ratios by 35% within the first month of production rollout.",
      "Decimated data sync latency from massive multi-hour gaps down to real-time integration streams.",
      "Freed administrative customer operations from 40% of manual data recording and audit tasks."
    ],
    gitHubLink: "https://github.com/",
    liveDemoLink: "#"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    date: "Sep 2021 — Aug 2023",
    role: "Software Engineer",
    company: "Opensoft Technologies",
    type: "eng",
    bullets: [
      "Engineered full-stack responsive microservices and REST APIs in Java Spring Boot, React & Python supporting scalable workflows, operations automation, and high concurrency.",
      "Designed retrieval-augmented generation (RAG) workflows using Anthropic's Claude API and LangChain to fetch contextual answers, capturing over 1,000 queries/day with 91% accuracy metric.",
      "Spearheaded infrastructure automation utilizing Terraform, Docker, and Kubernetes, compressing server deployment times from 2 hours to 20 minutes.",
      "Implemented streamlined CRM automation modules using Apex Controllers and responsive Lightning Web Components (LWC) that drove lead conversion metrics up by 35%."
    ],
    techTags: ["Python", "Java", "Spring Boot", "Claude API", "LangChain", "Kubernetes", "Terraform", "AWS", "Apex"]
  },
  {
    date: "Mar 2021 — Sep 2021",
    role: "Software Engineer Intern II",
    company: "Opensoft Technologies",
    type: "intern",
    bullets: [
      "Assisted senior engineers in developing Python full-stack routing modules and optimizing heavy SQL database schemas for high performance.",
      "Analyzed and authored clear REST API endpoints supporting cloud resource validation and server testing."
    ],
    techTags: ["Python", "Flask", "PostgreSQL", "Git", "REST APIs", "AWS"]
  },
  {
    date: "Aug 2020 — Feb 2021",
    role: "Software Engineer Intern I",
    company: "Opensoft Technologies",
    type: "intern",
    bullets: [
      "Acquired mastery of professional Git team workflows, continuous test strategies, and containerization fundamentals.",
      "Contributed clean frontend HTML/React components and styled UI modules to achieve perfect responsiveness on modern browser frames."
    ],
    techTags: ["HTML5", "CSS3", "JavaScript", "React", "Docker", "Git"]
  }
];
