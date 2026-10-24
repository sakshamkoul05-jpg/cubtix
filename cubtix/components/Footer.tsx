import Link from "next/link";
import Logo from "./Logo";
import { Phone, Pin, WaIcon } from "./Icons";
import { categories } from "@/lib/products";
import { mapsLinkUrl, site, whatsappLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-top">
        <h2 className="footer-big">
          Not sure what to gift? <em>Ask us.</em>
        </h2>
        <div className="footer-top-actions">
          <Link className="btn btn-gold" href="/gift-finder">Try the Gift Finder</Link>
          <a className="btn btn-ghost-light" href={whatsappLink("Hi Cubtix! I need help choosing a gift.")} target="_blank" rel="noopener noreferrer">
            <WaIcon /> WhatsApp us
          </a>
        </div>
      </div>
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo light />
          <p>Toys, gifts and everyday accessories for families, schools and shops — from {site.address.line1}, Dharamshala.</p>
        </div>
        <div>
          <h3 className="footer-h">Departments</h3>
          <ul className="footer-list footer-cols">
            {categories.map((c) => (
              <li key={c.slug}><Link href={`/categories/${c.slug}`}>{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="footer-h">Cubtix</h3>
          <ul className="footer-list">
            <li><Link href="/catalogue">Catalogue</Link></li>
            <li><Link href="/gift-finder">Gift Finder</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="footer-h">The store</h3>
          <ul className="footer-list footer-contact">
            <li><Pin size={17} /><a href={mapsLinkUrl} target="_blank" rel="noopener noreferrer">{site.address.line1},<br />{site.address.line2}</a></li>
            {site.phones.map((p) => (
              <li key={p.tel}><Phone size={17} /><a href={`tel:${p.tel}`}>{p.display}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span>Owner: {site.owner}</span>
      </div>
    </footer>
  );
}
