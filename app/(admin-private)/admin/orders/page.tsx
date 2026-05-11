import Link from "next/link";
import { getAdminClient } from "@/lib/supabase";
import { STYLE_LABEL, DELIVERY_LABEL } from "@/lib/quote-schema";
import {
  ORDER_STATUS_LABEL,
  type OrderRow,
  type OrderStatus,
} from "@/lib/order-schema";

type ListRow = Pick<
  OrderRow,
  | "id"
  | "created_at"
  | "customer_name"
  | "customer_email"
  | "style"
  | "delivery"
  | "total_price_cents"
  | "deposit_paid_cents"
  | "status"
>;

const STATUS_TINT: Record<OrderStatus, { bg: string; fg: string }> = {
  deposit_paid: { bg: "var(--canvas)", fg: "var(--oxide-deep)" },
  in_build:     { bg: "var(--linen)",  fg: "var(--ink)" },
  ready:        { bg: "var(--bone)",   fg: "var(--moss)" },
  delivered:    { bg: "var(--bone)",   fg: "var(--ink-3)" },
  cancelled:    { bg: "var(--bone)",   fg: "var(--ink-4)" },
  refunded:     { bg: "var(--bone)",   fg: "var(--ink-4)" },
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

function dollars(cents: number): string {
  return `$${(cents / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export const metadata = { title: "Orders — Admin" };

export default async function AdminOrdersPage() {
  let rows: ListRow[] = [];
  let dbError: string | null = null;
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("orders")
      .select(
        "id, created_at, customer_name, customer_email, style, delivery, total_price_cents, deposit_paid_cents, status",
      )
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
        Couldn&apos;t load orders: {dbError}
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
        No orders yet. Paid deposits show up here automatically.
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
            <Th>Customer</Th>
            <Th>Cover</Th>
            <Th>Total</Th>
            <Th>Deposit</Th>
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
                style={{ borderBottom: "1px solid var(--hairline)" }}
              >
                <Td mono muted>
                  {formatDate(r.created_at)}
                </Td>
                <Td>
                  <div style={{ color: "var(--ink)" }}>
                    {r.customer_name ?? "—"}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--ink-3)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {r.customer_email ?? ""}
                  </div>
                </Td>
                <Td>
                  <div>{STYLE_LABEL[r.style]}</div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--ink-3)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {DELIVERY_LABEL[r.delivery]}
                  </div>
                </Td>
                <Td mono>{dollars(r.total_price_cents)}</Td>
                <Td mono>{dollars(r.deposit_paid_cents)}</Td>
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
                    {ORDER_STATUS_LABEL[r.status]}
                  </span>
                </Td>
                <Td>
                  <Link
                    href={`/admin/orders/${r.id}`}
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
