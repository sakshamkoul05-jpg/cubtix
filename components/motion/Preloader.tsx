"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const words = ["Hot Wheels", "Teddies", "Keychains", "Diaries", "Wallets", "Jewellery", "Gifts"];

// First visit of a session only: counter + cycling words, then the curtain lifts.
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const root = document.documentElement;
    let seen = false;
    try {
      seen = !!sessionStorage.getItem("cbx-seen");
      sessionStorage.setItem("cbx-seen", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.display = "none";
      root.classList.add("loaded");
      return;
    }
    root.classList.add("is-loading");
    const num = el.querySelector(".pl-num")!;
    const word = el.querySelector(".pl-word")!;
    const o = { v: 0 };
    let wi = 0;
    const tl = gsap.timeline({
      onComplete: () => {
        el.style.display = "none";
        root.classList.remove("is-loading");
      },
    });
    tl.to(o, {
      v: 100,
      duration: 1.9,
      ease: "power2.inOut",
      onUpdate: () => {
        num.textContent = String(Math.round(o.v)).padStart(3, "0");
        const n = Math.min(words.length - 1, Math.floor((o.v / 100) * words.length));
        if (n !== wi) {
          wi = n;
          word.textContent = words[n];
        }
      },
    })
      .to(el.querySelector(".pl-bar i"), { scaleX: 1, duration: 1.9, ease: "power2.inOut" }, 0)
      .to(el.querySelectorAll(".pl-inner > *"), { yPercent: -120, opacity: 0, duration: 0.6, ease: "expo.in", stagger: 0.04 })
      .add(() => root.classList.add("loaded"))
      .to(el.querySelectorAll(".pl-panel"), { yPercent: -100, duration: 1.1, ease: "expo.inOut", stagger: 0.08 }, "-=0.1");
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="preloader" ref={ref} aria-hidden="true">
      <div className="pl-panel pl-panel-a" />
      <div className="pl-panel pl-panel-b">
        <div className="pl-inner">
          <span className="pl-mark">C</span>
          <span className="pl-word">Toys</span>
          <span className="pl-num">000</span>
          <span className="pl-bar"><i /></span>
          <span className="pl-place">Krishna Gallery · Dharamshala</span>
        </div>
      </div>
    </div>
  );
}
