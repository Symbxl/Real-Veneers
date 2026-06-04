import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with RealVeneers in Sugar Land, TX. Call, email, or send a message — Dr. Ryan Trevino's studio replies within one business day.",
  alternates: { canonical: "/contact" },
};

type Detail = {
  label: string;
  lines: string[];
  href?: string;
  external?: boolean;
};

const details: Detail[] = [
  {
    label: "Studio",
    lines: [
      site.address.street,
      `${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
    ],
    href: site.mapsUrl,
    external: true,
  },
  {
    label: "Phone",
    lines: [site.phoneDisplay],
    href: `tel:${site.phone}`,
  },
  {
    label: "Email",
    lines: [site.email],
    href: `mailto:${site.email}`,
  },
  {
    label: "Hours",
    lines: ["Mon–Thu · 9:00 – 5:00", "Fri · By appointment"],
  },
];

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-background pt-36 pb-24 lg:pt-44 lg:pb-32">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 80% 10%, #b89968 0%, transparent 60%)",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
            <div className="text-xs uppercase tracking-[0.22em] text-accent">
              Get in touch
            </div>
            <h1 className="mt-5 max-w-2xl font-display text-5xl leading-[1] tracking-tight lg:text-7xl">
              Let&apos;s talk about
              <br />
              <span className="italic text-accent">your new smile.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-foreground/75">
              Have a question, or ready to get started? Reach out and our team
              will get back to you within one business day — no pressure, no
              obligation.
            </p>

            <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
              {/* Studio info */}
              <div className="border-t border-foreground/10">
                {details.map((d) => (
                  <div
                    key={d.label}
                    className="flex items-start gap-6 border-b border-foreground/10 py-5"
                  >
                    <div className="w-20 shrink-0 pt-1 text-xs uppercase tracking-[0.18em] text-foreground/50">
                      {d.label}
                    </div>
                    <div className="text-base leading-relaxed text-foreground/90">
                      {d.href ? (
                        <a
                          href={d.href}
                          {...(d.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="transition-colors hover:text-accent"
                        >
                          {d.lines.join(" ")}
                        </a>
                      ) : (
                        d.lines.map((line, i) => (
                          <div key={i}>{line}</div>
                        ))
                      )}
                    </div>
                  </div>
                ))}

                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium tracking-wide text-foreground ring-1 ring-line transition-colors hover:text-accent hover:ring-accent/40"
                >
                  Open in Maps
                  <span aria-hidden>→</span>
                </a>
              </div>

              {/* Form */}
              <div className="lg:pl-4">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
