export type ProjectStatus = "Published" | "Draft" | "Archived";
export type ProjectCategory = "AI" | "Full-Stack" | "Backend" | "Frontend" | "Data";

export interface AdminProject {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  status: ProjectStatus;
  shortDescription: string;
  longDescription?: string;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  updatedAt: string;
}

export type CertificationStatus = "Published" | "Draft" | "Archived";

export interface AdminCertification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  year: number;
  credentialId: string;
  status: CertificationStatus;
  description?: string;
  file?: string;
  previewImage?: string;
  fileName?: string;
  fileSize?: string;
  updatedAt: string;
}

// AI Lab Types
export type AiExperimentCategory =
  | "RAG"
  | "Agents"
  | "Automation"
  | "AI/Data"
  | "NLP"
  | "Computer Vision"
  | "Other";

export type AiExperimentStatus =
  | "Prototype"
  | "Experiment"
  | "In Development"
  | "Production-Ready"
  | "Coming Soon";

export interface AdminAiExperiment {
  id: string;
  name: string;
  slug: string;
  category: AiExperimentCategory;
  status: AiExperimentStatus;
  shortDescription: string;
  longDescription?: string;
  technologies: string[];
  demoUrl?: string;
  repoUrl?: string;
  image?: string;
  notes?: string;
  updatedAt: string;
}

// Messages Types
export type MessageStatus = "Unread" | "Read" | "Archived";

export interface AdminMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  date: string;
  status: MessageStatus;
  updatedAt: string;
}

// Analytics Types
export type TimeRange = "Today" | "7 Days" | "30 Days" | "90 Days";

export interface AnalyticsStats {
  visitors: number;
  visitorsChange: string;
  projectViews: number;
  projectViewsChange: string;
  certViews: number;
  certViewsChange: string;
  contacts: number;
  contactsChange: string;
}

export interface TrafficPoint {
  label: string;
  visitors: number;
  views: number;
}

export interface RankedItem {
  id: string;
  name: string;
  route?: string;
  views: number;
  percentage?: number;
}

// Settings Types
export interface AdminProfile {
  name: string;
  role: string;
  email: string;
}

export interface PortfolioLinks {
  github: string;
  linkedin: string;
  portfolioUrl: string;
}

export interface SystemPreferences {
  darkMode: boolean;
  emailNotifications: boolean;
  maintenanceMode: boolean;
}
