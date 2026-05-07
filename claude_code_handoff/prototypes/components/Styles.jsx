function Styles({ setRoute }) {
  const styles = [
    {
      name: 'Traditional', img: 'style-traditional.svg',
      tag: 'Panel mold frame',
      body: 'Two recessed mesh panels framed in classic ogee panel mold. The right answer for pre-war and Victorian rooms with crown moldings and panel doors.',
      detail: '1/2" primed MDF · ogee panel mold trim · brass mesh · routed top edge',
    },
    {
      name: 'Shaker', img: 'style-shaker.svg',
      tag: 'Clean rails, no panel mold',
      body: 'Flat rails and a single recessed mesh panel. Quiet, square, and built like a Shaker cabinet. Pairs cleanly with painted millwork and modern interiors with traditional bones.',
      detail: '1/2" primed MDF · square stiles and rails · brass mesh · flush top',
    },
    {
      name: 'Modern', img: 'style-modern.svg',
      tag: 'Wide rails, minimal frame',
      body: 'Generous rails and one wide-format mesh panel. Looks built-in. The cleanest of the three — for renovations where the radiator should disappear.',
      detail: '1/2" primed MDF · wide rails · fine brass mesh · plinth base',
    },
  ];
  return (
    <main>
      <section style={{ padding: '96px 0 48px' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 720 }}>
            <span className="overline">Three styles</span>
            <div className="rule-strong" />
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 56, fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0 }}>
              All the same materials. Pick the one that fits the room.
            </h1>
          </div>
        </div>
      </section>

      <section style={{ padding: '32px 0 96px' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
          {styles.map((s, i) => (
            <article key={s.name} style={{
              display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1.1fr 1fr' : '1fr 1.1fr', gap: 48, alignItems: 'center',
            }}>
              <div style={{
                order: i % 2 === 0 ? 1 : 2,
                background: 'var(--paper)', border: '1px solid var(--hairline)', padding: 32,
                boxShadow: '0 1px 0 rgba(31,27,22,0.04), 0 8px 24px rgba(31,27,22,0.06)',
              }}>
                <img src={`../../assets/${s.img}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--hairline)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)' }}>
                  <span>Elevation</span><span>1:24</span>
                </div>
              </div>
              <div style={{ order: i % 2 === 0 ? 2 : 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <span className="overline">{s.tag}</span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 48, fontWeight: 400, margin: 0, letterSpacing: '-0.02em' }}>{s.name}</h2>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 19, lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 }}>{s.body}</p>
                <div style={{ height: 1, background: 'var(--hairline)', margin: '8px 0' }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.6 }}>{s.detail}</div>
                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                  <button className="btn-primary" onClick={() => setRoute('quote')}>Quote a {s.name.toLowerCase()}</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
