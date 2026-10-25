import Link from "next/link";
import CategoryBubbles from "@/components/home/CategoryBubbles";
import HomeSearch from "@/components/home/HomeSearch";
import ProductCard from "@/components/ProductCard";
import { Promises, VisitBlock } from "@/components/Sections";
import { ArrowRight, WaIcon } from "@/components/Icons";
import { categories, photo, products, productsIn } from "@/lib/products";
import { promos } from "@/lib/offers";
import { site, whatsappLink } from "@/lib/site";

const pick = (ids: string[]) => ids.map((id) => products.find((p) => p.id === id)!).filter(Boolean);

// Extra collection tiles shown after the 9 departments in "Top Collections"
const extraCollections = [
  { name: "Return Gifts", href: "/gift-finder?for=bulk", photo: "1666069", color: "#E11D48" },
  { name: "Gifts for Kids", href: "/gift-finder?for=kids", photo: "8289844", color: "#F97316" },
  { name: "Gifts for Her", href: "/gift-finder?for=her", photo: "39070291", color: "#EC4899" },
];

const about = [
  {
    q: "About Cubtix",
    a: `Cubtix is a toys, gifts and accessories store at ${site.address.line1}, Dharamshala, run by ${site.owner}. We stock Hot Wheels and die-cast cars, toys, soft toys, keychains, table mats, diaries, wallets, stationery and jewellery — for one gift or a full carton.`,
  },
  {
    q: "Affordable gifts & toys in Dharamshala",
    a: "Shop owners, schools and event planners can buy in bulk. Send your list and quantities on WhatsApp and we reply with our best prices, stock and dispatch details.",
  },
  {
    q: "Return gifts for birthdays & weddings",
    a: "Tell us your budget and the number of pieces. We suggest return gifts that fit, and can pack them ready to hand out.",
  },
  {
    q: "How ordering works",
    a: "Add products to your list or message us directly on WhatsApp (92167 53108). We confirm price, stock and delivery before you pay — no online payment needed.",
  },
];

export default function Home() {
  const handpicked = pick([
    "hot-wheels-1", "soft-toys-1", "jewellery-1", "toys-1",
    "keychains-1", "wallets-1", "diaries-2", "stationery-1",
  ]);

  return (
    <>
      {/* HERO */}
      <section className="h7">
        <div className="wrap h7-grid">
          <div className="h7-copy">
            <p className="h7-kicker">Affordable Prices · {site.address.line1}, Dharamshala</p>
            <h1 className="h7-title">
              <span>{products.length}+</span> gifts, toys &amp; accessories
            </h1>
            <p className="h7-sub">Little Things, Big Happiness!</p>
            <ul className="h7-points">
              <li>Affordable Prices — one piece or a full carton</li>
              <li>Price &amp; stock confirmed on WhatsApp before you pay</li>
              <li>9 departments under one roof</li>
            </ul>
            <HomeSearch />
            <div className="h7-ctas">
              <Link className="btn h7-shop" href="/catalogue">Shop Now <ArrowRight size={18} /></Link>
              <a className="btn h7-wa" href={whatsappLink("Hi Cubtix! I'd like to order / ask about a product.")} target="_blank" rel="noopener noreferrer">
                <WaIcon /> Order on WhatsApp
              </a>
            </div>
          </div>
          <div className="h7-art" aria-hidden="true">
            {["245914", "33846177", "29544342", "8982666"].map((ph, i) => (
              <div key={ph} className={`h7-tile h7-tile-${i + 1}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo(ph)} alt="" loading="eager" />
              </div>
            ))}
            <span className="h7-badge">✓ Affordable Prices</span>
          </div>
        </div>
      </section>

      <CategoryBubbles />

      {/* TOP COLLECTIONS */}
      <section className="hsec">
        <div className="wrap">
          <div className="shead shead-center">
            <h2 className="shead-title">Top Collections</h2>
          </div>
          <div className="tc-grid">
            {categories.map((c) => (
              <Link key={c.slug} href={`/categories/${c.slug}`} className="tc" style={{ "--c": c.color } as React.CSSProperties}>
                <span className="tc-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo(c.cover)} alt="" loading="lazy" />
                </span>
                <span className="tc-name">{c.name}</span>
                <span className="tc-count">{productsIn(c.slug).length} items</span>
              </Link>
            ))}
            {extraCollections.map((c) => (
              <Link key={c.name} href={c.href} className="tc" style={{ "--c": c.color } as React.CSSProperties}>
                <span className="tc-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo(c.photo)} alt="" loading="lazy" />
                </span>
                <span className="tc-name">{c.name}</span>
                <span className="tc-count">Ideas →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
              <Link key={p.title} href={p.href} className={`promo promo-${p.theme}`}>{inner}</Link>
            ) : (
              <a key={p.title} href={whatsappLink(p.msg!)} target="_blank" rel="noopener noreferrer" className={`promo promo-${p.theme}`}>{inner}</a>
            );
          })}
        </div>
      </section>

      {/* HANDPICKED */}
      <section className="hsec">
        <div className="wrap">
          <div className="shead shead-center">
            <h2 className="shead-title">Handpicked for you</h2>
          </div>
          <div className="pgrid pgrid-4">
            {handpicked.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="h7-more">
            <Link className="btn btn-outline btn-lg" href="/catalogue">View all {products.length} products <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      {/* BULK ORDERS */}
      <section className="bulk6">
        <div className="wrap bulk6-inner">
          <div>
            <p className="bulk6-kicker">For shops, schools &amp; events</p>
            <h2 className="bulk6-title">Affordable Prices on bulk &amp; return gifts</h2>
            <p className="bulk6-text">Send your list and quantities on WhatsApp — we reply with bulk prices and dispatch details.</p>
          </div>
          <div className="bulk6-actions">
            <a className="btn btn-gold btn-lg" href={whatsappLink("Hi Cubtix! I'd like bulk pricing. My requirement:")} target="_blank" rel="noopener noreferrer">
              <WaIcon /> WhatsApp 92167 53108
            </a>
            <a className="btn btn-ghost-light btn-lg" href={`tel:${site.phones[0].tel}`}>Call now</a>
          </div>
        </div>
      </section>

      <Promises />

      {/* ABOUT (accordion) */}
      <section className="hsec">
        <div className="wrap about7">
          <h2 className="shead-title">About Cubtix</h2>
          <div className="acc">
            {about.map((x, i) => (
              <details key={x.q} open={i === 0}>
                <summary>{x.q}</summary>
                <p>{x.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="hsec" style={{ paddingTop: 12 }}>
        <div className="wrap">
          <VisitBlock />
        </div>
      </section>
    </>
  );
}
