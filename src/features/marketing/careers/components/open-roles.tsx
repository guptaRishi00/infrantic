import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BlockHeading } from "@/features/marketing/page-blocks";
import type { Cta } from "@/shared/types";
import { ButtonLink } from "@/shared/ui/button-link";
import type { Role } from "../careers.data";

type OpenRolesProps = {
  eyebrow: string;
  title: string;
  description: string;
  applyLabel: string;
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
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <BlockHeading
            id="roles-title"
            eyebrow={eyebrow}
            title={title}
            description={description}
            tone="dark"
          />
          <ButtonLink
            href={introduceCta.href}
            variant="onDark"
            size="sm"
            className="self-start lg:self-auto"
          >
            {introduceCta.label}
          </ButtonLink>
        </div>
        <ul className="mt-12 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
          {roles.map((role) => (
            <li
              key={role.id}
              className="reveal overflow-hidden first:rounded-t-[15px] last:rounded-b-[15px]"
            >
              <Link
                href={introduceCta.href}
                aria-label={`${applyLabel}: ${role.title}`}
                className="group grid gap-4 p-6 transition-colors hover:bg-white/[0.04] focus-visible:bg-white/[0.04] focus-visible:outline-none sm:grid-cols-[1.2fr_2fr_auto] sm:items-center sm:gap-8 sm:p-7"
              >
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-white">
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
        </ul>
      </div>
    </section>
  );
}
