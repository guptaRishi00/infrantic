import { cn } from "@/shared/lib/cn";

export type AvatarPerson = {
  name: string;
  initials: string;
  /** Tailwind gradient + text colour classes, e.g. `from-amber-200 to-orange-300 text-orange-900`. */
  tone: string;
};

/** Placeholder avatar until real photography exists. Decorative: pair it with visible name text. */
export function InitialsAvatar({
  person,
  className,
}: {
  person: AvatarPerson;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br text-xs font-semibold",
        person.tone,
        className,
      )}
    >
      {person.initials}
    </span>
  );
}
