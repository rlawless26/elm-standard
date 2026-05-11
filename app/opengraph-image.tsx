import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Elm Standard — Custom radiator covers, handbuilt to fit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: "#F4EFE6",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#6B6052",
          }}
        >
          Elm Standard
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#1F1B16",
              maxWidth: 980,
            }}
          >
            Radiator covers, handbuilt to fit.
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.4,
              color: "#3B342A",
              maxWidth: 880,
            }}
          >
            Three styles, three screens, your trim color. Built to your
            radiator&apos;s exact size.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.08em",
              color: "#6B6052",
            }}
          >
            elmstandard.com
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.08em",
              color: "#8C3A2A",
            }}
          >
            ✓ Made-to-fit guarantee
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
