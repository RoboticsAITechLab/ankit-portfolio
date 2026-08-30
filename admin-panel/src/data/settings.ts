import { AdminProfile, PortfolioLinks, SystemPreferences } from "@/types";

export const initialProfile: AdminProfile = {
  name: "Ankit Kumar",
  role: "AI & Software Developer",
  email: "roboticsaitechlab@gmail.com",
};

export const initialPortfolioLinks: PortfolioLinks = {
  github: "https://github.com/RoboticsAITechLab",
  linkedin: "https://linkedin.com/in/ankitkumar",
  portfolioUrl: "https://ankitkumar.dev",
};

export const initialPreferences: SystemPreferences = {
  darkMode: true,
  emailNotifications: true,
  maintenanceMode: false,
};
