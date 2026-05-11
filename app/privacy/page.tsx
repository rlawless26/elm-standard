export const metadata = { title: "Privacy — Elm Standard" };

export default function PrivacyPage() {
  return (
    <main>
      <section className="section-pad-lg" style={{ padding: "96px 0 32px" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="overline">Privacy</span>
          <div className="rule-strong" style={{ margin: "12px 0" }} />
          <h1 className="display-h1">What I collect, and why.</h1>
          <p
            className="lead-fluid"
            style={{ marginTop: 16, maxWidth: 720 }}
          >
            One-person shop. I collect the minimum I need to build your
            cover and get paid. No tracking pixels, no ad networks.
          </p>
        </div>
      </section>

      <section className="section-pad-lg" style={{ padding: "32px 0 96px" }}>
        <div className="container prose" style={{ maxWidth: 720 }}>
          <Section title="What I collect">
            <ul style={{ paddingLeft: 20, margin: 0, lineHeight: 1.8 }}>
              <li>
                <strong>From the quote/order form:</strong> the dimensions
                of your radiator, your style and finish choices, and any
                notes about the install (pipes, recesses, etc.).
              </li>
              <li>
                <strong>From Stripe at checkout:</strong> your name, email,
                phone, and shipping or install address. Payment card data
                is handled by Stripe — I never see your full card number.
              </li>
              <li>
                <strong>From outbound emails:</strong> if you reply to a
                confirmation or quote email, that thread sits in my
                inbox.
              </li>
            </ul>
          </Section>

          <Section title="What I do with it">
            Build your cover. Confirm dimensions with you. Send receipts,
            shipping notifications, and balance invoices. That&apos;s it. I
            don&apos;t sell or share your data, and there&apos;s no
            marketing list — if I email you about your order, it&apos;s
            because of your order.
          </Section>

          <Section title="Who else sees it">
            <ul style={{ paddingLeft: 20, margin: 0, lineHeight: 1.8 }}>
              <li>
                <strong>Stripe</strong> — processes payment and stores card
                details. They have their own{" "}
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="oxide-link"
                >
                  privacy policy
                </a>
                .
              </li>
              <li>
                <strong>Supabase</strong> — hosts the database where order
                records live (US-based servers).
              </li>
              <li>
                <strong>Resend</strong> — delivers transactional emails
                (confirmations, balance invoices).
              </li>
              <li>
                <strong>Vercel</strong> — hosts this site.
              </li>
            </ul>
            None of them get your data for any reason other than running
            the order.
          </Section>

          <Section title="Cookies">
            This site uses a single session cookie for the admin login.
            That&apos;s it — no analytics cookies, no tracking pixels, no
            ad cookies. If that ever changes I&apos;ll update this page.
          </Section>

          <Section title="Your rights">
            You can ask me to delete your data at any time. Email{" "}
            <a href="mailto:rob@elmstandard.com" className="oxide-link">
              rob@elmstandard.com
            </a>
            . The only exception is records I&apos;m legally required to
            keep — payment records, tax records — which I retain for the
            period required by law.
          </Section>

          <Section title="Children">
            This site isn&apos;t directed at children under 13 and I
            don&apos;t knowingly collect data from them.
          </Section>

          <Section title="Changes">
            If I change how I handle data, I&apos;ll update this page. Last
            updated 2026-05-11.
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
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 17,
          lineHeight: 1.6,
          color: "var(--ink-2)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
