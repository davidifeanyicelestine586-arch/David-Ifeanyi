import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "/" },
    { url: "/projects" },
    { url: "/projects/tech-stack-architect" },
  ];
}
