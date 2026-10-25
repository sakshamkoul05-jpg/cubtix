// Cubtix identity — a faceted hexagonal "C" drawn as an isometric cube (the "Cub" in Cubtix),
// opening to the right, holding a small gold cube at its heart: "Little Things, Big Happiness!"

export function LogoMark({ size = 48 }: { size?: number }) {
  return (
    <svg className="logo-svg" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      {/* top faces (light) */}
      <polygon points="9.5,19 32,6 32,20 21.6,26" fill="#FB5373" />
      <polygon points="32,6 54.5,19 42.4,26 32,20" fill="#F43F5E" />
      {/* left face (mid) */}
      <polygon points="9.5,45 9.5,19 21.6,26 21.6,38" fill="#E11D48" />
      {/* bottom faces (dark) */}
      <polygon points="32,58 9.5,45 21.6,38 32,44" fill="#BE123C" />
      <polygon points="54.5,45 32,58 32,44 42.4,38" fill="#9F1239" />
      {/* the little gold cube */}
      <polygon points="32,25.5 37.6,28.75 32,32 26.4,28.75" fill="#FCD34D" />
      <polygon points="26.4,28.75 32,32 32,38.5 26.4,35.25" fill="#F0B429" />
      <polygon points="32,32 37.6,28.75 37.6,35.25 32,38.5" fill="#C98A0B" />
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`logo logo-v5${light ? " is-light" : ""}`}>
      <LogoMark />
      <span className="logo-text">
        <span className="logo-word" aria-label="Cubtix">Cub<b>tix</b></span>
        <span className="logo-sub">Little Things, Big Happiness!</span>
      </span>
    </span>
  );
}
