import { cn } from "@/shared/lib/cn";

type SectionHeadingProps = {
  id: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  /** Use "dark" on ink backgrounds. */
  tone?: "light" | "dark";
  /** "lg" is a slightly larger title with a bit more space above the description. */
  size?: "md" | "lg";
  className?: string;
};

/** Standard section h2 + supporting copy. `id` is referenced by `aria-labelledby`. */
export function SectionHeading({
  id,
  title,
  description,
  align = "center",
  tone = "light",
  size = "md",
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
        className={cn(
          "max-w-[20ch] leading-[1.1] font-semibold tracking-[-0.035em] text-balance",
          size === "lg"
            ? "text-[2.125rem] sm:text-[2.625rem]"
            : "text-3xl sm:text-4xl",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-md text-[15px] leading-6 text-pretty",
            size === "lg" ? "mt-4" : "mt-3",
            tone === "dark" ? "text-zinc-400" : "text-zinc-500",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
