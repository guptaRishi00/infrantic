import { cn } from "@/shared/lib/cn";
import { IntegrationLogo } from "@/shared/ui/integration-logo";
import type { StackShowcaseContent } from "../page-blocks.types";
import { BlockHeading } from "./block-heading";

/**
 * Tools grouped by category, as a static grid of logo chips (the home page's
 * Technology section is an animated orbit). On phones the groups become a
 * self-moving marquee of cards, as in the home Technology section.
 */
export function StackShowcase({ content }: { content: StackShowcaseContent }) {
  const dark = content.tone === "dark";
  const headingId = `${content.id}-title`;
  return (
    <section
      id={content.id}
      aria-labelledby={headingId}
      className={cn(
        "scroll-mt-24 px-4 py-16 sm:py-28",
        dark ? "bg-ink" : "bg-white",
      )}
    >
      <div className="mx-auto max-w-[80rem]">
        <BlockHeading
          id={headingId}
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          tone={content.tone}
        />
        <div
          className={cn(
            "mt-12 grid gap-px overflow-hidden rounded-2xl border max-sm:hidden sm:grid-cols-2 lg:grid-cols-4",
            dark
              ? "border-white/10 bg-white/10"
              : "border-zinc-200/80 bg-zinc-200/80",
          )}
        >
          {content.groups.map((group) => (
            <div
              key={group.label}
              className={cn("p-6 sm:p-7", dark ? "bg-ink" : "bg-white")}
            >
              <StackGroupBody group={group} dark={dark} />
            </div>
          ))}
        </div>
        {/* Phones: the same groups as cards in a self-moving infinite marquee,
            like the home Technology section. Two copies, track slides -50%
            (transform only), per-card pr-4 (not gap) so the halves are equal;
            pauses on hover/touch; reduced motion gives one scrollable row. */}
        <div className="-mx-4 mt-12 overflow-hidden motion-reduce:overflow-x-auto sm:hidden">
          <div className="flex w-max hover:[animation-play-state:paused] motion-safe:animate-marquee">
            <StackCards
              groups={content.groups}
              dark={dark}
              className="motion-reduce:pl-4"
            />
            <StackCards
              groups={content.groups}
              dark={dark}
              className="motion-reduce:hidden"
              decorative
            />
          </div>
        </div>
        {content.footnote ? (
          <p
            className={cn(
              // Phones: -mb-1.5 takes out the space under the last line's baseline
              // (section rhythm measures to the visible text).
              "mt-6 text-[15px] max-sm:-mb-1.5",
              dark ? "text-zinc-400" : "text-zinc-500",
            )}
          >
            {content.footnote}
          </p>
        ) : null}
      </div>
    </section>
  );
}

type StackGroup = StackShowcaseContent["groups"][number];

function StackCards({
  groups,
  dark,
  className,
  decorative = false,
}: {
  groups: readonly StackGroup[];
  dark: boolean;
  className?: string;
  /** The duplicate copy exists only for the loop; hide it from assistive tech. */
  decorative?: boolean;
}) {
  return (
    <ul
      aria-hidden={decorative || undefined}
      className={cn("flex shrink-0", className)}
    >
      {groups.map((group) => (
        <li key={group.label} className="flex w-[17rem] shrink-0 pr-4">
          <div
            className={cn(
              "w-full rounded-2xl border p-6",
              dark
                ? "border-white/10 bg-white/[0.03]"
                : "border-zinc-200/80 bg-white",
            )}
          >
            <StackGroupBody group={group} dark={dark} />
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Group label plus its tools, each with a logo tile (a dot when none). */
function StackGroupBody({ group, dark }: { group: StackGroup; dark: boolean }) {
  return (
    <>
      <h3
        className={cn(
          "font-mono text-xs tracking-wide uppercase",
          dark ? "text-brand-300" : "text-brand-700",
        )}
      >
        {group.label}
      </h3>
      <ul className="mt-5 space-y-2.5">
        {group.items.map((item) => (
          <li
            key={item.name}
            className={cn(
              "flex items-center gap-3 text-[15px]",
              dark ? "text-zinc-200" : "text-zinc-700",
            )}
          >
            <span
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-lg",
                dark
                  ? "bg-white ring-1 ring-white/10"
                  : "bg-white ring-1 ring-zinc-200",
              )}
            >
              {item.logo ? (
                <IntegrationLogo
                  id={item.logo}
                  className="block size-4 [&>svg]:size-full"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-brand-gradient"
                />
              )}
            </span>
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
}
