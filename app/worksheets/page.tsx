import Link from "next/link";

export const metadata = { title: "Worksheets — Elm Standard" };

type Sheet = {
  n: "01" | "02" | "03";
  title: string;
  body: string;
  spec: string;
  pdf: string;
};

const sheets: Sheet[] = [
  {
    n: "01",
    title: "Standard radiator",
    body:
      "The five measurements covered in the measuring guide. For most cast-iron radiators with no major obstructions.",
    spec: "1 page · 8.5 × 11 · pencil-fillable",
    pdf: "/worksheets/elm-standard-worksheet-01-standard.pdf",
  },
  {
    n: "02",
    title: "Pipes and valves",
    body:
      "For radiators with side-supply pipes, front valves, or other plumbing that projects beyond the radiator body.",
    spec: "1 page · 8.5 × 11 · pencil-fillable",
    pdf: "/worksheets/elm-standard-worksheet-02-pipes-valves.pdf",
  },
  {
    n: "03",
    title: "Window recess and baseboard",
    body:
      "For radiators in window recesses, sitting on top of baseboards, or next to baseboard heat.",
    spec: "1 page · 8.5 × 11 · pencil-fillable",
    pdf: "/worksheets/elm-standard-worksheet-03-recess-baseboard.pdf",
  },
];

export default function WorksheetsPage() {
  return (
    <main>
      {/* HERO */}
      <section className="section-pad-lg" style={{ padding: "96px 0 48px" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="overline">Printables</span>
          <div className="rule-strong" style={{ margin: "12px 0" }} />
          <h1 className="display-h1">Print, measure, send.</h1>
          <p
            className="lead-fluid"
            style={{ marginTop: 20 }}
          >
            Three worksheets covering the most common radiator situations.
            Print, fill in with a pencil, and attach the photo to your quote
            request.
          </p>
        </div>
      </section>

      {/* THREE SHEETS */}
      <section className="section-pad-lg" style={{ padding: "32px 0 96px" }}>
        <div className="container r-grid-3">
          {sheets.map((s) => (
            <article
              key={s.n}
              className="card-lift"
              style={{
                background: "var(--paper)",
                border: "1px solid var(--hairline)",
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              <WorksheetThumb variant={s.n} />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
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
                  WORKSHEET {s.n}
                </span>
                <h3 className="display-h3">{s.title}</h3>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 16,
                    lineHeight: 1.55,
                    color: "var(--ink-2)",
                    margin: 0,
                  }}
                >
                  {s.body}
                </p>
              </div>

              <div style={{ height: 1, background: "var(--hairline)" }} />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
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
                  {s.spec}
                </span>
                <a
                  href={s.pdf}
                  download
                  className="btn-text"
                >
                  Download PDF →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* DON'T WANT TO PRINT */}
      <section
        className="section-pad-md"
        style={{
          padding: "64px 0",
          background: "var(--paper)",
          borderTop: "1px solid var(--hairline)",
          borderBottom: "1px solid var(--hairline)",
        }}
      >
        <div className="container r-grid-2" style={{ gap: 64 }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <span className="overline">Don&apos;t want to print?</span>
            <div className="rule-strong" />
            <h2 className="display-h2">
              Email me your measurements and a few photos.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 17,
                lineHeight: 1.55,
                color: "var(--ink-2)",
                margin: 0,
              }}
            >
              I'll convert them into a quote within two business days.
            </p>
          </div>
          <div
            style={{
              background: "var(--bone)",
              border: "1px solid var(--hairline)",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <span className="overline">Reach me</span>
            <div
              style={{ height: 1, background: "var(--ink)", width: 28 }}
            />
            <a
              href="mailto:rob@elmstandard.com"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 18,
                color: "var(--ink)",
              }}
            >
              rob@elmstandard.com
            </a>
            <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
              <Link href="/measure" className="btn-outline">
                Read the guide
              </Link>
              <Link href="/quote" className="btn-primary">
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Architectural shop-drawing thumbnail per worksheet variant. */
function WorksheetThumb({ variant }: { variant: "01" | "02" | "03" }) {
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "8.5 / 11",
        width: "100%",
        background: "var(--bone)",
        border: "1px solid var(--hairline)",
        boxShadow: "inset 0 0 0 1px rgba(31,27,22,0.02)",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 340 440"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* sheet header rule */}
        <line x1="20" y1="32" x2="320" y2="32" stroke="#1F1B16" strokeWidth="1" />
        <text
          x="20"
          y="24"
          fontFamily="JetBrains Mono, monospace"
          fontSize="8"
          fill="#6B6052"
          letterSpacing="1.4"
        >
          ELM STANDARD · WORKSHEET {variant}
        </text>
        <text
          x="320"
          y="24"
          textAnchor="end"
          fontFamily="JetBrains Mono, monospace"
          fontSize="8"
          fill="#6B6052"
          letterSpacing="1.2"
        >
          8.5 × 11
        </text>

        {variant === "01" ? <StandardRadiator /> : null}
        {variant === "02" ? <PipesValves /> : null}
        {variant === "03" ? <RecessBaseboard /> : null}

        {/* footer rule + form fields */}
        <line x1="20" y1="380" x2="320" y2="380" stroke="#D9D0BD" strokeWidth="1" />
        <FieldRow x={20} y={395} label="LENGTH" />
        <FieldRow x={125} y={395} label="DEPTH" />
        <FieldRow x={230} y={395} label="HEIGHT" />
        <FieldRow x={20} y={420} label="ZIP" />
        <FieldRow x={125} y={420} label="STYLE" />
        <FieldRow x={230} y={420} label="DATE" />
      </svg>
    </div>
  );
}

function FieldRow({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <text
        x={x}
        y={y - 8}
        fontFamily="JetBrains Mono, monospace"
        fontSize="7"
        fill="#6B6052"
        letterSpacing="1"
      >
        {label}
      </text>
      <line
        x1={x}
        y1={y}
        x2={x + 90}
        y2={y}
        stroke="#1F1B16"
        strokeWidth="0.8"
      />
    </g>
  );
}

function StandardRadiator() {
  return (
    <g>
      <rect x="80" y="120" width="180" height="180" fill="none" stroke="#1F1B16" strokeWidth="1" />
      {Array.from({ length: 8 }, (_, i) => (
        <line
          key={i}
          x1={80 + 22 + i * 19}
          y1="125"
          x2={80 + 22 + i * 19}
          y2="295"
          stroke="#1F1B16"
          strokeWidth="0.5"
          opacity="0.6"
        />
      ))}
      <line x1="40" y1="320" x2="300" y2="320" stroke="#1F1B16" strokeWidth="1" />
      <rect x="40" y="310" width="40" height="10" fill="none" stroke="#1F1B16" strokeWidth="0.6" />
      <rect x="260" y="310" width="40" height="10" fill="none" stroke="#1F1B16" strokeWidth="0.6" />

      <DimH y={100} x1={80} x2={260} label="①  L" />
      <DimV x={280} y1={120} y2={320} label="③  H" />
      <DimH y={340} x1={80} x2={120} label="②  D" />
      <DimH y={358} x1={40} x2={80} label="④" />
      <DimV x={60} y1={120} y2={300} label="⑤" rotate />

      <text x="20" y="58" fontFamily="Petrona, Georgia, serif" fontSize="14" fill="#1F1B16">
        Standard radiator
      </text>
      <text x="20" y="74" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#6B6052" letterSpacing="0.8">
        FIVE-MEASUREMENT WORKSHEET
      </text>
    </g>
  );
}

function PipesValves() {
  return (
    <g>
      <rect x="100" y="130" width="160" height="160" fill="none" stroke="#1F1B16" strokeWidth="1" />
      {Array.from({ length: 7 }, (_, i) => (
        <line
          key={i}
          x1={100 + 18 + i * 19}
          y1="135"
          x2={100 + 18 + i * 19}
          y2="285"
          stroke="#1F1B16"
          strokeWidth="0.5"
          opacity="0.6"
        />
      ))}
      <line x1="260" y1="160" x2="295" y2="160" stroke="#1F1B16" strokeWidth="1.4" />
      <circle cx="295" cy="160" r="4" fill="none" stroke="#1F1B16" strokeWidth="1" />
      <line x1="100" y1="240" x2="60" y2="240" stroke="#1F1B16" strokeWidth="1.4" />
      <circle cx="60" cy="240" r="4" fill="none" stroke="#1F1B16" strokeWidth="1" />
      <rect x="172" y="290" width="16" height="20" fill="none" stroke="#1F1B16" strokeWidth="1" />
      <line x1="180" y1="310" x2="180" y2="325" stroke="#1F1B16" strokeWidth="1" />
      <line x1="40" y1="325" x2="300" y2="325" stroke="#1F1B16" strokeWidth="1" />

      <DimH y={110} x1={100} x2={260} label="⑥  RAD L" />
      <DimH y={354} x1={60} x2={295} label="⑦  PIPE → PIPE" />
      <DimV x={50} y1={240} y2={325} label="⑧  PIPE H" rotate />

      <text x="20" y="58" fontFamily="Petrona, Georgia, serif" fontSize="14" fill="#1F1B16">
        Pipes and valves
      </text>
      <text x="20" y="74" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#6B6052" letterSpacing="0.8">
        SIDE-SUPPLY · FRONT VALVE WORKSHEET
      </text>
    </g>
  );
}

function RecessBaseboard() {
  return (
    <g>
      <path
        d="M 40 110 L 40 300 L 80 300 L 80 130 L 280 130 L 280 300 L 320 300 L 320 110 Z"
        fill="none"
        stroke="#1F1B16"
        strokeWidth="1"
      />
      <rect x="100" y="160" width="160" height="120" fill="none" stroke="#1F1B16" strokeWidth="1" />
      {Array.from({ length: 7 }, (_, i) => (
        <line
          key={i}
          x1={100 + 18 + i * 19}
          y1="165"
          x2={100 + 18 + i * 19}
          y2="275"
          stroke="#1F1B16"
          strokeWidth="0.5"
          opacity="0.6"
        />
      ))}
      <rect x="285" y="290" width="30" height="10" fill="none" stroke="#1F1B16" strokeWidth="0.7" />
      {Array.from({ length: 6 }, (_, i) => (
        <line
          key={i}
          x1={287 + i * 5}
          y1="291"
          x2={287 + i * 5}
          y2="299"
          stroke="#1F1B16"
          strokeWidth="0.5"
        />
      ))}
      <line x1="40" y1="305" x2="320" y2="305" stroke="#1F1B16" strokeWidth="1" />

      <DimH y={100} x1={40} x2={320} label="⑨  RECESS W" />
      <DimH y={335} x1={285} x2={315} label="⑩  BB HEAT" />
      <DimV x={30} y1={110} y2={305} label="⑪  RECESS H" rotate />

      <text x="20" y="58" fontFamily="Petrona, Georgia, serif" fontSize="14" fill="#1F1B16">
        Window recess + baseboard
      </text>
      <text x="20" y="74" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#6B6052" letterSpacing="0.8">
        RECESS · BB-HEAT WORKSHEET
      </text>
    </g>
  );
}

function DimH({
  y,
  x1,
  x2,
  label,
}: {
  y: number;
  x1: number;
  x2: number;
  label: string;
}) {
  return (
    <g stroke="#8C3A2A" strokeWidth="0.7">
      <line x1={x1} y1={y} x2={x2} y2={y} />
      <line x1={x1} y1={y - 4} x2={x1} y2={y + 4} />
      <line x1={x2} y1={y - 4} x2={x2} y2={y + 4} />
      <text
        x={(x1 + x2) / 2}
        y={y - 4}
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="7"
        fill="#8C3A2A"
        letterSpacing="0.6"
        stroke="none"
      >
        {label}
      </text>
    </g>
  );
}

function DimV({
  x,
  y1,
  y2,
  label,
  rotate,
}: {
  x: number;
  y1: number;
  y2: number;
  label: string;
  rotate?: boolean;
}) {
  const cy = (y1 + y2) / 2;
  return (
    <g stroke="#8C3A2A" strokeWidth="0.7">
      <line x1={x} y1={y1} x2={x} y2={y2} />
      <line x1={x - 4} y1={y1} x2={x + 4} y2={y1} />
      <line x1={x - 4} y1={y2} x2={x + 4} y2={y2} />
      <text
        x={x + (rotate ? -8 : 6)}
        y={cy}
        fontFamily="JetBrains Mono, monospace"
        fontSize="7"
        fill="#8C3A2A"
        letterSpacing="0.6"
        stroke="none"
        transform={rotate ? `rotate(-90 ${x - 8} ${cy})` : ""}
      >
        {label}
      </text>
    </g>
  );
}
