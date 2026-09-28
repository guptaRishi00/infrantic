import { cn } from "@/shared/lib/cn";
import { IntegrationLogo } from "@/shared/ui/integration-logo";
import type { StackShowcaseContent } from "../page-blocks.types";
import { BlockHeading } from "./block-heading";

/**
 * Tools grouped by category, as a static grid of logo chips (the home page's
 * Technology section is an animated orbit; this one does not move).
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
            "reveal mt-12 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-4",
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
            </div>
          ))}
        </div>
        {content.footnote ? (
          <p
            className={cn(
              "mt-6 text-[15px]",
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
