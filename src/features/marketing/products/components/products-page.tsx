import { CtaBand, getCtaContent } from "@/features/marketing/cta";
import { Faq } from "@/features/marketing/faq";
import { PageHero, Steps } from "@/features/marketing/page-blocks";
import { getProductsContent } from "../products.data";
import { ProductCatalog } from "./product-catalog";

export function ProductsPage() {
  const content = getProductsContent();
  return (
    <>
      <PageHero content={content.hero} />
      <ProductCatalog content={content.catalog} />
      <Steps content={content.howItWorks} />
      <Faq content={content.faq} />
      <CtaBand content={getCtaContent()} />
    </>
  );
}
