"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ------------------------------------------------------------------ */
/* Smooth scroll + scroll velocity (shared by marquee, stamp, header)  */
/* ------------------------------------------------------------------ */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), touchMultiplier: 1.4 });
    window.__lenis = lenis;
    lenis.on("scroll", (e: Lenis) => {
      ScrollTrigger.update();
      document.documentElement.style.setProperty("--vel", String(Math.max(-40, Math.min(40, e.velocity))));
    });
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Drawers / mobile menu lock the body — pause smooth scroll with them.
    const mo = new MutationObserver(() => (document.body.style.overflow === "hidden" ? lenis.stop() : lenis.start()));
    mo.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    return () => {
      mo.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    const id = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(id);
  }, [pathname]);

  // Smart header: slides away on scroll down, back on scroll up. Plus a progress line.
  useEffect(() => {
    let last = 0;
    const root = document.documentElement;
    const on = () => {
      const y = window.scrollY;
      const max = root.scrollHeight - innerHeight;
      root.style.setProperty("--progress", String(max > 0 ? y / max : 0));
      if (Math.abs(y - last) > 6) {
        root.classList.toggle("hdr-hide", y > last && y > 260);
        last = y;
      }
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  return <div className="progress" aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/* Cursor: dot + lagging ring, labels from data-cursor, magnetic CTAs  */
/* ------------------------------------------------------------------ */
export function Cursor() {
  useEffect(() => {
    if (!finePointer() || reduced()) return;
    const dot = document.querySelector<HTMLElement>(".cur-dot")!;
    const ring = document.querySelector<HTMLElement>(".cur-ring")!;
    const label = ring.querySelector<HTMLElement>("span")!;
    document.documentElement.classList.add("has-cursor");

    const dx = gsap.quickTo(dot, "x", { duration: 0.08 });
    const dy = gsap.quickTo(dot, "y", { duration: 0.08 });
    const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    let mag: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;
    const move = (e: PointerEvent) => {
      // 3D tilt on product & category cards
      const card = (e.target as HTMLElement).closest<HTMLElement>(".pcard, .ccard");
      if (tilt && tilt !== card) {
        gsap.to(tilt, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
        tilt.style.removeProperty("--gx");
        tilt = null;
      }
      if (card) {
        tilt = card;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(card, { rotateY: px * 7, rotateX: -py * 7, transformPerspective: 900, duration: 0.5, ease: "power3" });
        card.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
        card.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
      }

      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);

      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      const hot = t.closest("a, button, input, select, textarea, label, [role=button]");
      ring.classList.toggle("is-label", !!labelled);
      ring.classList.toggle("is-hot", !labelled && !!hot);
      dot.classList.toggle("is-hidden", !!labelled);
      if (labelled) label.textContent = labelled.dataset.cursor!;

      // Magnetic pull on primary buttons
      const m = t.closest<HTMLElement>(".btn, .list-btn, .hwa, [data-magnetic]");
      if (mag && mag !== m) {
        gsap.to(mag, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
        mag = null;
      }
      if (m) {
        mag = m;
        const r = m.getBoundingClientRect();
        gsap.to(m, { x: (e.clientX - r.left - r.width / 2) * 0.28, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4, ease: "power3" });
      }
    };
    const down = () => ring.classList.add("is-down");
    const up = () => ring.classList.remove("is-down");
    const leave = () => document.documentElement.classList.add("cur-out");
    const enter = () => document.documentElement.classList.remove("cur-out");

    addEventListener("pointermove", move);
    addEventListener("pointerdown", down);
    addEventListener("pointerup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      removeEventListener("pointermove", move);
      removeEventListener("pointerdown", down);
      removeEventListener("pointerup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div className="cur-dot" aria-hidden="true" />
      <div className="cur-ring" aria-hidden="true"><span /></div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Reveals: re-run on every page                                       */
/* ------------------------------------------------------------------ */
let navs = 0;
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (reduced()) {
      root.classList.add("motion-off");
      return;
    }
    root.classList.add("motion-on");

    let ctx: gsap.Context | null = null;
    const run = () => {
    ctx = gsap.context(() => {
      // 1. Split headings — words rise out of a mask
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const inner = el.querySelectorAll(".si");
        gsap.fromTo(
          inner,
          { y: 0, yPercent: 110, rotate: 4 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: el.dataset.split === "chars" ? 0.025 : 0.07,
            delay: Number(el.dataset.delay || 0),
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      // 2. Generic fade-up, batched so grids ripple in
      const UP = "[data-reveal='up'], .pcard, .ccard, .promise, .contact-card, .bulk-list li, .footer-grid > div, .cform-block, .owner";
      const ups = gsap.utils.toArray<HTMLElement>(UP).filter((el) => !el.closest("[data-noreveal]"));
      gsap.set(ups, { y: 50, opacity: 0 });
      ScrollTrigger.batch(ups, {
        start: "top 94%",
        once: true,
        onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.08, overwrite: "auto" }),
      });

      // 3. Images unmask from bottom with a slow settle
      gsap.utils.toArray<HTMLElement>("[data-reveal='img'], .ccard-img, .cat-hero-img, .about-arch, .about-small, .owner-photo, .edit-media, .visit-map, .cmap").forEach((el) => {
        const img = el.querySelector("img, iframe");
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" });
        if (img) tl.fromTo(img, { scale: 1.35 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0.1);
      });

      // 4. Eyebrows slide in with a growing rule
      gsap.utils.toArray<HTMLElement>(".eyebrow").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
      });

      // 5. Parallax
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const s = Number(el.dataset.speed);
        gsap.to(el, { yPercent: s * -20, ease: "none", scrollTrigger: { trigger: el.parentElement || el, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // 6. Count-ups
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const o = { v: 0 };
        gsap.to(o, {
          v: end,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
          onUpdate: () => (el.textContent = String(Math.round(o.v))),
        });
      });

      // 7. Footer wordmark letters
      const word = document.querySelector(".fword");
      if (word) {
        gsap.fromTo(
          word.querySelectorAll(".si"),
          { y: 0, yPercent: 100 },
          { y: 0, yPercent: 0, ease: "expo.out", duration: 1.4, stagger: 0.06, scrollTrigger: { trigger: word, start: "top 98%", once: true } }
        );
      }
    });
    ScrollTrigger.refresh();
    };

    // Wait for the preloader on first load, and for the page curtain on later navigations.
    const later = navs++ > 0;
    let call: gsap.core.Tween | null = null;
    let mo: MutationObserver | null = null;
    const go = () => (call = gsap.delayedCall(later ? 0.55 : 0, run));
    if (root.classList.contains("loaded")) go();
    else {
      mo = new MutationObserver(() => {
        if (root.classList.contains("loaded")) {
          mo?.disconnect();
          go();
        }
      });
      mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    }
    return () => {
      mo?.disconnect();
      call?.kill();
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
