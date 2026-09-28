import type { Metadata } from "next";
import { ContactPage } from "@/features/marketing/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Infrantic about the workflow that takes too much chasing, checking, or re-typing, and book a discovery call.",
};

// Statically prerendered; the form posts to a server action.
export default function Page() {
  return <ContactPage />;
}
