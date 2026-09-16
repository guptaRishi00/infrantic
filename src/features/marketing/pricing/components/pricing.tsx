import { cn } from "@/shared/lib/cn";
import { ButtonLink } from "@/shared/ui/button-link";
import { CheckIcon } from "@/shared/ui/icons";
import { SectionHeading } from "@/shared/ui/section-heading";
import type { PricingContent, PricingPlan } from "../pricing.types";
import { BillingSwitch } from "./billing-switch";

const planIcons: Record<PricingPlan["id"], string> = {
  solo: "M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5 6.5C3 11.5 5.2 10 8 10s5 1.5 5 4.5Z",
  team: "M5.5 7a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm5.5 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM1 14c0-2.8 2-4.5 4.5-4.5S10 11.2 10 14Zm10.2 0c0-1.8-.6-3.3-1.7-4.3.5-.2 1-.2 1.5-.2 2.2 0 4 1.5 4 4.5Z",
  studio: "M2 5.5 8 2l6 3.5v5L8 14l-6-3.5Zm6 1.8 4-2.3M8 7.3 4 5M8 7.3V12",
};

export function Pricing({ content }: { content: PricingContent }) {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="scroll-mt-24 px-4 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="pricing-title"
          title={content.title}
          description={content.description}
        />
        <div className="mt-10">
          <BillingSwitch
            labels={content.periodLabels}
            yearlyNote={content.yearlyNote}
          >
            <ul className="mx-auto mt-12 grid max-w-5xl items-center gap-4 lg:grid-cols-3">
              {content.plans.map((plan) => (
                <li key={plan.id}>
                  <PlanCard plan={plan} unitLabel={content.unitLabel} />
                </li>
              ))}
            </ul>
          </BillingSwitch>
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  plan,
  unitLabel,
}: {
  plan: PricingPlan;
  unitLabel: string;
}) {
  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={cn(
        "flex flex-col rounded-3xl border bg-white p-6",
        plan.featured
          ? "border-zinc-200 shadow-[0_32px_64px_-32px_rgb(24_24_27/0.35)] lg:py-9"
          : "border-zinc-200/70 bg-zinc-50/50",
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg bg-zinc-950 text-white">
          <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
            <path
              d={planIcons[plan.id]}
              fill={plan.id === "studio" ? "none" : "currentColor"}
              stroke={plan.id === "studio" ? "currentColor" : "none"}
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 id={`plan-${plan.id}`} className="font-semibold text-zinc-950">
          {plan.name}
        </h3>
        {plan.featured ? (
          <span className="ml-auto rounded-full bg-violet-100 px-2 py-0.5 text-[11px] font-medium text-violet-700">
            Popular
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-sm text-zinc-500">{plan.description}</p>

      <p className="mt-6 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tracking-tight text-zinc-950 tabular-nums">
          <span className="group-data-[billing=yearly]/billing:hidden">
            ${plan.price.monthly}
          </span>
          <span className="hidden group-data-[billing=yearly]/billing:inline">
            ${plan.price.yearly}
          </span>
        </span>
        <span className="text-sm text-zinc-500">{unitLabel}</span>
      </p>

      <ul className="mt-6 space-y-2.5 border-t border-zinc-100 pt-6">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm text-zinc-600"
          >
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-violet-600" />
            {feature}
          </li>
        ))}
      </ul>

      <ButtonLink
        href={plan.cta.href}
        variant={plan.featured ? "primary" : "secondary"}
        className="mt-8 w-full"
        aria-label={`${plan.cta.label} with ${plan.name}`}
      >
        {plan.cta.label}
      </ButtonLink>
    </article>
  );
}
