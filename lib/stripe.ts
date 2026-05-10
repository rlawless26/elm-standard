import "server-only";
import Stripe from "stripe";

let cached: Stripe | null = null;

/**
 * Server-only Stripe client. Throws if STRIPE_SECRET_KEY is missing —
 * callers should catch and surface a clear error to the user (e.g. "Stripe
 * not configured" rather than a 500).
 */
export function getStripe(): Stripe {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  cached = new Stripe(key);
  return cached;
}

export const DEPOSIT_PERCENT = 30;

export function depositCentsFromTotal(totalDollars: number): number {
  // Round to whole cents, never under Stripe's $0.50 minimum.
  const cents = Math.round((totalDollars * DEPOSIT_PERCENT) / 100 * 100);
  return Math.max(cents, 50);
}
