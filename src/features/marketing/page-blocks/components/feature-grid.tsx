import { cn } from "@/shared/lib/cn";
import { ButtonLink } from "@/shared/ui/button-link";
import { blockIcons } from "../block-icons";
import type { FeatureGridContent } from "../page-blocks.types";
import { BlockHeading } from "./block-heading";

/** Icon cards in a 2- or 3-column grid; light or ink. */
export function FeatureGrid({ content }: { content: FeatureGridContent }) {
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
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <BlockHeading
            id={headingId}
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
            tone={content.tone}
          />
          {content.cta ? (
            <ButtonLink
              href={content.cta.href}
              variant={dark ? "onDark" : "secondary"}
              className="self-start lg:self-auto"
            >
              {content.cta.label}
            </ButtonLink>
          ) : null}
        </div>

        <ul
          className={cn(
            "mt-12 grid gap-4",
            content.columns === 2
              ? "sm:grid-cols-2"
              : "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {content.items.map((item) => {
            const Icon = blockIcons[item.icon];
            return (
              <li
                key={item.id}
                className={cn(
                  "flex flex-col rounded-2xl border p-7 transition-transform duration-300 hover:-translate-y-1",
                  dark
                    ? "border-white/10 bg-white/[0.03]"
                    : "border-zinc-200/80 bg-white",
                )}
              >
                <span
                  className={cn(
                    "grid size-12 place-items-center rounded-xl ring-1",
                    dark
                      ? "bg-white/[0.06] text-white ring-white/10"
                      : "bg-zinc-100 text-zinc-800 ring-zinc-200",
                  )}
                >
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3
                  className={cn(
                    "mt-5 text-xl font-medium tracking-tight",
                    dark ? "text-white" : "text-ink",
                  )}
                >
                  {item.title}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-[15px] leading-6",
                    dark ? "text-zinc-300" : "text-zinc-600",
                  )}
                >
                  {item.description}
                </p>
                {item.tags?.length ? (
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className={cn(
                          "rounded-md border px-2 py-1 text-[13px]",
                          dark
                            ? "border-white/10 text-zinc-300"
                            : "border-zinc-200/80 bg-zinc-50 text-zinc-700",
                        )}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
