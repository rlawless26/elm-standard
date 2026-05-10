import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getAdminClient } from "@/lib/supabase";
import {
  renderEmailBody,
  STYLE_LABEL,
  validateQuotePayload,
} from "@/lib/quote-schema";
import { checkAndConsume, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

// Silent honeypot success — bots think they posted, no DB write.
const HONEYPOT_OK = NextResponse.json({
  ok: true,
  id: "00000000-0000-0000-0000-000000000000",
});

export async function POST(req: Request) {
  let body: Record<string, unknown> | null = null;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  // Honeypot: a hidden field humans never see. Bots auto-fill it.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return HONEYPOT_OK;
  }

  // Per-IP rate limit: 1 submission per minute.
  const ip = clientIp(req);
  if (!checkAndConsume(ip, 60_000, 1)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  const v = validateQuotePayload(body);
  if (!v.ok) {
    return NextResponse.json(
      { ok: false, errors: v.errors },
      { status: 400 },
    );
  }

  // Insert
  let supabase;
  try {
    supabase = getAdminClient();
  } catch (e) {
    console.error("[quote] supabase client init failed:", e);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 },
    );
  }

  const { data: row, error: insertError } = await supabase
    .from("quote_requests")
    .insert(v.data)
    .select("id, created_at")
    .single();

  if (insertError || !row) {
    console.error("[quote] insert failed:", insertError);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 },
    );
  }

  // Best-effort notification email. Submission is the source of truth — if
  // Resend fails (rate limit, DNS not yet verified, etc.), the row still
  // exists and shows up in /admin.
  const resendKey = process.env.RESEND_API_KEY;
  const fromAddr = process.env.RESEND_FROM;
  const toAddr = process.env.QUOTES_TO_EMAIL ?? "rob@elmstandard.com";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://elmstandard.com";

  if (resendKey && fromAddr) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: fromAddr,
        to: toAddr,
        replyTo: v.data.email,
        subject: `New quote — ${v.data.name} — ${STYLE_LABEL[v.data.style]}`,
        text: renderEmailBody(v.data, row.id, siteUrl),
      });
    } catch (e) {
      console.error("[quote] resend failed for", row.id, e);
    }
  } else {
    console.warn(
      "[quote] Resend not configured; skipping email for",
      row.id,
    );
  }

  return NextResponse.json({ ok: true, id: row.id });
}
