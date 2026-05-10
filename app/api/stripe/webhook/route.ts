import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { recordOrderFromSession } from "@/lib/orders";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.warn("[stripe webhook] STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json(
      { ok: false, error: "webhook_not_configured" },
      { status: 503 },
    );
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json(
      { ok: false, error: "missing_signature" },
      { status: 400 },
    );
  }

  let stripe;
  try {
    stripe = getStripe();
  } catch (e) {
    console.error("[stripe webhook] stripe init failed:", e);
    return NextResponse.json(
      { ok: false, error: "stripe_not_configured" },
      { status: 503 },
    );
  }

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch (e) {
    console.error("[stripe webhook] signature verification failed:", e);
    return NextResponse.json(
      { ok: false, error: "bad_signature" },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const result = await recordOrderFromSession(session);
    if (result.kind === "error") {
      console.error("[stripe webhook] record failed:", result.message);
      // Return 500 so Stripe retries.
      return NextResponse.json({ ok: false }, { status: 500 });
    }
    return NextResponse.json({ ok: true, id: result.id, kind: result.kind });
  }

  // We only listen for checkout.session.completed for now. Acknowledge
  // anything else so Stripe doesn't retry it.
  return NextResponse.json({ ok: true, ignored: event.type });
}
