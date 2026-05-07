"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Wordmark from "./Wordmark";

const NAV: Array<{ label: string; href: string }> = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Styles", href: "/styles" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "var(--paper)",
        borderBottom: "1px solid var(--hairline)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        <Link
          href="/"
          aria-label="Elm Standard — home"
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          <Wordmark size={16} />
        </Link>

        <nav style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  color: active ? "var(--ink)" : "var(--ink-3)",
                  borderBottom: active
                    ? "1.5px solid var(--ink)"
                    : "1.5px solid transparent",
                  paddingBottom: 4,
                  transition: "color 120ms",
                }}
              >
                {label}
              </Link>
            );
          })}
          <Link href="/quote" className="btn-primary">
            Get a quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
