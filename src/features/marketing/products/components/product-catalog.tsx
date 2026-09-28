import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { BlockHeading, blockIcons } from "@/features/marketing/page-blocks";
import { IntegrationLogo } from "@/shared/ui/integration-logo";
import type { ProductCatalogContent } from "../products.data";

/**
 * Product cards: what it does, the manual work it replaces, what is included,
 * and example tools. Static apart from the scroll reveal and hover lift.
 */
export function ProductCatalog({
  content,
}: {
  content: ProductCatalogContent;
}) {
  return (
    <section
      id="catalogue"
      aria-labelledby="catalogue-title"
      className="scroll-mt-24 bg-zinc-50/70 px-4 py-16 sm:py-28"
    >
      <div className="mx-auto max-w-[80rem]">
        <BlockHeading
          id="catalogue-title"
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.products.map((product, index) => {
            const Icon = blockIcons[product.icon];
            return (
              <li
                key={product.id}
                id={product.id}
                className="reveal flex scroll-mt-28 flex-col rounded-2xl border border-zinc-200/80 bg-white p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-zinc-200 bg-zinc-50">
                    <Icon aria-hidden="true" className="size-5 text-zinc-800" />
                  </span>
                  <span className="font-mono text-xs text-zinc-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">
                  {product.name}
                </h3>
                <p className="mt-2 text-[15px] leading-6 text-zinc-600">
                  {product.summary}
                </p>
                <p className="mt-4 rounded-lg bg-brand-50/70 px-3 py-2 text-[13px] leading-5 text-zinc-700">
                  <span className="font-medium text-brand-700">
                    {content.replacesLabel}:
                  </span>{" "}
                  {product.replaces}
                </p>
                <p className="mt-5 font-mono text-xs tracking-wide text-zinc-500 uppercase">
                  {content.includedLabel}
                </p>
                <ul className="mt-2.5 space-y-2">
                  {product.included.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-[14px] leading-5 text-zinc-700"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-emerald-600"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-between gap-4 border-t border-zinc-100 pt-5">
                    <div className="flex items-center gap-2">
                      <span className="sr-only">{content.worksWithLabel}:</span>
                      <ul className="flex -space-x-1.5">
                        {product.worksWith.map((logo) => (
                          <li
                            key={logo}
                            className="grid size-8 place-items-center rounded-full border border-zinc-200 bg-white"
                          >
                            <IntegrationLogo
                              id={logo}
                              className="block size-4 [&>svg]:size-full"
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={content.cta.href}
                      aria-label={`${content.cta.label}: ${product.name}`}
                      className="group inline-flex items-center gap-1.5 rounded-md text-[14px] font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                    >
                      {content.cta.label}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                      />
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
