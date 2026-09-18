import { Plus } from "lucide-react";
import { SectionHeading } from "@/shared/ui/section-heading";
import type { FaqContent } from "../faq.types";

/**
 * FAQ accordion on native <details>/<summary>: keyboard and screen-reader
 * support with no client JS. The shared `name` makes it exclusive (opening
 * one closes the others) where supported; elsewhere they open independently.
 */
export function Faq({ content }: { content: FaqContent }) {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      // Shorter top padding on purpose: pulls the FAQ closer to the featured
      // project above it.
      className="scroll-mt-24 px-4 pt-12 pb-24 sm:pt-16 sm:pb-28"
    >
      <div className="mx-auto grid max-w-[88rem] gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-medium text-brand-700">
            {content.eyebrow}
          </p>
          <SectionHeading
            id="faq-title"
            title={content.title}
            description={content.description}
            align="left"
            size="lg"
            className="mt-3"
          />
        </div>

        <div className="divide-y divide-zinc-200 border-y border-zinc-200">
          {content.items.map((item, index) => (
            <details
              key={item.id}
              name="faq"
              open={index === 0}
              className="group"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-md py-5 text-left text-base font-semibold tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:text-lg [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus
                  aria-hidden="true"
                  className="size-5 shrink-0 text-zinc-500 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                />
              </summary>
              <p className="max-w-2xl pr-10 pb-6 text-[15px] leading-6 text-zinc-500">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
