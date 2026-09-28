import { CtaBand, getCtaContent } from "@/features/marketing/cta";
import {
  FeatureGrid,
  PageHero,
  SplitSection,
  StackShowcase,
  Stats,
} from "@/features/marketing/page-blocks";
import { getAboutContent } from "../about.data";

export function AboutPage() {
  const content = getAboutContent();
  return (
    <>
      <PageHero content={content.hero} />
      <SplitSection content={content.story} />
      <FeatureGrid content={content.beliefs} />
      <FeatureGrid content={content.different} />
      <SplitSection content={content.team} />
      <StackShowcase content={content.stack} />
      <Stats content={content.numbers} />
      <CtaBand content={getCtaContent()} />
    </>
  );
}
