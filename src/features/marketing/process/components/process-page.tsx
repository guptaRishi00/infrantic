import { CtaBand, getCtaContent } from "@/features/marketing/cta";
import { Faq } from "@/features/marketing/faq";
import {
  FeatureGrid,
  PageHero,
  SplitSection,
  Steps,
} from "@/features/marketing/page-blocks";
import { getProcessContent } from "../process.data";
import { EngagementTimeline } from "./engagement-timeline";

export function ProcessPage() {
  const content = getProcessContent();
  return (
    <>
      <PageHero content={content.hero} />
      <EngagementTimeline content={content.engagement} />
      <Steps content={content.stages} />
      <SplitSection content={content.yourSide} />
      <FeatureGrid content={content.principles} />
      <SplitSection content={content.afterLaunch} />
      <Faq content={content.faq} />
      <CtaBand content={getCtaContent()} />
    </>
  );
}
