import pg, { QueryResultRow } from "pg";
import { config } from "../config/index.js";

const { Pool } = pg;

// Initialize PostgreSQL connection pool with production-safe resilience and Neon SSL support
const isNeonOrRemote = config.databaseUrl.includes("neon.tech") || config.isProduction || config.databaseUrl.includes("sslmode=require");

export const pool = new Pool({
  connectionString: config.databaseUrl,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  ssl: isNeonOrRemote ? { rejectUnauthorized: false } : undefined,
});


pool.on("error", (err: Error) => {
  console.error(`[DATABASE ERROR] Unexpected error on idle client: ${err.message}`);
});

export async function query<T extends QueryResultRow = any>(text: string, params?: any[]): Promise<pg.QueryResult<T>> {
  const start = Date.now();
  try {
    const res = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    if (!config.isProduction) {
      console.log(`[DATABASE QUERY] ${text} [${duration}ms] - Rows: ${res.rowCount}`);
    }
    return res;
  } catch (error: any) {
    console.error(`[DATABASE QUERY ERROR] ${error.message} - Query: ${text}`);
    throw error;
  }
}


export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    const result = await pool.query("SELECT 1 as health");
    return result.rows.length > 0;
  } catch (error: any) {
    console.error(`[DATABASE HEALTH CHECK FAILED] ${error.message}`);
    return false;
  }
}

export async function closeDatabase(): Promise<void> {
  try {
    await pool.end();
    console.log("[DATABASE] Connection pool closed successfully.");
  } catch (error: any) {
    console.error(`[DATABASE CLOSE ERROR] ${error.message}`);
  }
}
