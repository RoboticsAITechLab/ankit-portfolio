import * as React from "react";
import { Container } from "@/components/ui/Container";
import { AiSystemVisual } from "@/components/ai-lab/AiSystemVisual";
import { AiExperimentGrid } from "@/components/ai-lab/AiExperimentGrid";
import { getAiExperiments } from "@/lib/api";
import { aiExperiments as fallbackExperiments } from "@/data/aiLab";
import { Sparkles, FlaskConical } from "lucide-react";

export const metadata = {
  title: "AI Lab | Ankit Kumar - AI & Software Developer",
  description:
    "Explore experimental AI architectures, autonomous multi-agent systems, RAG retrieval engines, and machine learning prototypes by Ankit Kumar.",
};

export default async function AiLabPage() {
  let expList = fallbackExperiments;
  try {
    const res = await getAiExperiments();
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      expList = res.data.map((e: any, idx: number) => ({
        id: e.id,
        number: `0${idx + 1}`.slice(-2),
        title: e.title,
        subtitle: e.tagline,
        description: e.description,
        status: (e.status as any) || "Experiment",
        technologies: ["PyTorch", "FastAPI", "VectorDB"],
        slug: e.title.toLowerCase().replace(/\s+/g, "-"),
      }));
    }
  } catch (err) {
    console.error("Failed to load AI experiments from API, using fallback", err);
  }


  return (
    <div className="flex flex-col w-full py-12 md:py-20 lg:py-24">
      <Container>
        {/* SECTION 1 — PAGE HEADER */}
        <header className="max-w-3xl mb-12 md:mb-16">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--border)] mb-4">
            <FlaskConical className="h-4 w-4 text-[var(--accent)]" />
            <span className="font-mono text-xs font-semibold tracking-wider text-[var(--foreground)] uppercase">
              AI LAB
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.08] mb-4">
            INTELLIGENT SYSTEMS
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg md:text-xl text-[var(--foreground-secondary)] leading-relaxed">
            Experiments, prototypes and AI-powered applications
          </p>
        </header>

        {/* SECTION 2 — AI SYSTEM VISUAL (INPUT → REASON → OUTPUT) */}
        <AiSystemVisual />

        {/* SECTION 3 — EXPERIMENTS */}
        <section className="mt-8 md:mt-12">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2.5 font-mono">
              <Sparkles className="h-5 w-5 text-[var(--accent)]" />
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
                EXPERIMENTS
              </h2>
            </div>
            <span className="font-mono text-xs text-[var(--foreground-muted)]">
              {expList.length} Active Prototyping Modules
            </span>
          </div>

          <AiExperimentGrid experiments={expList} />
        </section>
      </Container>
    </div>
  );
}

