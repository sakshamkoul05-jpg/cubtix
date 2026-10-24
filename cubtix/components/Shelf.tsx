"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Photo from "./Photo";
import { ArrowRight, Close, WaIcon } from "./Icons";
import { categoryBySlug, photo, productsIn } from "@/lib/products";
import { shelf, type Hotspot } from "@/lib/shelf";
import { whatsappLink } from "@/lib/site";

function Card({ spot, n, onClose }: { spot: Hotspot; n: number; onClose: () => void }) {
  const cat = categoryBySlug(spot.category)!;
  const items = productsIn(cat.slug).slice(0, 3);
  return (
    <div className="shelf-card" role="dialog" aria-label={cat.name}>
      <div className="shelf-card-head">
        <span className="shelf-card-n">{n}</span>
        <div>
          <p className="shelf-card-name">{cat.name}</p>
          <p className="shelf-card-line">{cat.line}</p>
        </div>
        <button type="button" className="shelf-card-close" onClick={onClose} aria-label="Close"><Close size={16} /></button>
      </div>
      <ul>
        {items.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
      <div className="shelf-card-actions">
        <Link href={`/categories/${cat.slug}`} className="btn btn-green btn-sm">Shop {cat.name} <ArrowRight size={14} /></Link>
        <a className="btn btn-outline btn-sm" href={whatsappLink(`Hi Cubtix! What's on the ${cat.name} shelf right now?`)} target="_blank" rel="noopener noreferrer">
          <WaIcon size={15} /> Ask
        </a>
      </div>
    </div>
  );
}

export default function Shelf() {
  const [open, setOpen] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const pin = (spot: Hotspot, i: number) => (
    <button
      type="button"
      className={`pin${open === i ? " is-open" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        setOpen(open === i ? null : i);
      }}
      aria-expanded={open === i}
      aria-label={`${categoryBySlug(spot.category)!.name} — show details`}
    >
      <span>{i + 1}</span>
    </button>
  );

  // Mode 1: a real photo of the store shelf with hotspots.
  if (shelf.photo) {
    return (
      <div className="shelf-photo" ref={root}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={shelf.photo} alt="The Cubtix shelf at Krishna Gallery" />
        {shelf.hotspots.map((s, i) => (
          <div key={i} className={`pin-wrap${s.x > 60 ? " flip" : ""}${s.y > 55 ? " up" : ""}${open === i ? " is-open" : ""}`} style={{ left: `${s.x}%`, top: `${s.y}%` }}>
            {pin(s, i)}
            {open === i && <Card spot={s} n={i + 1} onClose={() => setOpen(null)} />}
          </div>
        ))}
      </div>
    );
  }

  // Mode 2 (default): a display wall built from category photos.
  const rows = [shelf.hotspots.slice(0, 3), shelf.hotspots.slice(3, 6)];
  return (
    <div className="wall" ref={root}>
      {rows.map((row, r) => (
        <div className="wall-row" key={r}>
          <div className="wall-items">
            {row.map((s, j) => {
              const i = r * 3 + j;
              const cat = categoryBySlug(s.category)!;
              return (
                <div className={`wall-item wall-item-${j}${j === 2 ? " flip" : ""}${r === 1 ? " up" : ""}${open === i ? " is-open" : ""}`} key={i}>
                  <div className="wall-img">
                    <Photo src={photo(productsIn(cat.slug)[1]?.photo ?? cat.cover)} alt={cat.name} tint={cat.tint} label={cat.name} />
                  </div>
                  <span className="wall-label">{cat.name}</span>
                  <div className="pin-wrap pin-wall">
                    {pin(s, i)}
                    {open === i && <Card spot={s} n={i + 1} onClose={() => setOpen(null)} />}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="wall-plank" aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}
