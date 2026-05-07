function Footer({ setRoute }) {
  return (
    <footer style={{
      background: 'var(--linen)', borderTop: '1px solid var(--hairline)',
      marginTop: 96, padding: '64px 0 32px',
    }}>
      <div className="container" style={{
        display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1fr', gap: 40,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Wordmark size={18} />
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 17, lineHeight: 1.45, color: 'var(--ink-2)', maxWidth: 280, marginTop: 8 }}>
            Custom radiator covers, handbuilt in Milton, MA. One pair of hands, one shop.
          </div>
        </div>
        <FooterCol title="Shop" links={[['Three styles', 'styles'], ['How it works', 'how'], ['Get a quote', 'quote']]} setRoute={setRoute} />
        <FooterCol title="Channels" links={[['Local install', 'quote'], ['Flat-pack ship', 'quote'], ['Etsy storefront', null]]} setRoute={setRoute} />
        <FooterCol title="Resources" links={[['Measure your radiator', 'measure'], ['Worksheets', 'worksheets'], ['Tip safety', 'safety'], ['FAQ', 'faq']]} setRoute={setRoute} />
        <FooterCol title="Shop info" links={[['About', 'about'], ['Milton, MA', null], ['hello@elmstandard.co', null]]} setRoute={setRoute} />
      </div>
      <div className="container" style={{
        marginTop: 64, paddingTop: 24,
        borderTop: '1px solid var(--hairline)',
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)',
      }}>
        <span>© 2025 Elm Standard · Built in Milton, MA</span>
        <span>Est. 2025</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, setRoute }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <span className="overline">{title}</span>
      <div style={{ height: 1, background: 'var(--ink)', width: 28 }} />
      {links.map(([label, route], i) => (
        <a key={i}
           onClick={() => route && setRoute(route)}
           style={{
             cursor: route ? 'pointer' : 'default',
             fontFamily: 'var(--font-sans)', fontSize: 14,
             color: route ? 'var(--ink)' : 'var(--ink-3)',
             paddingTop: 4,
           }}>{label}</a>
      ))}
    </div>
  );
}
