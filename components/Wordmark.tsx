"use client";

import { useEffect, useRef, useState } from "react";

type WordmarkProps = {
  size?: number;
  color?: string;
  tickColor?: string;
};

/**
 * Petrona-800 ELM STANDARD lockup with auto-measured end-tick rule.
 * The rule below the wordmark spans the wordmark exactly, with serifed
 * end-ticks that mirror the typographic tracking.
 */
export default function Wordmark({
  size = 22,
  color = "var(--ink)",
  tickColor,
}: WordmarkProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [w, setW] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (ref.current) setW(ref.current.offsetWidth);
    };
    measure();
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measure);
    }
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [size]);

  const tc = tickColor ?? color;
  const ruleH = Math.max(6, Math.round(size * 0.28));
  const sw = Math.max(1, size / 22);
  const trailingTrim = size * 0.32;
  const ruleW = Math.max(0, w - trailingTrim);

  return (
    <span
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: Math.max(4, size * 0.28),
      }}
    >
      <span
        ref={ref}
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: size,
          fontWeight: 800,
          letterSpacing: "0.32em",
          color,
          whiteSpace: "nowrap",
          display: "inline-block",
          lineHeight: 1,
          marginRight: -trailingTrim,
        }}
      >
        ELM&nbsp;STANDARD
      </span>
      {ruleW > 0 ? (
        <svg
          width={ruleW}
          height={ruleH}
          viewBox={`0 0 ${ruleW} ${ruleH}`}
          style={{ display: "block" }}
        >
          <line
            x1={sw / 2}
            y1="0"
            x2={sw / 2}
            y2={ruleH}
            stroke={tc}
            strokeWidth={sw}
          />
          <line
            x1={ruleW - sw / 2}
            y1="0"
            x2={ruleW - sw / 2}
            y2={ruleH}
            stroke={tc}
            strokeWidth={sw}
          />
          <line
            x1={sw / 2}
            y1={ruleH / 2}
            x2={ruleW - sw / 2}
            y2={ruleH / 2}
            stroke={tc}
            strokeWidth={sw}
          />
        </svg>
      ) : null}
    </span>
  );
}
