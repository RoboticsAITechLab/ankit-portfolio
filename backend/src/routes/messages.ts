import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { pool } from "../database/index.js";
import { authenticateUser, requireRole } from "../auth/index.js";
import { NotFoundError } from "../errors/index.js";
import { validateRequest } from "../schemas/index.js";

export const messagesRouter = Router();

const contactMessageSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("A valid email is required"),
    subject: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
  }),
});

// POST /api/v1/messages or /api/v1/contact (Public Contact Form Submission)
messagesRouter.post(
  "/",
  validateRequest(contactMessageSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, subject, message } = req.body;
      const result = await pool.query(
        `INSERT INTO messages (name, email, subject, message)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, email, subject, created_at`,
        [name.trim(), email.toLowerCase().trim(), subject || null, message.trim()]
      );

      res.status(201).json({
        success: true,
        message: "Message received successfully. We will get back to you soon.",
        data: result.rows[0],
      });
    } catch (error) {
      next(error);
    }
  }
);

// GET /api/v1/messages (Admin)
messagesRouter.get(
  "/",
  authenticateUser,
  requireRole(["admin"]),
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await pool.query("SELECT * FROM messages ORDER BY created_at DESC");
      res.status(200).json({
        success: true,
        count: result.rows.length,
        data: result.rows,
      });
    } catch (error) {
      next(error);
    }
  }
);

// PATCH /api/v1/messages/:id/read (Admin)
messagesRouter.patch(
  "/:id/read",
  authenticateUser,
  requireRole(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await pool.query(
        "UPDATE messages SET is_read = true WHERE id = $1 RETURNING *",
        [id]
      );

      if (result.rows.length === 0) {
        throw new NotFoundError("Message not found");
      }

      res.status(200).json({
        success: true,
        data: result.rows[0],
      });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/v1/messages/:id (Admin)
messagesRouter.delete(
  "/:id",
  authenticateUser,
  requireRole(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await pool.query("DELETE FROM messages WHERE id = $1 RETURNING id", [id]);

      if (result.rows.length === 0) {
        throw new NotFoundError("Message not found");
      }

      res.status(200).json({
        success: true,
        message: "Message deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);
