"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { ArrowRight, WaIcon } from "./Icons";
import { useEnquiry } from "./Enquiry";
import { productsFor, recipients, type Recipient } from "@/lib/products";
import { whatsappLink } from "@/lib/site";

const occasions = ["Birthday", "Return gifts", "Festival", "Back to school", "Thank you", "Just because"];
const budgets = ["Under ₹200", "₹200 – ₹500", "₹500 – ₹1,000", "₹1,000 +", "Not sure yet"];

export default function GiftFinder({ initial, compact = false }: { initial?: Recipient; compact?: boolean }) {
  const [step, setStep] = useState(initial ? 1 : 0);
  const [who, setWho] = useState<Recipient | null>(initial ?? null);
  const [occasion, setOccasion] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const { toggle, has, setOpen } = useEnquiry();

  useEffect(() => {
    if (initial) {
      setWho(initial);
      setStep(1);
    }
  }, [initial]);

  const whoMeta = recipients.find((r) => r.id === who);
  const results = useMemo(() => {
    if (!who) return [];
    const ranges: Record<string, [number, number]> = {
      "Under ₹200": [0, 199],
      "₹200 – ₹500": [200, 500],
      "₹500 – ₹1,000": [500, 1000],
      "₹1,000 +": [1000, 1e9],
    };
    const r = budget ? ranges[budget] : undefined;
    const all = productsFor(who);
    const inBudget = r ? all.filter((p) => p.price && p.price >= r[0] && p.price <= r[1]) : all;
    const list = inBudget.length ? inBudget : all;
    // New arrivals first, then the rest
    return [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew)).slice(0, compact ? 8 : 12);
  }, [who, compact, budget]);

  const reset = () => {
    setStep(0);
    setWho(null);
    setOccasion(null);
    setBudget(null);
  };

  const message = `Hi Cubtix! I'm looking for a gift.\n\nFor: ${whoMeta?.label ?? "-"} (${whoMeta?.sub ?? ""})\nOccasion: ${occasion ?? "-"}\nBudget: ${budget ?? "-"}\n\nPlease suggest some options with prices.`;

  const addAll = () => {
    results.forEach((p) => {
      if (!has(p.id)) toggle(p.id);
    });
    setOpen(true);
  };

  return (
    <div className={`gf${compact ? " gf-compact" : ""}`} data-noreveal>
      {step < 3 && (
        <div className="gf-progress" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className={i <= step ? "on" : undefined} />
          ))}
        </div>
      )}

      {step === 0 && (
        <div className="gf-step">
          <p className="gf-count">Question 1 of 3</p>
          <h3 className="gf-q">Who is the gift for?</h3>
          <div className="gf-options gf-options-who">
            {recipients.map((r) => (
              <button
                key={r.id}
                type="button"
                className={`gf-opt${who === r.id ? " is-on" : ""}`}
                onClick={() => {
                  setWho(r.id);
                  setStep(1);
                }}
              >
                <span className="gf-opt-label">{r.label}</span>
                <span className="gf-opt-sub">{r.sub}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="gf-step">
          <p className="gf-count">Question 2 of 3 · for {whoMeta?.label.toLowerCase()}</p>
          <h3 className="gf-q">What&apos;s the occasion?</h3>
          <div className="gf-options">
            {occasions.map((o) => (
              <button
                key={o}
                type="button"
                className={`gf-opt gf-opt-pill${occasion === o ? " is-on" : ""}`}
                onClick={() => {
                  setOccasion(o);
                  setStep(2);
                }}
              >
                <span className="gf-opt-label">{o}</span>
              </button>
            ))}
          </div>
          <button type="button" className="gf-back" onClick={() => setStep(0)}>← Back</button>
        </div>
      )}

      {step === 2 && (
        <div className="gf-step">
          <p className="gf-count">Question 3 of 3 · {occasion?.toLowerCase()}</p>
          <h3 className="gf-q">Roughly what budget, per gift?</h3>
          <div className="gf-options">
            {budgets.map((b) => (
              <button
                key={b}
                type="button"
                className={`gf-opt gf-opt-pill${budget === b ? " is-on" : ""}`}
                onClick={() => {
                  setBudget(b);
                  setStep(3);
                }}
              >
                <span className="gf-opt-label">{b}</span>
              </button>
            ))}
          </div>
          <button type="button" className="gf-back" onClick={() => setStep(1)}>← Back</button>
        </div>
      )}

      {step === 3 && whoMeta && (
        <div className="gf-results">
          <div className="gf-results-head">
            <div>
              <p className="gf-count">Your gift edit</p>
              <h3 className="gf-q">
                {results.length} ideas {whoMeta.id === "home" || whoMeta.id === "bulk" ? whoMeta.label.toLowerCase() : `for ${whoMeta.label.replace("For ", "").toLowerCase()}`}
                <em> — {occasion?.toLowerCase()}, {budget?.toLowerCase()}</em>
              </h3>
            </div>
            <div className="gf-actions">
              <a className="btn btn-wa" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
                <WaIcon /> Ask Cubtix to suggest
              </a>
              <button type="button" className="btn btn-outline" onClick={addAll}>
                Add all to my list <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <div className="pgrid">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <button type="button" className="gf-back" onClick={reset}>↺ Start again</button>
        </div>
      )}
    </div>
  );
}
