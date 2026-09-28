import { CtaBand, getCtaContent } from "@/features/marketing/cta";
import {
  FeatureGrid,
  PageHero,
  SplitSection,
  Steps,
} from "@/features/marketing/page-blocks";
import { getCaseStudiesContent } from "../case-studies.data";
import { CaseList } from "./case-list";
import { FeaturedCase } from "./featured-case";

export function CaseStudiesPage() {
  const content = getCaseStudiesContent();
  return (
    <>
      <PageHero content={content.hero} />
      <CaseList content={content.cases} />
      <FeaturedCase content={content.featured} />
      <FeatureGrid content={content.patterns} />
      <Steps content={content.build} />
      <SplitSection content={content.outcomes} />
      <CtaBand content={getCtaContent()} />
    </>
  );
}
