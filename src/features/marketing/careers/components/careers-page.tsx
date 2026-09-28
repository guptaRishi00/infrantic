import { CtaBand, getCtaContent } from "@/features/marketing/cta";
import {
  FeatureGrid,
  PageHero,
  SplitSection,
  Steps,
} from "@/features/marketing/page-blocks";
import { getCareersContent } from "../careers.data";
import { OpenRoles } from "./open-roles";

export function CareersPage() {
  const content = getCareersContent();
  return (
    <>
      <PageHero content={content.hero} />
      <FeatureGrid content={content.why} />
      <OpenRoles
        eyebrow={content.rolesEyebrow}
        title={content.rolesTitle}
        description={content.rolesDescription}
        applyLabel={content.applyLabel}
        introduceCta={content.introduceCta}
        roles={content.roles}
      />
      <SplitSection content={content.dayToDay} />
      <Steps content={content.hiring} />
      <CtaBand content={getCtaContent()} />
    </>
  );
}
