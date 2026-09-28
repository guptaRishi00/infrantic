import { Check } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { ButtonLink } from "@/shared/ui/button-link";
import type { SplitSectionContent } from "../page-blocks.types";
import { BlockHeading } from "./block-heading";

/** Copy with check-points on one side, a labelled facts panel on the other. */
export function SplitSection({ content }: { content: SplitSectionContent }) {
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
      <div className="mx-auto grid max-w-[80rem] gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className={cn(content.reverse && "lg:order-2")}>
          <BlockHeading
            id={headingId}
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
            tone={content.tone}
          />
          {content.points?.length ? (
            <ul className="mt-8 space-y-3">
              {content.points.map((point) => (
                <li
                  key={point}
                  className={cn(
                    "flex gap-3 text-[15px] leading-6",
                    dark ? "text-zinc-300" : "text-zinc-700",
                  )}
                >
                  <span className="mt-1 grid size-4.5 shrink-0 place-items-center rounded-full bg-brand-gradient text-white">
                    <Check
                      aria-hidden="true"
                      className="size-3"
                      strokeWidth={3}
                    />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
          {content.cta ? (
            <ButtonLink
              href={content.cta.href}
              variant={dark ? "onDark" : "primary"}
              size="sm"
              className="mt-8"
            >
              {content.cta.label}
            </ButtonLink>
          ) : null}
        </div>

        <div
          className={cn(
            "reveal rounded-2xl border p-2",
            dark
              ? "border-white/10 bg-white/[0.03]"
              : "border-zinc-200/80 bg-zinc-50/60",
            content.reverse && "lg:order-1",
          )}
        >
          <p
            className={cn(
              "px-5 pt-4 pb-3 font-mono text-xs tracking-wide uppercase",
              dark ? "text-zinc-400" : "text-zinc-500",
            )}
          >
            {content.panel.label}
          </p>
          <dl
            className={cn(
              "divide-y rounded-xl border",
              dark
                ? "divide-white/10 border-white/10 bg-ink"
                : "divide-zinc-200/80 border-zinc-200/80 bg-white",
            )}
          >
            {content.panel.items.map((item) => (
              <div
                key={item.term}
                className="grid gap-1 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
              >
                <dt
                  className={cn(
                    "text-[15px] font-semibold",
                    dark ? "text-white" : "text-ink",
                  )}
                >
                  {item.term}
                </dt>
                <dd
                  className={cn(
                    "text-[15px] leading-6",
                    dark ? "text-zinc-300" : "text-zinc-600",
                  )}
                >
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
