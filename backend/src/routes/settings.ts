import { Router, Request, Response, NextFunction } from "express";
import { pool } from "../database/index.js";
import { authenticateUser, requireRole } from "../auth/index.js";

export const settingsRouter = Router();

// GET /api/v1/settings (Public / General Settings)
settingsRouter.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await pool.query("SELECT key, value FROM settings");
    const settingsMap: Record<string, any> = {};
    for (const row of result.rows) {
      settingsMap[row.key] = row.value;
    }

    res.status(200).json({
      success: true,
      data: settingsMap,
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/v1/settings/:key (Admin)
settingsRouter.put(
  "/:key",
  authenticateUser,
  requireRole(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { key } = req.params;
      const { value } = req.body;

      const result = await pool.query(
        `INSERT INTO settings (key, value)
         VALUES ($1, $2)
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP
         RETURNING *`,
        [key, JSON.stringify(value)]
      );

      res.status(200).json({
        success: true,
        message: "Settings updated successfully",
        data: result.rows[0],
      });
    } catch (error) {
      next(error);
    }
  }
);
