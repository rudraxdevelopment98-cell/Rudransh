import "server-only";
import {
  randomBytes,
  scryptSync,
  timingSafeEqual,
  createHmac,
} from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "./db";

/**
 * Self-contained admin auth — no third-party service.
 * Passwords: scrypt with per-user salt. Sessions: HMAC-signed cookie.
 */

const COOKIE = "rw_admin";
const SESSION_DAYS = 7;

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s && process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET must be set in production.");
  }
  return s ?? "dev-insecure-secret-change-me";
}

/* ── password hashing ─────────────────────────────────────────────────────── */

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return (
    candidate.length === expected.length &&
    timingSafeEqual(candidate, expected)
  );
}

/* ── session token ────────────────────────────────────────────────────────── */

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

function createToken(userId: string): string {
  const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ userId, exp })).toString(
    "base64url"
  );
  return `${payload}.${sign(payload)}`;
}

function readToken(token: string): { userId: string } | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = sign(payload);
  if (
    sig.length !== expected.length ||
    !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  ) {
    return null;
  }
  try {
    const { userId, exp } = JSON.parse(
      Buffer.from(payload, "base64url").toString()
    );
    if (typeof exp !== "number" || Date.now() > exp) return null;
    return { userId };
  } catch {
    return null;
  }
}

/* ── public API ──────────────────────────────────────────────────────────── */

export function setSessionCookie(userId: string) {
  cookies().set(COOKIE, createToken(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export function clearSessionCookie() {
  cookies().delete(COOKIE);
}

/** Returns the signed-in admin, or null. Verifies the token still maps to a user. */
export async function getAdmin() {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return null;
  const parsed = readToken(token);
  if (!parsed) return null;
  const user = await prisma.adminUser.findUnique({
    where: { id: parsed.userId },
    select: { id: true, username: true },
  });
  return user;
}
