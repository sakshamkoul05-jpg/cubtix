import gsap from "gsap";

const COLORS = ["#E11D48", "#E8B931", "#2563EB", "#EC4899", "#16A34A", "#F97316", "#7C3AED"];

// Confetti burst from any element (used when a product lands in "My list").
export function confetti(at: Element, count = 26) {
  const r = at.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("i");
    p.className = "confetti";
    const size = gsap.utils.random(6, 11);
    Object.assign(p.style, {
      left: `${cx}px`,
      top: `${cy}px`,
      width: `${size}px`,
      height: `${size * gsap.utils.random(0.4, 1)}px`,
      background: COLORS[i % COLORS.length],
      borderRadius: Math.random() > 0.6 ? "50%" : "2px",
    });
    document.body.appendChild(p);
    const angle = gsap.utils.random(-Math.PI, 0) + gsap.utils.random(-0.4, 0.4);
    const dist = gsap.utils.random(50, 140);
    gsap
      .timeline({ onComplete: () => p.remove() })
      .to(p, { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, rotate: gsap.utils.random(-360, 360), duration: 0.5, ease: "power3.out" })
      .to(p, { y: `+=${gsap.utils.random(80, 160)}`, x: `+=${gsap.utils.random(-30, 30)}`, rotate: "+=180", opacity: 0, duration: 0.9, ease: "power1.in" });
  }
}

// Sends a copy of the product photo arcing into the "My list" button, then bursts confetti.
export function flyToList(from: Element | null | undefined) {
  if (!from || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.documentElement.classList.remove("hdr-hide");
  const target = Array.from(document.querySelectorAll<HTMLElement>(".list-btn")).find((b) => b.offsetParent !== null);
  if (!target) return;
  const a = from.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const ghost = document.createElement("div");
  ghost.className = "fly-ghost";
  const img = from instanceof HTMLImageElement ? from : from.querySelector("img");
  if (img) ghost.style.backgroundImage = `url("${img.currentSrc || img.src}")`;
  Object.assign(ghost.style, { left: `${a.left}px`, top: `${a.top}px`, width: `${a.width}px`, height: `${a.height}px` });
  document.body.appendChild(ghost);

  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  const tl = gsap.timeline({ onComplete: () => ghost.remove() });
  tl.to(ghost, { x: dx, duration: 0.85, ease: "power1.inOut" }, 0)
    .to(ghost, { y: dy, duration: 0.85, ease: "back.in(1.6)" }, 0)
    .to(ghost, { scale: 0.08, rotate: 25, borderRadius: "50%", duration: 0.85, ease: "power2.in" }, 0)
    .to(ghost, { opacity: 0, duration: 0.15 }, 0.75)
    .add(() => confetti(target), 0.82)
    .fromTo(target, { scale: 1 }, { scale: 1.18, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, 0.8);
}

// Gold sparkle trail — call on pointermove over an element.
let last = 0;
export function sparkle(e: { clientX: number; clientY: number }, color = "#F6D36B") {
  const now = performance.now();
  if (now - last < 35 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  last = now;
  const s = document.createElement("i");
  s.className = "sparkle";
  s.textContent = Math.random() > 0.35 ? "✦" : "•";
  Object.assign(s.style, { left: `${e.clientX}px`, top: `${e.clientY}px`, color, fontSize: `${gsap.utils.random(10, 22)}px` });
  document.body.appendChild(s);
  gsap
    .timeline({ onComplete: () => s.remove() })
    .fromTo(s, { scale: 0, rotate: 0 }, { scale: 1, rotate: gsap.utils.random(-90, 90), duration: 0.25, ease: "back.out(3)" })
    .to(s, { y: gsap.utils.random(20, 50), x: gsap.utils.random(-20, 20), opacity: 0, scale: 0.3, duration: 0.8, ease: "power1.in" });
}
