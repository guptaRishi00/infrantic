import { cn } from "@/shared/lib/cn";
import type { StepsContent } from "../page-blocks.types";
import { BlockHeading } from "./block-heading";

/** Numbered steps down a connecting line, with what each one produces. */
export function Steps({ content }: { content: StepsContent }) {
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
      <div className="mx-auto grid max-w-[80rem] gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-start">
        <BlockHeading
          id={headingId}
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          tone={content.tone}
          className="lg:sticky lg:top-28"
        />
        <ol className="relative">
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-4 bottom-4 left-[1.1875rem] w-px",
              dark ? "bg-white/10" : "bg-zinc-200",
            )}
          />
          {/* Fills with the brand gradient as the list scrolls through view. */}
          <span
            aria-hidden="true"
            className="reveal-grow-y absolute top-4 bottom-4 left-[1.1875rem] w-px bg-[linear-gradient(to_bottom,#07a1fd,#047efd)]"
          />
          {content.steps.map((step) => (
            <li
              key={step.number}
              className="relative flex gap-6 pb-10 last:pb-0"
            >
              <span
                className={cn(
                  "relative z-10 grid size-10 shrink-0 place-items-center rounded-full border font-mono text-[13px]",
                  dark
                    ? "border-white/15 bg-ink text-brand-300"
                    : "border-zinc-200 bg-white text-ink",
                )}
              >
                {step.number}
              </span>
              <div className="pt-1.5">
                <h3
                  className={cn(
                    "text-xl font-semibold tracking-tight",
                    dark ? "text-white" : "text-ink",
                  )}
                >
                  {step.title}
                </h3>
                <p
                  className={cn(
                    "mt-2 max-w-xl text-[15px] leading-6",
                    dark ? "text-zinc-300" : "text-zinc-600",
                  )}
                >
                  {step.description}
                </p>
                {step.outputs?.length ? (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {step.outputs.map((output) => (
                      <li
                        key={output}
                        className={cn(
                          "rounded-md border px-2 py-1 text-[13px]",
                          dark
                            ? "border-white/10 text-zinc-300"
                            : "border-zinc-200/80 bg-zinc-50 text-zinc-700",
                        )}
                      >
                        {output}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
