"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Wordmark from "./Wordmark";

const NAV: Array<{ label: string; href: string }> = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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

        <nav className="nav-desktop">
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
        </nav>

        <button
          type="button"
          className="nav-mobile-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="bar" />
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav-panel"
          className="nav-mobile-panel"
          role="dialog"
          aria-label="Site navigation"
        >
          {NAV.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="nav-mobile-link"
                data-active={active ? "true" : "false"}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </header>
  );
}
