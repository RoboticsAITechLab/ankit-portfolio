import { pool } from "../database/index.js";
import { hashPassword } from "../auth/index.js";

export async function seedDatabase(): Promise<void> {
  console.log("[SEED] Starting initial database seeding...");

  try {
    // 1. Seed Default Admin User
    const adminEmail = "roboticsaitechlab@gmail.com";
    const existingUser = await pool.query("SELECT id FROM users WHERE email = $1", [adminEmail]);

    if (existingUser.rows.length === 0) {
      const passwordHash = await hashPassword("AdminSecurePassword123!");
      await pool.query(
        `INSERT INTO users (email, password_hash, role, name)
         VALUES ($1, $2, 'admin', 'Ankit Kumar')`,
        [adminEmail, passwordHash]
      );
      console.log(`[SEED] Created default admin user: ${adminEmail}`);
    }

    // 2. Seed Default Settings
    const defaultSettings = {
      site_name: "Ankit Kumar | AI & Full-Stack Portfolio",
      contact_email: "roboticsaitechlab@gmail.com",
      github_url: "https://github.com/RoboticsAITechLab",
      linkedin_url: "https://linkedin.com",
      status_message: "Available for high-impact AI & Full-Stack engineering projects",
    };

    await pool.query(
      `INSERT INTO settings (key, value)
       VALUES ('general', $1)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
      [JSON.stringify(defaultSettings)]
    );
    console.log("[SEED] Default settings initialized.");

    console.log("[SEED] Database seeding complete.");
  } catch (error: any) {
    console.error(`[SEED ERROR] ${error.message}`);
    throw error;
  }
}
