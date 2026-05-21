import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getPost, posts, type Block } from "@/content/blog/posts";
import { SITE_URL, site } from "@/lib/site";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

// Pre-render every post at build time for the fastest possible load — a
// ranking signal and a better experience for patients.
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.published,
      modifiedTime: post.updated,
      authors: [post.author],
      images: [{ url: post.hero, alt: post.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.hero],
    },
  };
}

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

// Renders one content block. The blog body is structured data, so the markup
// — a single H1, then a clean H2/H3 outline — stays consistent and crawlable.
function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-lg leading-relaxed text-foreground-muted">
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2 className="mt-14 font-display text-3xl lg:text-4xl leading-tight tracking-tight text-balance">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-8 font-display text-2xl leading-snug tracking-tight">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="space-y-3 pl-1">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="relative pl-6 text-lg leading-relaxed text-foreground-muted"
            >
              <span
                aria-hidden
                className="absolute left-0 top-3 h-1.5 w-1.5 rounded-full bg-accent"
              />
              {item}
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside className="rounded-2xl border border-line bg-accent-soft/40 p-6 lg:p-7">
          <p className="text-base leading-relaxed text-foreground">
            {block.text}
          </p>
        </aside>
      );
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const related = post.related
    .map((s) => getPost(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: post.h1,
            description: post.description,
            url,
            image: `${SITE_URL}${post.hero}`,
            datePublished: post.published,
            dateModified: post.updated,
            authorName: post.author,
          }),
          breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Blog", url: `${SITE_URL}/blog` },
            { name: post.h1, url },
          ]),
          faqSchema(post.faqs),
        ]}
      />
      <Nav />
      <main className="flex-1">
        {/* Article header */}
        <article>
          <header className="pt-32 lg:pt-44 pb-10">
            <div className="mx-auto max-w-3xl px-6 sm:px-10">
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-foreground-muted"
              >
                <Link href="/blog" className="hover:text-accent-deep">
                  Blog
                </Link>
                <span className="text-accent">/</span>
                <span className="text-accent-deep">{post.category}</span>
              </nav>
              <h1 className="mt-6 font-display text-4xl lg:text-6xl leading-[1.05] tracking-tight text-balance">
                {post.h1}
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-foreground-muted text-balance">
                {post.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-[0.16em] uppercase text-foreground-muted">
                <span>{post.author}</span>
                <span className="text-accent">·</span>
                <span>{dateFmt.format(new Date(post.published))}</span>
                <span className="text-accent">·</span>
                <span>{post.readMinutes} min read</span>
              </div>
            </div>
          </header>

          {/* Hero image */}
          <div className="mx-auto max-w-5xl px-6 sm:px-10">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-foreground/5 ring-1 ring-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.hero}
                alt={post.heroAlt}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Body */}
          <div className="mx-auto max-w-3xl px-6 sm:px-10 py-14 lg:py-20">
            <div className="space-y-5">
              {post.body.map((block, i) => (
                <BlockView key={i} block={block} />
              ))}
            </div>

            {/* FAQ */}
            {post.faqs.length > 0 && (
              <section className="mt-16">
                <div className="divider-line mb-10" />
                <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
                  Frequently asked questions
                </div>
                <div className="mt-6 divide-y divide-line">
                  {post.faqs.map((faq) => (
                    <details key={faq.q} className="group py-5">
                      <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-xl leading-snug tracking-tight marker:content-none">
                        {faq.q}
                        <span
                          aria-hidden
                          className="shrink-0 text-accent-deep transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="mt-3 leading-relaxed text-foreground-muted">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Author note */}
            <div className="mt-16 rounded-2xl border border-line bg-surface p-7 lg:p-8">
              <div className="text-xs tracking-[0.2em] uppercase text-accent-deep">
                Written by
              </div>
              <div className="mt-2 font-display text-2xl tracking-tight">
                {post.author}
              </div>
              <p className="mt-3 leading-relaxed text-foreground-muted">
                Founder and lead clinician at RealVeneers, a cosmetic dentistry
                studio in Sugar Land, TX devoted to natural, two-day porcelain
                veneers.{" "}
                <Link
                  href="/about"
                  className="text-foreground underline underline-offset-4 decoration-line hover:text-accent-deep"
                >
                  More about Dr. Trevino
                </Link>
                .
              </p>
            </div>
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="border-t border-line bg-surface py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-6 sm:px-10">
              <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
                Keep reading
              </div>
              <h2 className="mt-4 font-display text-3xl lg:text-4xl tracking-tight">
                Related articles
              </h2>
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group flex flex-col rounded-2xl border border-line bg-background p-7 lg:p-8"
                  >
                    <div className="text-xs tracking-[0.18em] uppercase text-accent-deep">
                      {r.category}
                    </div>
                    <h3 className="mt-3 font-display text-2xl leading-snug tracking-tight text-balance group-hover:text-accent-deep transition-colors">
                      {r.h1}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-muted">
                      {r.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm tracking-wide text-foreground group-hover:text-accent-deep transition-colors">
                      <span className="underline underline-offset-4 decoration-line">
                        Read article
                      </span>
                      <span
                        aria-hidden
                        className="group-hover:translate-x-0.5 transition-transform"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-foreground text-background py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 text-center">
            <div className="text-xs tracking-[0.22em] uppercase text-accent">
              Sugar Land, TX
            </div>
            <h2 className="mt-5 font-display text-4xl lg:text-6xl leading-[1.04] tracking-tight text-balance">
              Ready to see what two days could do?
            </h2>
            <p className="mt-6 mx-auto max-w-md text-lg leading-relaxed text-background/70">
              Book a free consultation with Dr. Trevino — a written plan, a
              transparent price, and honest answers.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-background text-foreground pl-7 pr-3 py-3 text-sm tracking-wide hover:bg-accent-soft transition-colors"
              >
                Book a free consultation
                <span className="grid place-items-center w-9 h-9 rounded-full bg-foreground/10 group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </Link>
              <a
                href={`tel:${site.phone}`}
                className="text-sm tracking-wide text-background/80 hover:text-background transition-colors"
              >
                or call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
