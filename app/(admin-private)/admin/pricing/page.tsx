import { loadPricingConfig } from "@/lib/pricing-server";
import { PricingForm } from "./pricing-form";

export const metadata = { title: "Pricing — Admin" };

export default async function AdminPricingPage() {
  const { config, source } = await loadPricingConfig();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 17,
            color: "var(--ink-2)",
            margin: 0,
            lineHeight: 1.5,
            maxWidth: 640,
          }}
        >
          The /quote page reads these knobs to compute instant prices. Saving
          here updates the public site immediately — no redeploy needed.
        </p>
        {source === "default" ? (
          <div
            style={{
              marginTop: 16,
              background: "var(--paper)",
              border: "1px solid var(--oxide)",
              padding: 16,
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              color: "var(--ink)",
              lineHeight: 1.55,
              maxWidth: 720,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--oxide)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Showing defaults — table not yet created
            </div>
            <p style={{ margin: 0 }}>
              Run <code>supabase/schema.sql</code> in the Supabase SQL Editor
              to create the <code>pricing_config</code> table. Once it
              exists, edits saved here will persist. Until then, the public
              /quote page uses the default values shown below.
            </p>
          </div>
        ) : (
          <p
            style={{
              marginTop: 8,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--ink-3)",
              letterSpacing: "0.04em",
            }}
          >
            LAST UPDATED{" "}
            {config.updated_at
              ? new Date(config.updated_at).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })
              : "—"}
          </p>
        )}
      </div>

      <PricingForm initial={config} disabled={source === "default"} />
    </div>
  );
}
