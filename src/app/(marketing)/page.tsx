import { Approach, getApproachContent } from "@/features/marketing/approach";
import { Benefits, getBenefitsContent } from "@/features/marketing/benefits";
import { CtaBand, getCtaContent } from "@/features/marketing/cta";
import { getHeroContent, Hero } from "@/features/marketing/hero";
import {
  getIntegrationsContent,
  Integrations,
} from "@/features/marketing/integrations";
import { getProblemContent, Problem } from "@/features/marketing/problem";
import { getWhatWeBuildContent, WhatWeBuild } from "@/features/marketing/what-we-build";
import { getWorkflowContent, Workflow } from "@/features/marketing/workflow";

// Statically prerendered: no request-time APIs are read on this route.
// The page composes sections; each feature owns its content and markup.
// Order follows the brief: problem → services → process → outcomes → stack →
// philosophy → contact.
export default function HomePage() {
  return (
    <>
      <Hero content={getHeroContent()} />
      <Problem content={getProblemContent()} />
      <WhatWeBuild content={getWhatWeBuildContent()} />
      <Workflow content={getWorkflowContent()} />
      <Benefits content={getBenefitsContent()} />
      <Integrations content={getIntegrationsContent()} />
      <Approach content={getApproachContent()} />
      <CtaBand content={getCtaContent()} />
    </>
  );
}
