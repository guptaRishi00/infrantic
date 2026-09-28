import { CtaBand, getCtaContent } from "@/features/marketing/cta";
import { Faq } from "@/features/marketing/faq";
import {
  BeforeAfter,
  FeatureGrid,
  PageHero,
  SplitSection,
  Steps,
} from "@/features/marketing/page-blocks";
import { getChallengesContent } from "../challenges.data";
import { GapRows } from "./gap-rows";

export function ChallengesPage() {
  const content = getChallengesContent();
  return (
    <>
      <PageHero content={content.hero} />
      <GapRows content={content.gaps} />
      <BeforeAfter content={content.shift} />
      <FeatureGrid content={content.cost} />
      <SplitSection content={content.signs} />
      <Steps content={content.next} />
      <Faq content={content.faq} />
      <CtaBand content={getCtaContent()} />
    </>
  );
}
