import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE = "es_admin";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

/**
 * Throws redirect to /admin/login if the request isn't authenticated.
 * Use in async Server Components, layouts, and Server Actions.
 */
export async function requireAdmin(): Promise<void> {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) {
    // If admin auth isn't configured, lock everyone out rather than letting
    // anyone through.
    redirect("/admin/login?error=config");
  }
  const jar = await cookies();
  const value = jar.get(ADMIN_COOKIE)?.value ?? "";
  if (!safeEqual(value, expected)) {
    redirect("/admin/login");
  }
}

/**
 * Compare a submitted password to ADMIN_PASSWORD in constant time.
 * Returns false if either is missing.
 */
export function checkPassword(submitted: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(submitted, expected);
}
