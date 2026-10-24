import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import Collections from "@/components/Collections";
import { PageBanner, Promises, SectionHead, VisitBlock } from "@/components/Sections";
import { ArrowRight } from "@/components/Icons";
import { heroPhotos, pexels } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Cubtix is a toy, gift and accessories store at Krishna Gallery, Dharamshala, run by Vinay Kumar.",
};

export default function AboutPage() {
  return (
    <>
      <PageBanner crumbs={[{ href: "/", label: "Home" }, { label: "About" }]} title="About" italic="Cubtix" />

      <section className="section">
        <div className="wrap about">
          <div className="about-art">
            <div className="about-arch">
              <Photo src={heroPhotos.gifts} alt="Gift boxes" tint="#E9DFCB" />
            </div>
            <div className="about-small">
              <Photo src={pexels(6193089, 600)} alt="Stationery" tint="#EFE6D2" />
            </div>
          </div>
          <div className="about-copy">
            <p className="eyebrow">Our story</p>
            <h2 className="sec-title">One store for <em>every gift, every age.</em></h2>
            <p>
              {site.name} is a toy, gift and accessories store at {site.address.line1}, Dharamshala, run by {site.owner}.
              We bring together what families, students and shop owners usually hunt for across many shops — Hot Wheels
              and toys, soft toys, keychains, table mats, diaries, wallets, stationery and jewellery.
            </p>
            <p>
              Whether you need one birthday gift or a carton for your own shop, you deal with us directly: browse, send
              your list on WhatsApp, and we confirm price, stock and delivery before you pay.
            </p>
            <blockquote className="about-quote">
              “Walk in for one gift, walk out with the whole celebration sorted.”
              <cite>— The Cubtix promise</cite>
            </blockquote>
            <div className="about-owner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={site.ownerPhoto} alt={site.owner} />
              <div>
                <strong>{site.owner}</strong>
                <span>Owner, {site.name}</span>
              </div>
            </div>
            <div className="hero-ctas">
              <Link className="btn btn-green" href="/catalogue">Browse catalogue <ArrowRight size={16} /></Link>
              <Link className="btn btn-outline" href="/contact">Contact us</Link>
            </div>
          </div>
        </div>
      </section>

      <Promises />

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="The gift edit" title="Shop by" italic="who it’s for" />
          <Collections />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <VisitBlock />
        </div>
      </section>
    </>
  );
}
