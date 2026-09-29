import { CtaBand, getCtaContent } from "@/features/marketing/cta";
import { Faq } from "@/features/marketing/faq";
import {
  FeatureGrid,
  PageHero,
  SplitSection,
  StackShowcase,
} from "@/features/marketing/page-blocks";
import { getServicesContent } from "@/features/marketing/services";
import { getServicesPageContent } from "../services-page.data";
import { ServiceDetails } from "./service-details";

export function ServicesPage() {
  const content = getServicesPageContent();
  const services = getServicesContent();
  return (
    <>
      <PageHero content={content.hero} padBottom="pb-10 sm:pb-14" />
      <FeatureGrid content={content.focus} />
      <ServiceDetails
        eyebrow={content.detailsEyebrow}
        title={content.detailsTitle}
        description={content.detailsDescription}
        goalLabel={services.goalLabel}
        discussLabel={content.discussLabel}
        services={services.services}
      />
      <SplitSection content={content.engage} />
      <StackShowcase content={content.stack} />
      <FeatureGrid content={content.included} />
      <Faq content={content.faq} />
      <CtaBand content={getCtaContent()} />
    </>
  );
}
