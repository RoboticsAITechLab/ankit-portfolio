import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { pool } from "../database/index.js";
import { authenticateUser, requireRole } from "../auth/index.js";
import { NotFoundError } from "../errors/index.js";
import { validateRequest } from "../schemas/index.js";

export const aiLabRouter = Router();

const createExperimentSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    tagline: z.string().min(2),
    description: z.string().min(10),
    model_type: z.string().min(2),
    dataset: z.string().optional(),
    status: z.string().default("Active"),
    metrics: z.record(z.string(), z.any()).default({}),
    published: z.boolean().default(true),
    sort_order: z.number().int().default(0),
  }),
});


// GET /api/v1/ai-lab (Public)
aiLabRouter.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await pool.query(
      "SELECT * FROM ai_experiments WHERE published = true ORDER BY sort_order ASC, created_at DESC"
    );
    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/ai-lab (Admin)
aiLabRouter.post(
  "/",
  authenticateUser,
  requireRole(["admin"]),
  validateRequest(createExperimentSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const exp = req.body;
      const result = await pool.query(
        `INSERT INTO ai_experiments (title, tagline, description, model_type, dataset, status, metrics, published, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [
          exp.title,
          exp.tagline,
          exp.description,
          exp.model_type,
          exp.dataset || null,
          exp.status || "Active",
          JSON.stringify(exp.metrics || {}),
          exp.published ?? true,
          exp.sort_order ?? 0,
        ]
      );

      res.status(201).json({
        success: true,
        message: "AI Experiment created successfully",
        data: result.rows[0],
      });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/v1/ai-lab/:id (Admin)
aiLabRouter.delete(
  "/:id",
  authenticateUser,
  requireRole(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await pool.query("DELETE FROM ai_experiments WHERE id = $1 RETURNING id", [id]);

      if (result.rows.length === 0) {
        throw new NotFoundError("AI Experiment not found");
      }

      res.status(200).json({
        success: true,
        message: "AI Experiment deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);
