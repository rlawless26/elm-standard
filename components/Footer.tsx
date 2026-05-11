import Link from "next/link";
import Wordmark from "./Wordmark";

type FooterLink = [label: string, href: string | null];

type FooterColProps = {
  title: string;
  links: FooterLink[];
};

function FooterCol({ title, links }: FooterColProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <span className="overline">{title}</span>
      <div style={{ height: 1, background: "var(--ink)", width: 28 }} />
      {links.map(([label, href], i) => {
        const style: React.CSSProperties = {
          cursor: href ? "pointer" : "default",
          fontFamily: "var(--font-sans)",
          fontSize: 14,
          color: href ? "var(--ink)" : "var(--ink-3)",
          paddingTop: 4,
        };
        return href ? (
          <Link key={i} href={href} style={style}>
            {label}
          </Link>
        ) : (
          <span key={i} style={style}>
            {label}
          </span>
        );
      })}
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      className="section-pad-md"
      style={{
        background: "var(--linen)",
        borderTop: "1px solid var(--hairline)",
        marginTop: 96,
        padding: "64px 0 32px",
      }}
    >
      <div className="container footer-grid">
        <div
          className="footer-brand"
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <Wordmark size={18} />
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 17,
              lineHeight: 1.45,
              color: "var(--ink-2)",
              maxWidth: 280,
              marginTop: 8,
            }}
          >
            Custom radiator covers, handbuilt to fit.
          </div>
        </div>

        <FooterCol
          title="Shop"
          links={[
            ["Three styles", "/styles"],
            ["How it works", "/how-it-works"],
            ["Get a quote", "/quote"],
          ]}
        />
        <FooterCol
          title="Channels"
          links={[
            ["Local install", "/quote"],
            ["Flat-pack ship", "/quote"],
            ["Etsy storefront", null],
          ]}
        />
        <FooterCol
          title="Resources"
          links={[
            ["Measure your radiator", "/measure"],
            ["Worksheets", "/worksheets"],
            ["Tip safety", "/safety"],
            ["FAQ", "/faq"],
          ]}
        />
        <FooterCol
          title="Shop info"
          links={[
            ["About", "/about"],
            ["rob@elmstandard.com", null],
          ]}
        />
      </div>

      <div
        className="container footer-grid-bottom"
        style={{
          marginTop: 64,
          paddingTop: 24,
          borderTop: "1px solid var(--hairline)",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--ink-3)",
        }}
      >
        <span>© 2026 Elm Standard</span>
      </div>
    </footer>
  );
}
