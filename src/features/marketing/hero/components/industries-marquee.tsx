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
      <p className="text-center text-sm text-zinc-400">{industries.label}</p>
      {/* Edge-to-edge marquee: -mx-4 cancels the hero section's px-4. The list is
          rendered twice and the track slides -50%, so the loop is seamless.
          Each item carries its own horizontal padding (not flex gap) so both halves
          are exactly equal. Reduced motion: one static, wrapped row. */}
      <div className="-mx-4 mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max hover:[animation-play-state:paused] motion-safe:animate-marquee motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
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
        "flex shrink-0 items-center text-lg text-zinc-400 motion-reduce:flex-wrap motion-reduce:justify-center sm:text-xl",
        className,
      )}
    >
      {items.map((item) => {
        const Icon = icons[item.id];
        return (
          <li
            key={item.id}
            className="flex shrink-0 items-center gap-2 px-8 py-2 font-regular tracking-tight whitespace-nowrap transition-colors duration-200 hover:text-zinc-600 sm:px-10"
          >
            <Icon aria-hidden="true" className="size-[1.1em]" strokeWidth={1} />
            {item.name}
          </li>
        );
      })}
    </ul>
  );
}
