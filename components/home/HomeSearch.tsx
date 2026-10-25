"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "../Icons";

// Big hero search — sends shoppers straight to filtered catalogue results.
export default function HomeSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  return (
    <form
      className="h7-search"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(q.trim() ? `/catalogue?q=${encodeURIComponent(q.trim())}` : "/catalogue");
      }}
    >
      <Search size={20} />
      <label htmlFor="h7q" className="sr-only">Search products</label>
      <input id="h7q" type="search" placeholder="Search products…" value={q} onChange={(e) => setQ(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
}
