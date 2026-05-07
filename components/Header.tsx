"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Wordmark from "./Wordmark";

const NAV: Array<{ label: string; href: string }> = [
  { label: "Three styles", href: "/styles" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--bone)",
        borderBottom: "1px solid var(--hairline)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 32px",
        }}
      >
        <Link href="/" aria-label="Elm Standard — home">
          <Wordmark size={20} />
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {NAV.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  fontWeight: active ? 500 : 400,
                  color: active ? "var(--ink)" : "var(--ink-2)",
                  letterSpacing: "0.02em",
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
