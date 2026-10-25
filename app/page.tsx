import Link from "next/link";
import GiftFinder from "@/components/GiftFinder";
import ToyBox from "@/components/motion/ToyBox";
import Marquee from "@/components/motion/Marquee";
import Departments from "@/components/motion/Departments";
import Split from "@/components/motion/Split";
import HeroSlider from "@/components/home/HeroSlider";
import CategoryBubbles from "@/components/home/CategoryBubbles";
import ProductRail from "@/components/home/ProductRail";
import { Promises, VisitBlock } from "@/components/Sections";
import { ArrowRight, WaIcon } from "@/components/Icons";
import { categoryBySlug, photo, products, productsIn } from "@/lib/products";
import { promos } from "@/lib/offers";
import { site, whatsappLink } from "@/lib/site";

const pick = (ids: string[]) => ids.map((id) => products.find((p) => p.id === id)!).filter(Boolean);

export default function Home() {
  const trending = pick([
    "hot-wheels-1", "soft-toys-1", "jewellery-1", "toys-1", "keychains-1", "wallets-1",
    "diaries-2", "soft-toys-3", "stationery-1", "jewellery-5", "hot-wheels-3", "table-mats-1",
  ]);
  const color = (s: Parameters<typeof categoryBySlug>[0]) => categoryBySlug(s)!.color;

  return (
    <>
      {/* HERO: slider + two offer tiles */}
      <section className="hero6">
        <div className="wrap hero6-grid">
          <HeroSlider />
          <div className="hero6-side">
            <Link href="/gift-finder" className="tile tile-yellow">
              <span className="tile-kicker">Not sure what to buy?</span>
              <span className="tile-title">Gift Finder</span>
              <span className="tile-text">3 quick questions → the right gift</span>
              <span className="tile-go">Start <ArrowRight size={16} /></span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo("8982666")} alt="" />
            </Link>
            <a href={whatsappLink("Hi Cubtix! I'd like bulk / return-gift prices. My requirement:")} target="_blank" rel="noopener noreferrer" className="tile tile-blue">
              <span className="tile-kicker">Shops · schools · weddings</span>
              <span className="tile-title">Bulk orders</span>
              <span className="tile-text">Special rates on quantity</span>
              <span className="tile-go"><WaIcon size={16} /> Ask on WhatsApp</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo("16329479")} alt="" />
            </a>
          </div>
        </div>
      </section>

      <CategoryBubbles />

      <ProductRail title="Trending at Cubtix" kicker="Most asked about this week" color="#DC2626" items={trending} href="/catalogue" />

      {/* PROMO BANNERS */}
      <section className="promos">
        <div className="wrap promos-grid">
          {promos.map((p) => {
            const inner = (
              <>
                <div className="promo-copy">
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <span className="promo-cta">{p.msg ? <WaIcon size={16} /> : null}{p.cta} <ArrowRight size={16} /></span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo(p.photo)} alt="" loading="lazy" />
              </>
            );
            return p.href ? (
              <Link key={p.title} href={p.href} className={`promo promo-${p.theme}`} data-reveal="up">{inner}</Link>
            ) : (
              <a key={p.title} href={whatsappLink(p.msg!)} target="_blank" rel="noopener noreferrer" className={`promo promo-${p.theme}`} data-reveal="up">{inner}</a>
            );
          })}
        </div>
      </section>

      <Marquee />

      <ProductRail title="Hot Wheels & cars" kicker="For young collectors" color={color("hot-wheels")} items={[...productsIn("hot-wheels"), ...productsIn("toys")]} href="/categories/hot-wheels" />

      {/* DEPARTMENTS — horizontal scroll */}
      <Departments />

      <ProductRail title="Soft toys & teddies" kicker="Something to hug" color={color("soft-toys")} items={productsIn("soft-toys")} href="/categories/soft-toys" />

      {/* PLAY: toy box */}
      <section className="play">
        <div className="wrap play-grid">
          <div className="play-copy">
            <p className="eyebrow">Play time</p>
            <h2 className="sec-title" data-split><Split text="Go on —" /> <em><Split text="throw a toy." /></em></h2>
            <p data-reveal="up">Grab any product in the box and toss it around. Tap one to open its shelf. (Yes, the shop is just as fun in person.)</p>
            <div className="hero-ctas" data-reveal="up">
              <Link className="btn btn-green btn-lg" href="/catalogue">Browse all {products.length} products <ArrowRight size={18} /></Link>
            </div>
          </div>
          <ToyBox />
        </div>
      </section>

      <ProductRail title="Jewellery & accessories" kicker="Little sparkles" color={color("jewellery")} items={[...productsIn("jewellery"), ...productsIn("wallets")]} href="/categories/jewellery" />

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

      <ProductRail title="Diaries, stationery & more" kicker="School bag & desk" color={color("stationery")} items={[...productsIn("diaries"), ...productsIn("stationery"), ...productsIn("keychains"), ...productsIn("table-mats")]} href="/catalogue" />

      {/* BULK */}
      <section className="bulk6">
        <div className="wrap bulk6-inner">
          <div>
            <p className="bulk6-kicker">For shops, schools &amp; events</p>
            <h2 className="bulk6-title" data-split><Split text="Gifting by the dozen." /></h2>
            <p className="bulk6-text" data-reveal="up">Return gifts, school prizes, corporate hampers or stock for your own shop — send your list and quantities, we reply with bulk prices.</p>
          </div>
          <div className="bulk6-actions" data-reveal="up">
            <a className="btn btn-gold btn-lg" href={whatsappLink("Hi Cubtix! I'd like bulk pricing. My requirement:")} target="_blank" rel="noopener noreferrer">
              <WaIcon /> Request bulk pricing
            </a>
            <a className="btn btn-ghost-light btn-lg" href={`tel:${site.phones[0].tel}`}>Call {site.phones[0].display}</a>
          </div>
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
