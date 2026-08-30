import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export interface AppConfig {
  env: string;
  port: number;
  databaseUrl: string;
  jwtSecret: string;
  corsOrigin: string;
  isProduction: boolean;
}

const requiredEnv = ["PORT", "DATABASE_URL", "JWT_SECRET", "CORS_ORIGIN"] as const;

export function validateEnv(): void {
  const missing = requiredEnv.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}

// Validate environment on config load
validateEnv();

export const config: AppConfig = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "5000", 10),
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
  isProduction: process.env.NODE_ENV === "production",
};
