"use client";

import { useEffect, useRef, useState } from "react";

// Image with a graceful fallback: if the photo can't load, a tinted panel with the label shows instead.
export default function Photo({
  src,
  alt,
  tint = "#F1F2F4",
  label,
  className,
  eager = false,
}: {
  src: string;
  alt: string;
  tint?: string;
  label?: string;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Catch images that failed before React hydrated (onError would have been missed).
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (failed) {
    return (
      <div className={`photo-fallback ${className ?? ""}`} style={{ background: tint }} role="img" aria-label={alt}>
        {label && <span>{label}</span>}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      style={{ background: tint }}
    />
  );
}
