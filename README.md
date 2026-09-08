# Portfolio — Naga Lokesh Sai Alla

> Personal portfolio for an AI / software engineer building production-oriented AI applications and systems.

This repository contains the source for my personal portfolio website, including project case studies, technical focus areas, and links to selected engineering work.

## Purpose

The portfolio is designed to answer three questions quickly:

1. **What do I build?** — AI applications, LLM/RAG systems, backend services, and performance-sensitive software.
2. **How do I build it?** — with measurable evaluation, clean interfaces, observability, testing, and deployment discipline.
3. **What can I inspect?** — the underlying GitHub projects, architecture, benchmarks, and implementation details.

## Featured projects

| Project | Focus |
|---|---|
| [AETHER](https://github.com/lokesh8286235/incident-intelligence-platform) | AI-assisted incident investigation and evidence-grounded RCA |
| [Enterprise RAG](https://github.com/lokesh8286235/enterprise-rag-automation-platform) | Retrieval, evaluation, and grounded generation |
| [Distributed Data Pipeline](https://github.com/lokesh8286235/Distributed-Data-Pipeline) | C++ concurrency and performance engineering |
| [Event Processing System](https://github.com/lokesh8286235/High-Throughput-Event-Processing-System) | Serverless distributed systems and failure recovery |

## Run locally

### Prerequisites

- Node.js 18+
- npm
- A valid Gemini API key for features that call the Gemini API

### Setup

```bash
npm install
```

Create `.env.local`:

```env
GEMINI_API_KEY=your_api_key_here
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Engineering notes

- Keep secrets out of source control; use environment variables for API credentials.
- Prefer small, composable UI components over page-specific duplication.
- Keep project claims tied to the corresponding repository or benchmark.
- Treat the portfolio as an entry point to the engineering work, not a replacement for the source code.

## Author

**Naga Lokesh Sai Alla**  
[GitHub](https://github.com/lokesh8286235) · [LinkedIn](https://linkedin.com/in/naga-lokesh-sai-alla-538242251) · [Live portfolio](https://portfolio-r7n2.vercel.app)
