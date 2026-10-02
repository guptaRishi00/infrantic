import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BlockHeading } from "@/features/marketing/page-blocks";
import type { Cta } from "@/shared/types";
import { SnapRail } from "@/shared/ui/snap-rail";
import type { Role } from "../careers.data";

type OpenRolesProps = {
  eyebrow: string;
  title: string;
  description: string;
  applyLabel: string;
  /** Where every role row applies (the contact section for now). */
  introduceCta: Cta;
  roles: readonly Role[];
};

/** Role list on ink; every row applies via the contact section for now. */
export function OpenRoles({
  eyebrow,
  title,
  description,
  applyLabel,
  introduceCta,
  roles,
}: OpenRolesProps) {
  return (
    <section
      id="roles"
      aria-labelledby="roles-title"
      className="scroll-mt-24 bg-ink px-4 py-16 sm:py-28"
    >
      <div className="mx-auto max-w-[80rem]">
        <BlockHeading
          id="roles-title"
          eyebrow={eyebrow}
          title={title}
          description={description}
          tone="dark"
        />
        {/* Phones: one bordered card per role in a swipe rail (like home What
            we build). */}
        <SnapRail
          label={title}
          tone="dark"
          className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] max-sm:gap-4 max-sm:rounded-none max-sm:border-0 max-sm:bg-transparent sm:divide-y sm:divide-white/10"
        >
          {roles.map((role) => (
            <li
              key={role.id}
              className="overflow-hidden first:rounded-t-[15px] last:rounded-b-[15px] max-sm:rounded-2xl max-sm:border max-sm:border-white/10 max-sm:bg-white/[0.03]"
            >
              <Link
                href={introduceCta.href}
                aria-label={`${applyLabel}: ${role.title}`}
                className="group grid gap-4 p-6 transition-colors hover:bg-white/[0.04] focus-visible:bg-white/[0.04] focus-visible:outline-none sm:grid-cols-[1.2fr_2fr_auto] sm:items-center sm:gap-8 sm:p-7"
              >
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-white">
                    {role.title}
                  </h3>
                  <p className="mt-1.5 flex flex-wrap gap-x-2 text-[13px] text-zinc-400">
                    <span>{role.team}</span>
                    <span aria-hidden="true">·</span>
                    <span>{role.type}</span>
                  </p>
                </div>
                <p className="text-[15px] leading-6 text-zinc-300">
                  {role.summary}
                </p>
                <span className="inline-flex items-center gap-1 text-[15px] font-medium text-white">
                  {applyLabel}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 text-brand-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                  />
                </span>
              </Link>
            </li>
          ))}
        </SnapRail>
      </div>
    </section>
  );
}
