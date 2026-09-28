import type { Metadata } from "next";
import { ProcessPage } from "@/features/marketing/process";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How Infrantic works: discover, design, build, automate, improve. Each stage with a clear output.",
};

// Statically prerendered, like the home page.
export default function Page() {
  return <ProcessPage />;
}
