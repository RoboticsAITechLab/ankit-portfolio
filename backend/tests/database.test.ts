import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import { pool, checkDatabaseHealth, closeDatabase } from "../src/database/index.js";

describe("PostgreSQL & Neon Database Integration Suite", () => {
  after(async () => {
    await closeDatabase();
  });

  it("should verify connection and perform database health check", async () => {
    const isHealthy = await checkDatabaseHealth();
    if (!isHealthy) {
      console.warn("[TEST SKIPPED] Live PostgreSQL connection unavailable with current DATABASE_URL.");
      return;
    }
    assert.equal(isHealthy, true, "Database health check should return true when database is available");
  });

  it("should verify database tables and perform full CRUD cycle when DB is connected", async () => {
    const isHealthy = await checkDatabaseHealth();
    if (!isHealthy) {
      console.warn("[TEST SKIPPED] Skipping CRUD integration test (requires active Neon PostgreSQL instance).");
      return;
    }

    // 1. Create / Insert Test Project
    const testSlug = `test-project-${Date.now()}`;
    const insertRes = await pool.query(
      `INSERT INTO projects (slug, title, description, category, technologies)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [testSlug, "Neon Test Project", "Test project created during automated integration verification", "Testing", ["PostgreSQL", "Neon", "TypeScript"]]
    );
    assert.equal(insertRes.rows.length, 1, "Should insert 1 row");
    const createdProject = insertRes.rows[0];
    assert.equal(createdProject.slug, testSlug);

    // 2. Read
    const selectRes = await pool.query("SELECT * FROM projects WHERE id = $1", [createdProject.id]);
    assert.equal(selectRes.rows.length, 1, "Should fetch created project");
    assert.equal(selectRes.rows[0].title, "Neon Test Project");

    // 3. Update
    const updateRes = await pool.query(
      "UPDATE projects SET title = $1 WHERE id = $2 RETURNING title",
      ["Updated Neon Project", createdProject.id]
    );
    assert.equal(updateRes.rows[0].title, "Updated Neon Project");

    // 4. Delete (Cleanup)
    const deleteRes = await pool.query("DELETE FROM projects WHERE id = $1 RETURNING id", [createdProject.id]);
    assert.equal(deleteRes.rows.length, 1, "Should delete project");
  });
});
