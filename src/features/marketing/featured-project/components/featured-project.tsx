import {
  ArrowRight,
  Calculator,
  ClipboardCheck,
  Factory,
  FileText,
  type LucideIcon,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { ButtonLink } from "@/shared/ui/button-link";
import { SectionHeading } from "@/shared/ui/section-heading";
import type {
  FeaturedProjectContent,
  StepIcon,
} from "../featured-project.types";

const icons: Record<StepIcon, LucideIcon> = {
  order: FileText,
  costing: Calculator,
  procurement: ShoppingCart,
  readiness: ClipboardCheck,
  production: Factory,
  dispatch: Truck,
};

// Dashed "shared data" connectors, drawn as repeating gradients (no SVG). The
// 8px dash period matches the 8px flow-x/y shift, so the march loops cleanly;
// DASH_KEY is the still sample in the legend.
const DASH_KEY =
  "h-px bg-[repeating-linear-gradient(90deg,rgb(113_113_122/0.7)_0_4px,transparent_4px_8px)]";
const DASH_X = `${DASH_KEY} motion-safe:animate-flow-x`;
const DASH_Y =
  "w-px bg-[repeating-linear-gradient(180deg,rgb(113_113_122/0.7)_0_4px,transparent_4px_8px)] motion-safe:animate-flow-y";

/**
 * One featured client project: the before/structure/benefit story on the left
 * and its connected operating structure on the right. Steps are a real ordered
 * list; the connectors around them are decorative.
 */
export function FeaturedProject({
  content,
}: {
  content: FeaturedProjectContent;
}) {
  const { diagram } = content;

  return (
    <section
      id="featured-project"
      aria-labelledby="featured-project-title"
      className="scroll-mt-24 bg-white px-4 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[88rem]">
        <p className="text-sm font-medium text-brand-700">{content.eyebrow}</p>
        <SectionHeading
          id="featured-project-title"
          title={content.title}
          align="left"
          size="lg"
          titleWidth="max-w-[26ch]"
          className="mt-3"
        />

        <div className="mt-12 grid overflow-hidden rounded-2xl border border-zinc-200/80 lg:grid-cols-[22rem_1fr]">
          <div className="flex flex-col border-b border-zinc-200/80 bg-zinc-50/60 lg:border-r lg:border-b-0">
            <dl className="divide-y divide-zinc-200/80">
              {content.facts.map((fact) => (
                <div key={fact.number} className="flex gap-4 p-6 sm:p-7">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-zinc-300 bg-white font-mono text-[11px] text-zinc-600">
                    {fact.number}
                  </span>
                  <div>
                    <dt className="font-mono text-[11px] tracking-wide text-brand-700 uppercase">
                      {fact.label}
                    </dt>
                    <dd className="mt-2 text-sm leading-6 text-zinc-600">
                      {fact.body}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="mt-auto border-t border-zinc-200/80 p-6 sm:p-7">
              <ButtonLink href={content.cta.href} size="sm">
                {content.cta.label}
              </ButtonLink>
            </div>
          </div>

          {/* Graph-paper canvas; scrolls sideways on narrow screens so the six
              steps keep their proportions. */}
          <div className="overflow-x-auto bg-white bg-[linear-gradient(rgb(2_28_55/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(2_28_55/0.05)_1px,transparent_1px)] bg-size-[20px_20px] [scrollbar-width:thin]">
            <div className="flex h-full min-w-[46rem] flex-col px-6 py-8 sm:px-10">
              <p className="font-mono text-[11px] tracking-wide text-zinc-500 uppercase">
                {diagram.label}
              </p>

              {/* Vertically centred between the label and the legend. */}
              <div className="my-auto py-8">
                <div className="flex flex-col items-center">
                  <span className="rounded-lg border border-ink/20 bg-white px-4 py-2.5 text-sm font-semibold text-ink shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
                    {diagram.hub}
                  </span>
                  <span aria-hidden="true" className={cn("h-8", DASH_Y)} />
                </div>

                <ol className="relative grid grid-cols-6 gap-6 pt-6">
                  {/* Shared-data bus across the step centres (gap is 1.5rem),
                      in two halves so the data flows outward from the hub. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-0 right-1/2 left-[calc((100%-7.5rem)/12)]",
                      DASH_X,
                    )}
                    style={{ animationDirection: "reverse" }}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-0 right-[calc((100%-7.5rem)/12)] left-1/2",
                      DASH_X,
                    )}
                  />
                  {diagram.steps.map((step, index) => {
                    const Icon = icons[step.icon];
                    const last = index === diagram.steps.length - 1;
                    return (
                      <li key={step.id} className="relative">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute -top-6 left-1/2 h-6 -translate-x-1/2",
                            DASH_Y,
                          )}
                        />
                        <div className="relative flex h-full min-h-[7.5rem] flex-col items-center justify-center gap-2.5 rounded-lg border border-ink/20 bg-white px-2 pt-7 pb-4 text-center shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
                          <Icon
                            aria-hidden="true"
                            className="size-5 text-zinc-800"
                            strokeWidth={1.75}
                          />
                          <span className="text-xs leading-tight font-semibold text-balance text-ink">
                            {step.label}
                          </span>
                        </div>
                        {last ? null : (
                          <ArrowRight
                            aria-hidden="true"
                            className="absolute top-1/2 -right-5 size-4 -translate-y-1/2 text-ink"
                            strokeWidth={2}
                          />
                        )}
                      </li>
                    );
                  })}
                </ol>

                <div className="flex flex-col items-center">
                  <span aria-hidden="true" className={cn("h-8", DASH_Y)} />
                  <span className="rounded-lg border border-ink/20 bg-white px-4 py-2.5 text-sm font-semibold text-ink shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
                    {diagram.outcome}
                  </span>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="flex gap-6 text-[11px] text-zinc-500"
              >
                <span className="flex items-center gap-2">
                  <span className="h-px w-6 bg-ink" />
                  {diagram.legend.primary}
                </span>
                <span className="flex items-center gap-2">
                  <span className={cn("w-6", DASH_KEY)} />
                  {diagram.legend.feedback}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
