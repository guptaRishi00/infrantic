import type { Metadata } from "next";
import { ServicesPage } from "@/features/marketing/services-page";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI automation, business process automation, custom software, integrations, and operational intelligence from one team.",
};

// Statically prerendered, like the home page.
export default function Page() {
  return <ServicesPage />;
}
