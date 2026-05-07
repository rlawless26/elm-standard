/* The Elm Standard wordmark — Petrona 800 caps with end-tick rule
   that auto-measures to span the wordmark exactly. */
function Wordmark({ size = 22, color = 'var(--ink)', tickColor }) {
  const [w, setW] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const measure = () => { if (ref.current) setW(ref.current.offsetWidth); };
    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [size]);
  const tc = tickColor || color;
  const ruleH = Math.max(6, Math.round(size * 0.28));
  const sw = Math.max(1, size / 22);
  // letter-spacing 0.32em adds tracking after the final glyph too. Trim it.
  const trailingTrim = size * 0.32;
  const ruleW = Math.max(0, w - trailingTrim);
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'stretch', gap: Math.max(4, size * 0.28) }}>
      <span ref={ref} style={{
        fontFamily: 'Petrona, serif', fontSize: size, fontWeight: 800,
        letterSpacing: '0.32em', color, whiteSpace: 'nowrap',
        display: 'inline-block', lineHeight: 1,
        marginRight: -trailingTrim,
      }}>
        ELM&nbsp;STANDARD
      </span>
      {ruleW > 0 && (
        <svg width={ruleW} height={ruleH} viewBox={`0 0 ${ruleW} ${ruleH}`} style={{ display: 'block' }}>
          <line x1={sw/2} y1="0" x2={sw/2} y2={ruleH} stroke={tc} strokeWidth={sw}/>
          <line x1={ruleW - sw/2} y1="0" x2={ruleW - sw/2} y2={ruleH} stroke={tc} strokeWidth={sw}/>
          <line x1={sw/2} y1={ruleH/2} x2={ruleW - sw/2} y2={ruleH/2} stroke={tc} strokeWidth={sw}/>
        </svg>
      )}
    </span>
  );
}
