"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/site";
import { WaIcon } from "./Icons";

// Pitch form: no server needed — it opens WhatsApp (92167 53108) with the pitch filled in.
export default function WriteForUsForm() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = [
      "Hi Cubtix! I'd like to write for you.",
      `Name: ${f.get("name")}`,
      `Email: ${f.get("email")}`,
      `Phone: ${f.get("phone") || "-"}`,
      `Topic: ${f.get("topic")}`,
      `Proposed title: ${f.get("title")}`,
      `Summary: ${f.get("summary")}`,
      f.get("link") ? `Writing sample / site: ${f.get("link")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <form className="cform" onSubmit={onSubmit}>
      <div className="cform-row">
        <label><span>Your name *</span><input name="name" required autoComplete="name" /></label>
        <label><span>Email *</span><input name="email" type="email" required autoComplete="email" /></label>
      </div>
      <div className="cform-row">
        <label><span>Phone</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" /></label>
        <label>
          <span>Topic</span>
          <select name="topic" defaultValue="Gift guides">
            <option>Gift guides</option>
            <option>Toy reviews</option>
            <option>Parenting &amp; play</option>
            <option>Collectors&apos; corner</option>
            <option>Stationery &amp; study</option>
            <option>Style &amp; accessories</option>
            <option>Other</option>
          </select>
        </label>
      </div>
      <label><span>Proposed title *</span><input name="title" required placeholder="e.g. 15 return-gift ideas under ₹100" /></label>
      <label><span>Short summary *</span><textarea name="summary" required rows={5} placeholder="What will the article cover? Who is it for?" /></label>
      <label><span>Link to a writing sample or your site</span><input name="link" type="url" placeholder="https://" /></label>
      <button className="btn btn-green btn-lg cform-submit" type="submit"><WaIcon /> Send pitch on WhatsApp</button>
      <p className="cform-note" role="status">
        {sent ? "WhatsApp has opened with your pitch — just press send." : "Your pitch opens in WhatsApp (92167 53108), ready to send."}
      </p>
    </form>
  );
}
