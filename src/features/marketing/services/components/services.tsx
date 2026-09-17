import {
  Bot,
  ChartLine,
  Check,
  LayoutDashboard,
  type LucideIcon,
  Network,
  Workflow,
} from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { SectionHeading } from "@/shared/ui/section-heading";
import type { Service, ServiceIcon, ServicesContent } from "../services.types";

const icons: Record<ServiceIcon, LucideIcon> = {
  ai: Bot,
  process: Workflow,
  software: LayoutDashboard,
  integrations: Network,
  data: ChartLine,
};

export function Services({ content }: { content: ServicesContent }) {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="scroll-mt-24 bg-ink px-4 py-24 sm:py-28"
    >
      {/* Same container as the Problem section. */}
      <div className="mx-auto max-w-[84rem]">
        <p className="text-sm font-medium text-brand-300">{content.eyebrow}</p>
        <SectionHeading
          id="services-title"
          title={content.title}
          description={content.description}
          align="left"
          tone="dark"
          className="mt-3"
        />
      </div>

      {/* Edge-to-edge infinite marquee: -mx-4 cancels the section's px-4. The list
          is rendered twice and the track slides -50%. Each card carries its own
          right padding (not flex gap) so both halves are exactly equal. Pauses on
          hover. Reduced motion: one manually scrollable row. */}
      <div className="-mx-4 mt-12 overflow-hidden motion-reduce:overflow-x-auto">
        <div
          className="flex w-max hover:[animation-play-state:paused] motion-safe:animate-marquee"
          style={{ animationDuration: "60s" }}
        >
          <ServiceList
            services={content.services}
            goalLabel={content.goalLabel}
          />
          <ServiceList
            services={content.services}
            goalLabel={content.goalLabel}
            className="motion-reduce:hidden"
            decorative
          />
        </div>
      </div>
    </section>
  );
}

function ServiceList({
  services,
  goalLabel,
  className,
  decorative = false,
}: {
  services: readonly Service[];
  goalLabel: string;
  className?: string;
  /** The duplicate copy exists only for the loop; hide it from assistive tech. */
  decorative?: boolean;
}) {
  return (
    <ul
      aria-hidden={decorative || undefined}
      className={cn("flex shrink-0", className)}
    >
      {services.map((service) => {
        const Icon = icons[service.icon];
        const headingId = decorative ? undefined : `service-${service.id}`;
        return (
          <li
            key={service.id}
            className="w-[19.5rem] shrink-0 pr-4 sm:w-[22rem]"
          >
            <article
              aria-labelledby={headingId}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-zinc-100 text-zinc-800 ring-1 ring-zinc-200">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <span className="text-sm font-medium text-zinc-300 tabular-nums">
                  {service.number}
                </span>
              </div>
              <h3
                id={headingId}
                className="mt-5 text-lg font-semibold tracking-tight text-ink"
              >
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {service.description}
              </p>
              <ul className="mt-5 flex-1 space-y-2 border-t border-zinc-100 pt-5">
                {service.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex items-start gap-2 text-sm text-zinc-700"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-zinc-800"
                    />
                    {capability}
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-xl bg-zinc-50 px-4 py-3 text-sm leading-6 text-zinc-700">
                <span className="font-medium text-ink">{goalLabel}: </span>
                {service.goal}
              </p>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
