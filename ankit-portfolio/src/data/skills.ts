import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    title: "LANGUAGES",
    description: "Core programming languages utilized in engineering & AI",
    skills: [
      { name: "Python", level: "Advanced" },
      { name: "TypeScript", level: "Proficient" },
      { name: "JavaScript (ES6+)", level: "Proficient" },
      { name: "Java", level: "Intermediate" },
      { name: "SQL (PostgreSQL / MySQL)", level: "Proficient" },
      { name: "C++", level: "Foundational" },
    ],
  },
  {
    title: "FRONTEND",
    description: "Modern, high-performance UI engineering and responsive design",
    skills: [
      { name: "Next.js (App Router)", level: "Advanced" },
      { name: "React 19", level: "Advanced" },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "Framer Motion", level: "Proficient" },
      { name: "Responsive & Accessible UI", level: "Advanced" },
      { name: "State Management", level: "Proficient" },
    ],
  },
  {
    title: "BACKEND",
    description: "Scalable API architecture, secure services and pipelines",
    skills: [
      { name: "FastAPI", level: "Advanced" },
      { name: "Node.js / Express", level: "Proficient" },
      { name: "REST & GraphQL APIs", level: "Advanced" },
      { name: "Auth (JWT / OAuth / NextAuth)", level: "Proficient" },
      { name: "Pydantic & Data Validation", level: "Advanced" },
      { name: "Microservices Architecture", level: "Intermediate" },
    ],
  },
  {
    title: "DATA / AI",
    description: "Machine learning, retrieval augmented generation and agents",
    skills: [
      { name: "RAG & Vector Databases", level: "Advanced" },
      { name: "LangChain & LlamaIndex", level: "Proficient" },
      { name: "LLM Fine-Tuning & Prompt Eng.", level: "Advanced" },
      { name: "PyTorch & Scikit-Learn", level: "Proficient" },
      { name: "Pandas & NumPy", level: "Advanced" },
      { name: "Autonomous Agents", level: "Proficient" },
    ],
  },
];
