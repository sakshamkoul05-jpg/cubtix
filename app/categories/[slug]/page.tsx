import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/Photo";
import Split from "@/components/motion/Split";
import ProductCard from "@/components/ProductCard";
import { WaIcon } from "@/components/Icons";
import { categories, categoryBySlug, pexels, productsIn } from "@/lib/products";
import { whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) return {};
  return { title: cat.name, description: `${cat.name} at Cubtix, Dharamshala. ${cat.blurb}` };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) notFound();
  const items = productsIn(cat.slug);

  return (
    <>
      <section className="cat-hero">
        <div className="wrap cat-hero-grid">
          <div className="cat-hero-copy">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span className="crumb-sep">/</span>
              <Link href="/categories">Categories</Link><span className="crumb-sep">/</span>
              <span aria-current="page">{cat.name}</span>
            </nav>
            <h1 data-split="chars"><Split text={cat.name} chars /></h1>
            <p className="cat-hero-line">{cat.line}</p>
            <p>{cat.blurb}</p>
            <div className="hero-ctas">
              <a className="btn btn-green" href={whatsappLink(`Hi Cubtix! Please share what's in stock in ${cat.name}, with prices.`)} target="_blank" rel="noopener noreferrer">
                <WaIcon /> Ask what&apos;s in stock
              </a>
              <span className="cat-hero-count">{items.length} products</span>
            </div>
          </div>
          <div className="cat-hero-img">
            <Photo src={pexels(cat.cover)} alt={cat.name} tint={cat.tint} label={cat.name} eager />
          </div>
        </div>
      </section>

      <div className="subnav">
        <div className="wrap subnav-inner">
          {categories.map((c) => (
            <Link key={c.slug} href={`/categories/${c.slug}`} className={c.slug === cat.slug ? "is-on" : undefined} aria-current={c.slug === cat.slug ? "page" : undefined}>
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <p className="shop-count">Showing <strong>{items.length}</strong> products in <strong>{cat.name}</strong></p>
          <div className="pgrid">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
