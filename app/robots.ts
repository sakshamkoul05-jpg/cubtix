import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Served at /robots.txt
export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, "");
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}
