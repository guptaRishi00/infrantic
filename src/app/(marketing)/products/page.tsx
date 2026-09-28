import type { Metadata } from "next";
import { ProductsPage } from "@/features/marketing/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Packaged Infrantic systems: approval flows, operations dashboards, AI document review, shared order records, system connectors, and request triage.",
};

// Statically prerendered, like the home page.
export default function Page() {
  return <ProductsPage />;
}
