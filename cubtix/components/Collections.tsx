"use client";

import Link from "next/link";
import { useState } from "react";
import Photo from "./Photo";
import { ArrowRight } from "./Icons";
import { collections } from "./Sections";
import { pexels, productsFor, recipients } from "@/lib/products";

// Editorial list: hovering (or focusing) a line swaps the large photo beside it.
export default function Collections() {
  const [i, setI] = useState(0);
  return (
    <div className="edit">
      <div className="edit-media">
        {collections.map((c, n) => (
          <div key={c.id} className={`edit-photo${n === i ? " is-on" : ""}`} aria-hidden={n !== i}>
            <Photo src={pexels(c.photo, 1000)} alt="" tint={c.tint} label={c.title} />
          </div>
        ))}
        <span className="edit-tag">{recipients.find((r) => r.id === collections[i].id)?.sub}</span>
      </div>
      <ol className="edit-list">
        {collections.map((c, n) => (
          <li key={c.id}>
            <Link
              href={`/gift-finder?for=${c.id}`}
              className={n === i ? "is-on" : undefined}
              onMouseEnter={() => setI(n)}
              onFocus={() => setI(n)}
            >
              <span className="edit-n">{String(n + 1).padStart(2, "0")}</span>
              <span className="edit-title">{c.title}</span>
              <span className="edit-count">{productsFor(c.id).length} ideas</span>
              <span className="edit-arrow"><ArrowRight size={20} /></span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
