import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/index.js";
import { config } from "../config/index.js";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  let statusCode = 500;
  let message = "Internal server error";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Log server side error details without exposing credentials/sensitive info
  if (!config.isProduction || statusCode === 500) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${statusCode}: ${err.message}`);
    if (!config.isProduction && err.stack) {
      console.error(err.stack);
    }
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
}
