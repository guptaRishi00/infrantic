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
      className="scroll-mt-24 bg-ink px-4 py-24 sm:py-28"
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

      <div className="mx-auto mt-16 max-w-[80rem] pl-6 pr-[1.125rem]">
        <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory">
          <ServiceList services={content.services} />
        </div>
      </div>
    </section>
  );
}

function ServiceList({
  services,
}: {
  services: readonly Service[];
}) {
  return (
    <ul className="flex shrink-0">
      {services.map((service) => {
        const Icon = icons[service.icon];
        const headingId = `service-${service.id}`;
        return (
          <li
            key={service.id}
            className="w-[20rem] shrink-0 pr-6 sm:w-[24rem] snap-start"
          >
            <article
              aria-labelledby={headingId}
              className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-colors duration-500 hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-700 hover:border-transparent"
            >
              <div className="flex items-center justify-between">
                <div className="relative flex size-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition-colors duration-500 group-hover:bg-white/10 group-hover:ring-white/20">
                  <Icon
                    aria-hidden="true"
                    className="absolute inset-0 m-auto size-6 transition-opacity duration-500 group-hover:opacity-0"
                    strokeWidth={1.75}
                    stroke={GRADIENT_STROKE}
                  />
                  <Icon
                    aria-hidden="true"
                    className="absolute inset-0 m-auto size-6 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    strokeWidth={1.75}
                  />
                </div>
                <span className="text-[13px] font-semibold tracking-widest text-zinc-500 transition-colors duration-500 group-hover:text-blue-200">
                  {service.number}
                </span>
              </div>
              <h3
                id={headingId}
                className="mt-8 text-2xl font-semibold tracking-tight text-white transition-colors duration-500"
              >
                {service.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-zinc-400 transition-colors duration-500 group-hover:text-blue-50/90">
                {service.description}
              </p>
              <ul className="mt-8 flex-1 space-y-4 border-t border-white/10 pt-8 transition-colors duration-500 group-hover:border-white/20">
                {service.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex items-start gap-3 text-[15px] text-zinc-300 transition-colors duration-500 group-hover:text-white"
                  >
                    <div className="relative mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition-colors duration-500 group-hover:bg-white/20 group-hover:ring-white/30">
                      <Check
                        aria-hidden="true"
                        className="absolute inset-0 m-auto size-3 transition-opacity duration-500 group-hover:opacity-0"
                        stroke={GRADIENT_STROKE}
                        strokeWidth={3}
                      />
                      <Check
                        aria-hidden="true"
                        className="absolute inset-0 m-auto size-3 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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
