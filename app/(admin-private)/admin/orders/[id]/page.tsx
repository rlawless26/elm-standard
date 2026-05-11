import { notFound } from "next/navigation";
import { getAdminClient } from "@/lib/supabase";
import {
  COLOR_LABEL,
  DELIVERY_LABEL,
  SCREEN_LABEL,
  STYLE_LABEL,
} from "@/lib/quote-schema";
import {
  ORDER_STATUSES,
  ORDER_STATUS_LABEL,
  formatAddress,
  type OrderRow,
} from "@/lib/order-schema";
import { updateOrder } from "./actions";

type Params = Promise<{ id: string }>;

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function dollars(cents: number): string {
  return `$${(cents / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default async function AdminOrderDetail({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;

  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const row = data as OrderRow;
  const dims = `${row.length_in}" × ${row.depth_in}" × ${row.height_in}"`;
  const address = formatAddress(row);
  const stripeMode = row.stripe_session_id.startsWith("cs_test_")
    ? "test"
    : "live";
  const stripeBase =
    stripeMode === "test"
      ? "https://dashboard.stripe.com/test"
      : "https://dashboard.stripe.com";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
        gap: 48,
        alignItems: "flex-start",
      }}
    >
      {/* LEFT — read-only order details */}
      <section
        style={{ display: "flex", flexDirection: "column", gap: 24 }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span className="overline">{formatDate(row.created_at)}</span>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 32,
              fontWeight: 400,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {row.customer_name ?? "Customer"}
          </h2>
          {row.customer_email ? (
            <a
              href={`mailto:${row.customer_email}?subject=${encodeURIComponent("Re: your radiator cover order")}`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                color: "var(--oxide)",
                borderBottom: "1px solid var(--oxide)",
                alignSelf: "flex-start",
                paddingBottom: 2,
              }}
            >
              {row.customer_email} · reply →
            </a>
          ) : null}
          {row.customer_phone ? (
            <a
              href={`tel:${row.customer_phone}`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                color: "var(--ink-3)",
                alignSelf: "flex-start",
              }}
            >
              {row.customer_phone}
            </a>
          ) : null}
        </div>

        {/* COVER */}
        <div
          style={{
            background: "var(--paper)",
            border: "1px solid var(--hairline)",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <span className="overline">Cover</span>
          <DetailRow label="Style" value={STYLE_LABEL[row.style]} />
          <DetailRow label="Screen" value={SCREEN_LABEL[row.screen]} />
          <DetailRow
            label="Color"
            value={
              row.paint_color
                ? COLOR_LABEL[row.paint_color]
                : "Trim photo to follow"
            }
          />
          <DetailRow label="Size" value={dims} mono />
          <DetailRow label="Delivery" value={DELIVERY_LABEL[row.delivery]} />
        </div>

        {/* SHIPPING */}
        <div
          style={{
            background: "var(--paper)",
            border: "1px solid var(--hairline)",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <span className="overline">
            {row.delivery === "local" ? "Install at" : "Ship to"}
          </span>
          {address ? (
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 17,
                color: "var(--ink)",
                margin: 0,
                lineHeight: 1.55,
                whiteSpace: "pre-line",
              }}
            >
              {address}
            </p>
          ) : (
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                color: "var(--ink-4)",
                margin: 0,
              }}
            >
              No address captured.
            </p>
          )}
        </div>

        {/* PAYMENT */}
        <div
          style={{
            background: "var(--paper)",
            border: "1px solid var(--hairline)",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <span className="overline">Payment</span>
          <DetailRow
            label="Total"
            value={dollars(row.total_price_cents)}
            mono
          />
          <DetailRow
            label="Deposit"
            value={`${dollars(row.deposit_paid_cents)}  ·  PAID`}
            mono
          />
          <DetailRow
            label="Balance"
            value={`${dollars(row.balance_due_cents)}  ·  due at ${row.delivery === "local" ? "install" : "shipment"}`}
            mono
          />
          <div
            style={{
              marginTop: 6,
              paddingTop: 10,
              borderTop: "1px dashed var(--hairline)",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <a
              href={`${stripeBase}/payments/${row.stripe_payment_intent ?? ""}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--oxide)",
                borderBottom: "1px solid var(--oxide)",
                alignSelf: "flex-start",
                paddingBottom: 1,
                letterSpacing: "0.02em",
              }}
            >
              Open in Stripe ({stripeMode}) →
            </a>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--ink-4)",
                letterSpacing: "0.02em",
              }}
            >
              {row.stripe_session_id}
            </span>
          </div>
        </div>

        {/* CUSTOMER NOTES */}
        {row.notes ? (
          <div>
            <span className="overline">From the customer</span>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 17,
                lineHeight: 1.55,
                color: "var(--ink-2)",
                margin: "8px 0 0",
                whiteSpace: "pre-wrap",
              }}
            >
              {row.notes}
            </p>
          </div>
        ) : null}
      </section>

      {/* RIGHT — status + internal notes */}
      <aside
        style={{
          background: "var(--bone)",
          border: "1px solid var(--hairline)",
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          position: "sticky",
          top: 24,
        }}
      >
        <span className="overline">Workflow</span>
        <div
          style={{ height: 1, background: "var(--ink)", width: 28 }}
        />
        <form
          action={updateOrder}
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          <input type="hidden" name="id" value={row.id} />

          <label style={{ display: "block" }}>
            <span className="field-label">Status</span>
            <select
              name="status"
              defaultValue={row.status}
              style={{
                width: "100%",
                padding: "10px 12px",
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                border: "1px solid var(--hairline)",
                background: "var(--paper)",
                color: "var(--ink)",
                borderRadius: 2,
              }}
            >
              {ORDER_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {ORDER_STATUS_LABEL[s]}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "block" }}>
            <span className="field-label">Internal notes</span>
            <textarea
              name="internal_notes"
              defaultValue={row.internal_notes ?? ""}
              rows={6}
              placeholder="Rob-only. Build status, balance invoice ID, install date, anything to remember."
              style={{
                width: "100%",
                resize: "vertical",
                padding: 12,
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                color: "var(--ink)",
                background: "var(--paper)",
                border: "1px solid var(--hairline)",
                borderRadius: 2,
                outline: "none",
              }}
            />
          </label>

          <button
            type="submit"
            className="btn-primary"
            style={{ alignSelf: "flex-start", marginTop: 4 }}
          >
            Save
          </button>
        </form>
      </aside>
    </div>
  );
}

function DetailRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "100px 1fr",
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
          fontFamily: mono ? "var(--font-mono)" : "var(--font-serif)",
          fontSize: mono ? 14 : 17,
          color: "var(--ink)",
          lineHeight: 1.4,
        }}
      >
        {value}
      </span>
    </div>
  );
}
