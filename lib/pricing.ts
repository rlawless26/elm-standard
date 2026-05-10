/**
 * Pricing types + pure calculator. Usable on both server and client — the
 * loader (which talks to Supabase) lives in lib/pricing-server.ts.
 *
 * The formula:
 *   sqin            = length × height
 *   base            = sqin × base_rate_per_sqin
 *   styled          = base × style_multiplier
 *   depthSurcharge  = (depth - threshold) × surcharge_per_inch  (0 if under)
 *   brassUpcharge   = brass_screen_upcharge if Grecian-brass, else 0
 *   delivery        = local_fee or flatpack_fee
 *   subtotal        = (styled + depthSurcharge + brassUpcharge + delivery)
 *                     × material_spike_multiplier
 *   total           = max(subtotal, price_floor)
 */

import type {
  StyleCode,
  ScreenCode,
  DeliveryCode,
} from "@/lib/quote-schema";

export const PRICING_SINGLETON_ID =
  "00000000-0000-0000-0000-000000000001" as const;

export type PricingConfig = {
  base_rate_per_sqin: number;
  shaker_multiplier: number;
  modern_multiplier: number;
  traditional_multiplier: number;
  brass_screen_upcharge: number;
  depth_threshold_in: number;
  depth_surcharge_per_inch: number;
  delivery_local_fee: number;
  delivery_flatpack_fee: number;
  material_spike_multiplier: number;
  price_floor: number;
  dim_max_length_in: number;
  dim_max_height_in: number;
  dim_max_depth_in: number;
  updated_at?: string;
};

/**
 * Sensible defaults, matching the SQL defaults. Used as the fallback when
 * the pricing_config table is unreachable (table missing, env not set, etc).
 * Kept here so the public /quote never hard-fails if Supabase is flaky.
 */
export const DEFAULT_PRICING: PricingConfig = {
  base_rate_per_sqin: 0.35,
  shaker_multiplier: 1.0,
  modern_multiplier: 1.05,
  traditional_multiplier: 1.15,
  brass_screen_upcharge: 50,
  depth_threshold_in: 9,
  depth_surcharge_per_inch: 25,
  delivery_local_fee: 400,
  delivery_flatpack_fee: 300,
  material_spike_multiplier: 1.0,
  price_floor: 350,
  dim_max_length_in: 72,
  dim_max_height_in: 48,
  dim_max_depth_in: 18,
};

export type PriceInput = {
  style: StyleCode | null;
  screen: ScreenCode | null;
  length_in: number | null;
  depth_in: number | null;
  height_in: number | null;
  delivery: DeliveryCode | null;
};

export type PriceBreakdown = {
  sqin: number;
  base: number;
  styled: number;
  depthSurcharge: number;
  brassUpcharge: number;
  delivery: number;
  subtotal: number;
  total: number;
  hitFloor: boolean;
};

export type PriceResult =
  | { kind: "incomplete"; message: string }
  | { kind: "over_cap"; message: string }
  | { kind: "ready"; total: number; breakdown: PriceBreakdown };

function styleMultiplier(
  style: StyleCode,
  pricing: PricingConfig,
): number {
  switch (style) {
    case "shaker":
      return pricing.shaker_multiplier;
    case "modern":
      return pricing.modern_multiplier;
    case "traditional":
      return pricing.traditional_multiplier;
  }
}

export function calculatePrice(
  input: PriceInput,
  pricing: PricingConfig,
): PriceResult {
  const { style, screen, length_in, depth_in, height_in, delivery } = input;

  // Need style + delivery + L + H to compute. Depth optional for the formula
  // but required for over-cap and depth surcharge logic below.
  if (!style || !delivery || length_in == null || height_in == null) {
    return {
      kind: "incomplete",
      message: "Configure to see your estimate",
    };
  }

  // Over-cap escape hatch.
  if (length_in > pricing.dim_max_length_in) {
    return {
      kind: "over_cap",
      message: `Length over ${pricing.dim_max_length_in}" — needs a custom quote.`,
    };
  }
  if (height_in > pricing.dim_max_height_in) {
    return {
      kind: "over_cap",
      message: `Height over ${pricing.dim_max_height_in}" — needs a custom quote.`,
    };
  }
  if (depth_in != null && depth_in > pricing.dim_max_depth_in) {
    return {
      kind: "over_cap",
      message: `Depth over ${pricing.dim_max_depth_in}" — needs a custom quote.`,
    };
  }

  const sqin = length_in * height_in;
  const base = sqin * pricing.base_rate_per_sqin;
  const styled = base * styleMultiplier(style, pricing);

  let depthSurcharge = 0;
  if (depth_in != null && depth_in > pricing.depth_threshold_in) {
    depthSurcharge =
      (depth_in - pricing.depth_threshold_in) *
      pricing.depth_surcharge_per_inch;
  }

  const brassUpcharge =
    screen === "grecian-brass" ? pricing.brass_screen_upcharge : 0;

  const deliveryFee =
    delivery === "local"
      ? pricing.delivery_local_fee
      : pricing.delivery_flatpack_fee;

  const preFloor =
    (styled + depthSurcharge + brassUpcharge + deliveryFee) *
    pricing.material_spike_multiplier;

  const hitFloor = preFloor < pricing.price_floor;
  const total = Math.round(hitFloor ? pricing.price_floor : preFloor);

  return {
    kind: "ready",
    total,
    breakdown: {
      sqin: Math.round(sqin),
      base: Math.round(base),
      styled: Math.round(styled),
      depthSurcharge: Math.round(depthSurcharge),
      brassUpcharge: Math.round(brassUpcharge),
      delivery: Math.round(deliveryFee),
      subtotal: Math.round(preFloor),
      total,
      hitFloor,
    },
  };
}
