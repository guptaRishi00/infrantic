import { Check } from "lucide-react";
import { BlockHeading } from "@/features/marketing/page-blocks";
import type { Service } from "@/features/marketing/services/services.types";
import { ButtonLink } from "@/shared/ui/button-link";

type ServiceDetailsProps = {
  eyebrow: string;
  title: string;
  description: string;
  goalLabel: string;
  discussLabel: string;
  services: readonly Service[];
};

/** One anchored row per service line: what it covers, and the goal. */
export function ServiceDetails({
  eyebrow,
  title,
  description,
  goalLabel,
  discussLabel,
  services,
}: ServiceDetailsProps) {
  return (
    <section
      id="service-lines"
      aria-labelledby="service-lines-title"
      className="scroll-mt-24 px-4 pt-16 pb-12 sm:pt-28 sm:pb-20"
    >
      <div className="mx-auto max-w-[80rem]">
        <BlockHeading
          id="service-lines-title"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <ol className="mt-12 divide-y divide-zinc-200/80 rounded-2xl border border-zinc-200/80 bg-white">
          {services.map((service) => (
            <li
              key={service.id}
              id={service.id}
              className="group/card relative scroll-mt-28 grid gap-8 p-7 transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl hover:bg-zinc-50/80 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:p-10"
            >
              <div>
                <h3 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-6 text-zinc-600">
                  {service.description}
                </p>
                <ButtonLink
                  href="/contact"
                  size="sm"
                  stretched
                  className="mt-6"
                  aria-label={`${discussLabel}: ${service.title}`}
                >
                  {discussLabel}
                </ButtonLink>
              </div>
              <div>
                <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {service.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="flex items-start gap-2 text-[15px] text-zinc-700"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-brand-to"
                      />
                      {capability}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 rounded-xl bg-zinc-50 px-4 py-3 text-[15px] leading-6 text-zinc-700">
                  <span className="font-medium text-ink">{goalLabel}: </span>
                  {service.goal}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
