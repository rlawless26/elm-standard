function Header({ route, setRoute }) {
  const links = [
    ['home', 'Home'],
    ['how', 'How it works'],
    ['styles', 'Styles'],
    ['about', 'About'],
  ];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 10,
      background: 'var(--paper)', borderBottom: '1px solid var(--hairline)',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 72,
      }}>
        <a onClick={() => setRoute('home')} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
          <Wordmark size={16} />
        </a>
        <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {links.map(([k, label]) => (
            <a key={k} onClick={() => setRoute(k)} style={{
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500,
              letterSpacing: '0.04em',
              color: route === k ? 'var(--ink)' : 'var(--ink-3)',
              borderBottom: route === k ? '1.5px solid var(--ink)' : '1.5px solid transparent',
              paddingBottom: 4,
              transition: 'color 120ms',
            }}>{label}</a>
          ))}
          <button className="btn-primary" onClick={() => setRoute('quote')}>
            Get a quote
          </button>
        </nav>
      </div>
    </header>
  );
}
