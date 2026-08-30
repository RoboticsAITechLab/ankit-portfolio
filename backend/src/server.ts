import { createApp } from "./app.js";
import { config } from "./config/index.js";
import { closeDatabase } from "./database/index.js";

const app = createApp();

const server = app.listen(config.port, () => {
  console.log(`[SERVER] Running in ${config.env} mode on port ${config.port}`);
});

// Graceful Shutdown Handler
const handleShutdown = async (signal: string) => {
  console.log(`[SERVER] Received ${signal}. Initiating graceful shutdown...`);
  server.close(async () => {
    console.log("[SERVER] HTTP server closed.");
    await closeDatabase();
    process.exit(0);
  });

  // Force close after 10s timeout
  setTimeout(() => {
    console.error("[SERVER] Graceful shutdown timed out. Forcing exit.");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => handleShutdown("SIGTERM"));
process.on("SIGINT", () => handleShutdown("SIGINT"));
