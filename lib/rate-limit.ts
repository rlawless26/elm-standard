import "server-only";

/**
 * In-memory per-IP rate limiter. Resets on cold start; not shared across
 * Vercel serverless instances. Adequate for a low-traffic public form.
 * If abuse appears, swap for an Upstash Redis token bucket.
 */

type Hits = number[];
const buckets = new Map<string, Hits>();
const MAX_KEYS = 1000;

export function checkAndConsume(
  ip: string,
  windowMs: number,
  limit: number,
): boolean {
  const now = Date.now();
  const cutoff = now - windowMs;
  let hits = buckets.get(ip);
  if (!hits) hits = [];
  // Drop expired entries
  hits = hits.filter((t) => t > cutoff);
  if (hits.length >= limit) {
    buckets.set(ip, hits);
    return false;
  }
  hits.push(now);
  buckets.set(ip, hits);

  // Cheap bound on memory: if the map gets too big, prune the oldest IPs.
  if (buckets.size > MAX_KEYS) {
    const dead: string[] = [];
    for (const [k, v] of buckets) {
      if (v.length === 0 || v[v.length - 1] < cutoff) dead.push(k);
    }
    for (const k of dead) buckets.delete(k);
  }
  return true;
}

/** Best-effort client IP from the proxy chain (Vercel sets X-Forwarded-For). */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
