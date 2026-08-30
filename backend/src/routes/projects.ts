import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { pool } from "../database/index.js";
import { authenticateUser, requireRole } from "../auth/index.js";
import { NotFoundError } from "../errors/index.js";
import { validateRequest } from "../schemas/index.js";

export const projectsRouter = Router();

const createProjectSchema = z.object({
  body: z.object({
    slug: z.string().min(2),
    title: z.string().min(2),
    description: z.string().min(10),
    long_description: z.string().optional(),
    category: z.string().min(2),
    technologies: z.array(z.string()).default([]),
    image_url: z.string().optional(),
    github_url: z.string().optional(),
    demo_url: z.string().optional(),
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
    sort_order: z.number().int().default(0),
  }),
});

// GET /api/v1/projects (Public)
projectsRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, featured } = req.query;
    let queryText = "SELECT * FROM projects WHERE published = true";
    const queryParams: any[] = [];

    if (category) {
      queryParams.push(category);
      queryText += ` AND category = $${queryParams.length}`;
    }
    if (featured === "true") {
      queryText += " AND featured = true";
    }

    queryText += " ORDER BY sort_order ASC, created_at DESC";

    const result = await pool.query(queryText, queryParams);
    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/projects/:slug (Public)
projectsRouter.get("/:slug", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const result = await pool.query("SELECT * FROM projects WHERE slug = $1", [slug]);

    if (result.rows.length === 0) {
      throw new NotFoundError(`Project with slug '${slug}' not found`);
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/projects (Admin)
projectsRouter.post(
  "/",
  authenticateUser,
  requireRole(["admin"]),
  validateRequest(createProjectSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const p = req.body;
      const result = await pool.query(
        `INSERT INTO projects (slug, title, description, long_description, category, technologies, image_url, github_url, demo_url, featured, published, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         RETURNING *`,
        [
          p.slug,
          p.title,
          p.description,
          p.long_description || null,
          p.category,
          p.technologies || [],
          p.image_url || null,
          p.github_url || null,
          p.demo_url || null,
          p.featured ?? false,
          p.published ?? true,
          p.sort_order ?? 0,
        ]
      );

      res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: result.rows[0],
      });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/v1/projects/:id (Admin)
projectsRouter.delete(
  "/:id",
  authenticateUser,
  requireRole(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await pool.query("DELETE FROM projects WHERE id = $1 RETURNING id", [id]);

      if (result.rows.length === 0) {
        throw new NotFoundError("Project not found");
      }

      res.status(200).json({
        success: true,
        message: "Project deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);
