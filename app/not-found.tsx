import Link from "next/link";

export const metadata = { title: "Not found — Elm Standard" };

export default function NotFound() {
  return (
    <main style={{ padding: "128px 0", minHeight: "60vh" }}>
      <div
        className="container"
        style={{
          maxWidth: 640,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          alignItems: "flex-start",
        }}
      >
        <span className="overline">404</span>
        <div className="rule-strong" />
        <h1 className="display-h1">Nothing here.</h1>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 19,
            color: "var(--ink-2)",
            margin: 0,
            lineHeight: 1.55,
            maxWidth: 520,
          }}
        >
          That page either moved or never existed. Try the home page, or
          one of the three styles.
        </p>
        <div style={{ display: "flex", gap: 14, marginTop: 4, flexWrap: "wrap" }}>
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
          <Link href="/traditional" className="btn-outline">
            Traditional
          </Link>
          <Link href="/shaker" className="btn-outline">
            Shaker
          </Link>
          <Link href="/modern" className="btn-outline">
            Modern
          </Link>
        </div>
      </div>
    </main>
  );
}
