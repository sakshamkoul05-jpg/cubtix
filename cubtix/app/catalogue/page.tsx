import type { Metadata } from "next";
import { Suspense } from "react";
import CatalogueView from "@/components/CatalogueView";
import { PageBanner } from "@/components/Sections";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catalogue",
  description: "Every product at Cubtix — Hot Wheels, toys, soft toys, keychains, table mats, diaries, wallets, stationery and jewellery.",
};

export default function CataloguePage() {
  return (
    <>
      <PageBanner
        crumbs={[{ href: "/", label: "Home" }, { label: "Catalogue" }]}
        title="The"
        italic="catalogue"
        text={`${products.length} products across 9 categories. Add items to your enquiry list and get prices on WhatsApp.`}
      />
      <Suspense fallback={null}>
        <CatalogueView />
      </Suspense>
    </>
  );
}
