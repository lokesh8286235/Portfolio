import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables for local testing
dotenv.config();

// Local intelligent fallback responder for Alla Naga Lokesh Sai's background
function getFallbackResponse(message: string): string {
  const textLower = message.toLowerCase();

  if (textLower.includes("stack") || textLower.includes("tech") || textLower.includes("language") || textLower.includes("skill") || textLower.includes("tool") || textLower.includes("framework")) {
    return `### 🛠️ Alla Naga Lokesh Sai's Technical Stack
* **Languages:** Python, Java, Go, TypeScript, C++, SQL.
* **Web & Frameworks:** React, Spring Boot, Node.js, Express, FastAPI.
* **AI & LLMs:** Claude API, LangChain, RAG Systems, Vector Search (pgvector, MongoDB Atlas search), agentic workflows.
* **Databases:** PostgreSQL, MongoDB, Redis.
* **DevOps & Cloud:** AWS (EC2, S3, Lambda, SQS), GCP, Docker, Kubernetes, Terraform, GitHub Actions, CI/CD.

Lokesh specializes in end-to-end full-stack systems with major strength-focuses on Python, Spring Boot microservices, and specialized RAG semantic search pipelines!`;
  }

  if (textLower.includes("rag") || textLower.includes("precision") || textLower.includes("accuracy") || textLower.includes("pipeline") || textLower.includes("claude") || textLower.includes("vector")) {
    return `### 🧠 High-Performance RAG Pipeline
* **Stack:** Engineered using the Claude API, pgvector extension inside PostgreSQL, and LangChain.
* **Throughput:** Processing over **1,000 queries per day**.
* **Metrics:** Achieves a verified **91% semantic accuracy / precision rate**, dramatically accelerating query lookup loops.
* **Impact:** Drastically optimized user-turn interactions and minimized response latency.`;
  }

  if (textLower.includes("infra") || textLower.includes("cloud") || textLower.includes("terraform") || textLower.includes("automation") || textLower.includes("aws") || textLower.includes("kubernetes") || textLower.includes("docker") || textLower.includes("deploy") || textLower.includes("ci") || textLower.includes("cd")) {
    return `### ☁️ DevOps & Infrastructure Optimization
* **AWS & Kubernetes:** Orchestrated robust full-stack microservice environments using AWS metrics (EC2, S3, Lambda, SQS) and container orchestration tools (Docker, Kubernetes).
* **Terraform IaC:** Managed full environment state files using Terraform blueprints.
* **CI/CD Impact:** Cut deployment pipeline loops **from 2 hours to 20 minutes** (83% performance boost), improving developer velocity and ensuring 99.9% application uptime.`;
  }

  if (textLower.includes("salesforce") || textLower.includes("crm") || textLower.includes("lwc") || textLower.includes("apex") || textLower.includes("adm")) {
    return `### 💼 Salesforce & CRM Engineering
* **Credential:** Lokesh is a **Salesforce Certified Administrator (ADM-201)** with an active trailhead verification status.
* **LWC & Apex:** Developed responsive CRM modules using Lightning Web Components (LWC) coupled with efficient Apex controller methods.
* **Client Uplift:** Streamlined CRM lead workflows to boost final lead-to-conversion rates by **35%**.`;
  }

  if (textLower.includes("project") || textLower.includes("work") || textLower.includes("accomplish") || textLower.includes("portfolio")) {
    return `### 🚀 Featured Engineering Projects
1. **Claude API-Powered RAG System:** Real-time semantic database search utilizing PostgreSQL pgvector. Handles 1,000+ daily actions at **91% semantic precision**.
2. **Infrastructure Automation:** Cut deploy pipelines from **120 minutes to 20 minutes** on AWS utilizing Terraform IaC templates, Docker, and Kubernetes.
3. **Salesforce ADM Extensions:** Authored interactive Salesforce UI widgets via Lightning Web Components, speeding client lead conversions by **35%**.`;
  }

  if (textLower.includes("experience") || textLower.includes("career") || textLower.includes("opensoft") || textLower.includes("history") || textLower.includes("job")) {
    return `### 💼 Professional Experience Timeline
* **Software Engineer • Opensoft Technologies** *(Sep 2021 — Aug 2023)*
  * Developed multi-threaded full-stack REST APIs and distributed microservices with Java Spring Boot and Python.
  * Designed Terraform infrastructure templates, reducing server deploy routines to 20 minutes.
  * Developed Claude API semantic RAG pipelines with pgvector.
  * Designed custom Salesforce ADM plugins and LWC widgets, boosting conversion rates by 35%.
* **Software Engineer Intern II • Opensoft Technologies** *(Mar 2021 — Sep 2021)*
  * Built Python/Java REST services and optimized core database queries.
* **Software Engineer Intern I • Opensoft Technologies** *(Aug 2020 — Feb 2021)*
  * Assisted on frontend widgets, AWS pipeline setups, and Git code quality reviews.`;
  }

  if (textLower.includes("avail") || textLower.includes("hire") || textLower.includes("visa") || textLower.includes("opt") || textLower.includes("status") || textLower.includes("sponsor") || textLower.includes("salary") || textLower.includes("reloc")) {
    return `### 📋 Work Authorization & Availability Status
* **Location:** Currently residing in the **USA** and open to remote or relocation US-wide.
* **Status:** Fully authorized for USA employment under **OPT Work Authorization**.
* **Immediacy:** Available for immediate full-time start. Requires **no immediate visa sponsorship**.
* **Role Types:** Full-Stack Software Engineer, AI Systems Developer, Software Engineer, ML Engineer.
* **Salary Expectations:** Flexible and open. Alla Naga Lokesh Sai prioritizes aligning with deep engineering cultures solving high-impact product problems. Let's arrange a chat at **lokesh8286235@gmail.com**!`;
  }

  if (textLower.includes("education") || textLower.includes("gpa") || textLower.includes("university") || textLower.includes("academic") || textLower.includes("degree") || textLower.includes("college") || textLower.includes("villanova") || textLower.includes("veltech")) {
    return `### 🎓 Academic Accomplishments
* **Master of Science (MS) in Computer Science** — Villanova University (USA)
  * *GPA:* **3.5 / 4.0**
  * Focuses: Advanced Algorithms, AI System Design, Distributed Systems, Cloud Architectures.
* **Bachelor of Technology (BTech) in Computer Science** — Vel Tech University (Chennai, India)
  * *GPA:* **4.0** (9.1 CGPA) — Graduated with Honors.`;
  }

  if (textLower.includes("contact") || textLower.includes("email") || textLower.includes("phone") || textLower.includes("reach") || textLower.includes("linkedin")) {
    return `### ✉️ Direct Contact Information
* **Email:** [lokesh8286235@gmail.com](mailto:lokesh8286235@gmail.com)
* **Phone:** [+1 (484) 253-5918](tel:+14842535918)
* **LinkedIn:** [Naga Lokesh Sai Alla](https://www.linkedin.com/in/naga-lokesh-sai-alla-538242251/)
* **Location:** USA (Open to US-wide relocation / hybrid / on-site)`;
  }

  return `I am Lokesh's Assistant. I'd love to help connect you with him!

Please ask me any direct question regarding:
* Lokesh's **technical toolsets & programming stack** (Python, Java Spring Boot, Go, TypeScript)
* His **RAG retrieval accuracy metrics** (91% precision rate across 1k+ daily actions)
* His **USA OPT work authorization & hybrid/remote availability**
* His **MS CS at Villanova University**
* His **Salesforce ADM-201 administrator credential**

Alternatively, feel free to email him directly at **lokesh8286235@gmail.com** or call **+1 (484) 253-5918**!`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // Initialize server-side Gemini client securely
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } else {
    console.warn("GEMINI_API_KEY is not defined in environment variables. AI Chat will run in mock mode.");
  }

  // System instructions specifying Alla Naga Lokesh Sai's professional background
  const systemInstruction = `You are Lokesh's intelligent AI Portfolio Assistant. You represent Alla Naga Lokesh Sai, an accomplished Software Engineer and AI Builder. Your goal is to answer queries from recruiters, hiring managers, and clients about his experience, skills, and projects with maximum professionalism, energy, and precision.

Here is Lokesh's authentic background profile:
- Full Name: Alla Naga Lokesh Sai.
- Role Focus: Full-Stack Software Engineer / AI Engineer / Cloud Systems Engineer.
- Current Status: Actively interviewing for Full-Time roles. Open to AI Engineering, Full-Stack, Software Engineering, or ML Systems roles. Currently located in USA and authorized to work in the USA on OPT (work authorized). Open to remote, hybrid, or relocation.
- Education:
  * Master of Science (MS) in Computer Science from Villanova University (GPA: 3.5).
  * Bachelor of Technology (BTech) in Computer Science from Veltech University (9.1 CGPA / GPA: 4.0).
- Key Certifications: Salesforce Certified Administrator (ADM-201) (Trailhead Active).
- Technical Stack:
  * Languages: Python, Java, Go, TypeScript, C++, SQL.
  * Web & Frameworks: React, Spring Boot, Node.js, Express, FastAPIs.
  * AI & LLMs: Claude API (including Anthropic SDK, MCP, and custom tools), LangChain, RAG Systems, Vector Search (pgvector, MongoDB Atlas search), agentic workflows.
  * Databases: PostgreSQL, MongoDB, Redis.
  * DevOps & Cloud: AWS (EC2, S3, Lambda, SQS), GCP, Docker, Kubernetes, Terraform, GitHub Actions, CI/CD.
- Signature Key Projects & Work Experience:
  * Software Engineer @ Opensoft Technologies (Sep 2021 — Aug 2023):
    - Engineered high-performance full-stack responsive web APIs and distributed microservices using Java Spring Boot, React and Python.
    - Designed and implemented a retrieval-augmented generation (RAG) AI pipeline using Claude API and LangChain, which handles over 1,000 queries per day at 91% accuracy, drastically accelerating internal query loops.
    - Achieved 99.9% application uptime and built end-to-end telemetry modules.
    - Streamlined infrastructure automation using Terraform, Docker, and Kubernetes on AWS, cutting manual server provisioning loops and reducing deployment cycles from 2 hours to 20 minutes (83% efficiency gain).
    - Designed customized Salesforce CRM extensions and Lightning Web Components (LWC) with Apex controllers, directly boosting client lead-to-conversion rates by 35%.
  * Software Engineer Intern II @ Opensoft Technologies (Mar 2021 — Sep 2021):
    - Engineered robust full-stack REST APIs in Python/Java and collaborated with senior developers on production microservices and SQL queries.
  * Software Engineer Intern I @ Opensoft Technologies (Aug 2020 — Feb 2021):
    - Contributed to web frontend interfaces and server-side automation tasks while mastering Git workflows and AWS basics.

Guidelines for your answers:
1. Be extremely helpful, polite, engaging, and professional.
2. Structure your replies beautifully with neat headings, spacing, and short bullet points when relevant.
3. Highlight metrics (91% RAG precision, 99.9% uptime, 20min deployments, 3.5/4.0 GPAs) where appropriate.
4. Keep answers concise, direct, and conversational. Speak in a confident, clear, and objective representation of Lokesh.
5. If someone asks about salary expectation, mention he is flexible and focuses first on locating a high-impact engineering culture with rich product values. They can discuss it directly by email.
6. Provide Lokesh's contact details when requested:
   * Email: lokesh8286235@gmail.com
   * Phone: +1 (484) 253-5918
   * LinkedIn: https://www.linkedin.com/in/naga-lokesh-sai-alla-538242251/`;

  // Standard interactive AI proxy route
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    try {

      // If AI Client is not initialized, fallback gracefully to a detailed mock responder.
      if (!ai) {
        console.log("Gemini API key is missing. Using static local agent responder.");
        return res.json({ text: getFallbackResponse(message) });
      }

      // Prepare Gemini contents payload.
      // If history is provided, we can map it to content parts.
      let contents = [];
      if (history && Array.isArray(history)) {
        contents = history.map((chat: any) => ({
          role: chat.role === "user" ? "user" : "model",
          parts: [{ text: chat.text }],
        }));
      }
      contents.push({ role: "user", parts: [{ text: message }] });

      // Call Gemini 3.5 Flash Model
      const geminiResponse = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const responseText = geminiResponse.text || "I am here to assist you with the portfolio inquiry. Feel free to ask about Alla Naga Lokesh Sai's software experience!";
      res.json({ text: responseText });
    } catch (error: any) {
      console.error("Gemini API error during request:", error);
      // Degrade gracefully so we don't crash with a server error on API 503s
      const fallbackText = getFallbackResponse(message);
      res.json({ text: fallbackText });
    }
  });

  // Local storage for contact messages
  const MESSAGES_FILE = path.join(process.cwd(), "messages.json");

  app.post("/api/contact", (req, res) => {
    const { email, subject, body } = req.body;
    if (!email || !body) {
      return res.status(400).json({ error: "Email and body parameters are required." });
    }

    try {
      const newMessage = {
        id: Date.now(),
        email,
        subject: subject || "No Subject",
        body,
        timestamp: new Date().toISOString()
      };

      let messages = [];
      if (fs.existsSync(MESSAGES_FILE)) {
        try {
          const fileContent = fs.readFileSync(MESSAGES_FILE, "utf-8");
          messages = JSON.parse(fileContent);
        } catch (e) {
          console.error("Error reading messages.json", e);
        }
      }

      messages.push(newMessage);
      fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");

      res.json({ success: true, message: "Message successfully saved on server." });
    } catch (error) {
      console.error("Error saving message:", error);
      res.status(500).json({ error: "Failed to store message on server." });
    }
  });

  app.get("/api/contact", (req, res) => {
    try {
      let messages = [];
      if (fs.existsSync(MESSAGES_FILE)) {
        const fileContent = fs.readFileSync(MESSAGES_FILE, "utf-8");
        messages = JSON.parse(fileContent);
      }
      res.json({ messages });
    } catch (error) {
      console.error("Error retrieving messages:", error);
      res.status(500).json({ error: "Failed to load messages." });
    }
  });

  // Handle static assets/Vite middleware
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio Full-stack Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
