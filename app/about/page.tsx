import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "About — Elm Standard" };

const stats: Array<[string, string]> = [
  ["Lead time", "4–6 weeks"],
  ["Local radius", "30 mi · MA"],
  ["Finishes", "3 whites + brass option"],
  ["Materials", "MDF + steel screen"],
];

export default function AboutPage() {
  return (
    <main>
      <section className="section-pad-lg" style={{ padding: "96px 0 48px" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <span className="overline">About the shop</span>
          <div className="rule-strong" style={{ margin: "12px 0" }} />
          <h1 className="display-h1">Started on Elm Street.</h1>
        </div>
      </section>

      <section className="section-pad-lg" style={{ padding: "32px 0 96px" }}>
        <div className="container r-grid-2" style={{ gap: 64 }}>
          <div
            className="prose"
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 20,
                lineHeight: 1.6,
                color: "var(--ink-2)",
                margin: 0,
              }}
            >
              Elm Standard started on Elm Street, in a small woodshop behind
              the house. I&apos;d been making cabinets and built-ins for friends
              with old houses, and the same problem kept coming up: the
              radiators.
            </p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 18,
                lineHeight: 1.65,
                color: "var(--ink-2)",
                margin: 0,
              }}
            >
              The covers from the big-box stores never fit. They were too
              generic, too plasticky, or built for a wall they&apos;d never
              seen. So I started measuring, cutting, and priming them one at a
              time.
            </p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 18,
                lineHeight: 1.65,
                color: "var(--ink-2)",
                margin: 0,
              }}
            >
              The shop is small on purpose. Same standards across every
              cover, same finish, same level of fit. I do the measuring and
              the building. Locally, I do the install too. Farther out, you
              get a flat-pack with everything pre-cut, pre-primed, and ready
              to assemble.
            </p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 18,
                lineHeight: 1.65,
                color: "var(--ink-2)",
                margin: 0,
              }}
            >
              That&apos;s it. No subscriptions, no upsells, no smart features.
            </p>
            <div
              style={{
                height: 1,
                background: "var(--hairline)",
                margin: "12px 0",
              }}
            />
            <div
              className="r-grid-2"
              style={{ gap: 24 }}
            >
              {stats.map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <span className="overline">{label}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 16,
                      color: "var(--ink)",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <aside
            className="sticky-desktop"
            style={{
              background: "var(--paper)",
              border: "1px solid var(--hairline)",
              padding: 32,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              position: "sticky",
              top: 96,
            }}
          >
            <Image
              src="/logo-stamp.svg"
              alt="Elm Standard back-of-cover stamp"
              width={160}
              height={160}
              style={{ alignSelf: "center" }}
            />
            <div className="rule" />
            <div>
              <span className="overline">The shop</span>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 17,
                  lineHeight: 1.5,
                  color: "var(--ink-2)",
                  marginTop: 8,
                  margin: 0,
                }}
              >
                Behind the house on Elm St., Milton MA. Visits by appointment.
              </p>
            </div>
            <div className="rule" />
            <div>
              <span className="overline">Reach me</span>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--ink)",
                  marginTop: 8,
                  margin: 0,
                }}
              >
                <a href="mailto:rob@elmstandard.com">
                  rob@elmstandard.com
                </a>
                <br />
                @elmstandard
              </p>
            </div>
            <Link
              href="/quote"
              className="btn-outline"
              style={{ marginTop: 8 }}
            >
              Get a quote
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
