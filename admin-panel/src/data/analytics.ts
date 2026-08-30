import { AnalyticsStats, TrafficPoint, RankedItem, TimeRange } from "@/types";

export const analyticsDataByRange: Record<
  TimeRange,
  {
    stats: AnalyticsStats;
    traffic: TrafficPoint[];
    topProjects: RankedItem[];
    topPages: RankedItem[];
  }
> = {
  "30 Days": {
    stats: {
      visitors: 142,
      visitorsChange: "+18%",
      projectViews: 318,
      projectViewsChange: "+24%",
      certViews: 96,
      certViewsChange: "+12%",
      contacts: 4,
      contactsChange: "+2",
    },
    traffic: [
      { label: "Day 1", visitors: 18, views: 35 },
      { label: "Day 5", visitors: 28, views: 52 },
      { label: "Day 10", visitors: 42, views: 88 },
      { label: "Day 15", visitors: 36, views: 74 },
      { label: "Day 20", visitors: 58, views: 110 },
      { label: "Day 25", visitors: 48, views: 95 },
      { label: "Day 30", visitors: 62, views: 130 },
    ],
    topProjects: [
      { id: "p1", name: "VYNTRANET Platform", route: "/projects/vyntranet-platform", views: 124, percentage: 39 },
      { id: "p2", name: "AI Copilot Engine", route: "/projects/ai-copilot-engine", views: 96, percentage: 30 },
      { id: "p3", name: "PulseCloud Telemetry", route: "/projects/pulsecloud-telemetry", views: 72, percentage: 23 },
      { id: "p4", name: "Dev Portfolio Core", route: "/projects/dev-portfolio-core", views: 26, percentage: 8 },
    ],
    topPages: [
      { id: "pg1", name: "/projects", route: "/projects", views: 318, percentage: 57 },
      { id: "pg2", name: "/certifications", route: "/certifications", views: 96, percentage: 17 },
      { id: "pg3", name: "/about", route: "/about", views: 64, percentage: 12 },
      { id: "pg4", name: "/ai-lab", route: "/ai-lab", views: 48, percentage: 9 },
      { id: "pg5", name: "/contact", route: "/contact", views: 32, percentage: 5 },
    ],
  },
  "7 Days": {
    stats: {
      visitors: 48,
      visitorsChange: "+9%",
      projectViews: 104,
      projectViewsChange: "+15%",
      certViews: 32,
      certViewsChange: "+5%",
      contacts: 2,
      contactsChange: "+1",
    },
    traffic: [
      { label: "Mon", visitors: 6, views: 12 },
      { label: "Tue", visitors: 8, views: 16 },
      { label: "Wed", visitors: 11, views: 24 },
      { label: "Thu", visitors: 9, views: 19 },
      { label: "Fri", visitors: 14, views: 30 },
      { label: "Sat", visitors: 10, views: 22 },
      { label: "Sun", visitors: 12, views: 25 },
    ],
    topProjects: [
      { id: "p1", name: "VYNTRANET Platform", route: "/projects/vyntranet-platform", views: 42, percentage: 40 },
      { id: "p2", name: "AI Copilot Engine", route: "/projects/ai-copilot-engine", views: 34, percentage: 33 },
      { id: "p3", name: "PulseCloud Telemetry", route: "/projects/pulsecloud-telemetry", views: 20, percentage: 19 },
      { id: "p4", name: "Dev Portfolio Core", route: "/projects/dev-portfolio-core", views: 8, percentage: 8 },
    ],
    topPages: [
      { id: "pg1", name: "/projects", route: "/projects", views: 104, percentage: 55 },
      { id: "pg2", name: "/certifications", route: "/certifications", views: 32, percentage: 17 },
      { id: "pg3", name: "/about", route: "/about", views: 24, percentage: 13 },
      { id: "pg4", name: "/ai-lab", route: "/ai-lab", views: 18, percentage: 9 },
      { id: "pg5", name: "/contact", route: "/contact", views: 12, percentage: 6 },
    ],
  },
  "Today": {
    stats: {
      visitors: 12,
      visitorsChange: "+4%",
      projectViews: 28,
      projectViewsChange: "+8%",
      certViews: 9,
      certViewsChange: "+2%",
      contacts: 1,
      contactsChange: "+1",
    },
    traffic: [
      { label: "00:00", visitors: 1, views: 2 },
      { label: "04:00", visitors: 0, views: 1 },
      { label: "08:00", visitors: 3, views: 6 },
      { label: "12:00", visitors: 4, views: 10 },
      { label: "16:00", visitors: 2, views: 5 },
      { label: "20:00", visitors: 2, views: 4 },
    ],
    topProjects: [
      { id: "p1", name: "VYNTRANET Platform", route: "/projects/vyntranet-platform", views: 14, percentage: 50 },
      { id: "p2", name: "AI Copilot Engine", route: "/projects/ai-copilot-engine", views: 9, percentage: 32 },
      { id: "p3", name: "PulseCloud Telemetry", route: "/projects/pulsecloud-telemetry", views: 5, percentage: 18 },
    ],
    topPages: [
      { id: "pg1", name: "/projects", route: "/projects", views: 28, percentage: 52 },
      { id: "pg2", name: "/certifications", route: "/certifications", views: 9, percentage: 17 },
      { id: "pg3", name: "/about", route: "/about", views: 8, percentage: 15 },
      { id: "pg4", name: "/ai-lab", route: "/ai-lab", views: 5, percentage: 9 },
      { id: "pg5", name: "/contact", route: "/contact", views: 4, percentage: 7 },
    ],
  },
  "90 Days": {
    stats: {
      visitors: 480,
      visitorsChange: "+32%",
      projectViews: 1120,
      projectViewsChange: "+40%",
      certViews: 310,
      certViewsChange: "+22%",
      contacts: 14,
      contactsChange: "+6",
    },
    traffic: [
      { label: "Month 1", visitors: 120, views: 290 },
      { label: "Month 2", visitors: 160, views: 380 },
      { label: "Month 3", visitors: 200, views: 450 },
    ],
    topProjects: [
      { id: "p1", name: "VYNTRANET Platform", route: "/projects/vyntranet-platform", views: 450, percentage: 40 },
      { id: "p2", name: "AI Copilot Engine", route: "/projects/ai-copilot-engine", views: 340, percentage: 30 },
      { id: "p3", name: "PulseCloud Telemetry", route: "/projects/pulsecloud-telemetry", views: 230, percentage: 21 },
      { id: "p4", name: "Dev Portfolio Core", route: "/projects/dev-portfolio-core", views: 100, percentage: 9 },
    ],
    topPages: [
      { id: "pg1", name: "/projects", route: "/projects", views: 1120, percentage: 56 },
      { id: "pg2", name: "/certifications", route: "/certifications", views: 310, percentage: 16 },
      { id: "pg3", name: "/about", route: "/about", views: 240, percentage: 12 },
      { id: "pg4", name: "/ai-lab", route: "/ai-lab", views: 180, percentage: 9 },
      { id: "pg5", name: "/contact", route: "/contact", views: 140, percentage: 7 },
    ],
  },
};
