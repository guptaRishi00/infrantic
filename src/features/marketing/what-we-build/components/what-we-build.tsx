import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  FolderOpen,
  LockKeyhole,
  type LucideIcon,
  Server,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/shared/lib/cn";
import { SectionHeading } from "@/shared/ui/section-heading";
import type { BuildItemIcon, WhatWeBuildContent } from "../what-we-build.types";

const icons: Record<BuildItemIcon, LucideIcon> = {
  workflow: Blocks,
  dashboard: Server,
  ai: FolderOpen,
  software: LockKeyhole,
};

export function WhatWeBuild({ content }: { content: WhatWeBuildContent }) {
  return (
    <section
      id="what-we-build"
      aria-labelledby="what-we-build-title"
      // Use brand-50 for light bluish background from theme with subtle radial gradient
      className="relative overflow-hidden bg-brand-50 px-4 py-24 sm:py-32"
    >
      {/* Background futuristic accents */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-100/40 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-[84rem]">
        <div className="animate-in slide-in-from-bottom-4 fade-in duration-700">
          <p className="text-sm font-medium text-brand-700 uppercase tracking-widest">
            {content.eyebrow}
          </p>
          <SectionHeading
            id="what-we-build-title"
            title={content.title}
            description={content.description}
            align="left"
            tone="light"
            size="lg"
            className="mt-3"
          />
        </div>

        {/* 2x2 Grid */}
        <div className="mt-20 grid grid-cols-1 border-t border-l border-ink/5 sm:grid-cols-2 relative z-10 bg-white/40 backdrop-blur-3xl rounded-3xl overflow-hidden shadow-[0_8px_40px_rgb(0,0,0,0.02)]">
          {content.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <div
                key={item.id}
                className={cn(
                  "group relative flex flex-col sm:flex-row items-start gap-8 border-r border-b border-ink/5 p-10 lg:p-14 overflow-hidden transition-all duration-500 hover:shadow-[inset_0_0_80px_rgba(7,150,254,0.05)]",
                )}
              >
                {/* Futuristic hover gradient behind card */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-brand-50/30 to-brand-100/40 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100" />

                {/* Icon wrapper to resemble the illustration sizes */}
                <div className="relative flex shrink-0 items-center justify-center">
                  <div className="absolute inset-0 bg-brand-200/40 rounded-full blur-2xl transform scale-50 opacity-0 transition-all duration-700 group-hover:scale-150 group-hover:opacity-100" />
                  <div className="relative text-ink transition-colors duration-500 ease-out group-hover:text-brand-700">
                    <Icon
                      className="size-16 sm:size-20 drop-shadow-sm"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                <div className="relative flex flex-col z-10">
                  <h3 className="text-2xl font-bold tracking-tight text-ink whitespace-pre-wrap leading-[1.15] group-hover:text-brand-700 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-ink/70">
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-8 flex w-fit items-center gap-2 text-sm font-bold text-ink hover:text-brand transition-all duration-300 group-hover:translate-x-1"
                  >
                    Explore service
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex">
          <Link
            href={content.allServicesHref}
            className="group relative inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-bold text-white overflow-hidden transition-all hover:bg-ink-800 hover:shadow-[0_0_20px_rgba(7,150,254,0.3)] hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-2">
              View all services
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            {/* Glow effect on hover inside the button */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </div>
      </div>
    </section>
  );
}
