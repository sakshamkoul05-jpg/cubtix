import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import GiftFinder from "@/components/GiftFinder";
import Collections from "@/components/Collections";
import Shelf from "@/components/Shelf";
import ToyBox from "@/components/motion/ToyBox";
import Marquee from "@/components/motion/Marquee";
import Departments from "@/components/motion/Departments";
import Split from "@/components/motion/Split";
import { Promises, SectionHead, VisitBlock } from "@/components/Sections";
import { ArrowRight, WaIcon } from "@/components/Icons";
import { categories, products } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";

export default function Home() {
  const fresh = products.filter((p) => p.isNew).slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="hero hero-v5">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{site.address.line1} · Dharamshala, HP</p>
            <h1 data-split="chars">
              <Split text="The" chars /> <em><Split text="Gift House" chars /></em>
              <br />
              <Split text="of Dharamshala." chars />
            </h1>
            <p className="hero-text" data-reveal="up">
              Toys, soft toys, Hot Wheels, stationery, wallets and jewellery — chosen for gifting, packed with care, and
              priced for one piece or a hundred.
            </p>
            <div className="hero-ctas" data-reveal="up">
              <Link className="btn btn-green btn-lg" href="/gift-finder">Find the perfect gift <ArrowRight size={18} /></Link>
              <Link className="btn btn-outline btn-lg" href="/catalogue">Browse the catalogue</Link>
            </div>
            <div className="hero-meta" data-reveal="up">
              <span><strong data-count={categories.length}>{categories.length}</strong> departments</span>
              <span><strong><span data-count={products.length}>{products.length}</span>+</strong> gift ideas</span>
              <span><strong>Retail</strong> &amp; bulk</span>
            </div>
          </div>
          <ToyBox />
        </div>
      </section>

      <Marquee />

      {/* COLLECTIONS */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="The gift edit" title="Shop by" italic="who it’s for" link={{ href: "/gift-finder", label: "Open the Gift Finder" }} />
          <Collections />
        </div>
      </section>

      {/* DEPARTMENTS — horizontal scroll */}
      <Departments />

      {/* GIFT FINDER */}
      <section className="section section-green" id="gift-finder">
        <div className="wrap">
          <div className="gf-intro">
            <p className="eyebrow eyebrow-gold">Gift Finder</p>
            <h2 className="sec-title" data-split><Split text="Three questions." /> <em><Split text="The right gift." /></em></h2>
            <p data-reveal="up">Tell us who it&apos;s for, the occasion and your budget — we&apos;ll show ideas from our shelves and you can send them to us in one tap.</p>
          </div>
          <GiftFinder compact />
        </div>
      </section>

      {/* NEW IN */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Fresh on the shelf" title="New" italic="arrivals" link={{ href: "/catalogue", label: `View all ${products.length}` }} />
          <div className="pgrid">
            {fresh.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* SHOP THE SHELF */}
      <section className="section section-cream">
        <div className="wrap shelf-section">
          <div className="shelf-intro">
            <p className="eyebrow">Shop the shelf</p>
            <h2 className="sec-title" data-split><Split text="Walk the store" /> <em><Split text="from your phone." /></em></h2>
            <p data-reveal="up">Tap a number to see what&apos;s on that shelf at {site.address.line1} — then add it to your list or ask us about it.</p>
          </div>
          <Shelf />
        </div>
      </section>

      {/* BULK */}
      <section className="section section-green">
        <div className="wrap bulk">
          <div>
            <p className="eyebrow eyebrow-gold">For shops, schools &amp; events</p>
            <h2 className="sec-title" data-split><Split text="Gifting by the" /> <em><Split text="dozen." /></em></h2>
            <p className="bulk-text" data-reveal="up">
              Return gifts, school prizes, corporate hampers or stock for your own shop — send us your list and quantities
              and we&apos;ll reply with bulk pricing and dispatch details.
            </p>
            <div className="hero-ctas" data-reveal="up">
              <a className="btn btn-gold btn-lg" href={whatsappLink("Hi Cubtix! I'd like bulk pricing. My requirement:")} target="_blank" rel="noopener noreferrer">
                <WaIcon /> Request bulk pricing
              </a>
              <a className="btn btn-ghost-light btn-lg" href={`tel:${site.phones[0].tel}`}>Call {site.phones[0].display}</a>
            </div>
          </div>
          <ul className="bulk-list">
            <li><span>01</span>Retailers &amp; resellers</li>
            <li><span>02</span>Birthday &amp; wedding return gifts</li>
            <li><span>03</span>School prizes &amp; kits</li>
            <li><span>04</span>Corporate &amp; festive gifting</li>
          </ul>
        </div>
      </section>

      <Promises />

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <VisitBlock />
        </div>
      </section>
    </>
  );
}
