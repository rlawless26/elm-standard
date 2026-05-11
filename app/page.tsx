import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Elm Standard — Custom radiator covers, handbuilt to fit",
};

const stylesPreview = [
  {
    name: "Traditional",
    tag: "decorative moulding & accents",
    img: "/style-traditional.svg",
    href: "/traditional",
  },
  {
    name: "Shaker",
    tag: "clean lines & flat panels",
    img: "/style-shaker.svg",
    href: "/shaker",
  },
  {
    name: "Modern",
    tag: "wide rails & minimalist style",
    img: "/style-modern.svg",
    href: "/modern",
  },
];

const valueProps: Array<[string, string]> = [
  [
    "Measured to fit",
    "I come to you, take the measurements myself, and account for trim, baseboards, and pipe placement.",
  ],
  [
    "Made to order",
    "Cut, sanded, and primed in my shop. The same person who measures it builds it.",
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
        className="mesh-ground section-pad-lg"
        style={{ padding: "64px 0 96px", background: "var(--bone)" }}
      >
        <div className="container r-grid-hero">
          <div
            style={{ display: "flex", flexDirection: "column", gap: 28 }}
          >
            <span className="overline">
              Custom radiator covers
            </span>
            <h1 className="display-hero">
              Radiator covers, handbuilt to fit.
            </h1>
            <p
              className="lead-fluid"
              style={{ maxWidth: 520 }}
            >
              Built to your radiator&apos;s exact size. Three styles, three
              screens, your trim color. Local delivery or flat-pack shipping.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 8, flexWrap: "wrap" }}>
              <a href="#styles" className="btn-primary">
                See the styles
              </a>
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
              <span>Traditional · panel moulding</span>
              <span>38&quot; × 8&quot; × 30&quot;</span>
            </div>
          </div>
        </div>
      </section>

      {/* THREE STYLES PREVIEW — each card is the entry into a real PDP */}
      <section
        id="styles"
        className="section-pad-lg"
        style={{
          padding: "96px 0",
          background: "var(--paper)",
          borderTop: "1px solid var(--hairline)",
          borderBottom: "1px solid var(--hairline)",
          scrollMarginTop: 88,
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
            <span className="overline">Three styles</span>
            <div className="rule-strong" />
            <h2
              className="display-h2"
              style={{ maxWidth: 720 }}
            >
              All the same materials. Pick the one that fits the room.
            </h2>
          </div>
          <div className="r-grid-3">
            {stylesPreview.map((s) => (
              <Link
                key={s.name}
                href={s.href}
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
                    {s.tag}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROP */}
      <section
        className="section-pad-lg"
        style={{ padding: "96px 0", background: "var(--bone)" }}
      >
        <div
          className="container r-grid-3"
          style={{ gap: 48 }}
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

      {/* GUARANTEE BAND */}
      <section
        className="mesh-ground section-pad-lg"
        style={{
          padding: "96px 0",
          background: "var(--canvas)",
          borderTop: "1px solid var(--hairline)",
          borderBottom: "1px solid var(--hairline)",
        }}
      >
        <div className="container r-flex-cta">
          <div style={{ maxWidth: 640 }}>
            <span className="overline">Made-to-fit guarantee</span>
            <h2 className="display-h2" style={{ marginTop: 12 }}>
              Built right — or rebuilt at no charge.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 18,
                color: "var(--ink-2)",
                marginTop: 12,
                lineHeight: 1.55,
              }}
            >
              If I measure your radiator and the cover doesn&apos;t fit, I
              rebuild it at no charge. Flat-pack panels are replaced free
              within 7 days of delivery if anything arrives damaged.{" "}
              <Link href="/refunds" className="oxide-link">
                Refund policy →
              </Link>
            </p>
          </div>
          <a href="#styles" className="btn-primary">
            See the styles →
          </a>
        </div>
      </section>
    </main>
  );
}
