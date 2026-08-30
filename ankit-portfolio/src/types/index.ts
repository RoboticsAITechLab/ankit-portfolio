export type ProjectCategoryFilter = "All" | "AI" | "Full-Stack" | "Backend" | "Data";

export interface ProjectOverview {
  problem: string;
  solution: string;
}

export interface ProjectArchitectureNode {
  name: string;
  role: string;
  tech?: string;
}

export interface ProjectArchitecture {
  summary: string;
  nodes: ProjectArchitectureNode[];
}

export interface ProjectFeature {
  number: string;
  title: string;
  description: string;
}

export interface ProjectImplementationNote {
  title: string;
  description: string;
  highlight?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryTag: "AI" | "Full-Stack" | "Backend" | "Data";
  description: string;
  leadDescription?: string;
  longDescription?: string;
  tags: string[];
  imageUrl?: string;
  image?: string;
  featured?: boolean;
  caseStudyUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  year?: string;
  status?: string;
  metrics?: { label: string; value: string }[];
  highlights?: string[];
  overview?: ProjectOverview;
  architecture?: ProjectArchitecture;
  features?: ProjectFeature[];
  implementation?: ProjectImplementationNote[];
  results?: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    icon?: string;
  }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  year: number;
  credentialId: string;
  file: string;
  previewImage: string;
  studentName?: string;
  studentId?: string;
  credentialUrl?: string;
  description?: string;
  skills: string[];
}

export interface JourneyMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  metrics?: string;
}

export type AiExperimentStatus =
  | "Prototype"
  | "Experiment"
  | "In Development"
  | "Production-Ready"
  | "Coming Soon";

export interface AiExperiment {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  description: string;
  technologies: string[];
  status: AiExperimentStatus;
  slug?: string;
  href?: string;
  isComingSoon?: boolean;
}

export interface LabExperiment {
  id: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  status: "Completed" | "In Development" | "Research Prototype";
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
}
