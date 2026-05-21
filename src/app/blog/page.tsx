import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { postsByDate } from "@/content/blog/posts";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Veneers Blog — Smile Tips from a Sugar Land Dentist | RealVeneers",
  description:
    "Honest guides to porcelain veneers, costs, and cosmetic dentistry from Dr. Ryan Trevino of RealVeneers in Sugar Land, TX. Real answers before you commit.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "The RealVeneers Blog — Veneer Guides from Sugar Land, TX",
    description:
      "Honest guides to porcelain veneers, costs, and cosmetic dentistry from a Sugar Land cosmetic dentist.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

function fmt(iso: string) {
  return dateFmt.format(new Date(iso));
}

export default function BlogIndexPage() {
  const [featured, ...rest] = postsByDate;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
        ])}
      />
      <Nav />
      <main className="flex-1">
        {/* Header */}
        <section className="pt-32 lg:pt-44 pb-4 lg:pb-8">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
              The RealVeneers Journal
            </div>
            <h1 className="mt-5 font-display text-6xl lg:text-8xl leading-[1] tracking-tight">
              Veneers, explained
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted text-balance">
              Straight answers on porcelain veneers, costs, and cosmetic
              dentistry — written by Dr. Ryan Trevino for patients across Sugar
              Land and Greater Houston.
            </p>
            <div className="divider-line mt-10" />
          </div>
        </section>

        {/* Featured post */}
        <section className="py-10 lg:py-14">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid lg:grid-cols-2 gap-8 lg:gap-14 items-center"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-foreground/5 ring-1 ring-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.hero}
                  alt={featured.heroAlt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div>
                <div className="flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-accent-deep">
                  <span>Latest</span>
                  <span className="text-accent">·</span>
                  <span className="text-foreground-muted">
                    {featured.category}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-4xl lg:text-5xl leading-[1.05] tracking-tight text-balance group-hover:text-accent-deep transition-colors">
                  {featured.h1}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-foreground-muted">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-3 text-xs tracking-[0.16em] uppercase text-foreground-muted">
                  <span>{fmt(featured.published)}</span>
                  <span className="text-accent">·</span>
                  <span>{featured.readMinutes} min read</span>
                </div>
                <span className="mt-7 inline-flex items-center gap-2 text-sm tracking-wide text-foreground group-hover:text-accent-deep transition-colors">
                  <span className="underline underline-offset-4 decoration-line">
                    Read the article
                  </span>
                  <span
                    aria-hidden
                    className="group-hover:translate-x-0.5 transition-transform"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* Post grid */}
        <section className="pb-24 lg:pb-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="divider-line mb-14" />
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <article key={post.slug} className="group flex flex-col">
                  <Link href={`/blog/${post.slug}`} className="flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-foreground/5 ring-1 ring-line">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.hero}
                        alt={post.heroAlt}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="mt-5 text-xs tracking-[0.18em] uppercase text-accent-deep">
                      {post.category}
                    </div>
                    <h3 className="mt-3 font-display text-2xl leading-snug tracking-tight text-balance group-hover:text-accent-deep transition-colors">
                      {post.h1}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-xs tracking-[0.16em] uppercase text-foreground-muted">
                      <span>{fmt(post.published)}</span>
                      <span className="text-accent">·</span>
                      <span>{post.readMinutes} min</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-foreground text-background py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 text-center">
            <div className="text-xs tracking-[0.22em] uppercase text-accent">
              Start here
            </div>
            <h2 className="mt-5 font-display text-4xl lg:text-6xl leading-[1.04] tracking-tight text-balance">
              Have a question about your smile?
            </h2>
            <p className="mt-6 mx-auto max-w-md text-lg leading-relaxed text-background/70">
              Book a free consultation with Dr. Trevino and get honest answers —
              no obligation.
            </p>
            <Link
              href="/#contact"
              className="group mt-9 inline-flex items-center gap-3 rounded-full bg-background text-foreground pl-7 pr-3 py-3 text-sm tracking-wide hover:bg-accent-soft transition-colors"
            >
              Book a free consultation
              <span className="grid place-items-center w-9 h-9 rounded-full bg-foreground/10 group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
