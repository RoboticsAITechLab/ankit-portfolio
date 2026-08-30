import { pool } from "../database/index.js";
import { hashPassword } from "../auth/index.js";

export async function seedDatabase(): Promise<void> {
  console.log("[SEED] Starting full production database seeding...");

  try {
    // 1. Seed Default Admin User
    const adminEmail = "roboticsaitechlab@gmail.com";
    const existingUser = await pool.query("SELECT id FROM users WHERE email = $1", [adminEmail]);

    if (existingUser.rows.length === 0) {
      const passwordHash = await hashPassword("AdminSecurePassword123!");
      await pool.query(
        `INSERT INTO users (email, password_hash, role, name)
         VALUES ($1, $2, 'admin', 'Ankit Kumar')`,
        [adminEmail, passwordHash]
      );
      console.log(`[SEED] Created default admin user: ${adminEmail}`);
    }

    // 2. Seed Projects
    const projects = [
      {
        slug: "neurosearch-enterprise-rag",
        title: "NeuroSearch RAG Platform",
        description: "Contextual document retrieval engine utilizing hybrid vector search, semantic chunking, and streaming LLM response generation.",
        long_description: "An intelligent knowledge retrieval platform built to index structured and unstructured documentation with hybrid dense-sparse vector search and low-latency response streaming.",
        category: "AI",
        technologies: ["Python", "FastAPI", "Qdrant", "LangChain", "Next.js", "TypeScript"],
        featured: true,
        github_url: "https://github.com/RoboticsAITechLab",
        demo_url: "https://github.com/RoboticsAITechLab",
        published: true,
      },
      {
        slug: "autoagent-task-orchestrator",
        title: "AutoAgent Task Orchestrator",
        description: "Autonomous multi-agent execution framework coordinating task decomposition, sandboxed code execution, and self-healing error loops.",
        long_description: "A modular multi-agent runtime designed to break down complex development tasks into parallel sub-routines with isolated execution environments and verification steps.",
        category: "AI",
        technologies: ["Python", "AsyncIO", "Docker", "FastAPI", "TypeScript", "Tailwind CSS"],
        featured: true,
        github_url: "https://github.com/RoboticsAITechLab",
        demo_url: "https://github.com/RoboticsAITechLab",
        published: true,
      },
      {
        slug: "pulsecloud-telemetry-gateway",
        title: "PulseCloud Telemetry Gateway",
        description: "High-concurrency event ingestion gateway designed for microservice observability, rate limiting, and structured streaming pipelines.",
        long_description: "A distributed observability and telemetry ingestion engine engineered to buffer, validate, and aggregate high-volume metric streams with minimal latency overhead.",
        category: "Backend",
        technologies: ["TypeScript", "Node.js", "Redis", "PostgreSQL", "Next.js", "Tailwind CSS"],
        featured: true,
        github_url: "https://github.com/RoboticsAITechLab",
        demo_url: "https://github.com/RoboticsAITechLab",
        published: true,
      },
      {
        slug: "omnivision-defect-inspector",
        title: "OmniVision Defect Inspector",
        description: "Computer vision pipeline performing anomaly detection and image classification on high-throughput media streams.",
        long_description: "An automated vision inspection system deploying deep convolutional networks to detect micro-surface anomalies in real-time visual feeds.",
        category: "AI",
        technologies: ["PyTorch", "OpenCV", "Python", "FastAPI", "React", "TypeScript"],
        featured: true,
        github_url: "https://github.com/RoboticsAITechLab",
        demo_url: "https://github.com/RoboticsAITechLab",
        published: true,
      },
      {
        slug: "hyperstack-fullstack-platform",
        title: "HyperStack Application Core",
        description: "Production-ready web platform template featuring Next.js App Router, strict TypeScript typing, OAuth authentication, and SQL schema migrations.",
        long_description: "A clean, scalable full-stack application architecture establishing robust patterns for authentication, type-safe API routing, and database state management.",
        category: "Full-Stack",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
        featured: false,
        github_url: "https://github.com/RoboticsAITechLab",
        demo_url: "https://github.com/RoboticsAITechLab",
        published: true,
      },
      {
        slug: "vector-flow-indexer",
        title: "VectorFlow Embedding Pipeline",
        description: "Asynchronous batch pipeline for generating, normalizing, and indexing high-dimensional document vectors into distributed vector databases.",
        long_description: "A high-throughput asynchronous batch pipeline built in Python to extract, chunk, embed, and index large document sets into Qdrant vector databases.",
        category: "Backend",
        technologies: ["Python", "Qdrant", "NumPy", "AsyncIO", "Docker"],
        featured: false,
        github_url: "https://github.com/RoboticsAITechLab",
        demo_url: "https://github.com/RoboticsAITechLab",
        published: true,
      },
    ];

    for (const p of projects) {
      await pool.query(
        `INSERT INTO projects (slug, title, description, long_description, category, technologies, featured, github_url, demo_url, published)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (slug) DO UPDATE SET
           title = EXCLUDED.title,
           description = EXCLUDED.description,
           long_description = EXCLUDED.long_description,
           category = EXCLUDED.category,
           technologies = EXCLUDED.technologies,
           featured = EXCLUDED.featured,
           github_url = EXCLUDED.github_url,
           demo_url = EXCLUDED.demo_url,
           published = EXCLUDED.published`,
        [p.slug, p.title, p.description, p.long_description, p.category, p.technologies, p.featured, p.github_url, p.demo_url, p.published]
      );
    }
    console.log(`[SEED] Seeded ${projects.length} live projects into Neon DB.`);

    // 3. Seed Certifications
    const certs = [
      {
        title: "Expert AI Programmer",
        issuer: "Codingal",
        issue_date: "2025",
        credential_id: "87972d5fe89f",
        badge_image: "/certificates/Expert AI Programmer Certificate.png",
        pdf_url: "/certificates/Expert AI Programmer Certificate.pdf",
        published: true,
      },
      {
        title: "Java Developer",
        issuer: "Codingal",
        issue_date: "2025",
        credential_id: "1bca482e7208",
        badge_image: "/certificates/Java Developer Certificate.png",
        pdf_url: "/certificates/Java Developer Certificate.pdf",
        published: true,
      },
      {
        title: "Advance AI Programmer",
        issuer: "Codingal",
        issue_date: "2025",
        credential_id: "d610a7c336b8",
        badge_image: "/certificates/Advance AI Programmer Certificate.png",
        pdf_url: "/certificates/Advance AI Programmer Certificate.pdf",
        published: true,
      },
      {
        title: "Data Scientist",
        issuer: "Codingal",
        issue_date: "2025",
        credential_id: "d85ead0ef18b",
        badge_image: "/certificates/Data Scientist Certificate.png",
        pdf_url: "/certificates/Data Scientist Certificate.pdf",
        published: true,
      },
      {
        title: "SQL Developer",
        issuer: "Codingal",
        issue_date: "2024",
        credential_id: "7b9495932907",
        badge_image: "/certificates/SQL Developer Certificate.png",
        pdf_url: "/certificates/SQL Developer Certificate.pdf",
        published: true,
      },
      {
        title: "Expert Python Developer",
        issuer: "Codingal",
        issue_date: "2024",
        credential_id: "d43218b6a10e",
        badge_image: "/certificates/Expert Python Developer Certificate.png",
        pdf_url: "/certificates/Expert Python Developer Certificate.pdf",
        published: true,
      },
      {
        title: "Advanced Python Programmer",
        issuer: "Codingal",
        issue_date: "2024",
        credential_id: "db830b65bfda",
        badge_image: "/certificates/Advanced Python programmer Certificate.png",
        pdf_url: "/certificates/Advanced Python programmer Certificate.pdf",
        published: true,
      },
      {
        title: "Rising Coding Star",
        issuer: "Codingal",
        issue_date: "2024",
        credential_id: "82650b78f366",
        badge_image: "/certificates/Rising coding star Certificate.png",
        pdf_url: "/certificates/Rising coding star Certificate.pdf",
        published: true,
      },
      {
        title: "Advanced Website Developer",
        issuer: "Codingal",
        issue_date: "2024",
        credential_id: "4b794a54f6df",
        badge_image: "/certificates/Advanced Website Developer Certificate.png",
        pdf_url: "/certificates/Advanced Website Developer Certificate.pdf",
        published: true,
      },
    ];

    for (const c of certs) {
      await pool.query(
        `INSERT INTO certifications (title, issuer, issue_date, credential_id, badge_image, credential_url, published)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [c.title, c.issuer, c.issue_date, c.credential_id, c.badge_image, c.pdf_url, c.published]
      );
    }

    console.log(`[SEED] Seeded ${certs.length} verified certifications into Neon DB.`);

    // 4. Seed AI Lab Experiments
    const experiments = [
      {
        title: "Adaptive Semantic Chunking Engine",
        tagline: "Sliding-window embedding parser that identifies natural topic transitions for vector indexing",
        description: "A sliding-window embedding similarity parser that identifies natural topic transitions to create cohesive semantic document chunks for vector indexing.",
        model_type: "RAG / Retrieval",
        status: "Prototype",
        published: true,
      },
      {
        title: "Autonomous Python Code Reviewer Agent",
        tagline: "Self-reflective agent that parses AST diffs, checks complexity, and writes tests",
        description: "Self-reflective agent that parses AST diffs, checks cyclomatic complexity, enforces architectural conventions, and generates targeted unit tests.",
        model_type: "Automation / Agents",
        status: "Experiment",
        published: true,
      },
      {
        title: "Real-Time Vector Similarity Visualizer",
        tagline: "Interactive 3D t-SNE and UMAP projection tool running in the browser",
        description: "Interactive 3D t-SNE and UMAP projection tool running in the browser for visualizing high-dimensional token embeddings and clusters.",
        model_type: "Data / Visualization",
        status: "Prototype",
        published: true,
      },
      {
        title: "Ultra-Low Latency LLM Token Streamer",
        tagline: "Zero-overhead SSE proxy layer in async Python handling 10,000 concurrent streaming connections",
        description: "Zero-overhead Server-Sent Events (SSE) proxy layer in async Python handling 10,000 concurrent streaming connections with 2ms TTFT overhead.",
        model_type: "Backend / Performance",
        status: "Production-Ready",
        published: true,
      },
    ];

    for (const exp of experiments) {
      await pool.query(
        `INSERT INTO ai_experiments (title, tagline, description, model_type, status, published)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [exp.title, exp.tagline, exp.description, exp.model_type, exp.status, exp.published]
      );
    }
    console.log(`[SEED] Seeded ${experiments.length} AI experiments into Neon DB.`);

    // 5. Seed Default Settings
    const defaultSettings = {
      profile: {
        name: "Ankit Kumar",
        role: "AI & Full-Stack Engineer",
        email: "roboticsaitechlab@gmail.com",
      },
      links: {
        github: "https://github.com/RoboticsAITechLab",
        linkedin: "https://linkedin.com",
        portfolioUrl: "https://ankit-portfolio-tau-ashy.vercel.app",
      },
      preferences: {
        darkMode: true,
        emailNotifications: true,
        maintenanceMode: false,
      },
    };

    await pool.query(
      `INSERT INTO settings (key, value)
       VALUES ('profile', $1), ('links', $2), ('preferences', $3)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
      [
        JSON.stringify(defaultSettings.profile),
        JSON.stringify(defaultSettings.links),
        JSON.stringify(defaultSettings.preferences),
      ]
    );

    console.log("[SEED] Production database seeding complete!");
  } catch (error: any) {
    console.error(`[SEED ERROR] ${error.message}`);
    throw error;
  }
}
