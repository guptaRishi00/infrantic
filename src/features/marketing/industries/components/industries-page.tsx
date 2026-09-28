import { CtaBand, getCtaContent } from "@/features/marketing/cta";
import { Faq } from "@/features/marketing/faq";
import {
  FeatureGrid,
  PageHero,
  SplitSection,
} from "@/features/marketing/page-blocks";
import { getIndustriesContent } from "../industries.data";

export function IndustriesPage() {
  const content = getIndustriesContent();
  return (
    <>
      <PageHero content={content.hero} />
      <FeatureGrid content={content.sectors} />
      <SplitSection content={content.threads} />
      <FeatureGrid content={content.functions} />
      <SplitSection content={content.control} />
      <Faq content={content.faq} />
      <CtaBand content={getCtaContent()} />
    </>
  );
}
