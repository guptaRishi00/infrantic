import type { Metadata } from "next";
import { IndustriesPage } from "@/features/marketing/industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Manufacturing, apparel, logistics, professional services, retail, finance, real estate, healthcare, education, and growing businesses.",
};

// Statically prerendered, like the home page.
export default function Page() {
  return <IndustriesPage />;
}
