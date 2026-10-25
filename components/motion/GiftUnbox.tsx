"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "../Icons";
import { photo } from "@/lib/products";

gsap.registerPlugin(ScrollTrigger);

// Scroll-driven unboxing: a real 3D CSS gift box. As you scroll, the bow spins off,
// the lid flips away, light rays burst and products fly out across the screen.
const items = [
  { ph: "245914", label: "Teddies", href: "/categories/soft-toys" },
  { ph: "12361140", label: "Hot Wheels", href: "/categories/hot-wheels" },
  { ph: "29544342", label: "Jewellery", href: "/categories/jewellery" },
  { ph: "8982666", label: "Toys", href: "/categories/toys" },
  { ph: "16329479", label: "Keychains", href: "/categories/keychains" },
  { ph: "5594266", label: "Diaries", href: "/categories/diaries" },
  { ph: "915917", label: "Wallets", href: "/categories/wallets" },
  { ph: "8099596", label: "Stationery", href: "/categories/stationery" },
];

export default function GiftUnbox() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const mm = gsap.matchMedia();

    mm.add(
      { motion: "(prefers-reduced-motion: no-preference)", small: "(max-width: 700px)" },
      (ctx) => {
        const { motion, small } = ctx.conditions as { motion: boolean; small: boolean };
        const box = el.querySelector(".gu-box")!;
        const lid = el.querySelector(".gu-lid")!;
        const bow = el.querySelector(".gu-bow")!;
        const rays = el.querySelector(".gu-rays")!;
        const glow = el.querySelector(".gu-glow")!;
        const cards = gsap.utils.toArray<HTMLElement>(".gu-card", el);
        const intro = el.querySelector(".gu-intro")!;
        const outro = el.querySelector(".gu-outro")!;
        const stage = el.querySelector<HTMLElement>(".gu-stage")!;

        // Where each product lands: an ellipse around the box
        const spots = () => {
          const rx = Math.min(stage.clientWidth * (small ? 0.34 : 0.4), 600);
          const ry = Math.min(stage.clientHeight * (small ? 0.36 : 0.34), 290);
          const n = cards.length;
          // Fan out in an arc over the top of the box (left → over → right), alternating depth.
          return cards.map((_, k) => {
            const a = Math.PI * (1.04 + (k / (n - 1)) * 0.92);
            const depth = k % 2 ? (small ? 0.58 : 0.72) : 1;
            return { x: Math.cos(a) * rx * depth, y: Math.sin(a) * ry * depth + (small ? 10 : 30), r: gsap.utils.random(-12, 12) };
          });
        };

        if (!motion) {
          // Reduced motion: show the opened state, no scrolling effect.
          gsap.set(lid, { y: -260, rotateX: -50, opacity: 0 });
          gsap.set(bow, { opacity: 0 });
          gsap.set([rays, glow, outro], { opacity: 1 });
          const s = spots();
          cards.forEach((c, k) => gsap.set(c, { x: s[k].x, y: s[k].y, rotate: s[k].r, scale: 1, opacity: 1 }));
          return;
        }

        const s = spots();
        gsap.set(cards, { x: 0, y: 30, scale: 0.15, opacity: 0, rotate: 0 });
        gsap.set([rays, glow, outro], { opacity: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            pin: true,
            start: "top top",
            end: small ? "+=1400" : "+=2000",
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(box, { rotateY: -60, rotateX: -12, scale: 0.7 }, { rotateY: -32, rotateX: -22, scale: 1, duration: 1.2, ease: "power2.out" })
          // anticipation wiggle
          .to(box, { rotateZ: 4, duration: 0.15 })
          .to(box, { rotateZ: -4, duration: 0.15 })
          .to(box, { rotateZ: 3, duration: 0.12 })
          .to(box, { rotateZ: 0, duration: 0.12 })
          // bow spins off
          .to(bow, { y: -260, rotate: 540, scale: 0.4, opacity: 0, duration: 0.9, ease: "power2.in" })
          .to(intro, { opacity: 0, y: -40, duration: 0.6 }, "<")
          // lid pops and flips away
          .to(lid, { y: -120, duration: 0.35, ease: "power2.out" }, "-=0.2")
          .to(lid, { y: -520, x: 240, rotateX: -120, rotateZ: 40, opacity: 0, duration: 1, ease: "power2.in" })
          // light bursts
          .to(glow, { opacity: 1, scale: 1.6, duration: 0.6 }, "-=0.9")
          .to(rays, { opacity: 1, duration: 0.6 }, "<")
          .to(rays, { rotate: 120, duration: 4 }, "<")
          // products fly out, staggered
          .to(
            cards,
            {
              x: (k) => s[k].x,
              y: (k) => s[k].y,
              rotate: (k) => s[k].r,
              scale: 1,
              opacity: 1,
              duration: 1.6,
              ease: "back.out(1.4)",
              stagger: 0.12,
            },
            "-=4"
          )
          // box sinks a little, outro text rises
          .to(box, { y: small ? 30 : 50, scale: 0.82, duration: 1 }, "-=1.6")
          .to(outro, { opacity: 1, y: 0, duration: 0.8 }, "-=1");
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <div className="gu-anchor">
      <section className="gu" ref={root} aria-label="Unwrap the Cubtix shelf">
        <div className="gu-intro">
          <p className="gu-kicker">Scroll to unwrap</p>
          <h2 className="gu-title">What&apos;s inside a <span>Cubtix</span> gift?</h2>
        </div>

        <div className="gu-stage">
          <div className="gu-rays" aria-hidden="true" />
          <div className="gu-glow" aria-hidden="true" />

          <div className="gu-scene" aria-hidden="true">
            <div className="gu-box">
              <div className="gu-face gu-front" />
              <div className="gu-face gu-back" />
              <div className="gu-face gu-right" />
              <div className="gu-face gu-left" />
              <div className="gu-face gu-bottom" />
              <div className="gu-inside" />
              <div className="gu-lid">
                <div className="gu-lf gu-ltop" />
                <div className="gu-lf gu-lfront" />
                <div className="gu-lf gu-lback" />
                <div className="gu-lf gu-lright" />
                <div className="gu-lf gu-lleft" />
                <div className="gu-bow">
                  <i className="gu-loop gu-loop-l" />
                  <i className="gu-loop gu-loop-r" />
                  <i className="gu-knot" />
                </div>
              </div>
            </div>
          </div>

          {items.map((it) => (
            <Link key={it.ph} href={it.href} className="gu-card" data-cursor="Shop">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo(it.ph)} alt="" loading="lazy" />
              <span>{it.label}</span>
            </Link>
          ))}
        </div>

        <div className="gu-outro">
          <h2 className="gu-title">Every gift, <span>under one roof.</span></h2>
          <Link className="btn btn-gold btn-lg" href="/catalogue">Explore the catalogue <ArrowRight size={18} /></Link>
        </div>
      </section>
    </div>
  );
}
