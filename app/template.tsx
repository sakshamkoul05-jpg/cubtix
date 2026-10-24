"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

let first = true;
const names: Record<string, string> = {
  "/": "Home",
  "/catalogue": "Catalogue",
  "/categories": "Categories",
  "/about": "About Us",
  "/contact": "Contact Us",
  "/gift-finder": "Gift Finder",
};

// Re-mounts on every navigation: a green curtain with the page name sweeps off the new page.
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const label =
    names[pathname] ??
    (pathname.startsWith("/categories/")
      ? pathname.split("/").pop()!.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "Cubtix");

  useLayoutEffect(() => {
    const c = curtain.current!;
    if (first || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      first = false;
      c.style.display = "none";
      return;
    }
    const tl = gsap.timeline();
    tl.set(c, { display: "flex", yPercent: 0 })
      .fromTo(c.querySelector("span"), { yPercent: 100 }, { yPercent: 0, duration: 0.45, ease: "expo.out" })
      .to(c, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "+=0.15")
      .fromTo(page.current, { y: 80 }, { y: 0, duration: 1.1, ease: "expo.out", clearProps: "transform" }, "-=0.75")
      .set(c, { display: "none" });
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <div className="curtain" ref={curtain} aria-hidden="true">
        <span>{label}</span>
      </div>
      <div ref={page}>{children}</div>
    </>
  );
}
