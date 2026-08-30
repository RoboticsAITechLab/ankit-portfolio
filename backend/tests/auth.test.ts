import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { hashPassword, comparePassword, generateToken, verifyToken, requireRole, AuthRequest } from "../src/auth/index.js";
import { UnauthorizedError, ForbiddenError } from "../src/errors/index.js";

describe("Authentication & RBAC Unit Tests", () => {
  it("should hash and compare passwords accurately", async () => {
    const raw = "SuperSecretPassword123!";
    const hash = await hashPassword(raw);

    assert.notEqual(hash, raw, "Hash must not equal raw password");
    const isMatch = await comparePassword(raw, hash);
    assert.equal(isMatch, true, "Valid password comparison must return true");

    const isWrongMatch = await comparePassword("WrongPassword!", hash);
    assert.equal(isWrongMatch, false, "Invalid password comparison must return false");
  });

  it("should generate and verify valid JWT tokens", () => {
    const payload = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      email: "admin@test.com",
      role: "admin",
    };

    const token = generateToken(payload);
    assert.ok(token, "JWT token must be generated");

    const decoded = verifyToken(token);
    assert.equal(decoded.id, payload.id);
    assert.equal(decoded.email, payload.email);
    assert.equal(decoded.role, payload.role);
  });

  it("should throw UnauthorizedError when verifying invalid token", () => {
    assert.throws(
      () => {
        verifyToken("invalid.jwt.token");
      },
      UnauthorizedError,
      "Invalid JWT must throw UnauthorizedError"
    );
  });

  it("should enforce RBAC permissions correctly via requireRole middleware", () => {
    const adminReq: AuthRequest = {
      user: { id: "1", email: "admin@test.com", role: "admin" },
    } as any;

    const userReq: AuthRequest = {
      user: { id: "2", email: "user@test.com", role: "user" },
    } as any;

    const unauthReq: AuthRequest = {} as any;

    let adminPassed = false;
    const adminGuard = requireRole(["admin"]);
    adminGuard(adminReq, {} as any, (err?: any) => {
      if (!err) adminPassed = true;
    });
    assert.equal(adminPassed, true, "Admin user must pass admin guard");

    let userBlocked = false;
    adminGuard(userReq, {} as any, (err?: any) => {
      if (err instanceof ForbiddenError) userBlocked = true;
    });
    assert.equal(userBlocked, true, "Non-admin user must be rejected with ForbiddenError");

    let unauthBlocked = false;
    adminGuard(unauthReq, {} as any, (err?: any) => {
      if (err instanceof UnauthorizedError) unauthBlocked = true;
    });
    assert.equal(unauthBlocked, true, "Unauthenticated request must be rejected with UnauthorizedError");
  });
});
