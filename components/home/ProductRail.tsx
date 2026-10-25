"use client";

import Link from "next/link";
import { useRef } from "react";
import ProductCard from "../ProductCard";
import { ArrowRight } from "../Icons";
import type { Product } from "@/lib/products";

// A horizontal shelf of products with arrow buttons (swipe on phones).
export default function ProductRail({
  title,
  kicker,
  color,
  items,
  href,
}: {
  title: string;
  kicker?: string;
  color: string;
  items: Product[];
  href?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };
  return (
    <section className="rail" style={{ "--c": color } as React.CSSProperties}>
      <div className="wrap">
        <div className="rail-head">
          <div>
            {kicker && <p className="rail-kicker">{kicker}</p>}
            <h2 className="rail-title">{title}</h2>
          </div>
          <div className="rail-actions">
            {href && (
              <Link href={href} className="rail-all">
                View all <ArrowRight size={16} />
              </Link>
            )}
            <button type="button" className="rail-btn" onClick={() => scroll(-1)} aria-label={`Scroll ${title} left`}>‹</button>
            <button type="button" className="rail-btn" onClick={() => scroll(1)} aria-label={`Scroll ${title} right`}>›</button>
          </div>
        </div>
        <div className="rail-track" ref={track} data-noreveal>
          {items.map((p) => (
            <div className="rail-item" key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
