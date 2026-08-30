import * as React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { AiLabSection } from "@/components/sections/AiLabSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <TechStackSection />
      <ProjectsSection />
      <JourneySection />
      <CertificationsSection />
      <AiLabSection />
      <CtaSection />
    </div>
  );
}
