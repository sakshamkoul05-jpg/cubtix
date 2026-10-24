"use client";

import { useSearchParams } from "next/navigation";
import GiftFinder from "./GiftFinder";
import { recipients, type Recipient } from "@/lib/products";

export default function GiftFinderPage() {
  const params = useSearchParams();
  const f = params.get("for");
  const initial = recipients.some((r) => r.id === f) ? (f as Recipient) : undefined;
  return <GiftFinder key={initial ?? "none"} initial={initial} />;
}
