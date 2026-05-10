import "server-only";
import type Stripe from "stripe";
import { Resend } from "resend";
import { getAdminClient } from "@/lib/supabase";
import {
  STYLE_LABEL,
  SCREEN_LABEL,
  COLOR_LABEL,
  DELIVERY_LABEL,
  type StyleCode,
  type ScreenCode,
  type PaintCode,
  type DeliveryCode,
} from "@/lib/quote-schema";

export type CreateOrderResult =
  | { kind: "created"; id: string }
  | { kind: "exists"; id: string }
  | { kind: "error"; message: string };

/**
 * Insert an order from a completed Stripe Checkout Session, idempotently.
 * Both the webhook and the /quote/success page call this; the unique
 * constraint on stripe_session_id means whoever runs second is a no-op.
 */
export async function recordOrderFromSession(
  session: Stripe.Checkout.Session,
): Promise<CreateOrderResult> {
  const m = session.metadata ?? {};

  const required = [
    "style",
    "screen",
    "length_in",
    "depth_in",
    "height_in",
    "delivery",
    "total_price_cents",
    "deposit_paid_cents",
    "balance_due_cents",
  ] as const;
  for (const k of required) {
    if (typeof m[k] !== "string" || m[k] === "") {
      return { kind: "error", message: `metadata missing ${k}` };
    }
  }

  let supabase;
  try {
    supabase = getAdminClient();
  } catch (e) {
    return {
      kind: "error",
      message: e instanceof Error ? e.message : "supabase init failed",
    };
  }

  // Check for an existing row first (cheaper than relying on conflict).
  const { data: existing } = await supabase
    .from("orders")
    .select("id")
    .eq("stripe_session_id", session.id)
    .maybeSingle();
  if (existing) {
    return { kind: "exists", id: existing.id as string };
  }

  const customerEmail = session.customer_details?.email ?? null;
  // Shipping is the install/ship address; fall back to billing name only
  // if Stripe didn't get one on the shipping form. In the current Stripe
  // SDK, shipping_details lives under `collected_information`.
  const shipping = session.collected_information?.shipping_details ?? null;
  const customerName =
    shipping?.name ?? session.customer_details?.name ?? null;
  const customerPhone = session.customer_details?.phone ?? null;
  const address = shipping?.address ?? null;

  const paymentIntent =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id ?? null;

  const insertRow = {
    stripe_session_id: session.id,
    stripe_payment_intent: paymentIntent,
    total_price_cents: Number(m.total_price_cents),
    deposit_paid_cents: Number(m.deposit_paid_cents),
    balance_due_cents: Number(m.balance_due_cents),
    customer_email: customerEmail,
    customer_name: customerName,
    customer_phone: customerPhone,
    shipping_line1: address?.line1 ?? null,
    shipping_line2: address?.line2 ?? null,
    shipping_city: address?.city ?? null,
    shipping_state: address?.state ?? null,
    shipping_postal_code: address?.postal_code ?? null,
    shipping_country: address?.country ?? null,
    style: m.style as StyleCode,
    screen: m.screen as ScreenCode,
    paint_color: (m.paint_color || null) as PaintCode | null,
    length_in: Number(m.length_in),
    depth_in: Number(m.depth_in),
    height_in: Number(m.height_in),
    delivery: m.delivery as DeliveryCode,
    notes: m.notes || null,
  };

  const { data: row, error } = await supabase
    .from("orders")
    .insert(insertRow)
    .select("id")
    .single();

  if (error || !row) {
    // If two paths raced, the second one will hit the unique constraint
    // and we should treat it as already-existing rather than an error.
    if (error?.code === "23505") {
      const { data: late } = await supabase
        .from("orders")
        .select("id")
        .eq("stripe_session_id", session.id)
        .maybeSingle();
      if (late) return { kind: "exists", id: late.id as string };
    }
    return { kind: "error", message: error?.message ?? "insert failed" };
  }

  // Best-effort confirmation emails. Not blocking — the row exists.
  void sendDepositReceiptEmails(insertRow, row.id as string, customerEmail);

  return { kind: "created", id: row.id as string };
}

async function sendDepositReceiptEmails(
  row: {
    style: StyleCode;
    screen: ScreenCode;
    paint_color: PaintCode | null;
    length_in: number;
    depth_in: number;
    height_in: number;
    delivery: DeliveryCode;
    notes: string | null;
    total_price_cents: number;
    deposit_paid_cents: number;
    balance_due_cents: number;
    customer_name: string | null;
    customer_phone: string | null;
    shipping_line1: string | null;
    shipping_line2: string | null;
    shipping_city: string | null;
    shipping_state: string | null;
    shipping_postal_code: string | null;
    shipping_country: string | null;
  },
  id: string,
  customerEmail: string | null,
): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  const fromAddr = process.env.RESEND_FROM;
  const robEmail = process.env.QUOTES_TO_EMAIL ?? "rob@elmstandard.com";
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://elmstandard.com";

  if (!resendKey || !fromAddr) {
    console.warn("[orders] resend not configured; skipping email for", id);
    return;
  }

  const dims = `${row.length_in}" × ${row.depth_in}" × ${row.height_in}"`;
  const totalUSD = (row.total_price_cents / 100).toFixed(2);
  const depositUSD = (row.deposit_paid_cents / 100).toFixed(2);
  const balanceUSD = (row.balance_due_cents / 100).toFixed(2);

  const addressLines: string[] = [];
  if (row.shipping_line1) addressLines.push(row.shipping_line1);
  if (row.shipping_line2) addressLines.push(row.shipping_line2);
  const cityLine = [row.shipping_city, row.shipping_state]
    .filter(Boolean)
    .join(", ");
  const cityZip = [cityLine, row.shipping_postal_code]
    .filter(Boolean)
    .join(" ");
  if (cityZip) addressLines.push(cityZip);
  const formattedAddress = addressLines.length ? addressLines.join("\n          ") : "(not provided)";

  const deliveryLine =
    row.delivery === "local" ? "Install at" : "Ship to";

  const customerLines = [
    `Thanks${row.customer_name ? `, ${row.customer_name}` : ""} — your radiator cover is reserved.`,
    "",
    "— Cover —",
    `Style:    ${STYLE_LABEL[row.style]}`,
    `Screen:   ${SCREEN_LABEL[row.screen]}`,
    row.paint_color
      ? `Color:    ${COLOR_LABEL[row.paint_color]}`
      : `Color:    (to confirm)`,
    `Size:     ${dims}`,
    `Delivery: ${DELIVERY_LABEL[row.delivery]}`,
    "",
    "— Payment —",
    `Total:    $${totalUSD}`,
    `Deposit:  $${depositUSD} (paid)`,
    `Balance:  $${balanceUSD} (due at ${row.delivery === "local" ? "install" : "shipment"})`,
    "",
    `${deliveryLine}: ${formattedAddress}`,
    "",
    "I'll be in touch within two business days to confirm the final dimensions before I cut. Reply to this email if anything changes.",
    "",
    "— Rob",
  ];

  const internalLines = [
    `New deposit-paid order — id ${id}`,
    "",
    "— Cover —",
    `Style:    ${STYLE_LABEL[row.style]}`,
    `Screen:   ${SCREEN_LABEL[row.screen]}`,
    row.paint_color
      ? `Color:    ${COLOR_LABEL[row.paint_color]}`
      : `Color:    (to confirm)`,
    `Size:     ${dims}`,
    `Delivery: ${DELIVERY_LABEL[row.delivery]}`,
    `${deliveryLine}: ${formattedAddress}`,
    "",
    `Total:    $${totalUSD}`,
    `Deposit:  $${depositUSD}`,
    `Balance:  $${balanceUSD}`,
    "",
    row.notes ? `Notes:    ${row.notes}` : "",
    "",
    `Customer: ${row.customer_name ?? "—"} ${customerEmail ?? ""}`.trim(),
    row.customer_phone ? `Phone:    ${row.customer_phone}` : "",
    "",
    `Open: ${siteUrl.replace(/\/$/, "")}/admin/orders/${id}`,
  ].filter(Boolean);

  const resend = new Resend(resendKey);
  const tasks: Array<Promise<unknown>> = [
    resend.emails.send({
      from: fromAddr,
      to: robEmail,
      subject: `New order — $${totalUSD} — ${STYLE_LABEL[row.style]} cover`,
      text: internalLines.join("\n"),
    }),
  ];
  if (customerEmail) {
    tasks.push(
      resend.emails.send({
        from: fromAddr,
        to: customerEmail,
        replyTo: robEmail,
        subject: `Your radiator cover is reserved — Elm Standard`,
        text: customerLines.join("\n"),
      }),
    );
  }
  try {
    await Promise.all(tasks);
  } catch (e) {
    console.error("[orders] resend failed for", id, e);
  }
}
