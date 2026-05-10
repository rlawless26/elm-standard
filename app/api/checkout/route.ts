import { NextResponse } from "next/server";
import { getStripe, DEPOSIT_PERCENT, depositCentsFromTotal } from "@/lib/stripe";
import { loadPricingConfig } from "@/lib/pricing-server";
import { calculatePrice, type PriceInput } from "@/lib/pricing";
import {
  STYLE_TO_CODE,
  SCREEN_TO_CODE,
  COLOR_TO_CODE,
  DELIVERY_TO_CODE,
  STYLE_LABEL,
  SCREEN_LABEL,
  COLOR_LABEL,
  DELIVERY_LABEL,
  type StyleCode,
  type ScreenCode,
  type DeliveryCode,
  type PaintCode,
} from "@/lib/quote-schema";
import { checkAndConsume, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

type CheckoutBody = {
  style?: string;
  screen?: string;
  color?: string;
  length?: string;
  depth?: string;
  height?: string;
  delivery?: string;
  notes?: string;
  email?: string;
};

function parseDim(v: unknown): number | null {
  if (typeof v !== "string") return null;
  const cleaned = v.trim().replace(/[\s"”]+$/g, "");
  if (!cleaned) return null;
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export async function POST(req: Request) {
  // Rate limit
  const ip = clientIp(req);
  if (!checkAndConsume(ip, 60_000, 3)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  let body: CheckoutBody;
  try {
    body = (await req.json()) as CheckoutBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  // Translate human labels → codes.
  const style: StyleCode | undefined = body.style
    ? STYLE_TO_CODE[body.style.trim()]
    : undefined;
  const screen: ScreenCode | undefined = body.screen
    ? SCREEN_TO_CODE[body.screen.trim()]
    : undefined;
  const delivery: DeliveryCode | undefined = body.delivery
    ? DELIVERY_TO_CODE[body.delivery.trim()]
    : undefined;
  const paint: PaintCode = body.color
    ? COLOR_TO_CODE[body.color.trim()] ?? "custom"
    : "custom";

  const length_in = parseDim(body.length);
  const depth_in = parseDim(body.depth);
  const height_in = parseDim(body.height);

  if (
    !style ||
    !screen ||
    !delivery ||
    length_in == null ||
    depth_in == null ||
    height_in == null
  ) {
    return NextResponse.json(
      { ok: false, error: "incomplete_config" },
      { status: 400 },
    );
  }

  // Server-side price recompute — don't trust the client.
  const { config: pricing } = await loadPricingConfig();
  const input: PriceInput = {
    style,
    screen,
    length_in,
    depth_in,
    height_in,
    delivery,
  };
  const result = calculatePrice(input, pricing);

  if (result.kind === "incomplete") {
    return NextResponse.json(
      { ok: false, error: "incomplete_config" },
      { status: 400 },
    );
  }
  if (result.kind === "over_cap") {
    return NextResponse.json(
      { ok: false, error: "over_cap", message: result.message },
      { status: 400 },
    );
  }

  const totalDollars = result.total;
  const depositCents = depositCentsFromTotal(totalDollars);
  const totalCents = totalDollars * 100;
  const balanceCents = totalCents - depositCents;

  // Stripe session
  let stripe;
  try {
    stripe = getStripe();
  } catch (e) {
    console.error("[checkout] stripe init failed:", e);
    return NextResponse.json(
      { ok: false, error: "stripe_not_configured" },
      { status: 503 },
    );
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://elmstandard.com";

  const description = [
    STYLE_LABEL[style] + " cover",
    `${length_in}" × ${depth_in}" × ${height_in}"`,
    COLOR_LABEL[paint],
    DELIVERY_LABEL[delivery],
  ].join(" · ");

  // Only pass customer_email to Stripe if it actually looks like an email.
  // Anything else (empty, garbage from stale state) → let Stripe collect.
  const emailHint = body.email?.trim() ?? "";
  const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailHint);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: looksLikeEmail ? emailHint : undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${DEPOSIT_PERCENT}% deposit — ${STYLE_LABEL[style]} radiator cover`,
              description,
            },
            unit_amount: depositCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/quote/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/quote?cancelled=1`,
      metadata: {
        style,
        screen,
        paint_color: paint,
        length_in: String(length_in),
        depth_in: String(depth_in),
        height_in: String(height_in),
        delivery,
        notes: (body.notes ?? "").slice(0, 500),
        total_price_cents: String(totalCents),
        deposit_paid_cents: String(depositCents),
        balance_due_cents: String(balanceCents),
      },
    });

    if (!session.url) {
      console.error("[checkout] stripe session has no url:", session.id);
      return NextResponse.json(
        { ok: false, error: "stripe_session_invalid" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      url: session.url,
      depositCents,
      totalCents,
    });
  } catch (e) {
    console.error("[checkout] stripe session create failed:", e);
    return NextResponse.json(
      { ok: false, error: "stripe_error" },
      { status: 502 },
    );
  }
}
