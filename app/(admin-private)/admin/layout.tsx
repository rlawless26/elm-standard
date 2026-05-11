import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";

export const metadata = { title: "Admin — Elm Standard" };
// Always read fresh data from Supabase and re-check the cookie at request time.
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return (
    <main style={{ padding: "48px 0 96px" }}>
      <div
        className="container"
        style={{ display: "flex", flexDirection: "column", gap: 32 }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            paddingBottom: 16,
            borderBottom: "1px solid var(--hairline)",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <span className="overline" style={{ color: "var(--oxide)" }}>
              ADMIN
            </span>
            <Link
              href="/admin/orders"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 22,
                fontWeight: 400,
                color: "var(--ink)",
                letterSpacing: "-0.01em",
              }}
            >
              Orders
            </Link>
            <Link
              href="/admin"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 22,
                fontWeight: 400,
                color: "var(--ink-3)",
                letterSpacing: "-0.01em",
              }}
            >
              Quote requests
            </Link>
            <Link
              href="/admin/pricing"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 22,
                fontWeight: 400,
                color: "var(--ink-3)",
                letterSpacing: "-0.01em",
              }}
            >
              Pricing
            </Link>
          </div>
          <form action="/admin/logout" method="post">
            <button
              type="submit"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                fontWeight: 500,
                background: "transparent",
                border: "none",
                color: "var(--ink-3)",
                cursor: "pointer",
                padding: 0,
                borderBottom: "1px solid var(--hairline)",
              }}
            >
              Sign out
            </button>
          </form>
        </header>
        {children}
      </div>
    </main>
  );
}
