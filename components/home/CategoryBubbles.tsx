import Link from "next/link";
import { categories, photo, productsIn } from "@/lib/products";

// Round, colour-ringed category shortcuts — the first thing shoppers tap.
export default function CategoryBubbles() {
  return (
    <section className="bubbles" aria-label="Shop by category">
      <div className="wrap bubbles-row">
        {categories.map((c) => (
          <Link key={c.slug} href={`/categories/${c.slug}`} className="bubble" style={{ "--c": c.color } as React.CSSProperties}>
            <span className="bubble-ring">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo(c.cover)} alt="" loading="lazy" />
            </span>
            <span className="bubble-name">{c.name}</span>
            <span className="bubble-count">{productsIn(c.slug).length} items</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
