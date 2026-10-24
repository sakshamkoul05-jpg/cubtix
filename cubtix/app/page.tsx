import Link from "next/link";
import Photo from "@/components/Photo";
import ProductCard from "@/components/ProductCard";
import GiftFinder from "@/components/GiftFinder";
import CategoryStory from "@/components/CategoryStory";
import Collections from "@/components/Collections";
import Shelf from "@/components/Shelf";
import { Promises, SectionHead, VisitBlock } from "@/components/Sections";
import { ArrowRight, WaIcon } from "@/components/Icons";
import { heroPhotos, pexels, products } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";

export default function Home() {
  const fresh = products.filter((p) => p.isNew).slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{site.address.line1} · Dharamshala</p>
            <h1>
              The <em>Gift House</em>
              <br />
              of Dharamshala.
            </h1>
            <p className="hero-text">
              Toys, soft toys, Hot Wheels, stationery, wallets and jewellery — chosen for gifting, packed with care, and
              priced for one piece or a hundred.
            </p>
            <div className="hero-ctas">
              <Link className="btn btn-green btn-lg" href="/gift-finder">Find the perfect gift <ArrowRight size={18} /></Link>
              <Link className="btn btn-outline btn-lg" href="/catalogue">Browse the catalogue</Link>
            </div>
            <div className="hero-meta">
              <span><strong>9</strong> departments</span>
              <span><strong>{products.length}+</strong> gift ideas</span>
              <span><strong>Retail</strong> &amp; bulk</span>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-arch">
              <Photo src={heroPhotos.main} alt="Gifts wrapped with ribbon" tint="#E9DFCB" eager />
            </div>
            <div className="hero-small">
              <Photo src={heroPhotos.small} alt="Teddy bear" tint="#EFE6D2" eager />
            </div>
            <div className="stamp" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <defs>
                  <path id="circ" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                </defs>
                <text>
                  <textPath href="#circ">RETAIL · BULK · GIFTING · DHARAMSHALA · </textPath>
                </text>
              </svg>
              <span className="stamp-c">C</span>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="The gift edit" title="Shop by" italic="who it’s for" link={{ href: "/gift-finder", label: "Open the Gift Finder" }} />
          <Collections />
        </div>
      </section>

      {/* GIFT FINDER */}
      <section className="section section-green" id="gift-finder">
        <div className="wrap">
          <div className="gf-intro">
            <p className="eyebrow eyebrow-gold">Gift Finder</p>
            <h2 className="sec-title">Three questions. <em>The right gift.</em></h2>
            <p>Tell us who it&apos;s for, the occasion and your budget — we&apos;ll show ideas from our shelves and you can send them to us in one tap.</p>
          </div>
          <GiftFinder compact />
        </div>
      </section>

      {/* DEPARTMENTS STORY */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Departments" title="Nine shelves," italic="one gift house" link={{ href: "/categories", label: "All categories" }} />
          <CategoryStory />
        </div>
      </section>

      {/* NEW IN */}
      <section className="section section-cream">
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
      <section className="section">
        <div className="wrap shelf-section">
          <div className="shelf-intro">
            <p className="eyebrow">Shop the shelf</p>
            <h2 className="sec-title">Walk the store <em>from your phone.</em></h2>
            <p>Tap a number to see what&apos;s on that shelf at {site.address.line1} — then add it to your list or ask us about it.</p>
          </div>
          <Shelf />
        </div>
      </section>

      {/* BULK */}
      <section className="section section-green">
        <div className="wrap bulk">
          <div>
            <p className="eyebrow eyebrow-gold">For shops, schools &amp; events</p>
            <h2 className="sec-title">Gifting by the <em>dozen.</em></h2>
            <p className="bulk-text">
              Return gifts, school prizes, corporate hampers or stock for your own shop — send us your list and quantities
              and we&apos;ll reply with bulk pricing and dispatch details.
            </p>
            <div className="hero-ctas">
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
