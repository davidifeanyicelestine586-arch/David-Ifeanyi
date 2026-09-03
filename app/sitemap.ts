import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://david-ifeanyi-pi.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/projects`, changeFrequency: "monthly", priority: 0.9 },
    {
      url: `${siteUrl}/projects/tech-stack-architect`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
