import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";
import { validateRequest } from "../src/schemas/index.js";
import { BadRequestError } from "../src/errors/index.js";

describe("Validation Middleware Unit Tests", () => {
  const testSchema = z.object({
    body: z.object({
      name: z.string().min(2),
      email: z.string().email(),
      age: z.number().int().positive().optional(),
    }),
  });

  it("should pass valid payloads cleanly to next middleware", () => {
    const validReq: any = {
      body: { name: "Ankit", email: "ankit@test.com", age: 25 },
      query: {},
      params: {},
    };

    let passed = false;
    const validator = validateRequest(testSchema);
    validator(validReq, {} as any, (err?: any) => {
      if (!err) passed = true;
    });

    assert.equal(passed, true, "Valid input must pass validation");
  });

  it("should reject invalid email or missing fields with BadRequestError", () => {
    const invalidReq: any = {
      body: { name: "A", email: "invalid-email" },
      query: {},
      params: {},
    };

    let errorThrown: any = null;
    const validator = validateRequest(testSchema);
    validator(invalidReq, {} as any, (err?: any) => {
      errorThrown = err;
    });

    assert.ok(errorThrown instanceof BadRequestError, "Invalid payload must throw BadRequestError");
    assert.match(errorThrown.message, /Validation failed/);
  });
});
