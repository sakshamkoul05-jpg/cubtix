"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Split from "./Split";
import { ArrowRight } from "../Icons";
import { categories, photo, productsIn } from "@/lib/products";

gsap.registerPlugin(ScrollTrigger);

// Desktop: the section pins and the departments slide sideways as you scroll down.
// Phones: a normal swipeable row.
export default function Departments() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current!;
    const track = el.querySelector<HTMLElement>(".hd-track")!;
    const bar = el.querySelector<HTMLElement>(".hd-bar i")!;
    const num = el.querySelector<HTMLElement>(".hd-now")!;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const dist = () => track.scrollWidth - el.clientWidth + 48;
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${dist()}`,
          invalidateOnRefresh: true,
          onUpdate: (st) => {
            bar.style.transform = `scaleX(${st.progress})`;
            num.textContent = String(Math.min(categories.length, Math.floor(st.progress * categories.length) + 1)).padStart(2, "0");
          },
        },
      });
      track.querySelectorAll<HTMLElement>(".hd-img img").forEach((img) => {
        gsap.fromTo(img, { xPercent: -6 }, {
          xPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  // The wrapper div is React's anchor: GSAP's pin-spacer is inserted inside it, never beside React nodes.
  return (
    <div className="hd-anchor">
    <section className="hd" ref={section}>
      <div className="wrap hd-head">
        <div>
          <p className="eyebrow">Departments</p>
          <h2 className="sec-title" data-split>
            <Split text="Nine shelves," /> <em><Split text="one gift house." /></em>
          </h2>
        </div>
        <div className="hd-meta">
          <span className="hd-count"><span className="hd-now">01</span> / {String(categories.length).padStart(2, "0")}</span>
          <span className="hd-bar"><i /></span>
        </div>
      </div>
      <div className="hd-viewport">
        <div className="hd-track">
          {categories.map((c, i) => (
            <Link key={c.slug} href={`/categories/${c.slug}`} className="hd-card" data-cursor="Open">
              <span className="hd-n">{String(i + 1).padStart(2, "0")}</span>
              <div className="hd-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo(c.cover)} alt={c.name} loading="lazy" style={{ background: c.tint }} />
              </div>
              <div className="hd-body">
                <h3>{c.name}</h3>
                <p>{c.line}</p>
                <span className="hd-pieces">{productsIn(c.slug).length} pieces <ArrowRight size={15} /></span>
              </div>
            </Link>
          ))}
          <Link href="/categories" className="hd-card hd-all" data-cursor="All">
            <span>See every<br />department</span>
            <ArrowRight size={40} />
          </Link>
        </div>
      </div>
    </section>
    </div>
  );
}
