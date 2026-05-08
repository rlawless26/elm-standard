import Link from "next/link";

export const metadata = { title: "How it works — Elm Standard" };

type Step = {
  n: string;
  title: string;
  body: string;
  link?: { label: string; href: string };
};

const steps: Step[] = [
  {
    n: "01",
    title: "Measure",
    body: "I come to your home (local) or send a measuring guide (flat-pack). We capture length, height, depth, plus baseboards, valves, and pipe placement.",
    link: {
      label:
        "If you'd rather measure yourself, there's a 90-second video and a printable worksheet here →",
      href: "/measure",
    },
  },
  {
    n: "02",
    title: "Quote",
    body:
      "You get a one-page quote within two days: dimensions, style, finish, lead time, and price. No subscriptions, no upsells. 50% deposit holds your spot in the build queue.",
  },
  {
    n: "03",
    title: "Build",
    body:
      "Cut, sanded, primed, and finished in the Milton shop. Steel screen fitted by hand — brass available as an upgrade. Every cover gets the back-stamp before it leaves the bench.",
  },
  {
    n: "04",
    title: "Deliver",
    body:
      "Local: I deliver, level, and anchor it to the wall. About an hour on site.\nFlat-pack: panels ship pre-cut and pre-primed with hardware and a one-page assembly guide. About 30 minutes to assemble with a screwdriver.",
  },
];

export default function HowItWorksPage() {
  return (
    <main>
      <section style={{ padding: "96px 0 48px" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              maxWidth: 720,
            }}
          >
            <span className="overline">How it works</span>
            <div className="rule-strong" />
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 56,
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Four steps. About six weeks, start to finish.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 20,
                lineHeight: 1.55,
                color: "var(--ink-2)",
                margin: 0,
              }}
            >
              Most covers go from first measurement to installed in 4–6 weeks.
              Flat-pack ships in 2–3 weeks.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 0 96px" }}>
        <div
          className="container"
          style={{ display: "flex", flexDirection: "column", gap: 0 }}
        >
          {steps.map((s, i) => (
            <div
              key={s.n}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr 1fr",
                gap: 48,
                padding: "40px 0",
                borderTop: "1px solid var(--hairline)",
                borderBottom:
                  i === steps.length - 1 ? "1px solid var(--hairline)" : "none",
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  color: "var(--oxide)",
                  letterSpacing: "0.08em",
                }}
              >
                STEP {s.n}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 36,
                  fontWeight: 400,
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.title}
              </h3>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 18,
                    lineHeight: 1.55,
                    color: "var(--ink-2)",
                    margin: 0,
                    whiteSpace: "pre-line",
                  }}
                >
                  {s.body}
                </p>
                {s.link ? (
                  <Link
                    href={s.link.href}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      color: "var(--oxide)",
                      borderBottom: "1px solid var(--oxide)",
                      alignSelf: "flex-start",
                      paddingBottom: 2,
                      lineHeight: 1.4,
                    }}
                  >
                    {s.link.label}
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          padding: "64px 0 128px",
          background: "var(--paper)",
          borderTop: "1px solid var(--hairline)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 48,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 36,
                fontWeight: 400,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Got a radiator? Start with a quote.
            </h2>
          </div>
          <Link href="/quote" className="btn-primary">
            Get a quote
          </Link>
        </div>
      </section>
    </main>
  );
}
