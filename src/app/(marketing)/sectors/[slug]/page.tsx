import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getSectorContent,
  isSectorSlug,
  SectorPage,
  sectorSlugs,
} from "@/features/marketing/sectors";

// Only the listed sectors exist: every other slug (and /sectors itself, which
// has no page) is a 404. All three are prerendered at build time.
export const dynamicParams = false;

export function generateStaticParams() {
  return sectorSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/sectors/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  if (!isSectorSlug(slug)) return {};
  return getSectorContent(slug).meta;
}

export default async function Page(props: PageProps<"/sectors/[slug]">) {
  const { slug } = await props.params;
  if (!isSectorSlug(slug)) notFound();
  return <SectorPage slug={slug} />;
}
