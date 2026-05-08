import { notFound } from "next/navigation";
import { getAdminClient } from "@/lib/supabase";
import {
  COLOR_LABEL,
  DELIVERY_LABEL,
  QUOTE_STATUSES,
  SCREEN_LABEL,
  STATUS_LABEL,
  STYLE_LABEL,
  type QuoteRow,
} from "@/lib/quote-schema";
import { updateQuote } from "./actions";

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

export default async function AdminQuoteDetail({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;

  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from("quote_requests")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const row = data as QuoteRow;
  const dims = `${row.length_in}" × ${row.depth_in}" × ${row.height_in}"`;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
        gap: 48,
        alignItems: "flex-start",
      }}
    >
      {/* LEFT — read-only configuration */}
      <section
        style={{ display: "flex", flexDirection: "column", gap: 24 }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: 6 }}
        >
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
            {row.name}
          </h2>
          <a
            href={`mailto:${row.email}?subject=${encodeURIComponent("Re: your quote")}`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              color: "var(--oxide)",
              borderBottom: "1px solid var(--oxide)",
              alignSelf: "flex-start",
              paddingBottom: 2,
            }}
          >
            {row.email} · reply →
          </a>
        </div>

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
          <DetailRow label="Style" value={STYLE_LABEL[row.style]} />
          <DetailRow label="Screen" value={SCREEN_LABEL[row.screen]} />
          <DetailRow label="Color" value={COLOR_LABEL[row.paint_color]} />
          <DetailRow label="Size" value={dims} mono />
          <DetailRow label="Delivery" value={DELIVERY_LABEL[row.delivery]} />
          <DetailRow label="Zip" value={row.zip_code} mono />
        </div>

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
          action={updateQuote}
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
              {QUOTE_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABEL[s]}
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
              placeholder="Rob-only. HoneyBook ID, deposit status, anything to remember."
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
          fontFamily: mono
            ? "var(--font-mono)"
            : "var(--font-serif)",
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
