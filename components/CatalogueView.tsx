"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { Search, WaIcon } from "./Icons";
import { categories, products, type CategorySlug } from "@/lib/products";
import { whatsappLink } from "@/lib/site";

type Sort = "featured" | "new" | "az" | "low" | "high";

export default function CatalogueView() {
  const params = useSearchParams();
  const router = useRouter();
  const pCat = params.get("cat") as CategorySlug | null;
  const pQ = params.get("q") ?? "";
  const [cat, setCat] = useState<CategorySlug | "all">(pCat && categories.some((c) => c.slug === pCat) ? pCat : "all");
  const [q, setQ] = useState(pQ);
  const [sort, setSort] = useState<Sort>("featured");

  useEffect(() => setQ(pQ), [pQ]);

  const pick = (slug: CategorySlug | "all") => {
    setCat(slug);
    router.replace(slug === "all" ? "/catalogue" : `/catalogue?cat=${slug}`, { scroll: false });
  };

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const out = products.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (!term) return true;
      const catName = categories.find((c) => c.slug === p.category)?.name ?? "";
      return `${p.name} ${p.note ?? ""} ${catName}`.toLowerCase().includes(term);
    });
    if (sort === "low") return [...out].sort((a, b) => (a.price ?? 1e9) - (b.price ?? 1e9));
    if (sort === "high") return [...out].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    if (sort === "az") return [...out].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "new") return [...out].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    return out;
  }, [cat, q, sort]);

  const count = (slug: CategorySlug) => products.filter((p) => p.category === slug).length;

  return (
    <div className="wrap shop">
      <aside className="filters" aria-label="Filters">
        <p className="filters-h">Categories</p>
        <ul>
          <li>
            <button type="button" className={cat === "all" ? "is-on" : ""} aria-pressed={cat === "all"} onClick={() => pick("all")}>
              All products <span>{products.length}</span>
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <button type="button" className={cat === c.slug ? "is-on" : ""} aria-pressed={cat === c.slug} onClick={() => pick(c.slug)}>
                {c.name} <span>{count(c.slug)}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="filters-help">
          <p><strong>Need help choosing?</strong></p>
          <p>Tell us the age, occasion and budget — we&apos;ll suggest options.</p>
          <a className="btn btn-wa btn-sm" href={whatsappLink("Hi Cubtix! Please help me choose a gift. Age / occasion / budget:")} target="_blank" rel="noopener noreferrer">
            <WaIcon size={16} /> Ask us
          </a>
        </div>
      </aside>

      <div className="shop-main">
        <div className="shop-bar">
          <label className="shop-search">
            <span className="sr-only">Search products</span>
            <Search size={18} />
            <input type="search" placeholder="Search in catalogue" value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <label className="shop-sort">
            <span>Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="featured">Featured</option>
              <option value="new">New arrivals first</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="az">Name: A–Z</option>
            </select>
          </label>
        </div>

        <div className="chips" role="group" aria-label="Filter by category">
          <button type="button" className={`chip${cat === "all" ? " is-on" : ""}`} aria-pressed={cat === "all"} onClick={() => pick("all")}>All</button>
          {categories.map((c) => (
            <button key={c.slug} type="button" className={`chip${cat === c.slug ? " is-on" : ""}`} aria-pressed={cat === c.slug} onClick={() => pick(c.slug)}>
              {c.name}
            </button>
          ))}
        </div>

        <p className="shop-count" aria-live="polite">
          Showing <strong>{list.length}</strong> {list.length === 1 ? "product" : "products"}
          {cat !== "all" && <> in <strong>{categories.find((c) => c.slug === cat)?.name}</strong></>}
          {q.trim() && <> for “{q.trim()}”</>}
        </p>

        {list.length > 0 ? (
          <div className="pgrid pgrid-3" data-noreveal>
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No products found</h2>
            <p>We stock more than we can list online. Ask us and we&apos;ll check the shelf for you.</p>
            <a className="btn btn-wa" href={whatsappLink(`Hi Cubtix! Do you have "${q.trim()}"?`)} target="_blank" rel="noopener noreferrer">
              <WaIcon /> Ask on WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
