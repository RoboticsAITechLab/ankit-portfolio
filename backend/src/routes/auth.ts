import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { pool } from "../database/index.js";
import { comparePassword, generateToken, authenticateUser, AuthRequest } from "../auth/index.js";
import { UnauthorizedError } from "../errors/index.js";
import { validateRequest } from "../schemas/index.js";

export const authRouter = Router();

const loginSchema = z.object({
  body: z.object({
    email: z.string().email("A valid email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

// POST /api/v1/auth/login
authRouter.post(
  "/login",
  validateRequest(loginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const userQuery = await pool.query(
        "SELECT id, email, password_hash, role, name, is_active FROM users WHERE email = $1",
        [email.toLowerCase().trim()]
      );

      if (userQuery.rows.length === 0) {
        throw new UnauthorizedError("Invalid email or password");
      }

      const user = userQuery.rows[0];

      if (!user.is_active) {
        throw new UnauthorizedError("User account is inactive");
      }

      const isPasswordValid = await comparePassword(password, user.password_hash);
      if (!isPasswordValid) {
        throw new UnauthorizedError("Invalid email or password");
      }

      // Update last login
      await pool.query("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1", [user.id]);

      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// GET /api/v1/auth/me (Protected)
authRouter.get(
  "/me",
  authenticateUser,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new UnauthorizedError("Not authenticated");
      }

      const userQuery = await pool.query(
        "SELECT id, email, role, name, created_at, last_login FROM users WHERE id = $1",
        [req.user.id]
      );

      if (userQuery.rows.length === 0) {
        throw new UnauthorizedError("User not found");
      }

      res.status(200).json({
        success: true,
        data: userQuery.rows[0],
      });
    } catch (error) {
      next(error);
    }
  }
);
