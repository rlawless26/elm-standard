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

function priceLabel(config: Config): string {
  if (!config.delivery) return "Configuring...";
  const base = config.delivery === "local" ? 400 : 300;
  const upcharge =
    config.screen === "Grecian, painted brass" ? 50 : 0;
  const total = base + upcharge;
  return `Estimated $${total}+ · final quote in 2 days`;
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
  return `mailto:hello@elmstandard.com?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(lines.join("\n"))}`;
}

type SubmitError = "generic" | "network" | "rate" | null;

export default function QuotePage() {
  const [config, setConfig] = useState<Config>(initialConfig);
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
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 48,
              fontWeight: 400,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
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
              href="mailto:hello@elmstandard.com"
              className="oxide-link"
              style={{ whiteSpace: "nowrap" }}
            >
              from hello@elmstandard.com
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
      {/* HERO */}
      <section style={{ padding: "96px 0 32px" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="overline">Build your cover</span>
          <div className="rule-strong" style={{ margin: "12px 0" }} />
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 56,
              fontWeight: 400,
              margin: 0,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Configure your cover.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 19,
              color: "var(--ink-2)",
              marginTop: 16,
              lineHeight: 1.55,
            }}
          >
            Pick a style, choose a screen, send me your dimensions, and tell
            me how you want it. I&apos;ll come back with a quote in two
            business days.
          </p>
        </div>
      </section>

      {/* CONFIGURATOR */}
      <section style={{ padding: "32px 0 96px" }}>
        <div className="container">
          <form onSubmit={onSubmit} className="quote-layout">
            {/* LEFT — STEPS */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 48,
              }}
            >
              {/* STEP 01 — STYLE */}
              <Step num="01" heading="Choose your style">
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
                            fontSize: 22,
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
              </Step>

              {/* STEP 02 — SCREEN */}
              <Step num="02" heading="Pick a screen">
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    color: "var(--ink-3)",
                    margin: "0 0 16px",
                  }}
                >
                  Steel screens are painted to match your cover. The brass
                  option is an upgrade.
                </p>
                <div className="card-grid-4">
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
                          }}
                        >
                          +${s.upcharge}
                        </span>
                      ) : null}
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
              </Step>

              {/* STEP 03 — PAINT */}
              <Step num="03" heading="Pick your paint color">
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    color: "var(--ink-3)",
                    margin: "0 0 16px",
                  }}
                >
                  Three Benjamin Moore whites. They cover most modern trim
                  — pick the one closest to yours, or send me a photo of
                  your trim and I&apos;ll match it.
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
                            fontSize: 20,
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
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    color: "var(--oxide)",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid var(--oxide)",
                    cursor: "pointer",
                    padding: "0 0 2px",
                    marginTop: 16,
                    alignSelf: "flex-start",
                    width: "fit-content",
                  }}
                >
                  Send a photo of your trim instead →
                </button>
              </Step>

              {/* STEP 04 — DIMENSIONS */}
              <Step num="04" heading="Radiator dimensions">
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    color: "var(--ink-3)",
                    margin: "0 0 16px",
                  }}
                >
                  Rough is fine — I&apos;ll measure the final dimensions in
                  person if you&apos;re local.{" "}
                  <Link href="/measure" className="oxide-link">
                    Need help measuring? Watch the 90-second guide →
                  </Link>
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 24,
                  }}
                >
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
              </Step>

              {/* STEP 05 — DELIVERY */}
              <Step num="05" heading="How do you want it?">
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
                      style={{ padding: 20 }}
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
                            fontSize: 20,
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
                          fontSize: 16,
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
              </Step>

              {/* STEP 06 — CONTACT */}
              <Step num="06" heading="About you">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 24,
                  }}
                >
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
                    Anything else? <span style={{ color: "var(--ink-4)" }}>(optional)</span>
                  </label>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      color: "var(--ink-3)",
                      margin: "0 0 8px",
                    }}
                  >
                    Pipes in odd places, window recess, tile floor, deadline
                    — anything I should know.
                  </p>
                  <textarea
                    value={config.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    rows={4}
                    placeholder="Optional"
                    style={{
                      width: "100%",
                      resize: "vertical",
                      border: "1px solid var(--hairline)",
                      background: "var(--bone)",
                      padding: 12,
                      fontFamily: "var(--font-sans)",
                      fontSize: 15,
                      color: "var(--ink)",
                      outline: "none",
                      borderRadius: 2,
                    }}
                  />
                </div>
              </Step>

              {/* HONEYPOT — hidden field bots fill in. Real users never see it. */}
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

              {/* SUBMIT FOOTER */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 24,
                  paddingTop: 24,
                  borderTop: "1px solid var(--hairline)",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--ink-3)",
                    maxWidth: 380,
                  }}
                >
                  Quote returned within 2 business days. No spam, no
                  follow-up loops.
                </span>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={submitting}
                  style={{ opacity: submitting ? 0.6 : 1 }}
                >
                  {submitting ? "Sending..." : "Request quote →"}
                </button>
              </div>
            </div>

            {/* RIGHT — SUMMARY */}
            <SummaryCard config={config} submitting={submitting} />
          </form>
        </div>
      </section>
    </main>
  );
}

function Step({
  num,
  heading,
  children,
}: {
  num: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{ display: "flex", flexDirection: "column", gap: 18 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          paddingBottom: 8,
          borderBottom: "1px solid var(--hairline)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--oxide)",
            letterSpacing: "0.08em",
          }}
        >
          STEP {num}
        </span>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 26,
            fontWeight: 400,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {heading}
        </h2>
      </div>
      {children}
    </section>
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

function SummaryCard({
  config,
  submitting,
}: {
  config: Config;
  submitting: boolean;
}) {
  const screen = SCREENS.find((s) => s.name === config.screen);
  const color = COLORS.find((c) => c.name === config.color);
  const style = STYLES.find((s) => s.name === config.style);
  const delivery = DELIVERY.find((d) => d.key === config.delivery);

  const dimsKnown =
    config.length || config.depth || config.height
      ? `${config.length || "?"}" × ${config.depth || "?"}" × ${config.height || "?"}"`
      : null;

  return (
    <aside
      className="quote-summary"
      style={{
        background: "var(--paper)",
        border: "1px solid var(--hairline)",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <span className="overline">Your cover</span>
      <div
        style={{ height: 1, background: "var(--ink)", width: 28 }}
      />

      {/* Live preview */}
      <div
        style={{
          background: "var(--bone)",
          border: "1px solid var(--hairline)",
          padding: 12,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {style ? (
          <Image
            src={style.img}
            alt={`${style.name} cover preview`}
            width={400}
            height={240}
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <div
            style={{
              aspectRatio: "5 / 3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--ink-4)",
              letterSpacing: "0.08em",
            }}
          >
            STYLE PREVIEW
          </div>
        )}
        {screen ? (
          <Image
            src={screen.img}
            alt={`${screen.name} screen swatch`}
            width={200}
            height={140}
            style={{ width: "100%", height: "auto" }}
          />
        ) : null}
      </div>

      {/* Spec list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          fontSize: 13,
        }}
      >
        <SpecRow
          label="Style"
          value={style ? style.name : "Not selected"}
          set={!!style}
        />
        <SpecRow
          label="Screen"
          value={
            screen ? `${screen.name} · ${screen.spec}` : "Not selected"
          }
          set={!!screen}
        />
        <SpecRow
          label="Color"
          value={
            color
              ? `${color.name} (${color.code})`
              : config.notes.includes("photo of my trim")
                ? "Trim photo to follow"
                : "Not selected"
          }
          set={!!color || config.notes.includes("photo of my trim")}
        />
        <SpecRow
          label="Size"
          value={dimsKnown ?? "Not entered"}
          set={!!dimsKnown}
        />
        <SpecRow
          label="Delivery"
          value={
            delivery
              ? delivery.key === "local"
                ? "Local install"
                : "Flat-pack"
              : "Not selected"
          }
          set={!!delivery}
        />
      </div>

      {/* Estimated price */}
      <div
        style={{
          paddingTop: 12,
          borderTop: "1px solid var(--hairline)",
          fontFamily: "var(--font-serif)",
          fontSize: 17,
          fontWeight: 500,
          color: "var(--ink)",
        }}
      >
        {priceLabel(config)}
      </div>

      {/* Mini CTA */}
      <button
        type="submit"
        className="btn-primary"
        disabled={submitting}
        style={{
          width: "100%",
          justifyContent: "center",
          opacity: submitting ? 0.6 : 1,
        }}
      >
        {submitting ? "Sending..." : "Request quote →"}
      </button>
    </aside>
  );
}

function SpecRow({
  label,
  value,
  set,
}: {
  label: string;
  value: string;
  set: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "72px 1fr",
        gap: 12,
        alignItems: "baseline",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--ink-3)",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 13,
          color: set ? "var(--ink)" : "var(--ink-4)",
          fontWeight: set ? 500 : 400,
          lineHeight: 1.4,
        }}
      >
        {value}
      </span>
    </div>
  );
}
