export interface Skill {
  name: string;
  category: "languages" | "frameworks" | "cloud" | "databases" | "ai" | "other";
  isCore?: boolean;
}

export interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  metric?: string;
  // Sleek case-study fields
  problem: string;
  solution: string;
  architectureSteps: string[];
  impactBullets: string[];
  gitHubLink?: string;
  liveDemoLink?: string;
}

export interface Experience {
  date: string;
  role: string;
  company: string;
  type: "eng" | "intern";
  bullets: string[];
  techTags: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}
