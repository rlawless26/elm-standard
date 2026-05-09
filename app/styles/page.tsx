import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Three styles — Elm Standard" };

type StyleSpec = {
  name: "Traditional" | "Shaker" | "Modern";
  img: string;
  tag: string;
  body: string;
  detail: string;
};

const styles: StyleSpec[] = [
  {
    name: "Traditional",
    img: "/style-traditional.svg",
    tag: "Decorative moulding & accents",
    body:
      "Two recessed mesh panels framed in classic ogee panel moulding. The right answer for pre-war and Victorian rooms with crown mouldings and panel doors.",
    detail: '1/2" primed MDF · ogee panel moulding · routed top edge',
  },
  {
    name: "Shaker",
    img: "/style-shaker.svg",
    tag: "Clean lines & flat panels",
    body:
      "Flat rails and a single recessed mesh panel. Quiet, square, and built like a Shaker cabinet. Pairs cleanly with painted millwork and modern interiors with traditional bones.",
    detail: '1/2" primed MDF · square stiles and rails · flush top',
  },
  {
    name: "Modern",
    img: "/style-modern.svg",
    tag: "Wide rails & minimalist style",
    body:
      "Generous rails and one wide-format mesh panel. Looks built-in. The cleanest of the three — for renovations where the radiator should disappear.",
    detail: '1/2" primed MDF · wide rails · plinth base',
  },
];

export default function StylesPage() {
  return (
    <main>
      <section className="section-pad-lg" style={{ padding: "96px 0 48px" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              maxWidth: 720,
            }}
          >
            <span className="overline">Three styles</span>
            <div className="rule-strong" />
            <h1 className="display-h1">
              Three styles. Pick the one that fits the room.
            </h1>
          </div>
        </div>
      </section>

      <section className="section-pad-lg" style={{ padding: "32px 0 96px" }}>
        <div
          className="container"
          style={{ display: "flex", flexDirection: "column", gap: 64 }}
        >
          {styles.map((s, i) => {
            const imageFirst = i % 2 === 0;
            return (
              <article key={s.name} className="r-grid-hero">
                <div
                  style={{
                    order: imageFirst ? 1 : 2,
                    background: "var(--paper)",
                    border: "1px solid var(--hairline)",
                    padding: 32,
                    boxShadow:
                      "0 1px 0 rgba(31,27,22,0.04), 0 8px 24px rgba(31,27,22,0.06)",
                  }}
                >
                  <Image
                    src={s.img}
                    alt={`${s.name} radiator cover — architectural elevation`}
                    width={600}
                    height={360}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      marginTop: 16,
                      paddingTop: 16,
                      borderTop: "1px solid var(--hairline)",
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "var(--ink-3)",
                    }}
                  >
                    <span>Elevation</span>
                    <span>1:24</span>
                  </div>
                </div>
                <div
                  style={{
                    order: imageFirst ? 2 : 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 18,
                  }}
                >
                  <span className="overline">{s.tag}</span>
                  <h2 className="display-h2">{s.name}</h2>
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 19,
                      lineHeight: 1.55,
                      color: "var(--ink-2)",
                      margin: 0,
                    }}
                  >
                    {s.body}
                  </p>
                  <div
                    style={{
                      height: 1,
                      background: "var(--hairline)",
                      margin: "8px 0",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "var(--ink-3)",
                      lineHeight: 1.6,
                    }}
                  >
                    {s.detail}
                  </div>
                  <Link
                    href="/quote"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "var(--ink-4)",
                      lineHeight: 1.6,
                      textDecoration: "underline",
                      textDecorationColor: "var(--hairline)",
                      textUnderlineOffset: 4,
                      width: "fit-content",
                    }}
                  >
                    Choose your screen pattern in the configurator →
                  </Link>
                  <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                    <Link href="/quote" className="btn-primary">
                      Quote a {s.name.toLowerCase()}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
