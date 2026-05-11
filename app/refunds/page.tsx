import Link from "next/link";

export const metadata = { title: "Refund policy — Elm Standard" };

export default function RefundsPage() {
  return (
    <main>
      <section className="section-pad-lg" style={{ padding: "96px 0 32px" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="overline">Refund policy</span>
          <div className="rule-strong" style={{ margin: "12px 0" }} />
          <h1 className="display-h1">Plainly stated.</h1>
          <p
            className="lead-fluid"
            style={{ marginTop: 16, maxWidth: 720 }}
          >
            Custom-built furniture is hard to refund well. Here&apos;s
            exactly how I handle it.
          </p>
        </div>
      </section>

      <section className="section-pad-lg" style={{ padding: "32px 0 96px" }}>
        <div className="container prose" style={{ maxWidth: 720 }}>
          <Stage
            window="Before production starts"
            tldr="Full refund of your deposit."
            body="If you change your mind and email me before I&apos;ve cut the
              wood for your cover, I refund the full deposit, no
              questions. Production typically starts within 3–5 business
              days of your order — I&apos;ll confirm the cut date by
              email so you know your window."
          />

          <Stage
            window="After production starts"
            tldr="Deposit is non-refundable. Balance hasn't been charged yet."
            body="Once I&apos;ve cut materials for your specific cover, the
              deposit covers the materials and labor sunk into the job.
              You owe nothing more — the balance is only billed at
              delivery. If you cancel here, you don&apos;t lose the
              balance, but you don&apos;t get the deposit back."
          />

          <Stage
            window="After delivery or install"
            tldr="No refunds on a finished, as-spec cover."
            body="Made-to-fit furniture isn&apos;t restockable. If the cover
              matches your order and the dimensions you provided, it&apos;s
              yours. If something is wrong with the cover, that&apos;s a
              defect — see below."
          />

          <Stage
            window="Defects or workmanship issues"
            tldr="I make it right."
            body={
              <>
                Flat-pack: email me within 7 days of delivery with photos.
                I&apos;ll ship replacement panels at no charge. Local
                install: I won&apos;t leave until you&apos;re happy with
                the install. Either way, my{" "}
                <Link href="/terms" className="oxide-link">
                  made-to-fit guarantee
                </Link>{" "}
                covers you for a year against defects in materials or
                workmanship.
              </>
            }
          />

          <Stage
            window="If I measured it and it doesn't fit"
            tldr="Rebuild at no charge."
            body="If I came out and measured your radiator, the fit is on me.
              I&apos;ll rebuild the cover and refund the install fee. If
              you measured it and the numbers were off, I&apos;ll rebuild
              at materials cost — labor is on me."
          />

          <div
            style={{
              background: "var(--paper)",
              border: "1px solid var(--hairline)",
              padding: 24,
              marginTop: 16,
            }}
          >
            <span className="overline">How to request a refund</span>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--ink-2)",
                margin: "12px 0 0",
              }}
            >
              Email{" "}
              <a
                href="mailto:rob@elmstandard.com"
                className="oxide-link"
              >
                rob@elmstandard.com
              </a>{" "}
              with your order ID (it&apos;s in your confirmation email) and
              what&apos;s wrong. I respond within one business day.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stage({
  window,
  tldr,
  body,
}: {
  window: string;
  tldr: string;
  body: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        paddingBottom: 32,
        marginBottom: 32,
        borderBottom: "1px solid var(--hairline)",
      }}
    >
      <span className="overline">{window}</span>
      <h2
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 24,
          fontWeight: 400,
          letterSpacing: "-0.01em",
          margin: "4px 0 6px",
        }}
      >
        {tldr}
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
        {body}
      </p>
    </div>
  );
}
