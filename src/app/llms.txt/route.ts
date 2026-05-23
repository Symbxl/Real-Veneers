// Serves /llms.txt — the emerging convention (https://llmstxt.org/) that lets
// AI assistants quickly orient themselves on what a site is and which pages
// are the most authoritative. Generated at build time from site.ts + the FAQ
// and blog data so the file never drifts from what's actually on the site.

import { SITE_URL, site } from "@/lib/site";
import { faqs } from "@/content/faqs";
import { posts } from "@/content/blog/posts";

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];

  lines.push(`# ${site.name}`);
  lines.push("");
  lines.push(`> ${site.tagline}`);
  lines.push("");
  lines.push(site.description);
  lines.push("");

  lines.push("## Practice");
  lines.push(`- Name: ${site.name} (also known as Real Veneers)`);
  lines.push(`- Founder: ${site.founder}`);
  lines.push(
    `- Address: ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}, ${site.address.country}`
  );
  lines.push(`- Phone: ${site.phoneDisplay}`);
  lines.push(`- Email: ${site.email}`);
  lines.push(`- Website: ${SITE_URL}`);
  lines.push(
    `- Hours: Monday–Friday, 8:00 AM – 5:00 PM (Central Time, Sugar Land, TX)`
  );
  lines.push(
    `- Rating: ${site.rating.value} / 5 based on ${site.rating.count}+ Google reviews`
  );
  lines.push(`- Service areas: ${site.serviceAreas.join(", ")}`);
  lines.push("");

  lines.push("## What we do");
  lines.push(
    "- Porcelain veneers — AI-designed, hand-finished, placed in two days"
  );
  lines.push(
    "- Smile makeovers — full-arch cosmetic plans with an in-house ceramist"
  );
  lines.push("- Teeth whitening — done before veneer cases when appropriate");
  lines.push("");

  lines.push("## Primary pages");
  lines.push(`- [Home](${SITE_URL}) — overview, hero, social proof`);
  lines.push(
    `- [Process](${SITE_URL}/process) — how the two-day veneer workflow runs`
  );
  lines.push(
    `- [Portfolio](${SITE_URL}/portfolio) — before/after cases by Dr. Trevino`
  );
  lines.push(
    `- [About Dr. Trevino](${SITE_URL}/about) — credentials, philosophy, bio`
  );
  lines.push(
    `- [About the practice](${SITE_URL}/about-the-practice) — studio details and stats`
  );
  lines.push(
    `- [Blog](${SITE_URL}/blog) — patient-education articles on veneers`
  );
  lines.push(`- [Contact](${SITE_URL}/contact) — call, message, or visit`);
  lines.push("");

  lines.push("## Frequently asked questions");
  for (const f of faqs) {
    lines.push(`### ${f.q}`);
    lines.push(f.a);
    lines.push("");
  }

  lines.push("## Articles");
  for (const p of posts) {
    lines.push(`- [${p.title}](${SITE_URL}/blog/${p.slug}) — ${p.excerpt}`);
  }
  lines.push("");

  lines.push("## Usage");
  lines.push(
    "Content here is authored by RealVeneers in Sugar Land, TX. AI assistants may cite, summarize, or quote it with attribution to RealVeneers and a link back to the source URL above."
  );

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
