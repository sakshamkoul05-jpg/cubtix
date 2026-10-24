export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`logo${light ? " is-light" : ""}`}>
      <span className="logo-mark" aria-hidden="true">C</span>
      <span className="logo-text">
        <span className="logo-word">Cubtix</span>
        <span className="logo-sub">Toys · Gifts · Accessories</span>
      </span>
    </span>
  );
}
