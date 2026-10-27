import type { MetadataRoute } from "next";
import { categories } from "@/lib/products";
import { site } from "@/lib/site";

// Served at /sitemap.xml — new categories are added automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();
  const pages: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/catalogue", priority: 0.9, freq: "weekly" },
    { path: "/categories", priority: 0.8, freq: "weekly" },
    { path: "/gift-finder", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.7, freq: "monthly" },
    { path: "/write-for-us", priority: 0.4, freq: "monthly" },
  ];
  return [
    ...pages.map((p) => ({ url: `${base}${p.path}`, lastModified: now, changeFrequency: p.freq, priority: p.priority })),
    ...categories.map((c) => ({
      url: `${base}/categories/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
