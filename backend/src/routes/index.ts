import { Router } from "express";
import { authRouter } from "./auth.js";
import { projectsRouter } from "./projects.js";
import { certificationsRouter } from "./certifications.js";
import { aiLabRouter } from "./aiLab.js";
import { messagesRouter } from "./messages.js";
import { analyticsRouter } from "./analytics.js";
import { settingsRouter } from "./settings.js";
import { checkDatabaseHealth } from "../database/index.js";

const apiRouter = Router();

// 1. Health check endpoint
apiRouter.get("/health", async (_req, res) => {
  const dbHealthy = await checkDatabaseHealth();
  const statusCode = dbHealthy ? 200 : 503;

  res.status(statusCode).json({
    success: dbHealthy,
    message: dbHealthy ? "API and database are healthy" : "Database is unavailable",
    timestamp: new Date().toISOString(),
    services: {
      api: "up",
      database: dbHealthy ? "connected" : "disconnected",
    },
  });
});

// 2. Mount API Modules under /api/v1
apiRouter.use("/auth", authRouter);
apiRouter.use("/projects", projectsRouter);
apiRouter.use("/certifications", certificationsRouter);
apiRouter.use("/ai-lab", aiLabRouter);
apiRouter.use("/messages", messagesRouter);
apiRouter.use("/contact", messagesRouter);
apiRouter.use("/analytics", analyticsRouter);
apiRouter.use("/settings", settingsRouter);

export default apiRouter;
