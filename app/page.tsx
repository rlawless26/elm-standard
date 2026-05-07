import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Elm Standard — Custom radiator covers, handbuilt in Milton, MA",
};

const stylesPreview = [
  {
    name: "Traditional",
    tag: "panel mold frame",
    img: "/style-traditional.svg",
  },
  {
    name: "Shaker",
    tag: "clean rails, no mold",
    img: "/style-shaker.svg",
  },
  {
    name: "Modern",
    tag: "wide rails, minimal",
    img: "/style-modern.svg",
  },
];

const valueProps: Array<[string, string]> = [
  [
    "Measured to fit",
    "I come to you, take the measurements myself, and account for trim, baseboards, and pipe placement.",
  ],
  [
    "One pair of hands",
    "Cut, sanded, and primed in my Milton shop. The same person who measures it builds it.",
  ],
  [
    "Two ways to buy",
    "Local install across Greater Boston, or flat-pack panels shipped anywhere in the US.",
  ],
];

export default function HomePage() {
  return (
    <main>
      {/* HERO — mesh-dot ground references the brass mesh of the covers */}
      <section
        className="mesh-ground"
        style={{ padding: "64px 0 96px", background: "var(--bone)" }}
      >
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: 28 }}
          >
            <span className="overline">
              Custom radiator covers · Milton, MA
            </span>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 64,
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                margin: 0,
              }}
            >
              Built to your radiator.
              <br />
              <span style={{ color: "var(--ink-3)" }}>
                Delivered, leveled, installed.
              </span>
            </h1>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 20,
                lineHeight: 1.6,
                color: "var(--ink-2)",
                maxWidth: 520,
                margin: 0,
              }}
            >
              I handcraft custom radiator covers in painted MDF with brass mesh
              and ogee panel mold. Three styles. Every one sized to your room.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
              <Link href="/quote" className="btn-primary">
                Get a quote
              </Link>
              <Link href="/styles" className="btn-outline">
                See the styles
              </Link>
            </div>
          </div>
          <div
            style={{
              background: "var(--paper)",
              border: "1px solid var(--hairline)",
              padding: 32,
              boxShadow:
                "0 1px 0 rgba(31,27,22,0.04), 0 12px 28px rgba(31,27,22,0.06)",
            }}
          >
            <Image
              src="/radiator-cover-isometric.png"
              alt="Isometric drawing of an Elm Standard traditional radiator cover"
              width={800}
              height={600}
              priority
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <div
              style={{
                marginTop: 16,
                paddingTop: 16,
                borderTop: "1px solid var(--hairline)",
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--ink-3)",
              }}
            >
              <span>Traditional · panel mold</span>
              <span>38&quot; × 8&quot; × 30&quot;</span>
            </div>
          </div>
        </div>
      </section>

      {/* THREE STYLES PREVIEW */}
      <section
        style={{
          padding: "96px 0",
          background: "var(--paper)",
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
              marginBottom: 48,
            }}
          >
            <span className="overline">Three styles, one shop</span>
            <div className="rule-strong" />
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 40,
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: 0,
                maxWidth: 720,
              }}
            >
              All the same materials. Pick the one that fits the room.
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {stylesPreview.map((s) => (
              <Link
                key={s.name}
                href="/styles"
                className="card-lift"
                style={{
                  background: "var(--bone)",
                  border: "1px solid var(--hairline)",
                  padding: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div
                  style={{
                    background: "var(--paper)",
                    border: "1px solid var(--hairline)",
                    padding: 16,
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
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 26,
                      margin: 0,
                      fontWeight: 400,
                    }}
                  >
                    {s.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "var(--ink-3)",
                    }}
                  >
                    {s.tag} · from $400
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROP */}
      <section style={{ padding: "96px 0", background: "var(--bone)" }}>
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 48,
          }}
        >
          {valueProps.map(([h, p]) => (
            <div
              key={h}
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              <div
                style={{ width: 28, height: 1.5, background: "var(--ink)" }}
              />
              <h4
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 20,
                  fontWeight: 500,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                {h}
              </h4>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: "var(--ink-2)",
                  margin: 0,
                }}
              >
                {p}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section
        className="mesh-ground"
        style={{
          padding: "96px 0",
          background: "var(--canvas)",
          borderTop: "1px solid var(--hairline)",
          borderBottom: "1px solid var(--hairline)",
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
                fontSize: 44,
                fontWeight: 400,
                margin: 0,
                color: "var(--ink)",
                letterSpacing: "-0.02em",
              }}
            >
              Ready for a cover that fits?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 18,
                color: "var(--ink-2)",
                marginTop: 12,
                margin: 0,
              }}
            >
              Tell me about your radiator. I&apos;ll have a quote back to you
              within two days.
            </p>
          </div>
          <Link href="/quote" className="btn-primary">
            Get a quote →
          </Link>
        </div>
      </section>
    </main>
  );
}
