import type { ReactNode } from "react";
import type { CompanyId, HeroContent } from "../hero.types";

// Text-based approximations of customer wordmarks. Swap for licensed SVG
// logos when brand assets are available.
const wordmarks: Record<CompanyId, ReactNode> = {
  google: <span className="font-medium tracking-tight">Google</span>,
  airbnb: (
    <span className="flex items-center gap-1 font-semibold tracking-tight">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[1.05em]">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          d="M12 3c-1 0-1.8.7-2.6 2.3L4.6 15.4C3.4 18 5 20.5 7.5 20.5c1.7 0 3-1 4.5-2.8 1.5 1.8 2.8 2.8 4.5 2.8 2.5 0 4.1-2.5 2.9-5.1L14.6 5.3C13.8 3.7 13 3 12 3Zm0 12.6c-1-1.2-1.8-2.6-1.8-3.6a1.8 1.8 0 0 1 3.6 0c0 1-.8 2.4-1.8 3.6Z"
        />
      </svg>
      airbnb
    </span>
  ),
  coinbase: <span className="font-semibold tracking-tight">coinbase</span>,
  notion: (
    <span className="flex items-center gap-1.5 font-semibold tracking-tight">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[1em]">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M8.5 16.5v-9l7 9v-9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      Notion
    </span>
  ),
  gumroad: (
    <span className="font-black tracking-[0.02em] uppercase">Gumroad</span>
  ),
  paypal: <span className="font-extrabold tracking-tight italic">PayPal</span>,
  upwork: <span className="font-semibold tracking-tight">upwork</span>,
  shopify: (
    <span className="flex items-center gap-1 font-bold tracking-tight italic">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[1em]">
        <path fill="currentColor" d="M5.5 8h13l-1.3 13H6.8L5.5 8Z" />
        <path
          d="M9.3 8V6.3a2.7 2.7 0 0 1 5.4 0V8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
      shopify
    </span>
  ),
  stripe: <span className="font-bold tracking-tight">stripe</span>,
  zoom: <span className="font-bold tracking-tight">zoom</span>,
};

export function TrustedBy({
  trustedBy,
}: {
  trustedBy: HeroContent["trustedBy"];
}) {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-center text-sm text-zinc-400">{trustedBy.label}</p>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 text-xl text-zinc-400 sm:text-[22px] lg:justify-between lg:gap-x-6">
        {trustedBy.companies.map((company) => (
          <li
            key={company.id}
            className="transition-colors duration-200 hover:text-zinc-600"
          >
            <span className="sr-only">{company.name}</span>
            <span aria-hidden="true">{wordmarks[company.id]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
