import { loadPricingConfig } from "@/lib/pricing-server";
import { Configurator, type GalleryItem } from "@/app/quote/configurator";

export const metadata = {
  title: "Modern radiator cover — Elm Standard",
  description:
    "Wide rails, minimal detail. Built to your radiator's exact size, with a steel screen, your trim color, and local install or flat-pack shipping.",
};
export const dynamic = "force-dynamic";

const GALLERY: GalleryItem[] = [
  {
    src: "/style-modern.svg",
    alt: "Modern radiator cover, front elevation",
  },
];

export default async function ModernPage() {
  const { config: pricing } = await loadPricingConfig();
  return (
    <Configurator
      pricing={pricing}
      lockedStyle="modern"
      gallery={GALLERY}
      tagline="Wide rails, minimal detail. The cleanest of the three — built for newer interiors and rooms where the cover should disappear, not announce itself."
    />
  );
}
