import { runMigrations } from "../database/migrator.js";
import { seedDatabase } from "../database/seeder.js";
import { checkDatabaseHealth, closeDatabase } from "../database/index.js";


async function main() {
  console.log("[DB CLI] Verifying database connection...");
  const isHealthy = await checkDatabaseHealth();

  if (!isHealthy) {
    console.error("[DB CLI ERROR] Unable to establish connection to PostgreSQL. Check your DATABASE_URL.");
    process.exit(1);
  }

  console.log("[DB CLI SUCCESS] Connection established.");
  console.log("[DB CLI] Running migrations...");
  await runMigrations();

  console.log("[DB CLI] Running initial seeder...");
  await seedDatabase();

  console.log("[DB CLI] Closing connection pool...");
  await closeDatabase();
  console.log("[DB CLI COMPLETE] All database operations finished cleanly.");
}

main().catch(async (err) => {
  console.error("[DB CLI FATAL ERROR]", err.message);
  await closeDatabase();
  process.exit(1);
});
