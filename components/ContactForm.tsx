"use client";

import { useState } from "react";
import { categories } from "@/lib/products";
import { whatsappLink } from "@/lib/site";
import { WaIcon } from "@/components/Icons";

// No server needed: the form opens WhatsApp with the details filled in,
// so every enquiry lands straight on the shop's phone.
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = [
      "Hi Cubtix! New enquiry from the website:",
      `Name: ${f.get("name")}`,
      `Phone: ${f.get("phone")}`,
      f.get("city") ? `City: ${f.get("city")}` : "",
      `Looking for: ${f.get("topic")}`,
      "",
      String(f.get("message") || ""),
    ].filter((l, i) => l !== "" || i === 5);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form className="cform" onSubmit={onSubmit}>
      <div className="cform-row">
        <label>
          <span>Your name *</span>
          <input name="name" required autoComplete="name" placeholder="Full name" />
        </label>
        <label>
          <span>Mobile number *</span>
          <input name="phone" required type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9+ ]{10,15}" placeholder="10-digit mobile" />
        </label>
      </div>
      <div className="cform-row">
        <label>
          <span>City</span>
          <input name="city" autoComplete="address-level2" placeholder="e.g. Dharamshala" />
        </label>
        <label>
          <span>Looking for</span>
          <select name="topic" defaultValue="General enquiry">
            <option>General enquiry</option>
            <option>Bulk order</option>
            <option>Return gifts</option>
            {categories.map((c) => (
              <option key={c.slug}>{c.name}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        <span>Message *</span>
        <textarea name="message" required rows={5} placeholder="Tell us what you need — item, quantity, budget or occasion." />
      </label>
      <button className="btn btn-green btn-lg cform-submit" type="submit">
        <WaIcon /> Send enquiry
      </button>
      <p className="cform-note" role="status">
        {sent
          ? "WhatsApp has opened with your message — just press send. We usually reply within a few hours."
          : "Your enquiry opens in WhatsApp, ready to send. We reply with price and stock."}
      </p>
    </form>
  );
}
