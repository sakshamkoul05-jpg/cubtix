"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { ListButton } from "./Enquiry";
import { Close, Menu, Phone, Search, WaIcon } from "./Icons";
import { categories } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(q.trim() ? `/catalogue?q=${encodeURIComponent(q.trim())}` : "/catalogue");
  };

  return (
    <>
      <div className="announce">
        <div className="wrap announce-inner">
          <span>Retail &amp; bulk orders · {site.address.line1}, Dharamshala</span>
          <a href={`tel:${site.phones[0].tel}`}><Phone size={14} /> {site.phones[0].display}</a>
        </div>
      </div>

      <header className={`header${scrolled ? " is-scrolled" : ""}`}>
        <div className="wrap header-row">
          <button type="button" className="menu-btn" onClick={() => setMenu(true)} aria-label="Open menu"><Menu /></button>
          <Link href="/" className="logo-link" aria-label="Cubtix home">
            <Logo />
          </Link>

          <form className="hsearch" role="search" onSubmit={submit}>
            <label htmlFor="hq" className="sr-only">Search products</label>
            <Search size={18} />
            <input id="hq" type="search" placeholder="Search toys, teddies, keychains, wallets…" value={q} onChange={(e) => setQ(e.target.value)} />
          </form>

          <div className="hactions">
            <a className="hwa" href={whatsappLink("Hi Cubtix!")} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
              <WaIcon size={20} /> <span>WhatsApp</span>
            </a>
            <ListButton />
          </div>
        </div>

        <nav className="hnav" aria-label="Main">
          <div className="wrap hnav-inner">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className={isActive(n.href) ? "is-active" : undefined} aria-current={isActive(n.href) ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
            <Link href="/gift-finder" className={`hnav-gift${isActive("/gift-finder") ? " is-active" : ""}`}>
              Gift Finder
            </Link>
          </div>
        </nav>
      </header>

      <div className={`mnav${menu ? " is-open" : ""}`} aria-hidden={!menu}>
        <div className="mnav-scrim" onClick={() => setMenu(false)} />
        <div className="mnav-panel" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="mnav-head">
            <Logo />
            <button type="button" className="icon-btn" onClick={() => setMenu(false)} aria-label="Close menu"><Close /></button>
          </div>
          <nav className="mnav-links">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className={isActive(n.href) ? "is-active" : undefined}>{n.label}</Link>
            ))}
            <Link href="/gift-finder" className={isActive("/gift-finder") ? "is-active" : undefined}>Gift Finder</Link>
          </nav>
          <p className="mnav-h">Shop by category</p>
          <nav className="mnav-cats">
            {categories.map((c) => (
              <Link key={c.slug} href={`/categories/${c.slug}`}>{c.name}</Link>
            ))}
          </nav>
          <a className="btn btn-wa btn-block" href={whatsappLink("Hi Cubtix!")} target="_blank" rel="noopener noreferrer">
            <WaIcon /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
