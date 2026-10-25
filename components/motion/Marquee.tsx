"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { categories } from "@/lib/products";

// Two bands of department names. They drift on their own, speed up and lean with your scroll.
export default function Marquee() {
  const rows = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pos = [0, 0];
    let skew = 0, raf = 0, last = performance.now(), hover = false;
    const wrap = rows.current[0]?.parentElement?.parentElement;
    const enter = () => (hover = true);
    const leave = () => (hover = false);
    wrap?.addEventListener("pointerenter", enter);
    wrap?.addEventListener("pointerleave", leave);

    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
    });
    if (wrap) io.observe(wrap);
    const tick = (now: number) => {
      if (!visible) { raf = 0; return; }
      const dt = Math.min(3, (now - last) / 16.7);
      last = now;
      const vel = ((window as unknown as { __vel?: number }).__vel ?? 0) * 0.6;
      skew += (Math.max(-12, Math.min(12, vel * 0.5)) - skew) * 0.1;
      rows.current.forEach((row, i) => {
        if (!row) return;
        const half = row.scrollWidth / 2;
        const dir = i === 0 ? -1 : 1;
        const speed = (hover ? 0.25 : 1) * (0.9 + Math.abs(vel) * 0.35);
        pos[i] = (pos[i] + dir * speed * dt + half) % half;
        row.style.transform = `translate3d(${-pos[i]}px,0,0) skewX(${-skew * dir}deg)`;
      });
      raf = requestAnimationFrame(tick);
    };
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      wrap?.removeEventListener("pointerenter", enter);
      wrap?.removeEventListener("pointerleave", leave);
    };
  }, []);

  const items = [...categories, ...categories];
  return (
    <section className="mq" aria-label="Departments">
      {[0, 1].map((r) => (
        <div className={`mq-row${r ? " is-alt" : ""}`} key={r}>
          <div className="mq-track" ref={(el) => { rows.current[r] = el; }}>
            {(r ? [...items].reverse() : items).map((c, i) => (
              <Link key={`${c.slug}-${i}`} href={`/categories/${c.slug}`} className="mq-item" data-cursor="Shop" tabIndex={i < categories.length ? 0 : -1}>
                {c.name}
                <span className="mq-star" aria-hidden="true">✦</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
