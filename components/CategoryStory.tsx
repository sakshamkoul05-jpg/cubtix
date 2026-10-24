"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Photo from "./Photo";
import { ArrowRight } from "./Icons";
import { categories, pexels, productsIn } from "@/lib/products";

// Scroll-driven department story: the left panel stays put while photos scroll past;
// the text changes as each photo reaches the middle of the screen.
export default function CategoryStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const c = categories[active];

  return (
    <div className="story">
      <div className="story-text">
        <div className="story-sticky">
          <p className="story-index">
            <span>{String(active + 1).padStart(2, "0")}</span> / {String(categories.length).padStart(2, "0")}
          </p>
          <div className="story-names" aria-live="polite">
            {categories.map((cat, i) => (
              <div key={cat.slug} className={`story-name${i === active ? " is-on" : ""}`} aria-hidden={i !== active}>
                <h3>{cat.name}</h3>
                <p className="story-line">{cat.line}</p>
                <p className="story-blurb">{cat.blurb}</p>
              </div>
            ))}
          </div>
          <Link className="btn btn-green" href={`/categories/${c.slug}`}>
            Shop {c.name} <span className="muted-pill">{productsIn(c.slug).length}</span> <ArrowRight size={16} />
          </Link>
          <ol className="story-list">
            {categories.map((cat, i) => (
              <li key={cat.slug} className={i === active ? "is-on" : undefined}>
                <button
                  type="button"
                  onClick={() => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="story-media">
        {categories.map((cat, i) => (
          <div
            key={cat.slug}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-i={i}
            className={`story-frame${i === active ? " is-on" : ""}`}
          >
            <Link href={`/categories/${cat.slug}`} className="story-img" tabIndex={-1} aria-hidden="true">
              <Photo src={pexels(cat.cover)} alt="" tint={cat.tint} label={cat.name} />
            </Link>
            <div className="story-caption">
              <span className="story-caption-n">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{cat.name}</h3>
                <p>{cat.line}</p>
              </div>
              <Link href={`/categories/${cat.slug}`} className="story-caption-link" aria-label={`Shop ${cat.name}`}>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
