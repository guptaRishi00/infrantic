import { ArrowRight } from "lucide-react";
import { BlockHeading, blockIcons } from "@/features/marketing/page-blocks";
import { FlowLine, FlowPacket } from "@/shared/ui/flow-line";
import type { FeaturedCaseContent } from "../case-studies.data";

/**
 * The garment-order project on ink: key facts, the six connected stages as a
 * numbered flow, and before/after. (The home page shows it as a white card
 * with a graph-paper diagram.) Static.
 */
export function FeaturedCase({ content }: { content: FeaturedCaseContent }) {
  return (
    <section
      id="featured"
      aria-labelledby="featured-title"
      className="scroll-mt-24 bg-ink px-4 py-16 sm:py-28"
    >
      <div className="mx-auto max-w-[80rem]">
        <BlockHeading
          id="featured-title"
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          tone="dark"
          titleWidth="max-w-[26ch]"
        />

        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {content.facts.map((fact) => (
            <div key={fact.label} className="bg-ink px-6 py-5">
              <dt className="font-mono text-xs tracking-wide text-brand-300 uppercase">
                {fact.label}
              </dt>
              <dd className="mt-2 text-[15px] leading-6 text-zinc-200">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="font-mono text-xs tracking-wide text-zinc-400 uppercase">
            {content.flowLabel}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-brand-300/40 bg-brand/10 px-3 py-1.5 text-[15px] font-medium text-brand-300">
            {content.hub}
          </p>
          <ol className="relative mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {/* Data moving through the stages, behind the cards (lg only).
                Clipped so the packet's travel never widens the page. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 top-1/2 hidden h-3 -translate-y-1/2 overflow-hidden lg:block"
            >
              <FlowLine
                horizontal
                color="rgb(124 198 255 / 0.5)"
                className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2"
              />
              <FlowPacket
                horizontal
                delay={0.4}
                style={{ left: 0, right: 0, top: "50%" }}
                dotClassName="shadow-[0_0_10px_2px_rgb(7_161_253/0.7)]"
              />
            </div>
            {content.stages.map((stage, index) => {
              const Icon = blockIcons[stage.icon];
              const last = index === content.stages.length - 1;
              return (
                <li key={stage.id} className="reveal relative">
                  <div className="flex h-full flex-col gap-3 rounded-xl border border-white/10 bg-ink p-4">
                    <span className="flex items-center justify-between">
                      <span className="font-mono text-[13px] text-brand-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Icon aria-hidden="true" className="size-5 text-white" />
                    </span>
                    <span className="text-[15px] leading-5 font-semibold text-white">
                      {stage.label}
                    </span>
                    <span className="text-[13px] leading-5 text-zinc-400">
                      {stage.detail}
                    </span>
                  </div>
                  {last ? null : (
                    <ArrowRight
                      aria-hidden="true"
                      className="absolute top-1/2 -right-3 z-10 hidden size-4 -translate-y-1/2 rounded-full bg-ink text-brand-300 lg:block"
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-7">
            <p className="font-mono text-xs tracking-wide text-zinc-400 uppercase">
              {content.before.label}
            </p>
            <ul className="mt-4 space-y-2.5">
              {content.before.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[15px] leading-6 text-zinc-300"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-zinc-500"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-brand-300/30 bg-brand/[0.06] p-7">
            <p className="font-mono text-xs tracking-wide text-brand-300 uppercase">
              {content.after.label}
            </p>
            <ul className="mt-4 space-y-2.5">
              {content.after.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[15px] leading-6 text-zinc-200"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-gradient"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
