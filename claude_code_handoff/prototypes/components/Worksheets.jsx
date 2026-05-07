function Worksheets({ setRoute }) {
  const sheets = [
    {
      n: '01', title: 'Standard radiator',
      body: 'The five measurements covered in the measuring guide. For most cast-iron radiators with no major obstructions.',
      spec: '1 page · 8.5 × 11 · pencil-fillable',
    },
    {
      n: '02', title: 'Pipes and valves',
      body: 'For radiators with side-supply pipes, front valves, or other plumbing that projects beyond the radiator body.',
      spec: '1 page · 8.5 × 11 · pencil-fillable',
    },
    {
      n: '03', title: 'Window recess and baseboard',
      body: 'For radiators in window recesses, sitting on top of baseboards, or next to baseboard heat.',
      spec: '1 page · 8.5 × 11 · pencil-fillable',
    },
  ];

  return (
    <main>
      {/* HERO */}
      <section style={{ padding: '96px 0 48px' }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="overline">Printables</span>
          <div className="rule-strong" style={{ margin: '12px 0' }} />
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 56, fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0 }}>
            Print, measure, send.
          </h1>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 20, lineHeight: 1.55, color: 'var(--ink-2)', margin: '20px 0 0' }}>
            Three worksheets covering the most common radiator situations. Print, fill in with a pencil, and attach the photo to your quote request.
          </p>
        </div>
      </section>

      {/* THREE SHEETS */}
      <section style={{ padding: '32px 0 96px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {sheets.map(s => (
            <article key={s.n} style={{
              background: 'var(--paper)', border: '1px solid var(--hairline)',
              padding: 24, display: 'flex', flexDirection: 'column', gap: 18,
              boxShadow: '0 1px 0 rgba(31,27,22,0.04), 0 1px 2px rgba(31,27,22,0.06)',
              transition: 'box-shadow 220ms, transform 120ms',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 1px 0 rgba(31,27,22,0.04), 0 12px 28px rgba(31,27,22,0.10)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 0 rgba(31,27,22,0.04), 0 1px 2px rgba(31,27,22,0.06)'}
            >
              <WorksheetThumb n={s.n} variant={s.n} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--oxide)', letterSpacing: '0.08em' }}>
                  WORKSHEET {s.n}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 400, margin: 0, letterSpacing: '-0.01em' }}>
                  {s.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 }}>
                  {s.body}
                </p>
              </div>

              <div style={{ height: 1, background: 'var(--hairline)' }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.04em' }}>
                  {s.spec}
                </span>
                <button
                  className="btn-text"
                  onClick={() => alert(`Worksheet ${s.n} — ${s.title}.pdf would download.`)}
                >
                  Download PDF →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* DON'T WANT TO PRINT */}
      <section style={{ padding: '64px 0', background: 'var(--paper)', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span className="overline">Don't want to print?</span>
            <div className="rule-strong" />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 400, lineHeight: 1.15, letterSpacing: '-0.02em', margin: 0 }}>
              Email me your measurements and a few photos.
            </h2>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 }}>
              I'll convert them into a quote within two business days.
            </p>
          </div>
          <div style={{
            background: 'var(--bone)', border: '1px solid var(--hairline)',
            padding: 28, display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            <span className="overline">Reach me</span>
            <div style={{ height: 1, background: 'var(--ink)', width: 28 }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--ink)' }}>
              hello@elmstandard.co
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button className="btn-outline" onClick={() => setRoute('measure')}>Read the guide</button>
              <button className="btn-primary" onClick={() => setRoute('quote')}>Get a quote</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Architectural-style worksheet thumbnail. Each variant is a different
   shop drawing — looks like the actual sheet you'd print. */
function WorksheetThumb({ variant }) {
  return (
    <div style={{
      position: 'relative',
      aspectRatio: '8.5 / 11',
      width: '100%',
      background: 'var(--bone)',
      border: '1px solid var(--hairline)',
      boxShadow: 'inset 0 0 0 1px rgba(31,27,22,0.02)',
      overflow: 'hidden',
    }}>
      <svg viewBox="0 0 340 440" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {/* sheet header rule */}
        <line x1="20" y1="32" x2="320" y2="32" stroke="#1F1B16" strokeWidth="1" />
        <text x="20" y="24" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#6B6052" letterSpacing="1.4">ELM STANDARD · WORKSHEET {variant}</text>
        <text x="320" y="24" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#6B6052" letterSpacing="1.2">8.5 × 11</text>

        {variant === '01' && <StandardRadiator />}
        {variant === '02' && <PipesValves />}
        {variant === '03' && <RecessBaseboard />}

        {/* footer rule + form fields */}
        <line x1="20" y1="380" x2="320" y2="380" stroke="#D9D0BD" strokeWidth="1" />
        <FieldRow x="20" y="395" label="LENGTH" />
        <FieldRow x="125" y="395" label="DEPTH" />
        <FieldRow x="230" y="395" label="HEIGHT" />
        <FieldRow x="20" y="420" label="ZIP" />
        <FieldRow x="125" y="420" label="STYLE" />
        <FieldRow x="230" y="420" label="DATE" />
      </svg>
    </div>
  );
}

function FieldRow({ x, y, label }) {
  return (
    <g>
      <text x={x} y={y - 8} fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#6B6052" letterSpacing="1">{label}</text>
      <line x1={x} y1={y} x2={x + 90} y2={y} stroke="#1F1B16" strokeWidth="0.8" />
    </g>
  );
}

/* Sheet 01 — straight elevation of a radiator with all 5 dimension lines */
function StandardRadiator() {
  return (
    <g>
      {/* radiator body */}
      <rect x="80" y="120" width="180" height="180" fill="none" stroke="#1F1B16" strokeWidth="1" />
      {/* fins */}
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1={80 + 22 + i * 19} y1="125" x2={80 + 22 + i * 19} y2="295" stroke="#1F1B16" strokeWidth="0.5" opacity="0.6" />
      ))}
      {/* floor */}
      <line x1="40" y1="320" x2="300" y2="320" stroke="#1F1B16" strokeWidth="1" />
      {/* baseboard */}
      <rect x="40" y="310" width="40" height="10" fill="none" stroke="#1F1B16" strokeWidth="0.6" />
      <rect x="260" y="310" width="40" height="10" fill="none" stroke="#1F1B16" strokeWidth="0.6" />

      {/* dim 01: length (top) */}
      <DimH y="100" x1="80" x2="260" label='①  L' />
      {/* dim 03: height (right) */}
      <DimV x="280" y1="120" y2="320" label='③  H' />
      {/* dim 02: depth (small inset bottom-left) */}
      <DimH y="340" x1="80" x2="120" label='②  D' />
      {/* dim 04: distance to baseboard */}
      <DimH y="358" x1="40" x2="80" label='④' />
      {/* dim 05: side clearance */}
      <DimV x="60" y1="120" y2="300" label='⑤' rotate />

      {/* legend */}
      <text x="20" y="58" fontFamily="Petrona, Georgia, serif" fontSize="14" fill="#1F1B16">Standard radiator</text>
      <text x="20" y="74" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#6B6052" letterSpacing="0.8">FIVE-MEASUREMENT WORKSHEET</text>
    </g>
  );
}

/* Sheet 02 — radiator with side pipes & front valve */
function PipesValves() {
  return (
    <g>
      <rect x="100" y="130" width="160" height="160" fill="none" stroke="#1F1B16" strokeWidth="1" />
      {Array.from({ length: 7 }, (_, i) => (
        <line key={i} x1={100 + 18 + i * 19} y1="135" x2={100 + 18 + i * 19} y2="285" stroke="#1F1B16" strokeWidth="0.5" opacity="0.6" />
      ))}
      {/* side pipe right */}
      <line x1="260" y1="160" x2="295" y2="160" stroke="#1F1B16" strokeWidth="1.4" />
      <circle cx="295" cy="160" r="4" fill="none" stroke="#1F1B16" strokeWidth="1" />
      {/* side pipe left */}
      <line x1="100" y1="240" x2="60" y2="240" stroke="#1F1B16" strokeWidth="1.4" />
      <circle cx="60" cy="240" r="4" fill="none" stroke="#1F1B16" strokeWidth="1" />
      {/* front valve */}
      <rect x="172" y="290" width="16" height="20" fill="none" stroke="#1F1B16" strokeWidth="1" />
      <line x1="180" y1="310" x2="180" y2="325" stroke="#1F1B16" strokeWidth="1" />
      {/* floor */}
      <line x1="40" y1="325" x2="300" y2="325" stroke="#1F1B16" strokeWidth="1" />

      <DimH y="110" x1="100" x2="260" label='⑥  RAD L' />
      <DimH y="354" x1="60" x2="295" label='⑦  PIPE → PIPE' />
      <DimV x="50" y1="240" y2="325" label='⑧  PIPE H' rotate />

      <text x="20" y="58" fontFamily="Petrona, Georgia, serif" fontSize="14" fill="#1F1B16">Pipes and valves</text>
      <text x="20" y="74" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#6B6052" letterSpacing="0.8">SIDE-SUPPLY · FRONT VALVE WORKSHEET</text>
    </g>
  );
}

/* Sheet 03 — radiator in window recess with baseboard heat */
function RecessBaseboard() {
  return (
    <g>
      {/* recess (wall outline) */}
      <path d="M 40 110 L 40 300 L 80 300 L 80 130 L 280 130 L 280 300 L 320 300 L 320 110 Z" fill="none" stroke="#1F1B16" strokeWidth="1" />
      {/* radiator inside recess */}
      <rect x="100" y="160" width="160" height="120" fill="none" stroke="#1F1B16" strokeWidth="1" />
      {Array.from({ length: 7 }, (_, i) => (
        <line key={i} x1={100 + 18 + i * 19} y1="165" x2={100 + 18 + i * 19} y2="275" stroke="#1F1B16" strokeWidth="0.5" opacity="0.6" />
      ))}
      {/* baseboard heat next to it */}
      <rect x="285" y="290" width="30" height="10" fill="none" stroke="#1F1B16" strokeWidth="0.7" />
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1={287 + i * 5} y1="291" x2={287 + i * 5} y2="299" stroke="#1F1B16" strokeWidth="0.5" />
      ))}
      <line x1="40" y1="305" x2="320" y2="305" stroke="#1F1B16" strokeWidth="1" />

      <DimH y="100" x1="40" x2="320" label='⑨  RECESS W' />
      <DimH y="335" x1="285" x2="315" label='⑩  BB HEAT' />
      <DimV x="30" y1="110" y2="305" label='⑪  RECESS H' rotate />

      <text x="20" y="58" fontFamily="Petrona, Georgia, serif" fontSize="14" fill="#1F1B16">Window recess + baseboard</text>
      <text x="20" y="74" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#6B6052" letterSpacing="0.8">RECESS · BB-HEAT WORKSHEET</text>
    </g>
  );
}

function DimH({ y, x1, x2, label }) {
  return (
    <g stroke="#8C3A2A" strokeWidth="0.7">
      <line x1={x1} y1={y} x2={x2} y2={y} />
      <line x1={x1} y1={y - 4} x2={x1} y2={y + 4} />
      <line x1={x2} y1={y - 4} x2={x2} y2={y + 4} />
      <text x={(x1 + x2) / 2} y={y - 4} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#8C3A2A" letterSpacing="0.6" stroke="none">{label}</text>
    </g>
  );
}

function DimV({ x, y1, y2, label, rotate }) {
  const cy = (y1 + y2) / 2;
  return (
    <g stroke="#8C3A2A" strokeWidth="0.7">
      <line x1={x} y1={y1} x2={x} y2={y2} />
      <line x1={x - 4} y1={y1} x2={x + 4} y2={y1} />
      <line x1={x - 4} y1={y2} x2={x + 4} y2={y2} />
      <text x={x + (rotate ? -8 : 6)} y={cy} fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#8C3A2A" letterSpacing="0.6" stroke="none"
        transform={rotate ? `rotate(-90 ${x - 8} ${cy})` : ''}>{label}</text>
    </g>
  );
}
