import "server-only";
import { getAdminClient } from "@/lib/supabase";
import {
  DEFAULT_PRICING,
  PRICING_SINGLETON_ID,
  type PricingConfig,
} from "@/lib/pricing";

/**
 * Loads the pricing_config singleton row. Returns DEFAULT_PRICING if the
 * table is missing, the row is missing, or Supabase is misconfigured —
 * never throws. The /quote page is allowed to render even when pricing
 * isn't wired up yet (e.g. the SQL hasn't been applied).
 */
export async function loadPricingConfig(): Promise<{
  config: PricingConfig;
  source: "db" | "default";
}> {
  let supabase;
  try {
    supabase = getAdminClient();
  } catch (e) {
    console.warn("[pricing] supabase env not set, using defaults:", e);
    return { config: DEFAULT_PRICING, source: "default" };
  }

  const { data, error } = await supabase
    .from("pricing_config")
    .select("*")
    .eq("id", PRICING_SINGLETON_ID)
    .single();

  if (error || !data) {
    if (error) console.warn("[pricing] load failed, using defaults:", error.message);
    return { config: DEFAULT_PRICING, source: "default" };
  }

  return { config: data as PricingConfig, source: "db" };
}

/**
 * Coerce form values to numbers + clamp to a sane range. Used by the admin
 * pricing page server action.
 */
export function coercePricingFromForm(form: FormData): {
  ok: true;
  patch: Partial<PricingConfig>;
} | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const patch: Record<string, number> = {};

  const fields: Array<{ key: keyof PricingConfig; min: number; max: number }> = [
    { key: "base_rate_per_sqin", min: 0, max: 100 },
    { key: "shaker_multiplier", min: 0, max: 10 },
    { key: "modern_multiplier", min: 0, max: 10 },
    { key: "traditional_multiplier", min: 0, max: 10 },
    { key: "brass_screen_upcharge", min: 0, max: 5000 },
    { key: "depth_threshold_in", min: 0, max: 200 },
    { key: "depth_surcharge_per_inch", min: 0, max: 1000 },
    { key: "delivery_local_fee", min: 0, max: 10000 },
    { key: "delivery_flatpack_fee", min: 0, max: 10000 },
    { key: "material_spike_multiplier", min: 0, max: 10 },
    { key: "price_floor", min: 0, max: 100000 },
    { key: "dim_max_length_in", min: 1, max: 500 },
    { key: "dim_max_height_in", min: 1, max: 500 },
    { key: "dim_max_depth_in", min: 1, max: 500 },
  ];

  for (const { key, min, max } of fields) {
    const raw = form.get(key as string);
    const s = typeof raw === "string" ? raw.trim() : "";
    if (s === "") {
      errors[key as string] = "Required";
      continue;
    }
    const n = Number.parseFloat(s);
    if (!Number.isFinite(n)) {
      errors[key as string] = "Must be a number";
      continue;
    }
    if (n < min || n > max) {
      errors[key as string] = `Out of range (${min}–${max})`;
      continue;
    }
    patch[key as string] = n;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }
  return { ok: true, patch: patch as Partial<PricingConfig> };
}
