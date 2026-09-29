import { Check, X } from "lucide-react";
import type { BeforeAfterContent } from "../page-blocks.types";
import { BlockHeading } from "./block-heading";

/** Two columns: how work runs today vs. how it runs connected. */
export function BeforeAfter({ content }: { content: BeforeAfterContent }) {
  const headingId = `${content.id}-title`;
  return (
    <section
      id={content.id}
      aria-labelledby={headingId}
      className="scroll-mt-24 px-4 py-16 sm:py-28"
    >
      <div className="mx-auto max-w-[80rem]">
        <BlockHeading
          id={headingId}
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          align="center"
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-7">
            <p className="font-mono text-xs tracking-wide text-zinc-500 uppercase">
              {content.before.label}
            </p>
            <ul className="mt-5 space-y-3">
              {content.before.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[15px] leading-6 text-zinc-600"
                >
                  <span className="mt-1 grid size-4.5 shrink-0 place-items-center rounded-full bg-zinc-200 text-zinc-600">
                    <X aria-hidden="true" className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-brand-200 bg-white p-7 shadow-[0_0_0_4px_rgb(7_150_254/0.06)]">
            <p className="font-mono text-xs tracking-wide text-brand-700 uppercase">
              {content.after.label}
            </p>
            <ul className="mt-5 space-y-3">
              {content.after.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[15px] leading-6 text-zinc-700"
                >
                  <span className="mt-1 grid size-4.5 shrink-0 place-items-center rounded-full bg-brand-gradient text-white">
                    <Check
                      aria-hidden="true"
                      className="size-3"
                      strokeWidth={3}
                    />
                  </span>
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
