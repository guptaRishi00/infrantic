import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { SectionHeading } from "@/shared/ui/section-heading";
import type { Benefit, BenefitsContent } from "../benefits.types";
import {
  BoardsVisual,
  CollaborationVisual,
  ReviewsVisual,
  TrackingVisual,
} from "./benefit-visuals";

// Bento placement per visual on large screens.
const placement: Record<Benefit["visual"], string> = {
  collaboration: "lg:row-span-2",
  boards: "",
  reviews: "",
  tracking: "lg:col-span-2",
};

export function Benefits({ content }: { content: BenefitsContent }) {
  const visuals: Record<Benefit["visual"], ReactNode> = {
    collaboration: <CollaborationVisual people={content.collaborators} />,
    boards: <BoardsVisual />,
    reviews: <ReviewsVisual />,
    tracking: <TrackingVisual />,
  };

  return (
    <section
      id="features"
      aria-labelledby="benefits-title"
      className="scroll-mt-24 px-4 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="benefits-title"
          title={content.title}
          description={content.description}
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.benefits.map((benefit) => (
            <li
              key={benefit.id}
              className={cn(
                "flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-2 shadow-[0_1px_2px_rgb(0_0_0/0.03)]",
                placement[benefit.visual],
              )}
            >
              <div className="flex-1">{visuals[benefit.visual]}</div>
              <div className="px-3 pt-4 pb-3">
                <h3 className="text-[15px] font-semibold tracking-tight text-zinc-950">
                  {benefit.title}
                </h3>
                <p className="mt-1 max-w-sm text-sm leading-6 text-zinc-500">
                  {benefit.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
