// Cubtix logo — an isometric CUBE that is also a GIFT BOX (red faces, gold ribbon & bow),
// with a gold sparkle for "happiness". Wordmark: "cubtix", the i's dot is a tiny gold cube.
export function LogoMark({ size = 46 }: { size?: number }) {
  return (
    <svg className="logo-svg" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      {/* faces */}
      <polygon points="32,12 54,24 32,36 10,24" fill="#FF4D6B" />
      <polygon points="10,24 32,36 32,60 10,48" fill="#E11D48" />
      <polygon points="32,36 54,24 54,48 32,60" fill="#A80F37" />
      {/* ribbon: sides */}
      <polygon points="19,28.9 23,31.1 23,55.1 19,52.9" fill="#F6C445" />
      <polygon points="41,31.1 45,28.9 45,52.9 41,55.1" fill="#D9A520" />
      {/* ribbon: top cross */}
      <polygon points="19,28.9 23,31.1 45,19.1 41,16.9" fill="#FFD866" />
      <polygon points="41,31.1 45,28.9 23,16.9 19,19.1" fill="#FFD866" />
      {/* bow */}
      <path d="M32 24 C 24 14, 15 18, 21 23 C 24 25.5, 29 25, 32 24 Z" fill="#F6C445" stroke="#C98E12" strokeWidth="1" />
      <path d="M32 24 C 40 14, 49 18, 43 23 C 40 25.5, 35 25, 32 24 Z" fill="#FFD866" stroke="#C98E12" strokeWidth="1" />
      <ellipse cx="32" cy="24" rx="3.2" ry="2.4" fill="#E8B931" stroke="#C98E12" strokeWidth="1" />
      {/* sparkle */}
      <path d="M55 3 L56.6 8.4 L62 10 L56.6 11.6 L55 17 L53.4 11.6 L48 10 L53.4 8.4 Z" fill="#E8B931" />
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`logo logo-v3${light ? " is-light" : ""}`}>
      <LogoMark />
      <span className="logo-text">
        <span className="logo-word" aria-label="Cubtix">
          cub<b>t<span className="logo-i">ı<i aria-hidden="true" /></span>x</b>
        </span>
        <span className="logo-sub">Little Things, Big Happiness!</span>
      </span>
    </span>
  );
}
