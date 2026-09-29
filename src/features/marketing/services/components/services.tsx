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

// Lucide strokes are single-colour; they take the brand gradient by pointing
// `stroke` at one shared <linearGradient> (BrandIconGradient, rendered once
// per section). userSpaceOnUse in the 24×24 icon space keeps straight lines,
// whose bounding box has zero width, painted.
const GRADIENT_ID = "services-icon-gradient";
const GRADIENT_STROKE = `url(#${GRADIENT_ID})`;

function BrandIconGradient() {
  return (
    <svg aria-hidden="true" className="absolute size-0">
      <defs>
        <linearGradient
          id={GRADIENT_ID}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="24"
          y2="24"
        >
          <stop offset="0" style={{ stopColor: "var(--color-brand-from)" }} />
          <stop offset="1" style={{ stopColor: "var(--color-brand-to)" }} />
        </linearGradient>
      </defs>
    </svg>
  );
}

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
      className="scroll-mt-24 bg-ink px-4 py-16 sm:py-28"
    >
      <BrandIconGradient />
      {/* Same container as the Problem section. */}
      <div className="mx-auto max-w-[80rem]">
        <p className="text-center text-[15px] font-medium text-brand-300">
          {content.eyebrow}
        </p>
        <SectionHeading
          id="services-title"
          title={content.title}
          description={content.description}
          align="center"
          tone="dark"
          className="mt-3"
        />
      </div>

      {/* Edge-to-edge infinite marquee: -mx-4 cancels the section's px-4. The
          list is rendered twice and the track slides -50% (transform only, so
          it runs on the compositor). Each card carries its own right padding
          (not flex gap) so both halves are exactly equal. Pauses on hover.
          Reduced motion: one manually scrollable row. */}
      <div className="-mx-4 mt-16 overflow-hidden motion-reduce:overflow-x-auto">
        <div
          className="flex w-max hover:[animation-play-state:paused] motion-safe:animate-marquee"
          style={{ animationDuration: "60s" }}
        >
          <ServiceList services={content.services} />
          <ServiceList
            services={content.services}
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
  className,
  decorative = false,
}: {
  services: readonly Service[];
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
          <li key={service.id} className="w-[20rem] shrink-0 pr-6 sm:w-[24rem]">
            <article
              aria-labelledby={headingId}
              className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <Icon
                    aria-hidden="true"
                    className="size-6"
                    strokeWidth={1.75}
                    stroke={GRADIENT_STROKE}
                  />
                </div>
                <span className="text-[13px] font-semibold tracking-widest text-zinc-500">
                  {service.number}
                </span>
              </div>
              <h3
                id={headingId}
                className="mt-8 text-2xl font-semibold tracking-tight text-white"
              >
                {service.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">
                {service.description}
              </p>
              <ul className="mt-8 flex-1 space-y-4 border-t border-white/10 pt-8">
                {service.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex items-start gap-3 text-[15px] text-zinc-300"
                  >
                    <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                      <Check
                        aria-hidden="true"
                        className="size-3"
                        stroke={GRADIENT_STROKE}
                        strokeWidth={3}
                      />
                    </div>
                    <span className="leading-snug">{capability}</span>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
