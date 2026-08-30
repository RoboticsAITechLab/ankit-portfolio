import { AiExperiment } from "@/types";

export const aiExperiments: AiExperiment[] = [
  {
    id: "rag-document-qa",
    number: "01",
    title: "RAG / DOCUMENT Q&A",
    subtitle: "Retrieval • Embeddings • LLM",
    description:
      "Contextual document retrieval engine utilizing dense vector embeddings, semantic chunking, and low-latency token streaming.",
    technologies: ["Python", "FastAPI", "Qdrant", "LangChain", "Next.js"],
    status: "Prototype",
    href: "/projects/neurosearch-enterprise-rag",
  },
  {
    id: "autonomous-agent",
    number: "02",
    title: "AUTONOMOUS AGENT",
    subtitle: "Python • Tools • Automation",
    description:
      "Stateful agent loop coordinating task decomposition, tool execution in sandboxed containers, and automated error feedback loops.",
    technologies: ["Python", "LangGraph", "Docker", "AsyncIO", "FastAPI"],
    status: "Experiment",
    href: "/projects/autoagent-task-orchestrator",
  },
  {
    id: "ai-data-analysis",
    number: "03",
    title: "AI DATA ANALYSIS",
    subtitle: "Data • Models • Visualization",
    description:
      "Exploratory computer vision and tabular anomaly detection pipeline extracting structured patterns from media streams.",
    technologies: ["PyTorch", "OpenCV", "NumPy", "FastAPI", "React"],
    status: "In Development",
    href: "/projects/omnivision-defect-inspector",
  },
  {
    id: "future-experiment",
    number: "04",
    title: "FUTURE EXPERIMENT",
    subtitle: "Coming soon",
    description:
      "Active research exploring real-time multi-modal streaming architectures, local quantized inference, and distributed vector sync.",
    technologies: ["Multi-Modal", "Edge AI", "Quantization", "Streaming"],
    status: "Coming Soon",
    isComingSoon: true,
  },
];
