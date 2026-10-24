import gsap from "gsap";

// Sends a copy of the product photo arcing into the "My list" button.
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
    .fromTo(target, { scale: 1 }, { scale: 1.18, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, 0.8);
}
