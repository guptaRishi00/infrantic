import {
  Briefcase,
  Building,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  type LucideIcon,
  Rocket,
  Shirt,
  Store,
  Truck,
} from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { HeroContent, IndustryId } from "../hero.types";

const icons: Record<IndustryId, LucideIcon> = {
  manufacturing: Factory,
  apparel: Shirt,
  logistics: Truck,
  professionalServices: Briefcase,
  retail: Store,
  finance: Landmark,
  realEstate: Building,
  healthcare: HeartPulse,
  education: GraduationCap,
  startups: Rocket,
};

type Industries = HeroContent["industries"];

export function IndustriesMarquee({ industries }: { industries: Industries }) {
  return (
    <div id="industries" className="scroll-mt-24">
      <p className="text-center text-base font-medium text-zinc-800">
        {industries.label}
      </p>

      {/* Edge fades are white overlays (the ground here is white), not a mask
          around the moving track. */}
      <div className="relative -mx-4 mt-6 overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[8%] bg-[linear-gradient(to_right,#fff,rgb(255_255_255/0))]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[8%] bg-[linear-gradient(to_left,#fff,rgb(255_255_255/0))]"
        />
        <div className="flex w-max motion-safe:animate-marquee motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
          <IndustryList items={industries.items} />
          <IndustryList
            items={industries.items}
            className="motion-reduce:hidden"
            decorative
          />
        </div>
      </div>
    </div>
  );
}

function IndustryList({
  items,
  className,
  decorative = false,
}: {
  items: Industries["items"];
  className?: string;
  /** The duplicate copy exists only for the loop; hide it from assistive tech. */
  decorative?: boolean;
}) {
  return (
    <ul
      aria-hidden={decorative || undefined}
      className={cn(
        "flex shrink-0 items-center text-lg text-zinc-800 motion-reduce:flex-wrap motion-reduce:justify-center sm:text-xl",
        className,
      )}
    >
      {items.map((item) => {
        const Icon = icons[item.id];
        return (
          <li
            key={item.id}
            className="flex shrink-0 items-center gap-2 px-8 py-2 font-normal tracking-tight whitespace-nowrap sm:px-10"
          >
            <Icon aria-hidden="true" className="size-[1.1em]" strokeWidth={1} />
            {item.name}
          </li>
        );
      })}
    </ul>
  );
}
