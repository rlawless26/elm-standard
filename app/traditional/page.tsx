import { loadPricingConfig } from "@/lib/pricing-server";
import { Configurator, type GalleryItem } from "@/app/quote/configurator";

export const metadata = {
  title: "Traditional radiator cover — Elm Standard",
  description:
    "Decorative panel moulding and accents. Built to your radiator's exact size, with a steel screen, your trim color, and local install or flat-pack shipping.",
};
export const dynamic = "force-dynamic";

const GALLERY: GalleryItem[] = [
  {
    src: "/radiator-cover-isometric.png",
    alt: "Traditional radiator cover, isometric view",
  },
  {
    src: "/style-traditional.svg",
    alt: "Traditional radiator cover, front elevation",
  },
];

export default async function TraditionalPage() {
  const { config: pricing } = await loadPricingConfig();
  return (
    <Configurator
      pricing={pricing}
      lockedStyle="traditional"
      gallery={GALLERY}
      tagline="Decorative panel moulding and accents. The dressier of the three — at home in older houses, period kitchens, and rooms with existing trim."
    />
  );
}
