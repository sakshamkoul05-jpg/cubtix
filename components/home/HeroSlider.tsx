"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { slides } from "@/lib/offers";
import { photo } from "@/lib/products";
import { ArrowRight } from "../Icons";
import { sparkle } from "../motion/fly";

const DURATION = 6000;

// Auto-sliding promo banner: swipeable, pauses on hover, progress bars double as controls.
export default function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef<number | null>(null);
  const n = slides.length;
  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => go(i + 1), DURATION);
    return () => clearTimeout(id);
  }, [i, paused, go]);

  return (
    <div
      className={`hs${paused ? " is-paused" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerMove={(e) => e.pointerType === "mouse" && sparkle(e, slides[i].theme === "black" ? "#F6D36B" : "#ffffff")}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
        touch.current = null;
      }}
      aria-roledescription="carousel"
    >
      {slides.map((s, k) => {
        const [before, after] = s.title.split(s.accent);
        return (
          <div key={s.id} className={`hs-slide hs-${s.theme}${k === i ? " is-on" : ""}`} aria-hidden={k !== i} role="group" aria-label={`${k + 1} of ${n}`}>
            <div className="hs-copy">
              <p className="hs-kicker">{s.kicker}</p>
              <h2 className="hs-title">
                {before}
                <span className="hs-accent">{s.accent}</span>
                {after}
              </h2>
              <p className="hs-text">{s.text}</p>
              <Link className="hs-cta" href={s.cta.href} tabIndex={k === i ? 0 : -1}>
                {s.cta.label} <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hs-art">
              <div className="hs-blob" />
              <div className="hs-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo(s.photo)} alt="" loading={k === 0 ? "eager" : "lazy"} />
              </div>
              <span className="hs-badge">{s.badge}</span>
            </div>
          </div>
        );
      })}

      <div className="hs-controls">
        <div className="hs-bars">
          {slides.map((s, k) => (
            <button key={s.id} type="button" className={`hs-bar${k === i ? " is-on" : ""}${k < i ? " is-done" : ""}`} onClick={() => go(k)} aria-label={`Show slide ${k + 1}: ${s.title}`}>
              <i style={{ animationDuration: `${DURATION}ms` }} />
            </button>
          ))}
        </div>
        <div className="hs-arrows">
          <button type="button" onClick={() => go(i - 1)} aria-label="Previous slide">‹</button>
          <button type="button" onClick={() => go(i + 1)} aria-label="Next slide">›</button>
        </div>
      </div>
    </div>
  );
}
