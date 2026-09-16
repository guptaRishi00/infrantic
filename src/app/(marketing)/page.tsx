import { Benefits, getBenefitsContent } from "@/features/marketing/benefits";
import { CtaBand, getCtaContent } from "@/features/marketing/cta";
import { getHeroContent, Hero } from "@/features/marketing/hero";
import {
  getIntegrationsContent,
  Integrations,
} from "@/features/marketing/integrations";
import { getPricingContent, Pricing } from "@/features/marketing/pricing";
import {
  getTestimonialsContent,
  Testimonials,
} from "@/features/marketing/testimonials";
import { getUseCasesContent, UseCases } from "@/features/marketing/use-cases";
import { getWorkflowContent, Workflow } from "@/features/marketing/workflow";

// Statically prerendered: no request-time APIs are read on this route.
// The page composes sections; each feature owns its content and markup.
export default function HomePage() {
  return (
    <>
      <Hero content={getHeroContent()} />
      <Benefits content={getBenefitsContent()} />
      <Workflow content={getWorkflowContent()} />
      <UseCases content={getUseCasesContent()} />
      <Testimonials content={getTestimonialsContent()} />
      <Integrations content={getIntegrationsContent()} />
      <Pricing content={getPricingContent()} />
      <CtaBand content={getCtaContent()} />
    </>
  );
}
