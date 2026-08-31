import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config/index.js";
import apiRouter from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

export function createApp(): Application {
  const app = express();

  // Trust proxy settings (enabled behind reverse proxy / platform PaaS like Vercel/Render)
  if (config.isProduction) {
    app.set("trust proxy", 1);
  }

  // Global Security Headers
  app.use(helmet());

  // CORS Configuration - Supports Portfolio (3000), Admin Panel (3001), and configured CORS_ORIGIN
  const allowedOrigins = config.corsOrigin.split(",").map((o) => o.trim());

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true);

        // Check if origin is in whitelist or is localhost in development
        const isAllowed =
          allowedOrigins.includes(origin) ||
          (!config.isProduction && (origin.includes("localhost:3000") || origin.includes("localhost:3001") || origin.includes("127.0.0.1")));

        if (isAllowed) {
          callback(null, true);
        } else {
          callback(new Error(`CORS origin not allowed: ${origin}`));
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );



  // Body Parser Limits
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  // Versioned API Routes
  app.use("/api/v1", apiRouter);
  app.use("/api", apiRouter);

  // 404 Route Handler
  app.use(notFoundHandler);

  // Centralized Error Handling Middleware
  app.use(errorHandler);

  return app;
}
