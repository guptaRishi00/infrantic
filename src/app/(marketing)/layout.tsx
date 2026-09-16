import type { ReactNode } from "react";
import { SiteFooter } from "@/features/site-footer";
import { SiteHeader } from "@/features/site-header";

/** Shared chrome for public marketing pages. App/auth route groups get their own. */
export default function MarketingLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
