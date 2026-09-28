import { BlockHeading } from "@/features/marketing/page-blocks";
import { FlowLine, FlowPacket } from "@/shared/ui/flow-line";
import type { EngagementTimelineContent } from "../process.data";

/**
 * A first engagement as six phases on a line: what happens, what you see at
 * the end of it, and how much of your time it takes. (The home page's
 * "How we work" is a tabbed panel with an animated flow.) Static.
 */
export function EngagementTimeline({
  content,
}: {
  content: EngagementTimelineContent;
}) {
  return (
    <section
      id="engagement"
      aria-labelledby="engagement-title"
      className="scroll-mt-24 bg-zinc-50/70 px-4 py-16 sm:py-28"
    >
      <div className="mx-auto max-w-[80rem]">
        <BlockHeading
          id="engagement-title"
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        <ol className="relative mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {/* Clipped track from the first dot to the last (dots are centred in six
              1rem-gapped columns); the packet's travel must not widen the page. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[0.4375rem] right-[calc((100%-5rem)/12)] left-[calc((100%-5rem)/12)] hidden h-3 -translate-y-1/2 overflow-hidden xl:block"
          >
            <FlowLine
              horizontal
              color="rgb(4 126 253 / 0.45)"
              className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2"
            />
            <FlowPacket
              horizontal
              style={{ left: 0, right: 0, top: "50%" }}
              dotClassName="shadow-[0_0_8px_2px_rgb(7_161_253/0.55)]"
            />
          </div>
          {content.phases.map((phase) => (
            <li key={phase.id} className="reveal relative flex flex-col">
              <span
                aria-hidden="true"
                className="relative z-10 mb-5 hidden size-3.5 self-center rounded-full border-2 border-white bg-brand-gradient shadow-[0_0_0_1px_rgb(4_126_253/0.4)] xl:block"
              />
              <div className="flex h-full flex-col rounded-2xl border border-zinc-200/80 bg-white p-5">
                <p className="font-mono text-xs tracking-wide text-brand-700 uppercase">
                  {phase.label}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">
                  {phase.title}
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-6 text-zinc-600">
                  {phase.description}
                </p>
                <dl className="mt-5 space-y-3 border-t border-zinc-100 pt-4 text-[13px] leading-5">
                  <div>
                    <dt className="text-zinc-500">{content.seeLabel}</dt>
                    <dd className="mt-0.5 font-medium text-ink">{phase.see}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">{content.timeLabel}</dt>
                    <dd className="mt-0.5 font-medium text-ink">
                      {phase.time}
                    </dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
