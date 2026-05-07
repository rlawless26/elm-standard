type PageStubProps = {
  eyebrow: string;
  title: string;
  lede?: string;
};

export default function PageStub({ eyebrow, title, lede }: PageStubProps) {
  return (
    <main>
      <section style={{ padding: "96px 0 48px" }}>
        <div className="container">
          <span className="overline">{eyebrow}</span>
          <div className="rule-strong" style={{ marginTop: 16, marginBottom: 24 }} />
          <h1 style={{ fontSize: 56, lineHeight: 1.05, letterSpacing: "-0.02em", maxWidth: 820 }}>
            {title}
          </h1>
          {lede ? (
            <p
              className="lead"
              style={{ marginTop: 24, maxWidth: 720 }}
            >
              {lede}
            </p>
          ) : null}
          <p
            className="mono"
            style={{
              marginTop: 48,
              fontSize: 12,
              color: "var(--ink-3)",
              letterSpacing: "0.04em",
            }}
          >
            PAGE STUB · IMPLEMENTATION PENDING
          </p>
        </div>
      </section>
    </main>
  );
}
