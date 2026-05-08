/**
 * Types, code maps, and validation for quote_requests.
 * The form holds human labels ("Traditional", "Grecian, painted brass").
 * The DB stores kebab-case codes ('traditional', 'grecian-brass').
 * Translation lives here so the API and the admin UI agree on the mapping.
 */

export const QUOTE_STATUSES = [
  "new",
  "quoted",
  "accepted",
  "in_build",
  "delivered",
  "cancelled",
] as const;
export type QuoteStatus = (typeof QUOTE_STATUSES)[number];

export type StyleCode = "traditional" | "shaker" | "modern";
export type ScreenCode =
  | "grecian"
  | "cloverleaf"
  | "windsor"
  | "grecian-brass";
export type PaintCode =
  | "super-white"
  | "paper-white"
  | "chantilly-lace"
  | "custom";
export type DeliveryCode = "local" | "flatpack";

export type QuoteRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  zip_code: string;
  style: StyleCode;
  screen: ScreenCode;
  paint_color: PaintCode;
  length_in: number;
  depth_in: number;
  height_in: number;
  delivery: DeliveryCode;
  notes: string | null;
  status: QuoteStatus;
  internal_notes: string | null;
};

export type QuoteInsert = Omit<
  QuoteRow,
  "id" | "created_at" | "status" | "internal_notes"
>;

// Form labels → DB codes
export const STYLE_TO_CODE: Record<string, StyleCode> = {
  Traditional: "traditional",
  Shaker: "shaker",
  Modern: "modern",
};
export const SCREEN_TO_CODE: Record<string, ScreenCode> = {
  Grecian: "grecian",
  Cloverleaf: "cloverleaf",
  Windsor: "windsor",
  "Grecian, painted brass": "grecian-brass",
};
export const COLOR_TO_CODE: Record<string, PaintCode> = {
  "Super White": "super-white",
  "Paper White": "paper-white",
  "Chantilly Lace": "chantilly-lace",
};
export const DELIVERY_TO_CODE: Record<string, DeliveryCode> = {
  local: "local",
  flat: "flatpack",
};

// Reverse maps for admin UI + email body
export const STYLE_LABEL: Record<StyleCode, string> = {
  traditional: "Traditional",
  shaker: "Shaker",
  modern: "Modern",
};
export const SCREEN_LABEL: Record<ScreenCode, string> = {
  grecian: "Grecian (steel painted to match)",
  cloverleaf: "Cloverleaf (steel painted to match)",
  windsor: "Windsor (steel painted to match)",
  "grecian-brass": "Grecian, painted brass",
};
export const COLOR_LABEL: Record<PaintCode, string> = {
  "super-white": "Super White (Benjamin Moore OC-152)",
  "paper-white": "Paper White (Benjamin Moore OC-55)",
  "chantilly-lace": "Chantilly Lace (Benjamin Moore OC-65)",
  custom: "Custom — trim photo to follow",
};
export const DELIVERY_LABEL: Record<DeliveryCode, string> = {
  local: "Local install (Greater Boston)",
  flatpack: "Flat-pack — ships nationally",
};
export const STATUS_LABEL: Record<QuoteStatus, string> = {
  new: "New",
  quoted: "Quoted",
  accepted: "Accepted",
  in_build: "In build",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export type ValidatedResult =
  | { ok: true; data: QuoteInsert }
  | { ok: false; errors: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trimStr(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function parseDim(v: unknown): number | null {
  const s = typeof v === "string" ? v.trim() : v;
  if (typeof s !== "string" || s === "") return null;
  // Strip a trailing inch mark if the user typed one
  const cleaned = s.replace(/[\s"”]+$/g, "");
  const n = Number.parseFloat(cleaned);
  if (!Number.isFinite(n)) return null;
  return n;
}

export function validateQuotePayload(input: unknown): ValidatedResult {
  if (!input || typeof input !== "object") {
    return { ok: false, errors: { _form: "Invalid request body." } };
  }
  const raw = input as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const name = trimStr(raw.name);
  if (!name) errors.name = "Name is required.";
  else if (name.length > 120) errors.name = "Name is too long.";

  const email = trimStr(raw.email);
  if (!email) errors.email = "Email is required.";
  else if (email.length > 160) errors.email = "Email is too long.";
  else if (!EMAIL_RE.test(email)) errors.email = "Email looks invalid.";

  const zip = trimStr(raw.zip);
  if (!zip) errors.zip = "Zip code is required.";
  else if (zip.length < 3 || zip.length > 10)
    errors.zip = "Zip code looks invalid.";

  const styleLabel = trimStr(raw.style);
  const style = STYLE_TO_CODE[styleLabel];
  if (!style) errors.style = "Pick a style.";

  const screenLabel = trimStr(raw.screen);
  const screen = SCREEN_TO_CODE[screenLabel];
  if (!screen) errors.screen = "Pick a screen.";

  const colorLabel = trimStr(raw.color);
  const paintMapped = colorLabel ? COLOR_TO_CODE[colorLabel] : undefined;
  const paint_color: PaintCode = paintMapped ?? "custom";

  const length_in = parseDim(raw.length);
  const depth_in = parseDim(raw.depth);
  const height_in = parseDim(raw.height);
  if (length_in === null || length_in <= 0 || length_in >= 200)
    errors.length = "Length looks off.";
  if (depth_in === null || depth_in <= 0 || depth_in >= 200)
    errors.depth = "Depth looks off.";
  if (height_in === null || height_in <= 0 || height_in >= 200)
    errors.height = "Height looks off.";

  const deliveryLabel = trimStr(raw.delivery);
  const delivery = DELIVERY_TO_CODE[deliveryLabel];
  if (!delivery) errors.delivery = "Pick a delivery method.";

  let notes: string | null = null;
  if (typeof raw.notes === "string") {
    const t = raw.notes.trim();
    if (t.length > 2000) errors.notes = "Notes are too long.";
    notes = t || null;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      zip_code: zip,
      style: style!,
      screen: screen!,
      paint_color,
      length_in: length_in!,
      depth_in: depth_in!,
      height_in: height_in!,
      delivery: delivery!,
      notes,
    },
  };
}

export function renderEmailBody(
  data: QuoteInsert,
  id: string,
  siteUrl: string,
): string {
  const dims = `${data.length_in}" × ${data.depth_in}" × ${data.height_in}"`;
  const lines = [
    "— Cover configuration —",
    `Style:    ${STYLE_LABEL[data.style]}`,
    `Screen:   ${SCREEN_LABEL[data.screen]}`,
    `Color:    ${COLOR_LABEL[data.paint_color]}`,
    `Size:     ${dims}`,
    `Delivery: ${DELIVERY_LABEL[data.delivery]}`,
    "",
    "— Contact —",
    `Name:  ${data.name}`,
    `Email: ${data.email}`,
    `Zip:   ${data.zip_code}`,
    "",
  ];
  if (data.notes) {
    lines.push("— Notes —", data.notes, "");
  }
  lines.push(`View in admin: ${siteUrl.replace(/\/$/, "")}/admin/${id}`);
  return lines.join("\n");
}
