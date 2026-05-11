import type {
  StyleCode,
  ScreenCode,
  PaintCode,
  DeliveryCode,
} from "@/lib/quote-schema";

export const ORDER_STATUSES = [
  "deposit_paid",
  "in_build",
  "ready",
  "delivered",
  "cancelled",
  "refunded",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  deposit_paid: "Deposit paid",
  in_build: "In build",
  ready: "Ready",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

export type OrderRow = {
  id: string;
  created_at: string;
  stripe_session_id: string;
  stripe_payment_intent: string | null;
  total_price_cents: number;
  deposit_paid_cents: number;
  balance_due_cents: number;
  customer_email: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  shipping_line1: string | null;
  shipping_line2: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_postal_code: string | null;
  shipping_country: string | null;
  style: StyleCode;
  screen: ScreenCode;
  paint_color: PaintCode | null;
  length_in: number;
  depth_in: number;
  height_in: number;
  delivery: DeliveryCode;
  notes: string | null;
  status: OrderStatus;
  internal_notes: string | null;
};

export function formatAddress(row: {
  shipping_line1: string | null;
  shipping_line2: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_postal_code: string | null;
}): string | null {
  const lines: string[] = [];
  if (row.shipping_line1) lines.push(row.shipping_line1);
  if (row.shipping_line2) lines.push(row.shipping_line2);
  const cityLine = [row.shipping_city, row.shipping_state]
    .filter(Boolean)
    .join(", ");
  const cityZip = [cityLine, row.shipping_postal_code]
    .filter(Boolean)
    .join(" ");
  if (cityZip) lines.push(cityZip);
  return lines.length ? lines.join("\n") : null;
}
