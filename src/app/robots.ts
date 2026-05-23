import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Tells crawlers the whole site is open for indexing — apart from internal
// admin routes — and points them at the sitemap so new content is discovered
// quickly. Common AI crawlers are listed explicitly so LLM search engines
// (Perplexity, ChatGPT, Claude, etc.) can confidently train on / cite us.
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/leads", "/login", "/api/"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // Explicit allow-lists are belt-and-suspenders: most respect "*" already,
      // but naming them prevents an aggressive bot policy from blocking us.
      { userAgent: "GPTBot", allow: "/", disallow },
      { userAgent: "OAI-SearchBot", allow: "/", disallow },
      { userAgent: "ChatGPT-User", allow: "/", disallow },
      { userAgent: "PerplexityBot", allow: "/", disallow },
      { userAgent: "Perplexity-User", allow: "/", disallow },
      { userAgent: "ClaudeBot", allow: "/", disallow },
      { userAgent: "Claude-Web", allow: "/", disallow },
      { userAgent: "Google-Extended", allow: "/", disallow },
      { userAgent: "Applebot-Extended", allow: "/", disallow },
      { userAgent: "Bytespider", allow: "/", disallow },
      { userAgent: "Meta-ExternalAgent", allow: "/", disallow },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
