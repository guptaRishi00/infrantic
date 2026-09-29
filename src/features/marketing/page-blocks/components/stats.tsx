import type { StatsContent } from "../page-blocks.types";
import { BlockHeading } from "./block-heading";
import { HeroStats } from "./hero-stats";

/** A row of large figures on ink (hero-stats design, dark variant). */
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
        {/* Same design as the inner-page hero stats, dark variant. */}
        <HeroStats stats={content.stats} tone="dark" className="mt-14" />
        {content.footnote ? (
          <p className="mt-6 text-center text-[13px] text-zinc-500">
            {content.footnote}
          </p>
        ) : null}
      </div>
    </section>
  );
}
