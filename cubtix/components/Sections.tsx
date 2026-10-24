import Link from "next/link";
import Photo from "./Photo";
import { ArrowRight, Phone, Pin, WaIcon } from "./Icons";
import { categories, pexels, productsIn, type Recipient } from "@/lib/products";
import { mapsEmbedUrl, mapsLinkUrl, site, whatsappLink } from "@/lib/site";

export function SectionHead({
  eyebrow,
  title,
  italic,
  link,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  italic?: string;
  link?: { href: string; label: string };
  light?: boolean;
}) {
  return (
    <div className={`sec-head${light ? " is-light" : ""}`}>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="sec-title">
          {title} {italic && <em>{italic}</em>}
        </h2>
      </div>
      {link && (
        <Link className="sec-link" href={link.href}>
          {link.label} <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}

export const collections: { id: Recipient; title: string; photo: number; tint: string }[] = [
  { id: "kids", title: "Gifts for kids", photo: 8982666, tint: "#EFE6D2" },
  { id: "her", title: "Gifts for her", photo: 20858959, tint: "#F0E1D8" },
  { id: "him", title: "Gifts for him", photo: 915917, tint: "#E7DDCF" },
  { id: "little", title: "For little ones", photo: 815491, tint: "#EDE5DA" },
  { id: "home", title: "For the home", photo: 17754273, tint: "#E4E3D6" },
  { id: "bulk", title: "Bulk & return gifts", photo: 1666069, tint: "#EBDCCB" },
];

export function CollectionTile({ c, tall = false }: { c: (typeof collections)[number]; tall?: boolean }) {
  return (
    <Link href={`/gift-finder?for=${c.id}`} className={`coll${tall ? " is-tall" : ""}`}>
      <div className="coll-img">
        <Photo src={pexels(c.photo, 900)} alt="" tint={c.tint} />
      </div>
      <div className="coll-copy">
        <h3>{c.title}</h3>
        <span className="coll-link">Explore <ArrowRight size={15} /></span>
      </div>
    </Link>
  );
}

export function CategoryGrid() {
  return (
    <div className="cgrid">
      {categories.map((c, i) => (
        <Link key={c.slug} href={`/categories/${c.slug}`} className="ccard">
          <div className="ccard-img">
            <Photo src={pexels(c.cover)} alt={c.name} tint={c.tint} label={c.name} />
          </div>
          <div className="ccard-body">
            <span className="ccard-n">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3>{c.name}</h3>
              <p>{c.line}</p>
            </div>
            <span className="ccard-meta">{productsIn(c.slug).length} pieces <ArrowRight size={15} /></span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function Promises() {
  const items = [
    ["Retail & bulk", "One gift or a full carton — same care."],
    ["Confirm before you pay", "Price, stock and delivery agreed on WhatsApp first."],
    ["Visit the store", `${site.address.line1}, Dharamshala.`],
    ["Gift help, free", "Tell us who it's for — we'll suggest the right pick."],
  ];
  return (
    <div className="promises">
      <div className="wrap promises-inner">
        {items.map(([t, d], i) => (
          <div className="promise" key={t}>
            <span className="promise-n">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="promise-t">{t}</p>
              <p className="promise-d">{d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VisitBlock() {
  return (
    <div className="visit">
      <div className="visit-info">
        <p className="eyebrow">Visit the gift house</p>
        <h2 className="sec-title">See it, hold it, <em>take it home.</em></h2>
        <ul className="visit-list">
          <li><Pin size={20} /><span><strong>{site.address.line1}</strong><br />{site.address.line2}</span></li>
          <li>
            <Phone size={20} />
            <span>
              {site.phones.map((p, i) => (
                <a key={p.tel} href={`tel:${p.tel}`}>{p.display}{i < site.phones.length - 1 ? <br /> : null}</a>
              ))}
            </span>
          </li>
        </ul>
        <div className="visit-actions">
          <a className="btn btn-green" href={mapsLinkUrl} target="_blank" rel="noopener noreferrer">Get directions <ArrowRight size={16} /></a>
          <a className="btn btn-outline" href={whatsappLink("Hi Cubtix! I'd like to visit the store.")} target="_blank" rel="noopener noreferrer"><WaIcon /> WhatsApp</a>
        </div>
      </div>
      <div className="visit-map">
        <iframe src={mapsEmbedUrl} title={`Map: ${site.name}, ${site.address.line1}, Dharamshala`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </div>
  );
}

export function PageBanner({ crumbs, title, italic, text }: { crumbs: { href?: string; label: string }[]; title: string; italic?: string; text?: string }) {
  return (
    <section className="pbanner">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={i}>
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              {i < crumbs.length - 1 && <span className="crumb-sep">/</span>}
            </span>
          ))}
        </nav>
        <h1>
          {title} {italic && <em>{italic}</em>}
        </h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}
