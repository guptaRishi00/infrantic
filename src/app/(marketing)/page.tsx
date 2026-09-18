import { CtaBand, getCtaContent } from "@/features/marketing/cta";
import { Faq, getFaqContent } from "@/features/marketing/faq";
import {
  FeaturedProject,
  getFeaturedProjectContent,
} from "@/features/marketing/featured-project";
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
// Order: problem → selected work → process → services → stack → what we build
// → featured project → FAQ → contact.
export default function HomePage() {
  return (
    <>
      <Hero content={getHeroContent()} />
      <Problem content={getProblemContent()} />
      <Work content={getWorkContent()} />
      <Workflow content={getWorkflowContent()} />
      <Services content={getServicesContent()} />
      <Integrations content={getIntegrationsContent()} />
      <WhatWeBuild content={getWhatWeBuildContent()} />
      <FeaturedProject content={getFeaturedProjectContent()} />
      <Faq content={getFaqContent()} />
      <CtaBand content={getCtaContent()} />
    </>
  );
}
