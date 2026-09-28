import type { StatsContent } from "../page-blocks.types";
import { BlockHeading } from "./block-heading";

/** A row of large figures on ink. */
export function Stats({ content }: { content: StatsContent }) {
  const headingId = `${content.id}-title`;
  return (
    <section
      id={content.id}
      aria-labelledby={headingId}
      className="scroll-mt-24 bg-ink px-4 py-16 sm:py-28"
    >
      <div className="mx-auto max-w-[80rem]">
        <BlockHeading
          id={headingId}
          eyebrow={content.eyebrow}
          title={content.title}
          tone="dark"
          align="center"
        />
        <dl className="reveal mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {content.stats.map((stat) => (
            <div key={stat.label} className="bg-ink px-7 py-8">
              <dd className="w-fit bg-brand-gradient bg-clip-text text-4xl font-semibold tracking-tight text-transparent">
                {stat.value}
              </dd>
              <dt className="mt-2 text-[15px] leading-6 text-zinc-300">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
        {content.footnote ? (
          <p className="mt-6 text-center text-[13px] text-zinc-500">
            {content.footnote}
          </p>
        ) : null}
      </div>
    </section>
  );
}
