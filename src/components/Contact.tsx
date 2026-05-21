import HeroForm from "./HeroForm";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-28 lg:py-36 bg-background text-foreground relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 15%, #b89968 0%, transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-6 sm:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-14 lg:gap-20 items-center">
          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-accent">
              Free consultation
            </div>
            <h2 className="mt-5 font-display text-5xl lg:text-7xl leading-[0.98] tracking-tight text-balance">
              Start with a<br />
              <span className="italic text-accent">conversation.</span>
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-foreground/75 max-w-md">
              Tell us a little about the smile you have and the smile you want.
              We&apos;ll get back to you within one business day with next steps
              — no pressure, no obligation.
            </p>

            <div className="mt-12 border-t border-foreground/10">
              <ContactRow label="Studio">
                4660 Sweetwater Blvd, Suite 230
                <br />
                Sugar Land, TX 77479
              </ContactRow>
              <ContactRow label="Phone">
                <a
                  href="tel:+12819801733"
                  className="hover:text-accent transition-colors"
                >
                  (281) 980-1733
                </a>
              </ContactRow>
              <ContactRow label="Hours">
                Mon–Thu · 9:00 – 5:00
                <br />
                Fri · By appointment
              </ContactRow>
            </div>
          </div>

          <div className="lg:pl-4">
            <HeroForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-6 items-start border-b border-foreground/10 py-5">
      <div className="text-xs tracking-[0.18em] uppercase text-foreground/50 w-20 shrink-0 pt-1">
        {label}
      </div>
      <div className="text-base text-foreground/90 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
