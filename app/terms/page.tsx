import Link from "next/link";

export const metadata = { title: "Terms of sale — Elm Standard" };

export default function TermsPage() {
  return (
    <main>
      <section className="section-pad-lg" style={{ padding: "96px 0 32px" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="overline">Terms of sale</span>
          <div className="rule-strong" style={{ margin: "12px 0" }} />
          <h1 className="display-h1">Plain terms.</h1>
          <p
            className="lead-fluid"
            style={{ marginTop: 16, maxWidth: 720 }}
          >
            What you&apos;re buying, when I&apos;ll have it built, and how
            payment works. Last updated 2026-05-11.
          </p>
        </div>
      </section>

      <section className="section-pad-lg" style={{ padding: "32px 0 96px" }}>
        <div className="container prose" style={{ maxWidth: 720 }}>
          <Section title="What you're buying">
            A custom radiator cover built to the dimensions you provide. It is
            a made-to-measure piece — every cover is cut and assembled for
            one specific radiator. It is not a stock product.
          </Section>

          <Section title="Lead time">
            Local install: 4–6 weeks from confirmed measurements to install.
            Flat-pack: 2–3 weeks from confirmed measurements to shipment.
            I&apos;ll confirm the schedule by email within two business days
            of your order.
          </Section>

          <Section title="Deposit and balance">
            A 30% non-refundable deposit is collected via Stripe at the time
            of order. The remaining 70% is due before shipment (flat-pack)
            or at install (local). I&apos;ll send the balance invoice when
            your cover is ready.
          </Section>

          <Section title="Measurements">
            For instant-price orders, you provide the dimensions and the
            cover is built to those numbers. If you&apos;re wrong about the
            measurement, the cover won&apos;t fit — and the cost is on you.
            If you&apos;re in my install radius, I&apos;ll re-measure on
            site before cutting; if I made the measurement, the fit is my
            responsibility (see the guarantee below).
          </Section>

          <Section title="Made-to-fit guarantee">
            If I measured your radiator and the cover doesn&apos;t fit, I
            rebuild it at no additional charge. If you measured it and the
            numbers were off, I&apos;ll rebuild at cost — you cover the
            materials, I don&apos;t charge for labor a second time.
          </Section>

          <Section title="Defects">
            Flat-pack: email me within 7 days of delivery with photos of any
            damaged or defective panels. I&apos;ll send replacements at no
            charge. Local install: I won&apos;t leave the site until
            you&apos;re happy with the install — any defects, I make it
            right then.
          </Section>

          <Section title="Returns">
            Made-to-measure covers can&apos;t be returned for fit or
            preference — they&apos;re built for one radiator. Refunds apply
            only to the deposit, and only before production starts. See the{" "}
            <Link href="/refunds" className="oxide-link">
              refund policy
            </Link>
            .
          </Section>

          <Section title="Warranty">
            Against defects in materials and workmanship for one year from
            delivery. Doesn&apos;t cover damage from misuse (someone sat on
            it, a pet chewed it), normal wear, or paint chips from
            installation.
          </Section>

          <Section title="Disputes">
            If something goes wrong, email{" "}
            <a href="mailto:rob@elmstandard.com" className="oxide-link">
              rob@elmstandard.com
            </a>{" "}
            first. I&apos;ll always try to make it right before either of us
            escalates. These terms are governed by the laws of the
            Commonwealth of Massachusetts.
          </Section>

          <Section title="Changes to these terms">
            I may update these terms occasionally. The version in effect when
            you place an order is the one that governs your order.
          </Section>
        </div>
      </section>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        paddingBottom: 32,
        marginBottom: 32,
        borderBottom: "1px solid var(--hairline)",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 24,
          fontWeight: 400,
          letterSpacing: "-0.01em",
          margin: 0,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 17,
          lineHeight: 1.6,
          color: "var(--ink-2)",
          margin: 0,
        }}
      >
        {children}
      </p>
    </div>
  );
}
