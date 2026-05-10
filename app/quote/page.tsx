import { loadPricingConfig } from "@/lib/pricing-server";
import { Configurator } from "./configurator";

export const metadata = { title: "Configure your cover — Elm Standard" };
// Always read the latest pricing config — admin edits should reflect on
// the next request, not after a redeploy.
export const dynamic = "force-dynamic";

export default async function QuotePage() {
  const { config: pricing } = await loadPricingConfig();
  return <Configurator pricing={pricing} />;
}
