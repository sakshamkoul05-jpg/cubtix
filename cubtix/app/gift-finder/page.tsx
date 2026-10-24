import type { Metadata } from "next";
import { Suspense } from "react";
import GiftFinderPage from "@/components/GiftFinderPage";
import { PageBanner } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Gift Finder",
  description: "Answer three quick questions and get gift ideas from Cubtix, Dharamshala — then send them to us on WhatsApp.",
};

export default function Page() {
  return (
    <>
      <PageBanner
        crumbs={[{ href: "/", label: "Home" }, { label: "Gift Finder" }]}
        title="Gift"
        italic="Finder"
        text="Three quick questions — who it's for, the occasion and your budget. We'll show ideas from our shelves."
      />
      <section className="section section-green gf-page">
        <div className="wrap">
          <Suspense fallback={null}>
            <GiftFinderPage />
          </Suspense>
        </div>
      </section>
    </>
  );
}
