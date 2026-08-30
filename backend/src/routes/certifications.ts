import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { pool } from "../database/index.js";
import { authenticateUser, requireRole } from "../auth/index.js";
import { NotFoundError } from "../errors/index.js";
import { validateRequest } from "../schemas/index.js";

export const certificationsRouter = Router();

const createCertSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    issuer: z.string().min(2),
    issue_date: z.string().min(2),
    credential_id: z.string().optional(),
    credential_url: z.string().optional(),
    badge_image: z.string().optional(),
    category: z.string().default("Certification"),
    published: z.boolean().default(true),
    sort_order: z.number().int().default(0),
  }),
});

// GET /api/v1/certifications (Public)
certificationsRouter.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await pool.query(
      "SELECT * FROM certifications WHERE published = true ORDER BY sort_order ASC, created_at DESC"
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

// POST /api/v1/certifications (Admin)
certificationsRouter.post(
  "/",
  authenticateUser,
  requireRole(["admin"]),
  validateRequest(createCertSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const c = req.body;
      const result = await pool.query(
        `INSERT INTO certifications (title, issuer, issue_date, credential_id, credential_url, badge_image, category, published, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [
          c.title,
          c.issuer,
          c.issue_date,
          c.credential_id || null,
          c.credential_url || null,
          c.badge_image || null,
          c.category || "Certification",
          c.published ?? true,
          c.sort_order ?? 0,
        ]
      );

      res.status(201).json({
        success: true,
        message: "Certification created successfully",
        data: result.rows[0],
      });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/v1/certifications/:id (Admin)
certificationsRouter.delete(
  "/:id",
  authenticateUser,
  requireRole(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await pool.query("DELETE FROM certifications WHERE id = $1 RETURNING id", [id]);

      if (result.rows.length === 0) {
        throw new NotFoundError("Certification not found");
      }

      res.status(200).json({
        success: true,
        message: "Certification deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);
