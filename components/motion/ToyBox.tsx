"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { photo } from "@/lib/products";

// The hero "toy box": product cards drop in, then visitors can grab, throw and bump them.
// Tiny hand-rolled physics — inertia, wall bounce, soft collisions — no physics library.
const toys = [
  { ph: "245914", label: "Teddy Bear", href: "/categories/soft-toys", x: 0.04, y: 0.06, r: -9 },
  { ph: "12361140", label: "Die-cast Car", href: "/categories/hot-wheels", x: 0.38, y: 0.02, r: 6 },
  { ph: "29544342", label: "Rings", href: "/categories/jewellery", x: 0.7, y: 0.1, r: -5 },
  { ph: "8982666", label: "Robot Pet", href: "/categories/toys", x: 0.12, y: 0.5, r: 7 },
  { ph: "16329479", label: "Brass Keychain", href: "/categories/keychains", x: 0.44, y: 0.42, r: -4 },
  { ph: "5594266", label: "Planner", href: "/categories/diaries", x: 0.74, y: 0.52, r: 10 },
  { ph: "815491", label: "Panda Plush", href: "/categories/soft-toys", x: 0.28, y: 0.74, r: -12 },
  { ph: "915917", label: "Leather Wallet", href: "/categories/wallets", x: 0.6, y: 0.78, r: 5 },
];

type Body = { x: number; y: number; vx: number; vy: number; r: number; vr: number; oy: number; w: number; h: number; drag: boolean; el: HTMLElement };

export default function ToyBox() {
  const box = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const root = box.current!;
    const els = Array.from(root.querySelectorAll<HTMLElement>(".toy"));
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, raf = 0, z = 10, t0 = performance.now();
    const bodies: Body[] = els.map((el) => ({ x: 0, y: 0, vx: 0, vy: 0, r: 0, vr: 0, oy: 0, w: 0, h: 0, drag: false, el }));

    const layout = (init: boolean) => {
      W = root.clientWidth;
      H = root.clientHeight;
      const w = Math.max(96, Math.min(170, W * 0.24));
      bodies.forEach((b, i) => {
        b.w = w;
        b.h = w * 1.22;
        b.el.style.width = `${w}px`;
        if (init) {
          b.x = toys[i].x * (W - w);
          b.y = toys[i].y * (H - b.h);
          b.r = toys[i].r;
        } else {
          b.x = Math.min(b.x, W - b.w);
          b.y = Math.min(b.y, H - b.h);
        }
      });
    };
    layout(true);

    const paint = (now: number) => {
      bodies.forEach((b, i) => {
        const calm = !b.drag && Math.abs(b.vx) + Math.abs(b.vy) < 0.4;
        const bob = calm && !still ? Math.sin(now / 900 + i * 1.7) * 4 : 0;
        b.el.style.transform = `translate3d(${b.x}px, ${b.y + b.oy + bob}px, 0) rotate(${b.r}deg)`;
      });
    };

    let visible = true;
    const step = (now: number) => {
      if (!visible) { raf = 0; return; }
      const dt = Math.min(2, (now - t0) / 16.7);
      t0 = now;
      for (const b of bodies) {
        if (b.drag) continue;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.r += b.vr * dt;
        b.r = Math.max(-24, Math.min(24, b.r));
        const f = Math.pow(0.955, dt);
        b.vx *= f;
        b.vy *= f;
        b.vr *= Math.pow(0.92, dt);
        if (b.x < 0) { b.x = 0; b.vx = Math.abs(b.vx) * 0.65; b.vr += b.vy * 0.2; }
        if (b.x > W - b.w) { b.x = W - b.w; b.vx = -Math.abs(b.vx) * 0.65; b.vr -= b.vy * 0.2; }
        if (b.y < 0) { b.y = 0; b.vy = Math.abs(b.vy) * 0.65; }
        if (b.y > H - b.h) { b.y = H - b.h; b.vy = -Math.abs(b.vy) * 0.65; b.vr += b.vx * 0.2; }
      }
      // Soft collisions: treat each card as a circle and push overlapping pairs apart.
      for (let i = 0; i < bodies.length; i++)
        for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i], c = bodies[j];
          const dx = c.x + c.w / 2 - (a.x + a.w / 2);
          const dy = c.y + c.h / 2 - (a.y + a.h / 2);
          const d = Math.hypot(dx, dy) || 1;
          const min = (a.w + c.w) * 0.42;
          if (d < min) {
            const nx = dx / d, ny = dy / d, push = (min - d) * 0.5;
            const rel = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny;
            const moving = Math.abs(a.vx) + Math.abs(a.vy) + Math.abs(c.vx) + Math.abs(c.vy) > 1.2 || a.drag || c.drag;
            if (!moving) continue; // let resting cards overlap like a real pile
            if (!a.drag) { a.x -= nx * push; a.y -= ny * push; }
            if (!c.drag) { c.x += nx * push; c.y += ny * push; }
            if (rel < 0) {
              const imp = -rel * 0.8;
              if (!a.drag) { a.vx -= nx * imp; a.vy -= ny * imp; a.vr -= Math.min(4, imp * 0.3); }
              if (!c.drag) { c.vx += nx * imp; c.vy += ny * imp; c.vr += Math.min(4, imp * 0.3); }
            }
          }
        }
      paint(now);
      raf = requestAnimationFrame(step);
    };

    // Drop-in once the preloader is done
    const intro = () => {
      if (still) return paint(0);
      bodies.forEach((b, i) => {
        b.oy = -H - b.h - i * 60;
        gsap.to(b, { oy: 0, duration: 1.3, ease: "bounce.out", delay: 0.15 + i * 0.09 });
      });
    };
    const html = document.documentElement;
    let mo: MutationObserver | null = null;
    if (html.classList.contains("loaded")) intro();
    else {
      bodies.forEach((b) => (b.oy = -2000));
      mo = new MutationObserver(() => {
        if (html.classList.contains("loaded")) {
          mo?.disconnect();
          intro();
        }
      });
      mo.observe(html, { attributes: true, attributeFilter: ["class"] });
    }
    raf = requestAnimationFrame(step);

    // Dragging
    const cleanups: (() => void)[] = [];
    bodies.forEach((b, i) => {
      let ox = 0, oy = 0, lx = 0, ly = 0, lt = 0, sx = 0, sy = 0, moved = 0;
      const down = (e: PointerEvent) => {
        e.preventDefault();
        b.el.setPointerCapture(e.pointerId);
        const r = root.getBoundingClientRect();
        ox = e.clientX - r.left - b.x;
        oy = e.clientY - r.top - b.y;
        lx = sx = e.clientX;
        ly = sy = e.clientY;
        lt = performance.now();
        moved = 0;
        b.drag = true;
        b.vx = b.vy = 0;
        b.el.style.zIndex = String(++z);
        b.el.classList.add("is-grab");
        gsap.to(b, { r: b.r * 0.4, duration: 0.3 });
      };
      const move = (e: PointerEvent) => {
        if (!b.drag) return;
        const r = root.getBoundingClientRect();
        const now = performance.now();
        const dt = Math.max(8, now - lt);
        b.x = Math.max(-b.w * 0.2, Math.min(W - b.w * 0.8, e.clientX - r.left - ox));
        b.y = Math.max(-b.h * 0.2, Math.min(H - b.h * 0.8, e.clientY - r.top - oy));
        b.vx = b.vx * 0.5 + ((e.clientX - lx) / dt) * 16.7 * 0.5;
        b.vy = b.vy * 0.5 + ((e.clientY - ly) / dt) * 16.7 * 0.5;
        b.r += (Math.max(-20, Math.min(20, b.vx * 0.6)) - b.r) * 0.15;
        moved = Math.max(moved, Math.hypot(e.clientX - sx, e.clientY - sy));
        lx = e.clientX;
        ly = e.clientY;
        lt = now;
      };
      const up = () => {
        if (!b.drag) return;
        b.drag = false;
        b.el.classList.remove("is-grab");
        b.vx = Math.max(-45, Math.min(45, b.vx));
        b.vy = Math.max(-45, Math.min(45, b.vy));
        b.vr = Math.max(-6, Math.min(6, b.vx * 0.25));
        if (moved < 6) router.push(toys[i].href);
      };
      b.el.addEventListener("pointerdown", down);
      b.el.addEventListener("pointermove", move);
      b.el.addEventListener("pointerup", up);
      b.el.addEventListener("pointercancel", up);
      cleanups.push(() => {
        b.el.removeEventListener("pointerdown", down);
        b.el.removeEventListener("pointermove", move);
        b.el.removeEventListener("pointerup", up);
        b.el.removeEventListener("pointercancel", up);
      });
    });

    const vis = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) { t0 = performance.now(); raf = requestAnimationFrame(step); }
    });
    vis.observe(root);
    const ro = new ResizeObserver(() => layout(false));
    ro.observe(root);

    // "Shake the box" button
    const shake = () =>
      bodies.forEach((b) => {
        b.vx = (Math.random() - 0.5) * 50;
        b.vy = (Math.random() - 0.7) * 50;
        b.vr = (Math.random() - 0.5) * 8;
      });
    const btn = root.parentElement?.querySelector(".toy-shake");
    btn?.addEventListener("click", shake);

    return () => {
      cancelAnimationFrame(raf);
      mo?.disconnect();
      ro.disconnect();
      vis.disconnect();
      btn?.removeEventListener("click", shake);
      cleanups.forEach((f) => f());
      gsap.killTweensOf(bodies);
    };
  }, [router]);

  return (
    <div className="toybox-wrap">
      <div className="toybox" ref={box} data-cursor="Drag">
        {toys.map((t) => (
          <div
            className="toy"
            key={t.ph}
            role="link"
            tabIndex={0}
            aria-label={`${t.label} — open category`}
            onKeyDown={(e) => e.key === "Enter" && router.push(t.href)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo(t.ph)} alt="" draggable={false} />
            <span className="toy-label">{t.label}</span>
          </div>
        ))}
      </div>
      <div className="toybox-foot">
        <span className="toy-hint">Grab a toy and throw it</span>
        <button type="button" className="toy-shake">Shake the box</button>
      </div>
    </div>
  );
}
