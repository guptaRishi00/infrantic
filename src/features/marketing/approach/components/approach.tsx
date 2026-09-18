import {
  Brain,
  Check,
  Crosshair,
  HeartHandshake,
  type LucideIcon,
  Wrench,
  X,
} from "lucide-react";
import { SectionHeading } from "@/shared/ui/section-heading";
import type { ApproachContent } from "../approach.types";

const traitIcons: Record<
  ApproachContent["personality"][number]["icon"],
  LucideIcon
> = {
  intelligent: Brain,
  precise: Crosshair,
  practical: Wrench,
  human: HeartHandshake,
};

export function Approach({ content }: { content: ApproachContent }) {
  const { difference, philosophy } = content;

  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="scroll-mt-24 px-4 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[88rem]">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm font-medium text-brand-700">
            {content.eyebrow}
          </p>
          <SectionHeading
            id="approach-title"
            title={content.title}
            description={content.description}
            className="mt-3"
          />
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <article className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8">
            <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
              {difference.label}
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink">
              {difference.title}
            </h3>

            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3 rounded-2xl bg-zinc-50 p-4">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-zinc-200 text-zinc-500">
                  <X aria-hidden="true" className="size-4" />
                </span>
                <p className="text-sm text-zinc-500">
                  {difference.notAsked.lead}
                  <span className="mt-1 block text-base text-zinc-400 line-through decoration-zinc-300">
                    &ldquo;{difference.notAsked.question}&rdquo;
                  </span>
                </p>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-brand-50 p-4 ring-1 ring-brand-100">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink text-white">
                  <Check aria-hidden="true" className="size-4" />
                </span>
                <p className="text-sm text-ink/70">
                  {difference.asked.lead}
                  <span className="mt-1 block text-base font-semibold text-ink">
                    &ldquo;{difference.asked.question}&rdquo;
                  </span>
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-6 text-zinc-600">
              {difference.answer}
            </p>
            <p className="mt-auto pt-6 text-sm font-medium text-ink">
              {difference.outcome}
            </p>
          </article>

          <article className="flex flex-col rounded-3xl bg-[radial-gradient(120%_90%_at_100%_0%,#047efd_0%,#0c2f55_45%,#021c37_100%)] p-6 text-white sm:p-8">
            <p className="text-xs font-medium tracking-wide text-brand-200/70 uppercase">
              {philosophy.label}
            </p>
            <h3 className="mt-3 max-w-[24ch] text-2xl font-semibold tracking-[-0.03em] text-balance sm:text-3xl">
              {philosophy.title}
            </h3>
            <p className="mt-5 text-sm leading-6 text-brand-100/80">
              {philosophy.description}
            </p>
            <p className="mt-6 text-sm font-medium text-white">
              {philosophy.closing}
            </p>
            <ul className="mt-auto grid gap-2 pt-8 sm:grid-cols-2">
              {philosophy.principles.map((principle) => (
                <li
                  key={principle}
                  className="rounded-xl bg-white/10 px-4 py-3 text-sm font-medium ring-1 ring-white/10"
                >
                  {principle}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.personality.map((item) => {
            const Icon = traitIcons[item.icon];
            return (
              <li
                key={item.trait}
                className="flex gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-zinc-100 text-zinc-800">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <div>
                  <p className="font-semibold tracking-tight text-ink">
                    {item.trait}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-zinc-500">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
