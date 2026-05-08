import Link from "next/link";
import { getAdminClient } from "@/lib/supabase";
import {
  DELIVERY_LABEL,
  STATUS_LABEL,
  STYLE_LABEL,
  type DeliveryCode,
  type QuoteStatus,
  type StyleCode,
} from "@/lib/quote-schema";

type ListRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  style: StyleCode;
  delivery: DeliveryCode;
  status: QuoteStatus;
};

const STATUS_TINT: Record<QuoteStatus, { bg: string; fg: string }> = {
  new: { bg: "var(--canvas)", fg: "var(--oxide-deep)" },
  quoted: { bg: "var(--linen)", fg: "var(--ink)" },
  accepted: { bg: "var(--bone)", fg: "var(--moss)" },
  in_build: { bg: "var(--bone)", fg: "var(--ink)" },
  delivered: { bg: "var(--bone)", fg: "var(--ink-3)" },
  cancelled: { bg: "var(--bone)", fg: "var(--ink-4)" },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function AdminListPage() {
  let rows: ListRow[] = [];
  let dbError: string | null = null;
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("quote_requests")
      .select("id, created_at, name, email, style, delivery, status")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) {
      dbError = error.message;
    } else {
      rows = (data ?? []) as ListRow[];
    }
  } catch (e) {
    dbError = e instanceof Error ? e.message : String(e);
  }

  if (dbError) {
    return (
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          color: "var(--oxide)",
        }}
      >
        Couldn&apos;t load quotes: {dbError}
      </p>
    );
  }

  if (rows.length === 0) {
    return (
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 17,
          color: "var(--ink-3)",
        }}
      >
        No quotes yet.
      </p>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "var(--font-sans)",
          fontSize: 14,
        }}
      >
        <thead>
          <tr
            style={{
              textAlign: "left",
              borderBottom: "1px solid var(--hairline)",
            }}
          >
            <Th>Created</Th>
            <Th>Name</Th>
            <Th>Style</Th>
            <Th>Delivery</Th>
            <Th>Status</Th>
            <Th />
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const tint = STATUS_TINT[r.status];
            return (
              <tr
                key={r.id}
                style={{
                  borderBottom: "1px solid var(--hairline)",
                }}
              >
                <Td mono muted>
                  {formatDate(r.created_at)}
                </Td>
                <Td>
                  <div style={{ color: "var(--ink)" }}>{r.name}</div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--ink-3)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {r.email}
                  </div>
                </Td>
                <Td>{STYLE_LABEL[r.style]}</Td>
                <Td>{DELIVERY_LABEL[r.delivery]}</Td>
                <Td>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "3px 8px",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      background: tint.bg,
                      color: tint.fg,
                      border: "1px solid var(--hairline)",
                      borderRadius: 2,
                    }}
                  >
                    {STATUS_LABEL[r.status]}
                  </span>
                </Td>
                <Td>
                  <Link
                    href={`/admin/${r.id}`}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      color: "var(--oxide)",
                      borderBottom: "1px solid var(--oxide)",
                    }}
                  >
                    Open →
                  </Link>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p
        style={{
          marginTop: 16,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--ink-4)",
          letterSpacing: "0.04em",
        }}
      >
        SHOWING UP TO 100 MOST RECENT
      </p>
    </div>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return (
    <th
      style={{
        padding: "12px 12px 12px 0",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--ink-3)",
      }}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  mono,
  muted,
}: {
  children?: React.ReactNode;
  mono?: boolean;
  muted?: boolean;
}) {
  return (
    <td
      style={{
        padding: "14px 12px 14px 0",
        verticalAlign: "top",
        fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
        fontSize: mono ? 12 : 14,
        color: muted ? "var(--ink-3)" : "var(--ink)",
      }}
    >
      {children}
    </td>
  );
}
