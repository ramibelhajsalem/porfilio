import type { MetadataRoute } from "next";
import { portfolio } from "@/content/portfolio";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = portfolio.site.seo.url.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
