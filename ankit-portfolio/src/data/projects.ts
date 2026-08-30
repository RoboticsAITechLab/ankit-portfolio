import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "neurosearch-rag",
    slug: "neurosearch-enterprise-rag",
    title: "NeuroSearch RAG Platform",
    category: "AI / Full-Stack",
    categoryTag: "AI",
    description:
      "Contextual document retrieval engine utilizing hybrid vector search, semantic chunking, and streaming LLM response generation.",
    leadDescription:
      "An intelligent knowledge retrieval platform built to index structured and unstructured documentation with hybrid dense-sparse vector search and low-latency response streaming.",
    tags: ["Python", "FastAPI", "Qdrant", "LangChain", "Next.js", "TypeScript"],
    featured: true,
    caseStudyUrl: "/projects/neurosearch-enterprise-rag",
    liveUrl: "https://github.com/RoboticsAITechLab",
    githubUrl: "https://github.com/RoboticsAITechLab",
    year: "2025",
    overview: {
      problem:
        "Standard keyword search and naive embedding retrieval struggle with domain-specific technical documentation, causing semantic hallucination and poor recall on multi-hop questions.",
      solution:
        "Engineered a distributed hybrid retrieval pipeline that combines BM25 keyword matching with dense HNSW vector similarity in Qdrant, reranked by cross-encoders and served via asynchronous FastAPI endpoints.",
    },
    architecture: {
      summary:
        "Client requests pass through Next.js server components to an asynchronous FastAPI gateway that orchestrates embeddings, Qdrant vector retrieval, and streaming LLM response synthesis.",
      nodes: [
        { name: "CLIENT", role: "Browser UI & Streaming Consumer", tech: "Next.js App Router" },
        { name: "FRONTEND", role: "Server Components & SSE Parser", tech: "React 19 / TypeScript" },
        { name: "API GATEWAY", role: "Request Validation & Stream Handler", tech: "FastAPI / Uvicorn" },
        { name: "AI / RETRIEVAL", role: "Embedding Model & Cross-Encoder", tech: "LangChain / BGE" },
        { name: "VECTOR STORE", role: "High-Dimensional Similarity Index", tech: "Qdrant HNSW" },
      ],
    },
    features: [
      {
        number: "01",
        title: "Hybrid Dense-Sparse Search",
        description: "Merges BM25 keyword recall with dense semantic vector search using reciprocal rank fusion.",
      },
      {
        number: "02",
        title: "Adaptive Semantic Chunking",
        description: "Dynamically partitions technical documents based on structural heading trees and token boundaries.",
      },
      {
        number: "03",
        title: "Real-Time Token Streaming",
        description: "Uses Server-Sent Events (SSE) to stream synthesized LLM answers to the frontend with sub-100ms first token delivery.",
      },
      {
        number: "04",
        title: "Source Citation Attribution",
        description: "Extracts and highlights exact source paragraph citations directly beneath generated responses.",
      },
    ],
    implementation: [
      {
        title: "Vector Pipeline Architecture",
        description:
          "Designed an ingestion pipeline that normalizes Markdown, PDF, and HTML documents into semantic chunks with metadata filtering capabilities.",
        highlight: "Decoupled embedding generation from user-facing query paths via asynchronous worker tasks.",
      },
      {
        title: "Cross-Encoder Reranking",
        description:
          "Applied a lightweight cross-encoder model to re-score top candidate chunks before passing context to the generative model, minimizing prompt overhead.",
        highlight: "Significantly improved retrieval relevance on domain-specific technical queries.",
      },
      {
        title: "Zero-Latency Stream Handling",
        description:
          "Implemented native SSE event handling on the client with automated reconnection and buffer parsing for responsive interactive conversations.",
        highlight: "Ensured reliable streaming even on unstable mobile connections.",
      },
    ],
    results: [
      "Successfully deployed as a high-performance knowledge retrieval platform.",
      "Achieved sub-100ms time-to-first-token during live LLM streaming generation.",
      "Maintained deterministic source citation accuracy across multi-format documentation collections.",
    ],
  },
  {
    id: "auto-agent-orchestrator",
    slug: "autoagent-task-orchestrator",
    title: "AutoAgent Task Orchestrator",
    category: "AI / Backend",
    categoryTag: "AI",
    description:
      "Autonomous multi-agent execution framework coordinating task decomposition, sandboxed code execution, and self-healing error loops.",
    leadDescription:
      "A modular multi-agent runtime designed to break down complex development tasks into parallel sub-routines with isolated execution environments and verification steps.",
    tags: ["Python", "AsyncIO", "Docker", "FastAPI", "TypeScript", "Tailwind CSS"],
    featured: true,
    caseStudyUrl: "/projects/autoagent-task-orchestrator",
    liveUrl: "https://github.com/RoboticsAITechLab",
    githubUrl: "https://github.com/RoboticsAITechLab",
    year: "2025",
    overview: {
      problem:
        "Single-prompt AI generation often fails on multi-step software engineering tasks due to lack of self-correction, tool sandboxing, and execution feedback.",
      solution:
        "Built a stateful multi-agent execution loop with specialized Planner, Coder, and Verifier roles running in isolated Docker containers with automated error recovery.",
    },
    architecture: {
      summary:
        "The orchestrator coordinates agent state graphs via asynchronous Python queues, executing generated scripts in ephemeral Docker sandboxes before returning structured results.",
      nodes: [
        { name: "CLIENT", role: "Telemetry Dashboard & Terminal UI", tech: "Next.js / WebSocket" },
        { name: "API LAYER", role: "Session Manager & Task Controller", tech: "FastAPI / AsyncIO" },
        { name: "AGENT RUNTIME", role: "Graph-based Task Coordinator", tech: "LangGraph / Python" },
        { name: "SANDBOX ENGINE", role: "Isolated Code Execution", tech: "Docker Engine API" },
        { name: "STATE STORE", role: "Execution Logs & Step Checkpoints", tech: "Redis / SQLite" },
      ],
    },
    features: [
      {
        number: "01",
        title: "Role-Based Agent Graphs",
        description: "Specialized roles for architecture planning, code generation, lint checking, and automated test execution.",
      },
      {
        number: "02",
        title: "Sandboxed Execution",
        description: "Ephemeral containerized environments guaranteeing zero-trust host security during automated script execution.",
      },
      {
        number: "03",
        title: "Self-Healing Debug Loops",
        description: "Automatically feeds terminal tracebacks and syntax errors back to the agent for iterative correction.",
      },
      {
        number: "04",
        title: "Live Terminal Telemetry",
        description: "Streams agent scratchpad reasoning and command executions over WebSockets in real time.",
      },
    ],
    implementation: [
      {
        title: "Graph-Based Execution Flow",
        description:
          "Implemented state machines with cycle detection to prevent infinite execution loops while allowing legitimate iterative test-and-fix iterations.",
        highlight: "Strict timeout thresholds and resource quotas enforced per sub-agent.",
      },
      {
        title: "Isolated Container Spawning",
        description:
          "Automated ephemeral Docker container lifecycles with volume mounting and non-root execution profiles.",
        highlight: "Prevents untrusted agent code from accessing host network or filesystem resources.",
      },
    ],
    results: [
      "Successfully created a fully autonomous multi-step software development sandbox.",
      "Achieved automated self-correction of syntax and runtime exceptions across multi-file script targets.",
      "Delivered real-time telemetry streaming with low-overhead WebSocket transport.",
    ],
  },
  {
    id: "pulsecloud-telemetry",
    slug: "pulsecloud-telemetry-gateway",
    title: "PulseCloud Telemetry Gateway",
    category: "Backend / Data",
    categoryTag: "Backend",
    description:
      "High-concurrency event ingestion gateway designed for microservice observability, rate limiting, and structured streaming pipelines.",
    leadDescription:
      "A distributed observability and telemetry ingestion engine engineered to buffer, validate, and aggregate high-volume metric streams with minimal latency overhead.",
    tags: ["TypeScript", "Node.js", "Redis", "PostgreSQL", "Next.js", "Tailwind CSS"],
    featured: true,
    caseStudyUrl: "/projects/pulsecloud-telemetry-gateway",
    liveUrl: "https://github.com/RoboticsAITechLab",
    githubUrl: "https://github.com/RoboticsAITechLab",
    year: "2024",
    overview: {
      problem:
        "High-throughput microservices produce millions of log and metric events that overwhelm downstream relational databases without proper buffering and rate limiting.",
      solution:
        "Constructed an asynchronous ingestion proxy using Redis stream queues, memory-efficient validation buffers, and batch workers writing into time-partitioned PostgreSQL storage.",
    },
    architecture: {
      summary:
        "Ingested telemetry data enters through a lightweight HTTP gateway, is buffered in Redis streams, and is batch-processed by async workers into partitioned PostgreSQL tables.",
      nodes: [
        { name: "PRODUCER", role: "Microservices & Distributed Apps", tech: "HTTP / JSON Payloads" },
        { name: "INGESTION GATEWAY", role: "Token-Bucket Rate Limiter", tech: "Node.js / Express" },
        { name: "MESSAGE QUEUE", role: "Low-Latency Stream Buffer", tech: "Redis Streams" },
        { name: "BATCH WORKERS", role: "Aggregation & Anomaly Detection", tech: "TypeScript Worker Threads" },
        { name: "STORAGE", role: "Time-Partitioned Persistence", tech: "PostgreSQL" },
      ],
    },
    features: [
      {
        number: "01",
        title: "Token-Bucket Rate Limiting",
        description: "Enforces per-client concurrency and bandwidth caps to defend against traffic spikes.",
      },
      {
        number: "02",
        title: "Redis Stream Buffering",
        description: "Decouples ingestion throughput from disk write limits to absorb heavy bursts.",
      },
      {
        number: "03",
        title: "Batch Persistence Engine",
        description: "Aggregates events in micro-batches before bulk committing to time-series partitioned tables.",
      },
      {
        number: "04",
        title: "Interactive Telemetry Dashboard",
        description: "Responsive Next.js visualization interface for inspecting latency percentiles and error distributions.",
      },
    ],
    implementation: [
      {
        title: "Schema Validation Optimization",
        description:
          "Utilized lightweight schema validators to filter invalid payloads early before queue ingestion.",
        highlight: "Reduced unnecessary queue contention and database write failures.",
      },
      {
        title: "Partitioned Database Design",
        description:
          "Applied PostgreSQL declarative range partitioning by timestamp to ensure fast queries and efficient archival rotations.",
        highlight: "Kept query scan times predictable regardless of historical table volume.",
      },
    ],
    results: [
      "Successfully deployed a resilient event ingestion and monitoring gateway.",
      "Achieved sub-15ms average API ingestion response times under heavy simulated loads.",
      "Prevented downstream database saturation through intelligent Redis stream backpressure.",
    ],
  },
  {
    id: "omnivision-defect-inspector",
    slug: "omnivision-defect-inspector",
    title: "OmniVision Defect Inspector",
    category: "Data / AI",
    categoryTag: "Data",
    description:
      "Computer vision pipeline performing anomaly detection and image classification on high-throughput media streams.",
    leadDescription:
      "An automated vision inspection system deploying deep convolutional networks to detect micro-surface anomalies in real-time visual feeds.",
    tags: ["PyTorch", "OpenCV", "Python", "FastAPI", "React", "TypeScript"],
    featured: true,
    caseStudyUrl: "/projects/omnivision-defect-inspector",
    liveUrl: "https://github.com/RoboticsAITechLab",
    githubUrl: "https://github.com/RoboticsAITechLab",
    year: "2024",
    overview: {
      problem:
        "Manual visual quality inspection is slow, inconsistent, and unable to keep up with high-speed manufacturing conveyor lines.",
      solution:
        "Trained a lightweight PyTorch defect classification network integrated with OpenCV frame processors and a real-time operator alert interface.",
    },
    architecture: {
      summary:
        "Frame feeds are captured by OpenCV workers, processed through a quantized PyTorch model, and streamed with bounding-box annotations to a web frontend.",
      nodes: [
        { name: "VIDEO FEED", role: "High-Speed Camera Stream", tech: "OpenCV Capture" },
        { name: "PRE-PROCESSOR", role: "Frame Normalization & ROI Crop", tech: "NumPy / OpenCV" },
        { name: "INFERENCE ENGINE", role: "Quantized PyTorch Model", tech: "PyTorch / ONNX" },
        { name: "API SERVER", role: "WebSocket Alert Broadcaster", tech: "FastAPI / Python" },
        { name: "OPERATOR UI", role: "Live Heatmap & Defect Log", tech: "React / Canvas" },
      ],
    },
    features: [
      {
        number: "01",
        title: "Real-Time Frame Inference",
        description: "Optimized model quantization to maintain low latency during frame evaluation.",
      },
      {
        number: "02",
        title: "Bounding Box Anomaly Overlay",
        description: "Draws exact defect localization regions and confidence scores onto visual feeds.",
      },
      {
        number: "03",
        title: "Instant Anomaly Alerts",
        description: "Broadcasts threshold violations instantly to operator workstations via WebSockets.",
      },
      {
        number: "04",
        title: "Historical Defect Catalog",
        description: "Saves cropped anomaly frames with timestamps for quality assurance audit trails.",
      },
    ],
    implementation: [
      {
        title: "Model Quantization & Optimization",
        description:
          "Converted trained weights to 8-bit quantized ONNX format for accelerated CPU and GPU execution.",
        highlight: "Achieved dramatic inference speedups without noticeable loss in detection precision.",
      },
      {
        title: "Canvas-Based Annotation Rendering",
        description:
          "Engineered a zero-lag HTML5 Canvas overlay rendering bounding boxes and heatmaps directly over live streams.",
        highlight: "Maintained smooth UI frame rates without client-side rendering bottlenecks.",
      },
    ],
    results: [
      "Successfully developed an end-to-end computer vision inspection platform.",
      "Achieved high-framerate real-time video stream defect identification.",
      "Provided operators with automated visual localization and instant alert dispatching.",
    ],
  },
  {
    id: "hyperstack-saas",
    slug: "hyperstack-fullstack-platform",
    title: "HyperStack Application Core",
    category: "Full-Stack",
    categoryTag: "Full-Stack",
    description:
      "Production-ready web platform template featuring Next.js App Router, strict TypeScript typing, OAuth authentication, and SQL schema migrations.",
    leadDescription:
      "A clean, scalable full-stack application architecture establishing robust patterns for authentication, type-safe API routing, and database state management.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
    featured: false,
    caseStudyUrl: "/projects/hyperstack-fullstack-platform",
    githubUrl: "https://github.com/RoboticsAITechLab",
    year: "2024",
    overview: {
      problem:
        "Starting modern web projects often leads to fragmented state management, loosely typed API layers, and inconsistent authentication boilerplate.",
      solution:
        "Architected an end-to-end type-safe boilerplate combining Next.js App Router Server Components, Prisma ORM, and OAuth2 security patterns.",
    },
    architecture: {
      summary:
        "Client interactions run through React Server Components with direct Prisma database access, protected by NextAuth middleware and strict Zod validation schemas.",
      nodes: [
        { name: "CLIENT", role: "Hydrated Interactive Components", tech: "React 19 / Tailwind" },
        { name: "SERVER ROUTER", role: "Server Components & Actions", tech: "Next.js App Router" },
        { name: "AUTH LAYER", role: "Session & Middleware Security", tech: "OAuth2 / JWT" },
        { name: "ORM LAYER", role: "Type-Safe Database Mapping", tech: "Prisma ORM" },
        { name: "DATABASE", role: "Relational Storage & Constraints", tech: "PostgreSQL" },
      ],
    },
    features: [
      {
        number: "01",
        title: "Server Component Data Fetching",
        description: "Direct database querying without client waterfall requests or excessive boilerplate.",
      },
      {
        number: "02",
        title: "Strict Type Safety",
        description: "Shared TypeScript interfaces across database models, server actions, and UI components.",
      },
      {
        number: "03",
        title: "Secure Session Management",
        description: "Protected route middleware with encrypted session cookies and role-based access control.",
      },
      {
        number: "04",
        title: "Accessible Component System",
        description: "Built-in design tokens, dark mode support, and keyboard-accessible UI primitives.",
      },
    ],
    implementation: [
      {
        title: "Type-Safe Server Actions",
        description:
          "Implemented Next.js Server Actions validated with Zod schemas to handle form submissions with optimistic updates.",
        highlight: "Eliminated manual REST endpoint boilerplate while preserving validation integrity.",
      },
      {
        title: "Relational Indexing Strategy",
        description:
          "Structured relational foreign keys and indices to prevent N+1 query bottlenecks during complex data joins.",
        highlight: "Guaranteed responsive page rendering times across all routes.",
      },
    ],
    results: [
      "Successfully engineered a modular, production-ready full-stack architecture foundation.",
      "Delivered seamless zero-waterfall server rendering with Next.js App Router.",
      "Maintained 100% strict TypeScript type coverage across the entire codebase.",
    ],
  },
  {
    id: "vector-flow-indexer",
    slug: "vector-flow-indexer",
    title: "VectorFlow Embedding Pipeline",
    category: "Data / Backend",
    categoryTag: "Data",
    description:
      "Asynchronous batch pipeline for generating, normalizing, and indexing high-dimensional document vectors into distributed vector databases.",
    leadDescription:
      "A high-throughput asynchronous batch pipeline built in Python to extract, chunk, embed, and index large document sets into Qdrant vector databases.",
    tags: ["Python", "Qdrant", "NumPy", "AsyncIO", "Docker"],
    featured: false,
    caseStudyUrl: "/projects/vector-flow-indexer",
    githubUrl: "https://github.com/RoboticsAITechLab",
    year: "2024",
    overview: {
      problem:
        "Generating embeddings for thousands of technical files sequentially causes memory bottlenecks, API timeouts, and slow vector database ingestion.",
      solution:
        "Built a multi-worker async pipeline in Python that batches text normalization, computes embeddings concurrently with rate limits, and uses bulk upserts in Qdrant.",
    },
    architecture: {
      summary:
        "Source files are parsed into worker queues, processed asynchronously by embedding workers, and batch-upserted into Qdrant vector collections.",
      nodes: [
        { name: "FILE EXTRACTOR", role: "Document Parsing & Clean-up", tech: "Python / AsyncIO" },
        { name: "BATCH QUEUE", role: "Memory-bounded Task Queue", tech: "AsyncIO Queue" },
        { name: "EMBEDDER", role: "Concurrent Vector Generation", tech: "Sentence-Transformers" },
        { name: "UPSERT WORKER", role: "Batch Bulk Ingestion", tech: "Qdrant Client" },
        { name: "VECTOR STORE", role: "Indexed Vector Storage", tech: "Qdrant HNSW" },
      ],
    },
    features: [
      {
        number: "01",
        title: "Concurrent Batch Processing",
        description: "Dynamic worker pools that balance throughput while respecting API rate limits.",
      },
      {
        number: "02",
        title: "Memory-Bounded Queues",
        description: "Backpressure controls ensuring large files do not exhaust system RAM during extraction.",
      },
      {
        number: "03",
        title: "HNSW Vector Collection Config",
        description: "Optimized indexing parameters balancing recall accuracy against search latency.",
      },
      {
        number: "04",
        title: "Idempotent Document Sync",
        description: "Hash-based document versioning to skip re-indexing unmodified source files.",
      },
    ],
    implementation: [
      {
        title: "Asynchronous Worker Architecture",
        description:
          "Utilized Python's AsyncIO task groups with bounded semaphores to prevent network flooding and connection timeouts.",
        highlight: "Maximizes CPU core and network utilization during batch indexing runs.",
      },
      {
        title: "Bulk Vector Upserting",
        description:
          "Grouped vector embeddings into optimal payload sizes for atomic batch insertion into Qdrant collections.",
        highlight: "Reduced vector ingestion time by over 4x compared to individual write operations.",
      },
    ],
    results: [
      "Successfully built and containerized a scalable document vectorization pipeline.",
      "Achieved high-throughput parallel embedding generation with zero memory exhaustion.",
      "Provided idempotent sync capabilities with automated deduplication.",
    ],
  },
];
