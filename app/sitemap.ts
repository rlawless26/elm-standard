import type { MetadataRoute } from "next";

const BASE = "https://elmstandard.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: Array<{ path: string; priority: number }> = [
    { path: "/", priority: 1.0 },
    { path: "/traditional", priority: 0.9 },
    { path: "/shaker", priority: 0.9 },
    { path: "/modern", priority: 0.9 },
    { path: "/how-it-works", priority: 0.7 },
    { path: "/measure", priority: 0.7 },
    { path: "/worksheets", priority: 0.6 },
    { path: "/safety", priority: 0.5 },
    { path: "/about", priority: 0.5 },
    { path: "/faq", priority: 0.5 },
    { path: "/terms", priority: 0.3 },
    { path: "/refunds", priority: 0.3 },
    { path: "/privacy", priority: 0.3 },
  ];
  return pages.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    priority,
  }));
}
