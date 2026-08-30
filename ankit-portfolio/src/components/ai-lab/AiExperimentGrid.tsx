import * as React from "react";
import { AiExperiment } from "@/types";
import { AiExperimentCard } from "@/components/ai-lab/AiExperimentCard";

interface AiExperimentGridProps {
  experiments: AiExperiment[];
}

export function AiExperimentGrid({ experiments }: AiExperimentGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {experiments.map((experiment) => (
        <AiExperimentCard key={experiment.id} experiment={experiment} />
      ))}
    </div>
  );
}
