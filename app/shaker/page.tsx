import { loadPricingConfig } from "@/lib/pricing-server";
import { Configurator, type GalleryItem } from "@/app/quote/configurator";

export const metadata = {
  title: "Shaker radiator cover — Elm Standard",
  description:
    "Clean lines, flat panels, no fuss. Built to your radiator's exact size, with a steel screen, your trim color, and local install or flat-pack shipping.",
};
export const dynamic = "force-dynamic";

const GALLERY: GalleryItem[] = [
  {
    src: "/style-shaker.svg",
    alt: "Shaker radiator cover, front elevation",
  },
];

export default async function ShakerPage() {
  const { config: pricing } = await loadPricingConfig();
  return (
    <Configurator
      pricing={pricing}
      lockedStyle="shaker"
      gallery={GALLERY}
      tagline="Clean lines, flat panels, no fuss. The most versatile of the three — at home in almost any room without competing with the rest of the millwork."
    />
  );
}
