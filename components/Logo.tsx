// Cubtix identity — "The C that holds a cube".
// A bold, round-ended C (for Cubtix) holds a small gold isometric cube (the "Cub" in the name):
// the little things, held with big care — "Little Things, Big Happiness!"

export function LogoMark({ size = 46, onRed = false }: { size?: number; onRed?: boolean }) {
  return (
    <svg className="logo-svg" width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M76.05 28.15 A34 34 0 1 0 76.05 71.85" fill="none" stroke={onRed ? "#fff" : "#E11D48"} strokeWidth="16" strokeLinecap="round" />
      <g transform="translate(52 36.15)">
        <polygon points="0,0 12,6.93 0,13.86 -12,6.93" fill="#FFD24D" />
        <polygon points="-12,6.93 0,13.86 0,27.7 -12,20.78" fill="#F5B700" />
        <polygon points="0,13.86 12,6.93 12,20.78 0,27.7" fill="#C98A00" />
      </g>
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`logo logo-v6${light ? " is-light" : ""}`}>
      <LogoMark />
      <span className="logo-text">
        <span className="logo-word" aria-label="Cubtix">
          Cub<b>t<span className="logo-i">ı<i aria-hidden="true" /></span>x</b>
        </span>
        <span className="logo-sub">Little Things, Big Happiness!</span>
      </span>
    </span>
  );
}
