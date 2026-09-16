"use client";

import { type ReactNode, useState } from "react";
import { cn } from "@/shared/lib/cn";
import type { BillingPeriod } from "../pricing.types";

type BillingSwitchProps = {
  labels: Record<BillingPeriod, string>;
  yearlyNote: string;
  /** Server-rendered plans. Prices for both periods are in the HTML; CSS shows one. */
  children: ReactNode;
};

const periods: readonly BillingPeriod[] = ["monthly", "yearly"];

/**
 * Only the selected period is client state. It is exposed as `data-billing`
 * so children switch prices with `group-data-[billing=yearly]/billing:` variants.
 */
export function BillingSwitch({
  labels,
  yearlyNote,
  children,
}: BillingSwitchProps) {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  return (
    <div data-billing={period} className="group/billing">
      <div className="flex justify-center">
        <fieldset className="inline-flex rounded-full border border-zinc-200 bg-zinc-100/80 p-1">
          <legend className="sr-only">Billing period</legend>
          {periods.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={period === value}
              onClick={() => setPeriod(value)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm transition-[background-color,color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-zinc-950",
                period === value
                  ? "bg-white font-medium text-zinc-950 shadow-[0_1px_3px_rgb(0_0_0/0.1)]"
                  : "text-zinc-500 hover:text-zinc-800",
              )}
            >
              {labels[value]}
              {value === "yearly" ? (
                <span className="rounded-full bg-violet-100 px-1.5 py-px text-[10px] font-medium text-violet-700">
                  {yearlyNote}
                </span>
              ) : null}
            </button>
          ))}
        </fieldset>
      </div>
      {children}
    </div>
  );
}
