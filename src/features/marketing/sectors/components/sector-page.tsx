import { CtaBand, getCtaContent } from "@/features/marketing/cta";
import { Faq } from "@/features/marketing/faq";
import {
  FeatureGrid,
  PageHero,
  SplitSection,
} from "@/features/marketing/page-blocks";
import { getSectorContent, type SectorSlug } from "../sectors.data";
import { HealthcareVisual } from "./visuals/healthcare-visual";
import { MarketingVisual } from "./visuals/marketing-visual";
import { TechVisual } from "./visuals/tech-visual";

// Each sector has its own bold hero illustration (deliberately not the shared
// flow diagram): a branching heartbeat, a circuit board, a campaign bullseye.
const visuals: Record<SectorSlug, () => React.JSX.Element> = {
  healthcare: HealthcareVisual,
  "tech-product-companies": TechVisual,
  marketing: MarketingVisual,
};

/** One layout for every sector; the content differs per slug. */
export function SectorPage({ slug }: { slug: SectorSlug }) {
  const content = getSectorContent(slug);
  const Visual = visuals[slug];
  return (
    <>
      <PageHero content={content.hero} aside={<Visual />} />
      <FeatureGrid content={content.friction} />
      <FeatureGrid content={content.systems} />
      <SplitSection content={content.approach} />
      <Faq content={content.faq} />
      <CtaBand content={getCtaContent()} />
    </>
  );
}
