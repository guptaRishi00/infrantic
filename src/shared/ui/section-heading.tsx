import { cn } from "@/shared/lib/cn";

type SectionHeadingProps = {
  id: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
};

/** Standard section h2 + supporting copy. `id` is referenced by `aria-labelledby`. */
export function SectionHeading({
  id,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      <h2
        id={id}
        className="max-w-[20ch] text-3xl leading-[1.1] font-semibold tracking-[-0.035em] text-balance text-zinc-950 sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-md text-[15px] leading-6 text-pretty text-zinc-500">
          {description}
        </p>
      ) : null}
    </div>
  );
}
