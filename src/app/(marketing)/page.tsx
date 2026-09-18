import { Approach, getApproachContent } from "@/features/marketing/approach";
import { CtaBand, getCtaContent } from "@/features/marketing/cta";
import { getHeroContent, Hero } from "@/features/marketing/hero";
import {
  getIntegrationsContent,
  Integrations,
} from "@/features/marketing/integrations";
import { getProblemContent, Problem } from "@/features/marketing/problem";
import { getServicesContent, Services } from "@/features/marketing/services";
import {
  getWhatWeBuildContent,
  WhatWeBuild,
} from "@/features/marketing/what-we-build";
import { getWorkContent, Work } from "@/features/marketing/work";
import { getWorkflowContent, Workflow } from "@/features/marketing/workflow";

// Statically prerendered: no request-time APIs are read on this route.
// The page composes sections; each feature owns its content and markup.
// Order: problem → what we build → selected work → process → services →
// stack → philosophy → contact.
export default function HomePage() {
  return (
    <>
      <Hero content={getHeroContent()} />
      <Problem content={getProblemContent()} />
      <WhatWeBuild content={getWhatWeBuildContent()} />
      <Work content={getWorkContent()} />
      <Workflow content={getWorkflowContent()} />
      <Services content={getServicesContent()} />
      <Integrations content={getIntegrationsContent()} />
      <Approach content={getApproachContent()} />
      <CtaBand content={getCtaContent()} />
    </>
  );
}
