import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Tells crawlers the whole site is open for indexing and points them at the
// sitemap so new blog posts are discovered quickly.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
