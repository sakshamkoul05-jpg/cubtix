"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { formatPrice, productPhoto, products } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";
import { Close, ListIcon, Plus, Tick, WaIcon, ArrowRight } from "./Icons";
import { flyToList } from "./motion/fly";

export { WaIcon };

type Line = { id: string; qty: number };

type Ctx = {
  lines: Line[];
  count: number;
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const EnquiryContext = createContext<Ctx | null>(null);
const KEY = "cubtix-enquiry";

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, loaded]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const has = useCallback((id: string) => lines.some((l) => l.id === id), [lines]);
  const toggle = useCallback(
    (id: string) =>
      setLines((ls) => (ls.some((l) => l.id === id) ? ls.filter((l) => l.id !== id) : [...ls, { id, qty: 1 }])),
    []
  );
  const setQty = useCallback(
    (id: string, qty: number) =>
      setLines((ls) => (qty <= 0 ? ls.filter((l) => l.id !== id) : ls.map((l) => (l.id === id ? { ...l, qty } : l)))),
    []
  );
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(
    () => ({ lines, count: lines.length, has, toggle, setQty, clear, open, setOpen }),
    [lines, has, toggle, setQty, clear, open]
  );

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <EnquiryDrawer />
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside EnquiryProvider");
  return ctx;
}

export function buildMessage(lines: Line[], extra?: string) {
  const rows = lines
    .map((l, i) => {
      const p = products.find((x) => x.id === l.id);
      return p ? `${i + 1}. ${p.name}${formatPrice(p.price) ? ` (${formatPrice(p.price)})` : ""} — Qty ${l.qty}` : null;
    })
    .filter(Boolean)
    .join("\n");
  return `Hi ${site.name}! Please share price & availability for:\n\n${rows}${extra ? `\n\n${extra}` : ""}\n\n(Sent from the Cubtix website)`;
}

export function AddButton({ id }: { id: string }) {
  const { has, toggle } = useEnquiry();
  const added = has(id);
  return (
    <button
      type="button"
      className={`add-btn${added ? " is-added" : ""}`}
      onClick={(e) => {
        if (!added) flyToList(e.currentTarget.closest(".pcard, .gf-card, [data-fly]")?.querySelector(".pcard-media, img"));
        toggle(id);
      }}
      aria-pressed={added}
    >
      {added ? <Tick /> : <Plus />}
      {added ? "In your list" : "Add to list"}
    </button>
  );
}

export function ListButton() {
  const { count, setOpen } = useEnquiry();
  return (
    <button type="button" className="list-btn" onClick={() => setOpen(true)} aria-label={`Open my gift list, ${count} items`}>
      <span className="list-btn-text">My list</span>
      <span className={`list-btn-count${count > 0 ? " has" : ""}`}>{count}</span>
    </button>
  );
}

export function FloatingList() {
  const { count, setOpen } = useEnquiry();
  if (count === 0) return null;
  return (
    <button type="button" className="float-list" onClick={() => setOpen(true)}>
      <span className="float-count">{count}</span>
      <span>{count === 1 ? "gift" : "gifts"} in your list</span>
      <span className="float-cta">Review <ArrowRight size={16} /></span>
    </button>
  );
}

function EnquiryDrawer() {
  const { lines, open, setOpen, setQty, clear } = useEnquiry();
  const [note, setNote] = useState("");
  const href = whatsappLink(buildMessage(lines, note.trim() ? `Note: ${note.trim()}` : undefined));
  const totalQty = lines.reduce((a, l) => a + l.qty, 0);
  const total = lines.reduce((a, l) => a + (products.find((x) => x.id === l.id)?.price ?? 0) * l.qty, 0);

  return (
    <div className={`drawer-root${open ? " is-open" : ""}`} aria-hidden={!open}>
      <div className="drawer-scrim" onClick={() => setOpen(false)} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Your enquiry list">
        <div className="drawer-head">
          <div>
            <h2 className="drawer-title">My list</h2>
            <p className="drawer-sub">{lines.length} products · {totalQty} pcs{total > 0 ? ` · approx. ${formatPrice(total)}` : ""}</p>
          </div>
          <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label="Close list">
            <Close />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer-empty">
            <ListIcon size={36} />
            <p className="drawer-empty-title">Your list is empty</p>
            <p>Add products to your list, then send them to us on WhatsApp in one message. We reply with prices, stock and delivery.</p>
            <Link className="btn btn-primary" href="/catalogue" onClick={() => setOpen(false)}>Browse catalogue</Link>
          </div>
        ) : (
          <>
            <ul className="drawer-lines">
              {lines.map((l) => {
                const p = products.find((x) => x.id === l.id);
                if (!p) return null;
                return (
                  <li key={l.id} className="drawer-line">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={productPhoto(p, 160)} alt="" className="drawer-thumb" />
                    <div className="drawer-line-main">
                      <div className="drawer-line-name">{p.name}</div>
                      <div className="drawer-line-note">{formatPrice(p.price) ?? p.note}</div>
                      <div className="qty">
                        <button type="button" onClick={() => setQty(l.id, l.qty - 1)} aria-label={`Decrease ${p.name}`}>−</button>
                        <input
                          type="number"
                          min={1}
                          value={l.qty}
                          aria-label={`Quantity of ${p.name}`}
                          onChange={(e) => setQty(l.id, Math.max(1, Number(e.target.value) || 1))}
                        />
                        <button type="button" onClick={() => setQty(l.id, l.qty + 1)} aria-label={`Increase ${p.name}`}>+</button>
                      </div>
                    </div>
                    <button type="button" className="line-remove" onClick={() => setQty(l.id, 0)} aria-label={`Remove ${p.name}`}>
                      <Close size={16} />
                    </button>
                  </li>
                );
              })}
            </ul>
            <label className="drawer-note">
              <span>Add a note (optional)</span>
              <textarea
                rows={2}
                placeholder="e.g. bulk order for my shop, delivery to Palampur, birthday return gifts"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </label>
            <div className="drawer-foot">
              <a className="btn btn-wa btn-block" href={href} target="_blank" rel="noopener noreferrer">
                <WaIcon /> Send enquiry on WhatsApp
              </a>
              <p className="drawer-fine">No login or payment here. We confirm price, stock and delivery on WhatsApp before you pay.</p>
              <button type="button" className="text-btn" onClick={clear}>Clear list</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
