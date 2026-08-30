import fs from "fs";
import path from "path";
import { pool } from "../database/index.js";

export async function runMigrations(): Promise<void> {
  console.log("[MIGRATIONS] Starting database migrations...");
  const migrationsDir = path.resolve(process.cwd(), "src/database/migrations");

  try {
    const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith(".sql"));

    // Ensure migrations table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    for (const file of files) {
      const check = await pool.query("SELECT 1 FROM _migrations WHERE name = $1", [file]);
      if (check.rows.length === 0) {
        console.log(`[MIGRATIONS] Executing ${file}...`);
        const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
        await pool.query(sql);
        await pool.query("INSERT INTO _migrations (name) VALUES ($1)", [file]);
        console.log(`[MIGRATIONS] Successfully executed ${file}`);
      } else {
        console.log(`[MIGRATIONS] ${file} already applied. Skipping.`);
      }
    }
    console.log("[MIGRATIONS] All migrations finished successfully.");
  } catch (error: any) {
    console.error(`[MIGRATIONS FAILED] ${error.message}`);
    throw error;
  }
}
