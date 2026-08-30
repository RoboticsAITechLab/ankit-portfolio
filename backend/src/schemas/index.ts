import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { BadRequestError } from "../errors/index.js";

export function validateRequest(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
        next(new BadRequestError(`Validation failed: ${issues}`));
      } else {
        next(error);
      }
    }
  };
}

