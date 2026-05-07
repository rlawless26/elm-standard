import Link from "next/link";

export const metadata = { title: "Tip safety — Elm Standard" };

const cpscBullets = [
  "Anchor furniture to the wall, every time",
  "Don't store anything attractive (toys, remotes, snacks) on top of the cover",
  "Keep cords from radiators or TVs out of reach",
  "Supervise young children in rooms where furniture isn't anchored",
];

export default function SafetyPage() {
  return (
    <main>
      {/* HERO */}
      <section style={{ padding: "96px 0 48px" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="overline">Safety</span>
          <div className="rule-strong" style={{ margin: "12px 0" }} />
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
            Anchored to the wall. Stable on the floor.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 20,
              lineHeight: 1.55,
              color: "var(--ink-2)",
              margin: "24px 0 0",
            }}
          >
            Every Elm Standard cover that's installed locally gets anchored to
            the wall. Every flat-pack ships with the hardware to do the same.
            Furniture that tips over hurts kids, and a radiator cover with a
            child climbing on it is no different.
          </p>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section style={{ padding: "64px 0" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              maxWidth: 720,
              marginBottom: 32,
            }}
          >
            <span className="overline">What's included</span>
            <div className="rule-strong" />
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 36,
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Two channels. Same hardware story.
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
            }}
          >
            <ChannelCard
              spec="LOCAL INSTALL"
              title="I anchor it for you"
              body="I anchor your cover to wall studs at the time of install. If your wall isn't drywall over studs — for example, plaster, brick, or a half-wall — I'll let you know what we'll need before installing."
            />
            <ChannelCard
              spec="FLAT-PACK"
              title="Hardware ships in the box"
              body="Every shipment includes wall-anchor hardware sized for standard drywall and stud construction. The included guide walks through installation. If you have plaster, brick, or another wall type, contact me before installing — you'll need different hardware."
            />
          </div>
        </div>
      </section>

      {/* CPSC PULL QUOTE */}
      <section
        style={{
          padding: "96px 0",
          background: "var(--paper)",
          borderTop: "1px solid var(--hairline)",
          borderBottom: "1px solid var(--hairline)",
        }}
      >
        <div className="container" style={{ maxWidth: 900 }}>
          <span className="overline">From the CPSC</span>
          <div className="rule-strong" style={{ margin: "12px 0 32px" }} />

          <figure
            style={{
              margin: 0,
              padding: "24px 0 24px 32px",
              borderLeft: "1.5px solid var(--ink)",
            }}
          >
            <blockquote
              style={{
                margin: 0,
                fontFamily: "var(--font-serif)",
                fontSize: 36,
                fontWeight: 400,
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
              }}
            >
              A child is sent to the emergency room every{" "}
              <span style={{ color: "var(--oxide)" }}>24 minutes</span> by
              tipping furniture or a falling television. The most reliable
              prevention is anchoring.
            </blockquote>
            <figcaption
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--ink-3)",
                marginTop: 24,
                letterSpacing: "0.06em",
              }}
            >
              U.S. CONSUMER PRODUCT SAFETY COMMISSION
            </figcaption>
          </figure>

          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 18,
              lineHeight: 1.6,
              color: "var(--ink-2)",
              margin: "48px 0 16px",
            }}
          >
            Their recommendations apply to radiator covers as much as any other
            piece of furniture:
          </p>

          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {cpscBullets.map((b, i) => (
              <li
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr",
                  gap: 16,
                  padding: "16px 0",
                  borderTop: "1px solid var(--hairline)",
                  borderBottom:
                    i === cpscBullets.length - 1
                      ? "1px solid var(--hairline)"
                      : "none",
                  alignItems: "baseline",
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
                  0{i + 1}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 18,
                    lineHeight: 1.5,
                    color: "var(--ink)",
                  }}
                >
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHEN TO CALL ME */}
      <section style={{ padding: "96px 0" }}>
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: 64,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <span className="overline">When to call me</span>
            <div className="rule-strong" />
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 36,
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              I'd rather talk through it than have you install something that
              won't hold.
            </h2>
          </div>
          <aside
            style={{
              background: "var(--canvas)",
              border: "1px solid var(--hairline)",
              padding: 32,
              display: "flex",
              flexDirection: "column",
              gap: 18,
              boxShadow: "var(--sh-1)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--oxide)",
                letterSpacing: "0.10em",
              }}
            >
              FLAT-PACK · WALL FEELS WRONG?
            </span>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 18,
                lineHeight: 1.6,
                color: "var(--ink-2)",
                margin: 0,
              }}
            >
              If you're installing a flat-pack and the wall doesn't feel right
              — drywall that's loose, no studs where you expected them,
              plaster that's crumbling — stop and email me.
            </p>
            <div style={{ height: 1, background: "var(--hairline)" }} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <a
                href="mailto:hello@elmstandard.co"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 16,
                  color: "var(--ink)",
                }}
              >
                hello@elmstandard.co
              </a>
              <a href="mailto:hello@elmstandard.co" className="btn-text">
                Email →
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* EXTERNAL RESOURCES */}
      <section
        style={{
          padding: "64px 0",
          background: "var(--linen)",
          borderTop: "1px solid var(--hairline)",
          borderBottom: "1px solid var(--hairline)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              maxWidth: 720,
              marginBottom: 24,
            }}
          >
            <span className="overline">External resources</span>
            <div className="rule-strong" />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
            }}
          >
            <ExternalLink
              href="https://www.anchorit.gov/"
              kicker="ANCHORIT.GOV"
              title="CPSC's furniture anchoring program"
              host="anchorit.gov"
            />
            <ExternalLink
              href="https://www.cpsc.gov/Safety-Education/Safety-Education-Centers/Tip-Over-Information-Center"
              kicker="CPSC"
              title="Tip-Over Information Center"
              host="cpsc.gov"
            />
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section style={{ padding: "64px 0", background: "var(--bone)" }}>
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 48,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 32,
                fontWeight: 400,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Anchoring is the price of safe furniture. Every cover gets it.
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

function ChannelCard({
  spec,
  title,
  body,
}: {
  spec: string;
  title: string;
  body: string;
}) {
  return (
    <article
      style={{
        background: "var(--paper)",
        border: "1px solid var(--hairline)",
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        boxShadow: "var(--sh-1)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--oxide)",
          letterSpacing: "0.10em",
        }}
      >
        {spec}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 26,
          fontWeight: 400,
          margin: 0,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>
      <div style={{ height: 1, background: "var(--hairline)" }} />
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 16,
          lineHeight: 1.6,
          color: "var(--ink-2)",
          margin: 0,
        }}
      >
        {body}
      </p>
    </article>
  );
}

function ExternalLink({
  href,
  kicker,
  title,
  host,
}: {
  href: string;
  kicker: string;
  title: string;
  host: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="external-card"
      style={{
        border: "1px solid var(--hairline)",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        textDecoration: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--oxide)",
            letterSpacing: "0.10em",
          }}
        >
          {kicker}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 14,
            color: "var(--ink)",
          }}
        >
          ↗
        </span>
      </div>
      <h4
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 22,
          fontWeight: 400,
          margin: 0,
          letterSpacing: "-0.01em",
          color: "var(--ink)",
        }}
      >
        {title}
      </h4>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--ink-3)",
        }}
      >
        {host}
      </span>
    </a>
  );
}
