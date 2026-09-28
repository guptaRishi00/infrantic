import { cn } from "@/shared/lib/cn";
import { SectionHeading } from "@/shared/ui/section-heading";
import type { Tone } from "../page-blocks.types";

/** Eyebrow + SectionHeading in the house style, for every page block. */
export function BlockHeading({
  id,
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  titleWidth = "max-w-[24ch]",
  className,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  tone?: Tone;
  align?: "left" | "center";
  titleWidth?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <p
        className={cn(
          "text-[15px] font-medium",
          tone === "dark" ? "text-brand-300" : "text-brand-700",
        )}
      >
        {eyebrow}
      </p>
      <SectionHeading
        id={id}
        title={title}
        description={description}
        align={align}
        tone={tone}
        size="lg"
        titleWidth={titleWidth}
        className="mt-3"
      />
    </div>
  );
}
