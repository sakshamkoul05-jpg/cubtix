import { Fragment } from "react";

// Renders text as masked words (or letters) so headings can rise into view.
// Pure markup — the animation lives in Motion.tsx — so it is safe in server components.
export default function Split({ text, chars = false }: { text: string; chars?: boolean }) {
  const words = text.split(" ").filter(Boolean);
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="sw" aria-hidden="true">
            {chars ? (
              [...w].map((ch, j) => (
                <span className="sc" key={j}>
                  <span className="si">{ch}</span>
                </span>
              ))
            ) : (
              <span className="si">{w}</span>
            )}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
      <span className="sr-only">{text}</span>
    </>
  );
}
