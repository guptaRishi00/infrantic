import { cn } from "@/shared/lib/cn";
import { BrandMark } from "@/shared/ui/brand-mark";
import { InitialsAvatar } from "@/shared/ui/initials-avatar";
import { IntegrationLogo } from "@/shared/ui/integration-logo";
import { SectionHeading } from "@/shared/ui/section-heading";
import type { IntegrationsContent } from "../integrations.types";

const RINGS = ["w-[34%]", "w-[58%]", "w-[84%]", "w-[112%]"] as const;

export function Integrations({ content }: { content: IntegrationsContent }) {
  return (
    <section
      id="integrations"
      aria-labelledby="integrations-title"
      className="scroll-mt-24 overflow-hidden px-4 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="integrations-title"
          title={content.title}
          description={content.description}
        />

        <div
          aria-hidden="true"
          className="relative mx-auto mt-10 aspect-[4/3] max-w-4xl sm:aspect-[16/9]"
        >
          {/* Clipped + masked so rings fade out instead of crossing the heading. */}
          <div className="absolute inset-0 overflow-hidden [mask-image:radial-gradient(closest-side,#000_72%,transparent)]">
            {RINGS.map((width) => (
              <span
                key={width}
                className={cn(
                  "absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-200",
                  width,
                )}
              />
            ))}
          </div>

          <span className="absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl bg-[linear-gradient(145deg,#a78bfa,#6d28d9)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_24px_48px_-16px_rgb(109_40_217/0.6)] sm:size-24">
            <BrandMark className="size-10 sm:size-12" />
          </span>

          <ul>
            {content.items.map((item, index) => (
              <li
                key={item.kind === "logo" ? item.id : item.person.name}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2",
                  item.desktopOnly && "hidden sm:block",
                )}
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
              >
                <span
                  className="block motion-safe:animate-float"
                  style={{ animationDelay: `${index * -0.9}s` }}
                >
                  {item.kind === "logo" ? (
                    <span className="grid size-11 place-items-center rounded-full border border-zinc-200/70 bg-white shadow-[0_10px_24px_-12px_rgb(24_24_27/0.25)] sm:size-12">
                      <IntegrationLogo
                        id={item.id}
                        className="block size-5 sm:size-6 [&>svg]:size-full"
                      />
                    </span>
                  ) : (
                    <InitialsAvatar
                      person={item.person}
                      className="size-10 ring-4 ring-white shadow-[0_10px_24px_-12px_rgb(24_24_27/0.35)]"
                    />
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
