import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../config/index.js";
import { UnauthorizedError, ForbiddenError } from "../errors/index.js";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: AuthenticatedUser;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: AuthenticatedUser): string {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): AuthenticatedUser {
  try {
    return jwt.verify(token, config.jwtSecret) as AuthenticatedUser;
  } catch (_error) {
    throw new UnauthorizedError("Invalid or expired authentication token");
  }
}

// Authentication middleware to verify JWT
export function authenticateUser(req: AuthRequest, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authentication token is missing or malformed"));
  }

  const token = authHeader.split(" ")[1];
  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

// Role-based Access Control (RBAC) middleware
export function requireRole(allowedRoles: string[]) {
  return (req: AuthRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError("Authentication required"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError("Insufficient permissions to access this resource"));
    }

    next();
  };
}
