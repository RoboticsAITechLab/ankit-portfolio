import { LabExperiment } from "@/types";

export const labExperiments: LabExperiment[] = [
  {
    id: "adaptive-chunking",
    title: "Adaptive Semantic Chunking Engine",
    category: "RAG / Retrieval",
    badge: "Prototype",
    description:
      "A sliding-window embedding similarity parser that identifies natural topic transitions to create cohesive semantic document chunks for vector indexing.",
    status: "Completed",
    techStack: ["Python", "sentence-transformers", "NumPy", "FastAPI"],
    githubUrl: "https://github.com/RoboticsAITechLab",
  },
  {
    id: "autonomous-python-agent",
    title: "Autonomous Python Code Reviewer Agent",
    category: "Automation / Agents",
    badge: "Experiment",
    description:
      "Self-reflective agent that parses AST diffs, checks cyclomatic complexity, enforces architectural conventions, and generates targeted unit tests.",
    status: "In Development",
    techStack: ["LangGraph", "Python AST", "OpenAI API", "Docker"],
    githubUrl: "https://github.com/RoboticsAITechLab",
  },
  {
    id: "vector-similarity-visualizer",
    title: "Real-Time Vector Similarity Visualizer",
    category: "Data / Visualization",
    badge: "Interactive Demo",
    description:
      "Interactive 3D t-SNE and UMAP projection tool running in the browser for visualizing high-dimensional token embeddings and clusters.",
    status: "Research Prototype",
    techStack: ["Three.js", "TypeScript", "Next.js", "WebAssembly"],
    githubUrl: "https://github.com/RoboticsAITechLab",
  },
  {
    id: "fastapi-stream-proxy",
    title: "Ultra-Low Latency LLM Token Streamer",
    category: "Backend / Performance",
    badge: "Benchmark",
    description:
      "Zero-overhead Server-Sent Events (SSE) proxy layer in async Python handling 10,000 concurrent streaming connections with 2ms TTFT overhead.",
    status: "Completed",
    techStack: ["Python", "FastAPI", "AsyncIO", "Uvicorn", "Redis"],
    githubUrl: "https://github.com/RoboticsAITechLab",
  },
];
