"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type StyleName = "Traditional" | "Shaker" | "Modern";
type ScreenName =
  | "Grecian"
  | "Cloverleaf"
  | "Windsor"
  | "Grecian, painted brass";
type ColorName = "Super White" | "Paper White" | "Chantilly Lace";
type DeliveryKey = "local" | "flat";

type Config = {
  style: StyleName | null;
  screen: ScreenName | null;
  color: ColorName | null;
  length: string;
  depth: string;
  height: string;
  delivery: DeliveryKey | null;
  name: string;
  email: string;
  zip: string;
  notes: string;
};

const initialConfig: Config = {
  style: null,
  screen: null,
  color: null,
  length: "",
  depth: "",
  height: "",
  delivery: null,
  name: "",
  email: "",
  zip: "",
  notes: "",
};

const STYLES: Array<{
  name: StyleName;
  tag: string;
  img: string;
}> = [
  {
    name: "Traditional",
    tag: "Decorative moulding & accents",
    img: "/style-traditional.svg",
  },
  {
    name: "Shaker",
    tag: "Clean lines & flat panels",
    img: "/style-shaker.svg",
  },
  {
    name: "Modern",
    tag: "Wide rails & minimalist style",
    img: "/style-modern.svg",
  },
];

const SCREENS: Array<{
  name: ScreenName;
  spec: string;
  img: string;
  upcharge?: number;
}> = [
  {
    name: "Grecian",
    spec: "Steel · painted to match",
    img: "/screen-grecian.svg",
  },
  {
    name: "Cloverleaf",
    spec: "Steel · painted to match",
    img: "/screen-cloverleaf.svg",
  },
  {
    name: "Windsor",
    spec: "Steel · painted to match",
    img: "/screen-windsor.svg",
  },
  {
    name: "Grecian, painted brass",
    spec: "Steel · brass finish",
    img: "/screen-grecian-brass.svg",
    upcharge: 50,
  },
];

const COLORS: Array<{
  name: ColorName;
  code: string;
  hex: string;
}> = [
  { name: "Super White", code: "Benjamin Moore OC-152", hex: "#FBFBF6" },
  { name: "Paper White", code: "Benjamin Moore OC-55", hex: "#F2EDE2" },
  { name: "Chantilly Lace", code: "Benjamin Moore OC-65", hex: "#F0EFE5" },
];

const DELIVERY: Array<{
  key: DeliveryKey;
  name: string;
  body: string;
  from: number;
  tag: string;
}> = [
  {
    key: "local",
    name: "Local install — Greater Boston",
    body:
      "I measure, build, deliver, and install. About an hour on site.",
    from: 400,
    tag: "incl. install",
  },
  {
    key: "flat",
    name: "Flat-pack — ships nationally",
    body:
      "Pre-cut, pre-primed panels with hardware and a one-page assembly guide. About 30 minutes to assemble.",
    from: 300,
    tag: "incl. shipping",
  },
];

const PHOTO_NOTE_PREFILL = "I'll send a photo of my trim color.";

const GALLERY: Array<{ src: string; alt: string }> = [
  {
    src: "/radiator-cover-isometric.png",
    alt: "Radiator cover, isometric view",
  },
  { src: "/style-traditional.svg", alt: "Traditional cover, front elevation" },
  { src: "/style-shaker.svg", alt: "Shaker cover, front elevation" },
  { src: "/style-modern.svg", alt: "Modern cover, front elevation" },
];

function priceLabel(config: Config): string {
  if (!config.delivery) return "Configure to see your estimate";
  const base = config.delivery === "local" ? 400 : 300;
  const upcharge =
    config.screen === "Grecian, painted brass" ? 50 : 0;
  const total = base + upcharge;
  return `From $${total} · final quote in 2 days`;
}

function buildupSpec(config: Config): string {
  const parts: string[] = [];
  if (config.style) parts.push(`${config.style} cover`);
  const dims = [config.length, config.depth, config.height];
  if (dims.every(Boolean)) parts.push(`${dims.join('" × ')}"`);
  if (config.color) parts.push(config.color);
  if (config.delivery) {
    parts.push(config.delivery === "local" ? "local install" : "flat-pack");
  }
  return parts.length ? parts.join(" · ") : "Your configuration";
}

function buildMailto(config: Config): string {
  const subject = `New quote request — ${config.name || "Unknown"} — ${
    config.style ?? "(no style)"
  }`;
  const dimensions = [config.length, config.depth, config.height]
    .map((v) => v || "?")
    .join('" × ');
  const delivery =
    config.delivery === "local"
      ? "Local install"
      : config.delivery === "flat"
        ? "Flat-pack"
        : "(not selected)";

  const lines = [
    "— Cover configuration —",
    `Style:    ${config.style ?? "(not selected)"}`,
    `Screen:   ${config.screen ?? "(not selected)"}`,
    `Color:    ${config.color ?? "(not selected)"}`,
    `Size:     ${dimensions}"`,
    `Delivery: ${delivery}`,
    "",
    "— Contact —",
    `Name:  ${config.name}`,
    `Email: ${config.email}`,
    `Zip:   ${config.zip}`,
    "",
  ];
  if (config.notes) {
    lines.push("— Notes —", config.notes);
  }
  return `mailto:rob@elmstandard.com?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(lines.join("\n"))}`;
}

type SubmitError = "generic" | "network" | "rate" | null;

export default function QuotePage() {
  const [config, setConfig] = useState<Config>(initialConfig);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<SubmitError>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");

  const update = <K extends keyof Config>(k: K, v: Config[K]) =>
    setConfig((c) => ({ ...c, [k]: v }));

  const useTrimPhoto = () => {
    setConfig((c) => ({
      ...c,
      color: null,
      notes: c.notes ? c.notes : PHOTO_NOTE_PREFILL,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...config, company: honeypot }),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok: boolean; errors?: Record<string, string>; error?: string }
        | null;

      if (res.status === 429) {
        setError("rate");
        setSubmitting(false);
        return;
      }
      if (res.status === 400 && json?.errors) {
        setFieldErrors(json.errors);
        setSubmitting(false);
        return;
      }
      if (!res.ok || !json?.ok) {
        setError("generic");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("network");
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main style={{ padding: "128px 0", minHeight: "60vh" }}>
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
          <span className="overline">Quote requested</span>
          <div className="rule-strong" />
          <h1 className="display-h1">
            Got it. I&apos;ll be in touch within two days.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 19,
              color: "var(--ink-2)",
              margin: 0,
              lineHeight: 1.55,
            }}
          >
            I&apos;ll come back with a one-page quote within two business
            days. If anything&apos;s unclear, I&apos;ll email{" "}
            <a
              href="mailto:rob@elmstandard.com"
              className="oxide-link"
              style={{ whiteSpace: "nowrap" }}
            >
              from rob@elmstandard.com
            </a>{" "}
            first.
          </p>
          <Link href="/" className="btn-outline">
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* THIN STRIP — overline, no big hero */}
      <section style={{ padding: "48px 0 24px" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <span className="overline">Build your cover</span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--ink-4)",
                letterSpacing: "0.04em",
              }}
            >
              ·
            </span>
            <span
              className="overline"
              style={{ color: "var(--ink-3)", fontWeight: 400 }}
            >
              Custom · Milton, MA
            </span>
          </div>
        </div>
      </section>

      {/* PDP — gallery left, configurator right */}
      <section style={{ paddingBottom: 96 }}>
        <div className="container">
          <form onSubmit={onSubmit} className="quote-layout">
            {/* LEFT — GALLERY */}
            <div className="quote-gallery">
              <div className="gallery-hero">
                <Image
                  src={GALLERY[galleryIndex].src}
                  alt={GALLERY[galleryIndex].alt}
                  width={720}
                  height={540}
                  priority
                />
              </div>
              <div className="gallery-thumbs">
                {GALLERY.map((g, i) => (
                  <button
                    type="button"
                    key={g.src}
                    onClick={() => setGalleryIndex(i)}
                    data-selected={galleryIndex === i}
                    aria-label={`View ${g.alt}`}
                    className="gallery-thumb"
                  >
                    <Image src={g.src} alt="" width={120} height={90} />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT — CONFIGURATOR */}
            <div className="quote-config">
              {/* TITLE */}
              <div className="config-title">
                <h1 className="display-h2" style={{ marginBottom: 0 }}>
                  Made-to-fit radiator cover.
                </h1>
                <p
                  className="lead-fluid"
                  style={{ fontSize: "clamp(1rem, 0.4vw + 0.95rem, 1.125rem)" }}
                >
                  Three styles, three screens, your color. Built to your
                  radiator&apos;s exact dimensions.
                </p>
              </div>

              {/* STYLE */}
              <div className="config-section">
                <span className="overline">Style</span>
                <div className="card-grid-3">
                  {STYLES.map((s) => (
                    <button
                      type="button"
                      key={s.name}
                      onClick={() => update("style", s.name)}
                      data-selected={config.style === s.name}
                      className="select-card"
                    >
                      <div
                        style={{
                          background: "var(--bone)",
                          border: "1px solid var(--hairline)",
                          padding: 12,
                        }}
                      >
                        <Image
                          src={s.img}
                          alt={`${s.name} radiator cover elevation`}
                          width={400}
                          height={240}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: 18,
                            fontWeight: 400,
                            letterSpacing: "-0.01em",
                            color: "var(--ink)",
                          }}
                        >
                          {s.name}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            color: "var(--ink-3)",
                            letterSpacing: "0.04em",
                            marginTop: 4,
                          }}
                        >
                          {s.tag}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* SCREEN */}
              <div className="config-section">
                <span className="overline">Screen</span>
                <p className="config-help">
                  Steel screens are painted to match your cover. The brass
                  option is an upgrade.
                </p>
                <div className="card-grid-3">
                  {SCREENS.map((s) => (
                    <button
                      type="button"
                      key={s.name}
                      onClick={() => update("screen", s.name)}
                      data-selected={config.screen === s.name}
                      className="select-card"
                    >
                      {s.upcharge ? (
                        <span
                          style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            background: "var(--ink)",
                            color: "var(--paper)",
                            padding: "3px 6px",
                            borderRadius: 2,
                            letterSpacing: "0.04em",
                            zIndex: 1,
                          }}
                        >
                          +${s.upcharge}
                        </span>
                      ) : null}
                      <div
                        style={{
                          background: "var(--bone)",
                          border: "1px solid var(--hairline)",
                          padding: 12,
                        }}
                      >
                        <Image
                          src={s.img}
                          alt={`${s.name} screen pattern swatch`}
                          width={200}
                          height={140}
                          style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                          }}
                        />
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: 18,
                            fontWeight: 400,
                            letterSpacing: "-0.01em",
                            color: "var(--ink)",
                            lineHeight: 1.2,
                          }}
                        >
                          {s.name}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            color: "var(--ink-3)",
                            letterSpacing: "0.04em",
                            marginTop: 4,
                          }}
                        >
                          {s.spec}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* PAINT */}
              <div className="config-section">
                <span className="overline">Paint color</span>
                <p className="config-help">
                  Three Benjamin Moore whites. Pick the one closest to your
                  trim, or send me a photo and I&apos;ll match it.
                </p>
                <div className="card-grid-3">
                  {COLORS.map((c) => (
                    <button
                      type="button"
                      key={c.name}
                      onClick={() => update("color", c.name)}
                      data-selected={config.color === c.name}
                      className="select-card"
                    >
                      <div
                        style={{
                          aspectRatio: "1.6 / 1",
                          width: "100%",
                          background: c.hex,
                          border: "1px solid var(--hairline)",
                          borderRadius: 2,
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: 18,
                            fontWeight: 400,
                            letterSpacing: "-0.01em",
                            color: "var(--ink)",
                          }}
                        >
                          {c.name}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            color: "var(--ink-3)",
                            letterSpacing: "0.04em",
                            marginTop: 4,
                          }}
                        >
                          {c.code}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={useTrimPhoto}
                  className="trim-photo-link"
                >
                  Send a photo of your trim instead →
                </button>
              </div>

              {/* DIMENSIONS */}
              <div className="config-section">
                <span className="overline">Radiator dimensions</span>
                <p className="config-help">
                  Rough is fine — I&apos;ll measure the final dimensions in
                  person if you&apos;re local.{" "}
                  <Link href="/measure" className="oxide-link">
                    Need help? Watch the 90-second guide →
                  </Link>
                </p>
                <div className="r-grid-3" style={{ gap: 24 }}>
                  <Field
                    label="Length (in)"
                    value={config.length}
                    onChange={(v) => update("length", v)}
                    placeholder="38.0"
                    mono
                  />
                  <Field
                    label="Depth (in)"
                    value={config.depth}
                    onChange={(v) => update("depth", v)}
                    placeholder="8.5"
                    mono
                  />
                  <Field
                    label="Height (in)"
                    value={config.height}
                    onChange={(v) => update("height", v)}
                    placeholder="30.0"
                    mono
                  />
                </div>
              </div>

              {/* DELIVERY */}
              <div className="config-section">
                <span className="overline">Delivery</span>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {DELIVERY.map((d) => (
                    <button
                      type="button"
                      key={d.key}
                      onClick={() => update("delivery", d.key)}
                      data-selected={config.delivery === d.key}
                      className="select-card"
                      style={{ padding: 18 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          gap: 16,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: 18,
                            fontWeight: 400,
                            letterSpacing: "-0.01em",
                            color: "var(--ink)",
                          }}
                        >
                          {d.name}
                        </div>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            color: "var(--ink-3)",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {d.tag}
                        </span>
                      </div>
                      <p
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: 15,
                          color: "var(--ink-2)",
                          lineHeight: 1.55,
                          margin: 0,
                        }}
                      >
                        {d.body} From ${d.from}.
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* CONTACT */}
              <div className="config-section">
                <span className="overline">About you</span>
                <div className="r-grid-2" style={{ gap: 24 }}>
                  <Field
                    label="Your name"
                    value={config.name}
                    onChange={(v) => update("name", v)}
                    placeholder="Jane Quincy"
                    required
                  />
                  <Field
                    label="Email"
                    value={config.email}
                    onChange={(v) => update("email", v)}
                    placeholder="jane@example.com"
                    required
                    type="email"
                  />
                </div>
                <Field
                  label="Zip code"
                  value={config.zip}
                  onChange={(v) => update("zip", v)}
                  placeholder="02186"
                  mono
                />
                <div>
                  <label
                    className="field-label"
                    style={{ display: "block" }}
                  >
                    Anything else?{" "}
                    <span style={{ color: "var(--ink-4)" }}>(optional)</span>
                  </label>
                  <textarea
                    value={config.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    rows={3}
                    placeholder="Pipes in odd places, window recess, tile floor, deadline — anything I should know."
                    className="config-textarea"
                  />
                </div>
              </div>

              {/* HONEYPOT */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: -9999,
                  width: 1,
                  height: 1,
                  overflow: "hidden",
                }}
              >
                <label>
                  Company (leave blank)
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </label>
              </div>

              {Object.keys(fieldErrors).length > 0 ? (
                <div
                  style={{
                    background: "var(--paper)",
                    border: "1px solid var(--oxide)",
                    padding: 16,
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    color: "var(--ink)",
                    lineHeight: 1.5,
                  }}
                  role="alert"
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--oxide)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    A few things to fix
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {Object.values(fieldErrors).map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {error ? (
                <div
                  style={{
                    background: "var(--paper)",
                    border: "1px solid var(--oxide)",
                    padding: 16,
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    color: "var(--ink)",
                    lineHeight: 1.5,
                  }}
                  role="alert"
                >
                  {error === "rate" ? (
                    <>
                      One submission per minute, please. Wait a moment and try
                      again.
                    </>
                  ) : (
                    <>
                      Something broke on my end. Try again in a minute, or
                      email me directly with your details:{" "}
                      <a
                        href={buildMailto(config)}
                        className="oxide-link"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        send via email →
                      </a>
                    </>
                  )}
                </div>
              ) : null}

              {/* CHECKOUT BLOCK — build-up + CTA + trust band */}
              <div className="config-checkout">
                <div className="config-buildup">
                  <span className="config-buildup-spec">
                    {buildupSpec(config)}
                  </span>
                  <div className="config-buildup-price">
                    {priceLabel(config)}
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn-primary config-cta"
                  disabled={submitting}
                  style={{ opacity: submitting ? 0.6 : 1 }}
                >
                  {submitting ? "Sending..." : "Request quote →"}
                </button>
                <div className="trust-band">
                  ✓ Measured to fit · ✓ Built in Milton, MA · ✓ Quote in 2
                  days
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  mono,
  required,
  type,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  mono?: boolean;
  required?: boolean;
  type?: string;
}) {
  return (
    <label style={{ display: "block" }}>
      <span className="field-label">{label}</span>
      <input
        className={"field-input" + (mono ? " mono" : "")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        type={type ?? "text"}
      />
    </label>
  );
}
