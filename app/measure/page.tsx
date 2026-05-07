import Link from "next/link";

export const metadata = { title: "Measure your radiator — Elm Standard" };

const supplies = [
  "A steel tape measure (cloth tapes stretch — they'll cost you a quarter inch)",
  "A pencil",
  "The printable worksheet",
  "A flashlight if your radiator is in a tight corner",
  "About ten minutes",
];

const steps = [
  {
    n: "01",
    title: "Length",
    body:
      "Pull your tape from one end of the radiator to the other. If pipes or valves stick out the sides, include them in the measurement. Round up to the nearest quarter inch.",
    spec: 'A → B · ¼" up',
  },
  {
    n: "02",
    title: "Depth",
    body:
      "Measure from the wall to the deepest point on the front of the radiator. Usually this is the front face, but check for pipes that might project further.",
    spec: "wall → front",
  },
  {
    n: "03",
    title: "Height",
    body:
      "Floor to the top of the radiator. If the floor isn't level (old houses), measure at the high spot.",
    spec: "floor → top",
  },
  {
    n: "04",
    title: "Distance to baseboard",
    body:
      "How far does the radiator sit from the nearest baseboard? The cover's base will need to clear it or sit against it cleanly. If the radiator is mounted on top of the baseboard, note that too.",
    spec: "rad → baseboard",
  },
  {
    n: "05",
    title: "Side clearance",
    body:
      'How much wall space do you have to either side of the radiator? Window casings, walls, electrical outlets, anything that limits how wide the cover can be. I usually want at least ¾" of breathing room each side.',
    spec: '≥ ¾" each side',
  },
];

const complications: Array<[string, string]> = [
  [
    "Side pipes",
    "Measure how far they project from the radiator and how high they sit off the floor.",
  ],
  ["Front valve", "Note the height off the floor."],
  [
    "Window recess",
    "Measure the recess too, including its depth.",
  ],
  [
    "Baseboard heat next to the radiator",
    "Measure the gap and the baseboard heat unit.",
  ],
  [
    "Tile or uneven floor",
    "Note it — I may need to add toe-kick clearance.",
  ],
];

export default function MeasurePage() {
  return (
    <main>
      {/* HERO */}
      <section style={{ padding: "96px 0 48px" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              maxWidth: 820,
            }}
          >
            <span className="overline">Measuring guide</span>
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
              Five measurements. Ten minutes. The cover only fits if these are
              right.
            </h1>
          </div>
        </div>
      </section>

      {/* INTRO + SUPPLIES — two column */}
      <section style={{ padding: "32px 0 64px" }}>
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 64,
            alignItems: "flex-start",
          }}
        >
          <div
            className="prose"
            style={{ display: "flex", flexDirection: "column", gap: 18 }}
          >
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 20,
                lineHeight: 1.6,
                color: "var(--ink-2)",
                margin: 0,
              }}
            >
              Every Elm Standard cover is built to the dimensions you provide.
              There's no stock, no "close enough." That makes accurate
              measurements the most important part of the order — for both of
              us.
            </p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 18,
                lineHeight: 1.65,
                color: "var(--ink-2)",
                margin: 0,
              }}
            >
              If you're local, I'll come measure for you. If you're ordering
              flat-pack, this guide and the printable worksheet are how we get
              it right the first time.
            </p>
          </div>
          <aside
            style={{
              background: "var(--paper)",
              border: "1px solid var(--hairline)",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <span className="overline">What you'll need</span>
            <div
              style={{ height: 1, background: "var(--ink)", width: 28 }}
            />
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {supplies.map((s, i) => (
                <li
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "24px 1fr",
                    gap: 10,
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "var(--oxide)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 16,
                      lineHeight: 1.5,
                      color: "var(--ink-2)",
                    }}
                  >
                    {s}
                    {i === 2 ? (
                      <Link
                        href="/worksheets"
                        className="oxide-link"
                        style={{ marginLeft: 6, whiteSpace: "nowrap" }}
                      >
                        download PDF →
                      </Link>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* VIDEO — placeholder 16:9 */}
      <section
        style={{
          padding: "64px 0",
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
              marginBottom: 32,
            }}
          >
            <span className="overline">Watch the video</span>
            <div className="rule-strong" />
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 36,
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Ninety seconds. Five measurements. One radiator.
            </h2>
          </div>

          <VideoPlaceholder />

          <div
            style={{
              marginTop: 16,
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--ink-3)",
              paddingTop: 12,
              borderTop: "1px solid var(--hairline)",
            }}
          >
            <span>Rob, in the shop · 16:9</span>
            <span>00:00 / 01:30</span>
          </div>
        </div>
      </section>

      {/* THE FIVE MEASUREMENTS */}
      <section style={{ padding: "96px 0 48px" }}>
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
            <span className="overline">The five measurements</span>
            <div className="rule-strong" />
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 40,
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Take them in order. Write them down. Photograph the radiator.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {steps.map((s, i) => (
              <div
                key={s.n}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr 1fr 180px",
                  gap: 48,
                  padding: "36px 0",
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
                    fontSize: 32,
                    fontWeight: 400,
                    margin: 0,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 17,
                    lineHeight: 1.55,
                    color: "var(--ink-2)",
                    margin: 0,
                  }}
                >
                  {s.body}
                </p>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--ink-3)",
                    letterSpacing: "0.04em",
                    textAlign: "right",
                    whiteSpace: "nowrap",
                  }}
                >
                  {s.spec}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLICATIONS CALLOUT */}
      <section
        style={{
          padding: "64px 0",
          background: "var(--linen)",
          borderTop: "1px solid var(--hairline)",
          borderBottom: "1px solid var(--hairline)",
        }}
      >
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: 64,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              position: "sticky",
              top: 96,
            }}
          >
            <span className="overline">Pipes, valves, complications</span>
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
              Most radiators have at least one. None of them are dealbreakers
              — I just need to know about them.
            </h2>
          </div>
          <div
            style={{
              background: "var(--bone)",
              border: "1px solid var(--hairline)",
              padding: 0,
            }}
          >
            {complications.map(([title, body], i) => (
              <div
                key={title}
                style={{
                  display: "grid",
                  gridTemplateColumns: "32px 1fr",
                  gap: 16,
                  padding: "20px 24px",
                  borderBottom:
                    i === complications.length - 1
                      ? "none"
                      : "1px solid var(--hairline)",
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--oxide)",
                    letterSpacing: "0.06em",
                  }}
                >
                  0{i + 1}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 15,
                      fontWeight: 500,
                      color: "var(--ink)",
                      marginBottom: 4,
                    }}
                  >
                    {title}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 16,
                      lineHeight: 1.5,
                      color: "var(--ink-2)",
                      margin: 0,
                    }}
                  >
                    {body}
                  </p>
                </div>
              </div>
            ))}
            <div
              style={{
                padding: "20px 24px",
                borderTop: "1.5px solid var(--ink)",
                background: "var(--paper)",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <span
                className="overline"
                style={{ color: "var(--oxide)" }}
              >
                When in doubt
              </span>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 16,
                  lineHeight: 1.5,
                  color: "var(--ink-2)",
                  margin: 0,
                }}
              >
                Photograph the radiator from three angles (straight on, from
                each side) and include the photos with your quote request. A
                picture answers a lot of questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHEN IN DOUBT, ASK */}
      <section style={{ padding: "96px 0" }}>
        <div
          className="container"
          style={{
            maxWidth: 720,
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <span className="overline">When in doubt, ask</span>
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
            I'd rather chat for five minutes now than rebuild a cover later.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 18,
              lineHeight: 1.6,
              color: "var(--ink-2)",
              margin: 0,
            }}
          >
            If anything looks tricky — pipes in unusual places, baseboard heat
            next to it, a tile floor that may need extra clearance — send me a
            photo before you measure.
          </p>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 16,
              color: "var(--ink)",
              marginTop: 8,
            }}
          >
            <a href="mailto:hello@elmstandard.co">hello@elmstandard.co</a>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section
        style={{
          padding: "64px 0",
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
              Print, measure, and send.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 17,
                color: "var(--ink-2)",
                marginTop: 8,
                margin: 0,
              }}
            >
              Worksheets cover the most common radiator situations.
              Pencil-fillable, one page each.
            </p>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <Link href="/worksheets" className="btn-outline">
              Print the worksheet (PDF) →
            </Link>
            <Link href="/quote" className="btn-primary">
              Get a quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function VideoPlaceholder() {
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "16 / 9",
        width: "100%",
        background: "var(--bone)",
        border: "1px solid var(--hairline)",
        boxShadow:
          "0 1px 0 rgba(31,27,22,0.04), 0 12px 28px rgba(31,27,22,0.06)",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <pattern
            id="meshDots"
            x="0"
            y="0"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="7" cy="7" r="1.1" fill="#1F1B16" opacity="0.10" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="1600" height="900" fill="url(#meshDots)" />
        <rect
          x="48"
          y="48"
          width="1504"
          height="804"
          fill="none"
          stroke="#D9D0BD"
          strokeWidth="1"
        />
        {([
          [48, 48],
          [1552, 48],
          [48, 852],
          [1552, 852],
        ] as Array<[number, number]>).map(([x, y], i) => (
          <g key={i} stroke="#1F1B16" strokeWidth="1">
            <line x1={x - 12} y1={y} x2={x + 12} y2={y} />
            <line x1={x} y1={y - 12} x2={x} y2={y + 12} />
          </g>
        ))}
        <g stroke="#A89E8B" strokeWidth="0.8">
          <line x1="48" y1="24" x2="1552" y2="24" />
          <line x1="48" y1="18" x2="48" y2="30" />
          <line x1="1552" y1="18" x2="1552" y2="30" />
        </g>
        <text
          x="800"
          y="18"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="14"
          fill="#6B6052"
          letterSpacing="2"
        >
          90 SEC · ROB IN THE SHOP
        </text>
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <button
          aria-label="Play measuring video"
          className="play-button"
          style={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            border: "1.5px solid var(--ink)",
            background: "var(--paper)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow:
              "0 1px 0 rgba(31,27,22,0.04), 0 8px 24px rgba(31,27,22,0.08)",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M5 3.5 L18 11 L5 18.5 Z" fill="var(--oxide)" />
          </svg>
        </button>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--ink-3)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Measuring guide · 01:30
        </div>
      </div>
    </div>
  );
}
