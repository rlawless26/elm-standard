"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Group = {
  n: string;
  title: string;
  qa: Array<[string, string]>;
};

const groups: Group[] = [
  {
    n: "01",
    title: "Ordering & lead times",
    qa: [
      [
        "How long does it take?",
        "Local covers run 4–6 weeks from first measurement to installed. Flat-pack ships in 2–3 weeks from order. Custom finishes or unusual sizes can add a week.",
      ],
      [
        "Do you do rush orders?",
        "Sometimes. If you've got a deadline, ask in your quote request. If I can hit it, I will. If I can't, I'll tell you straight.",
      ],
      [
        "How does the quote work?",
        "Tell me about your radiator (rough dimensions are fine to start). I come back within two business days with a one-page quote: dimensions, style, finish, lead time, and price. If you accept, I send an invoice for a 50% deposit. The rest is due before delivery.",
      ],
      [
        "How do I pay?",
        "Stripe handles credit cards. ACH or check is also fine, especially for the deposit.",
      ],
    ],
  },
  {
    n: "02",
    title: "Sizing & fit",
    qa: [
      [
        "My radiator is in a window recess. Can you build for that?",
        "Yes. Measure the recess too and note it on your quote request. I'll size the cover to fit cleanly inside.",
      ],
      [
        "My radiator has pipes coming out the front.",
        "Common. I'll route a notch in the bottom rail to clear them. Photo and rough measurements on the quote form.",
      ],
      [
        "Is the back open?",
        "Yes. The back is fully open for heat circulation and to clear wall mounting. The cover never traps heat against the radiator.",
      ],
      [
        "Can I use the top as a shelf?",
        'Yes. The top is solid 3/4" MDF over the frame. It\'ll hold lamps, plants, books — just don\'t sit on it.',
      ],
      [
        "Will it block the heat?",
        "Negligibly. Cast iron radiators heat by both convection and radiation. The mesh front and open back let convection do its job, and radiant heat passes through the mesh. In practice, rooms with covered radiators heat the same.",
      ],
    ],
  },
  {
    n: "03",
    title: "Finishes & customization",
    qa: [
      [
        "What color?",
        "Standard finish is a milk-paint white that matches most trim. Send me your trim color (or a photo) and I'll match it. Custom colors add about a week.",
      ],
      [
        "Can I paint it myself?",
        "Yes. Order it primed instead of finished. About $50 less.",
      ],
      [
        "Do you stain it?",
        "No. MDF doesn't take stain — it's designed for paint. If you want a stained wood cover, I'm not the right shop.",
      ],
      [
        "What kind of mesh?",
        "Brass mesh in a fine pattern, sized to the opening. If you want a different pattern (Cloverleaf, Windsor, Grecian), I can source it — adds about $30 to the order.",
      ],
    ],
  },
  {
    n: "04",
    title: "Local install vs flat-pack",
    qa: [
      [
        "Where do you install?",
        "Greater Boston, roughly within 30 miles of Milton. Includes the South Shore, Boston, Cambridge, Brookline, Newton, and most points east of Worcester. If you're farther, ask anyway — I'll let you know.",
      ],
      [
        "What does install include?",
        "Delivery, leveling, anchoring to the wall, and a 15-minute walkthrough of how to remove the cover for radiator access. About an hour on site.",
      ],
      [
        "Can I install a flat-pack myself?",
        "Yes. The kit includes pre-cut, pre-primed panels, hardware, and a one-page assembly guide. About 30 minutes with a screwdriver. No saw, no glue.",
      ],
      [
        "What if my flat-pack arrives damaged?",
        "Email me with photos within 7 days. I'll send replacement panels at no charge.",
      ],
    ],
  },
  {
    n: "05",
    title: "Care & maintenance",
    qa: [
      [
        "How do I clean it?",
        "Dry microfiber cloth weekly. Damp cloth (not wet) for stains. Avoid solvents — they'll attack the paint.",
      ],
      [
        "Will it warp from radiator heat?",
        "No. MDF is more dimensionally stable than solid wood, and the back is open so heat circulates out. I haven't seen one warp.",
      ],
      [
        "What if I want to repaint it later?",
        "Light sand, prime, paint. Same as any millwork.",
      ],
      [
        "Can I move it to a new house?",
        "Yes — that's the point of the wall anchor. Unscrew the anchor, take the cover, repatch the wall, done.",
      ],
    ],
  },
  {
    n: "06",
    title: "About the shop",
    qa: [
      ["Is this your full-time job?", "Yes."],
      [
        "Where's the shop?",
        "Behind my house in Milton, MA, on Elm Street. Visits by appointment.",
      ],
      [
        "Can I see one in person before ordering?",
        "If you're local, yes — I can bring a sample on a measure visit, or you can stop by the shop.",
      ],
      [
        "Do you make other furniture?",
        "Right now, just radiator covers. Built-ins and millwork eventually.",
      ],
    ],
  },
];

export default function FAQPage() {
  const [activeGroup, setActiveGroup] = useState(groups[0].n);

  useEffect(() => {
    const handler = () => {
      const ids = groups.map((g) => g.n);
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(`group-${id}`);
        if (el && el.getBoundingClientRect().top < 160) current = id;
      }
      setActiveGroup(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <main>
      {/* HERO */}
      <section style={{ padding: "96px 0 48px" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="overline">Common questions</span>
          <div className="rule-strong" style={{ margin: "12px 0" }} />
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 56,
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Most-asked, plainly answered.
          </h1>
        </div>
      </section>

      {/* TOC + ACCORDIONS */}
      <section style={{ padding: "32px 0 96px" }}>
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: 64,
            alignItems: "flex-start",
          }}
        >
          {/* TOC */}
          <aside
            style={{
              position: "sticky",
              top: 96,
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            <span className="overline" style={{ marginBottom: 12 }}>
              Sections
            </span>
            <div
              style={{
                height: 1.5,
                background: "var(--ink)",
                width: 28,
                marginBottom: 16,
              }}
            />
            {groups.map((g) => (
              <a
                key={g.n}
                href={`#group-${g.n}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(`group-${g.n}`);
                  if (el) {
                    const top =
                      el.getBoundingClientRect().top + window.scrollY - 96;
                    window.scrollTo({ top, behavior: "smooth" });
                  }
                }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "32px 1fr",
                  gap: 8,
                  padding: "10px 0",
                  cursor: "pointer",
                  borderTop: "1px solid var(--hairline)",
                  color:
                    activeGroup === g.n ? "var(--ink)" : "var(--ink-3)",
                  transition: "color 120ms",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color:
                      activeGroup === g.n
                        ? "var(--oxide)"
                        : "var(--ink-4)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {g.n}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    fontWeight: activeGroup === g.n ? 500 : 400,
                  }}
                >
                  {g.title}
                </span>
              </a>
            ))}
          </aside>

          {/* ACCORDIONS */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 64,
            }}
          >
            {groups.map((g) => (
              <FAQGroup key={g.n} group={g} />
            ))}

            {/* Bottom CTA */}
            <div
              style={{
                padding: 32,
                background: "var(--paper)",
                border: "1px solid var(--hairline)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 26,
                    fontWeight: 400,
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Didn't find your answer?
                </h3>
                <a
                  href="mailto:hello@elmstandard.com"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 16,
                    color: "var(--ink)",
                    marginTop: 8,
                    display: "inline-block",
                  }}
                >
                  hello@elmstandard.com
                </a>
              </div>
              <Link href="/quote" className="btn-primary">
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FAQGroup({ group }: { group: Group }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id={`group-${group.n}`} style={{ scrollMarginTop: 96 }}>
      <header
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          paddingBottom: 16,
          borderBottom: "1.5px solid var(--ink)",
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 14,
            color: "var(--oxide)",
            letterSpacing: "0.08em",
          }}
        >
          {group.n}
        </span>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 32,
            fontWeight: 400,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {group.title}
        </h2>
      </header>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {group.qa.map(([q, a], i) => (
          <FAQItem
            key={q}
            q={q}
            a={a}
            open={open === i}
            onToggle={() => setOpen(open === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}

function FAQItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--hairline)" }}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: "100%",
          textAlign: "left",
          background: hover ? "var(--paper)" : "transparent",
          border: "none",
          padding: "20px 0",
          display: "grid",
          gridTemplateColumns: "1fr 32px",
          gap: 16,
          alignItems: "baseline",
          cursor: "pointer",
          transition: "background 120ms, padding 220ms",
          paddingLeft: hover || open ? 12 : 0,
          paddingRight: hover || open ? 12 : 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 21,
            fontWeight: 400,
            color: "var(--ink)",
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
          }}
        >
          {q}
        </span>
        <span
          aria-hidden
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 18,
            color: open ? "var(--oxide)" : "var(--ink-3)",
            textAlign: "right",
            justifySelf: "end",
            minWidth: 16,
            transition:
              "transform 220ms cubic-bezier(0.2,0.6,0.2,1), color 120ms",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            display: "inline-block",
            lineHeight: 1,
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? 600 : 0,
          overflow: "hidden",
          transition:
            "max-height 320ms cubic-bezier(0.2,0.6,0.2,1), padding 220ms",
          paddingLeft: open ? 12 : 0,
          paddingRight: open ? 12 : 0,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 18,
            lineHeight: 1.6,
            color: "var(--ink-2)",
            margin: 0,
            padding: "0 0 24px 0",
            maxWidth: 680,
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}
