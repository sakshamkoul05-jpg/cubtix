import type { Metadata } from "next";
import { CategoryGrid, PageBanner, Promises } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Categories",
  description: "Shop Cubtix by category: Hot Wheels, toys, soft toys, keychains, table mats, diaries, wallets, stationery and jewellery.",
};

export default function CategoriesPage() {
  return (
    <>
      <PageBanner
        crumbs={[{ href: "/", label: "Home" }, { label: "Categories" }]}
        title="All" italic="departments"
        text="Nine departments under one roof at Krishna Gallery, Dharamshala."
      />
      <section className="section">
        <div className="wrap">
          <CategoryGrid />
        </div>
      </section>
      <Promises />
    </>
  );
}
