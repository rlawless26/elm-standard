"use client";

import { useState } from "react";
import Link from "next/link";

type FormState = {
  name: string;
  email: string;
  zip: string;
  length: string;
  width: string;
  height: string;
  style: "Traditional" | "Shaker" | "Modern" | "Not sure yet";
  channel: "local" | "flat";
  notes: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  zip: "",
  length: "",
  width: "",
  height: "",
  style: "Traditional",
  channel: "local",
  notes: "",
};

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

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
            Got it. I'll be in touch within two days.
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
            I'll review your dimensions and send back a one-page quote with lead
            time and price. If anything's unclear, I'll email you first.
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
      <section style={{ padding: "96px 0 32px" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <span className="overline">Quote request</span>
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
            Tell me about your radiator.
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
            A few details and rough measurements. I'll come back with a quote
            within two days.
          </p>
        </div>
      </section>

      <section style={{ padding: "32px 0 128px" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 32,
              background: "var(--paper)",
              border: "1px solid var(--hairline)",
              padding: 48,
            }}
          >
            <FormSection num="01" title="About you">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 24,
                }}
              >
                <Field
                  label="Your name"
                  value={form.name}
                  onChange={(v) => update("name", v)}
                  placeholder="Jane Quincy"
                />
                <Field
                  label="Email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  placeholder="jane@example.com"
                />
              </div>
              <Field
                label="Zip code"
                value={form.zip}
                onChange={(v) => update("zip", v)}
                placeholder="02186"
                mono
              />
            </FormSection>

            <FormSection num="02" title="Radiator dimensions">
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  color: "var(--ink-3)",
                  margin: 0,
                }}
              >
                Rough is fine — I'll measure the final dimensions in person if
                you're local.{" "}
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
                  label="Length"
                  value={form.length}
                  onChange={(v) => update("length", v)}
                  placeholder='38.0"'
                  mono
                />
                <Field
                  label="Depth"
                  value={form.width}
                  onChange={(v) => update("width", v)}
                  placeholder='8.5"'
                  mono
                />
                <Field
                  label="Height"
                  value={form.height}
                  onChange={(v) => update("height", v)}
                  placeholder='30.0"'
                  mono
                />
              </div>
            </FormSection>

            <FormSection num="03" title="Style preference">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 14,
                }}
              >
                {(
                  ["Traditional", "Shaker", "Modern", "Not sure yet"] as const
                ).map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => update("style", s)}
                    style={{
                      background:
                        form.style === s ? "var(--ink)" : "transparent",
                      color:
                        form.style === s ? "var(--paper)" : "var(--ink)",
                      border: "1.5px solid var(--ink)",
                      padding: "16px 12px",
                      borderRadius: 2,
                      fontFamily: "var(--font-sans)",
                      fontSize: 15,
                      fontWeight: 500,
                      letterSpacing: "0.04em",
                      cursor: "pointer",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </FormSection>

            <FormSection num="04" title="How would you like it?">
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <ChannelRadio
                  active={form.channel === "local"}
                  onClick={() => update("channel", "local")}
                  title="Local install — Greater Boston"
                  body="I measure, build, deliver, and install. From $400."
                  spec="incl. install"
                />
                <ChannelRadio
                  active={form.channel === "flat"}
                  onClick={() => update("channel", "flat")}
                  title="Flat-pack — ships nationally"
                  body="Pre-cut, pre-primed panels with hardware. From $300."
                  spec="incl. shipping"
                />
              </div>
            </FormSection>

            <FormSection num="05" title="Anything else?">
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  color: "var(--ink-3)",
                  margin: 0,
                }}
              >
                Pipes in odd places, window recess, tile floor, custom paint
                color — anything I should know.
              </p>
              <textarea
                value={form.notes}
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
            </FormSection>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 24,
                paddingTop: 16,
                borderTop: "1px solid var(--hairline)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--ink-3)",
                }}
              >
                Quote returned within 2 business days. No spam, no follow-up
                loops.
              </span>
              <button type="submit" className="btn-primary">
                Request quote →
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

function FormSection({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
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
          {num}
        </span>
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 22,
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  mono,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  mono?: boolean;
}) {
  return (
    <label style={{ display: "block" }}>
      <span className="field-label">{label}</span>
      <input
        className={"field-input" + (mono ? " mono" : "")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function ChannelRadio({
  active,
  onClick,
  title,
  body,
  spec,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  body: string;
  spec: string;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "grid",
        gridTemplateColumns: "24px 1fr auto",
        gap: 16,
        alignItems: "center",
        padding: 18,
        background: active ? "var(--linen)" : "transparent",
        border: "1.5px solid " + (active ? "var(--ink)" : "var(--hairline)"),
        cursor: "pointer",
        transition: "background 120ms, border-color 120ms",
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: "1.5px solid var(--ink)",
          background: active ? "var(--ink)" : "transparent",
          boxShadow: active ? "inset 0 0 0 3px var(--linen)" : "none",
        }}
      />
      <div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 15,
            color: "var(--ink-3)",
            marginTop: 2,
          }}
        >
          {body}
        </div>
      </div>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--ink-3)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {spec}
      </span>
    </div>
  );
}
