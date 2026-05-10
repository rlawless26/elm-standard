import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import { recordOrderFromSession } from "@/lib/orders";
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

export const metadata = { title: "Order reserved — Elm Standard" };
export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function QuoteSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return <SuccessShell title="Missing session." />;
  }

  let outcome: "ok" | "error" = "error";
  let errorMessage: string | null = null;
  let summary: {
    style: StyleCode;
    screen: ScreenCode;
    paint_color: PaintCode | null;
    length_in: number;
    depth_in: number;
    height_in: number;
    delivery: DeliveryCode;
    total: number;
    deposit: number;
    balance: number;
    customer_email: string | null;
    shipping_address: string | null;
  } | null = null;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      errorMessage = "Payment hasn't completed yet.";
    } else {
      // Idempotent — if the webhook already inserted the order, this is a no-op.
      const result = await recordOrderFromSession(session);
      if (result.kind === "error") {
        errorMessage = result.message;
      } else {
        outcome = "ok";
        const m = session.metadata ?? {};
        const addr =
          session.collected_information?.shipping_details?.address ?? null;
        const addrLines = [
          addr?.line1,
          addr?.line2,
          [addr?.city, addr?.state, addr?.postal_code]
            .filter(Boolean)
            .join(" "),
        ].filter(Boolean);
        summary = {
          style: m.style as StyleCode,
          screen: m.screen as ScreenCode,
          paint_color: (m.paint_color || null) as PaintCode | null,
          length_in: Number(m.length_in),
          depth_in: Number(m.depth_in),
          height_in: Number(m.height_in),
          delivery: m.delivery as DeliveryCode,
          total: Number(m.total_price_cents) / 100,
          deposit: Number(m.deposit_paid_cents) / 100,
          balance: Number(m.balance_due_cents) / 100,
          customer_email: session.customer_details?.email ?? null,
          shipping_address: addrLines.length ? addrLines.join("\n") : null,
        };
      }
    }
  } catch (e) {
    errorMessage = e instanceof Error ? e.message : String(e);
  }

  if (outcome === "error" || !summary) {
    return (
      <SuccessShell title="Couldn't load your order.">
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 17,
            color: "var(--ink-2)",
            lineHeight: 1.55,
          }}
        >
          Your payment may still have gone through. Email{" "}
          <a href="mailto:rob@elmstandard.com" className="oxide-link">
            rob@elmstandard.com
          </a>{" "}
          and I&apos;ll sort it out.
          {errorMessage ? (
            <span
              style={{
                display: "block",
                marginTop: 12,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--ink-3)",
              }}
            >
              {errorMessage}
            </span>
          ) : null}
        </p>
      </SuccessShell>
    );
  }

  const dims = `${summary.length_in}" × ${summary.depth_in}" × ${summary.height_in}"`;

  return (
    <SuccessShell title="Reserved. I'll be in touch.">
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 19,
          color: "var(--ink-2)",
          lineHeight: 1.55,
          margin: 0,
        }}
      >
        I&apos;ll email{" "}
        {summary.customer_email ? (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 16 }}>
            {summary.customer_email}
          </span>
        ) : (
          "you"
        )}{" "}
        within two business days to confirm dimensions before I cut. The
        balance is due at{" "}
        {summary.delivery === "local" ? "install" : "shipment"}.
      </p>

      <div
        style={{
          background: "var(--paper)",
          border: "1px solid var(--hairline)",
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <span className="overline">Order summary</span>
        <Row label="Style" value={STYLE_LABEL[summary.style]} />
        <Row label="Screen" value={SCREEN_LABEL[summary.screen]} />
        <Row
          label="Color"
          value={
            summary.paint_color
              ? COLOR_LABEL[summary.paint_color]
              : "Trim photo to follow"
          }
        />
        <Row label="Size" value={dims} />
        <Row label="Delivery" value={DELIVERY_LABEL[summary.delivery]} />
        {summary.shipping_address ? (
          <Row
            label={summary.delivery === "local" ? "Install at" : "Ship to"}
            value={summary.shipping_address}
          />
        ) : null}
        <div
          style={{
            marginTop: 12,
            paddingTop: 12,
            borderTop: "1px dashed var(--hairline)",
          }}
        />
        <Row label="Total" value={`$${summary.total.toLocaleString()}`} />
        <Row
          label="Deposit paid"
          value={`$${summary.deposit.toLocaleString()}`}
        />
        <Row
          label="Balance due"
          value={`$${summary.balance.toLocaleString()}`}
        />
      </div>

      <Link href="/" className="btn-outline">
        Back to home
      </Link>
    </SuccessShell>
  );
}

function SuccessShell({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <main style={{ padding: "96px 0", minHeight: "60vh" }}>
      <div
        className="container"
        style={{
          maxWidth: 640,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          alignItems: "flex-start",
        }}
      >
        <span className="overline">Order reserved</span>
        <div className="rule-strong" />
        <h1 className="display-h1">{title}</h1>
        {children}
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        gap: 12,
        alignItems: "baseline",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--ink-3)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 14,
          color: "var(--ink)",
          whiteSpace: "pre-line",
        }}
      >
        {value}
      </span>
    </div>
  );
}
