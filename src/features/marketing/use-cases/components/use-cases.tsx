import Link from "next/link";
import { ArrowRightIcon } from "@/shared/ui/icons";
import { SectionHeading } from "@/shared/ui/section-heading";
import type { UseCasesContent } from "../use-cases.types";
import { UseCaseArt } from "./use-case-art";

export function UseCases({ content }: { content: UseCasesContent }) {
  return (
    <section
      aria-labelledby="use-cases-title"
      className="border-y border-zinc-100 bg-zinc-50/60 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          id="use-cases-title"
          title={content.title}
          align="left"
        />
      </div>
      {/* Native scroll-snap carousel: no JS, keyboard-scrollable via focusable cards. */}
      <ul className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 px-[max(1rem,calc((100%_-_72rem)/2_+_1rem))] scroll-px-[max(1rem,calc((100%_-_72rem)/2_+_1rem))] [scrollbar-width:thin]">
        {content.useCases.map((useCase) => (
          <li
            key={useCase.id}
            className="w-[17rem] shrink-0 snap-start sm:w-[18.5rem]"
          >
            <Link
              href={useCase.href}
              className="group flex h-full flex-col rounded-2xl border border-zinc-200/80 bg-white p-2 transition-shadow duration-200 hover:shadow-[0_18px_40px_-24px_rgb(24_24_27/0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
            >
              <UseCaseArt kind={useCase.illustration} />
              <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
                <h3 className="text-[15px] font-semibold tracking-tight text-zinc-950">
                  {useCase.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  {useCase.description}
                </p>
                <span className="mt-6 flex items-center gap-2 text-sm font-medium text-zinc-900">
                  {content.linkLabel}
                  <span className="grid size-5 place-items-center rounded-full bg-zinc-950 text-white transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRightIcon className="size-3" />
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
