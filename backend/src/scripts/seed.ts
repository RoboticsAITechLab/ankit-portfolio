import { seedDatabase } from "../database/seeder.js";

async function runSeed() {
  try {
    await seedDatabase();
    console.log("Seeding finished successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

runSeed();
