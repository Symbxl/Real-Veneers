export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-surface py-28 lg:py-40 text-foreground"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Centered statement */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-accent-deep">
            <span className="h-px w-8 bg-accent" />
            An eye for aesthetics
            <span className="h-px w-8 bg-accent" />
          </div>
          <h2 className="mt-7 font-display text-5xl lg:text-7xl leading-[1.03] tracking-tight text-balance">
            Veneers aren&apos;t a procedure.{" "}
            <span className="italic text-accent">They&apos;re a portrait.</span>
          </h2>
        </div>

        {/* Portrait + body */}
        <div className="mt-20 grid items-center gap-x-20 gap-y-20 lg:grid-cols-2">
          {/* Portrait with a floating credential card */}
          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] ring-1 ring-line shadow-[0_50px_90px_-45px_rgba(15,15,16,0.5)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/dr.jpg"
                alt="Dr. Ryan Trevino"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-surface px-6 py-5 ring-1 ring-line shadow-[0_24px_50px_-24px_rgba(15,15,16,0.45)] sm:left-8">
              <div className="h-px w-8 bg-accent" />
              <div className="mt-3 font-display text-2xl leading-none">
                Dr. Ryan Trevino
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-foreground-muted">
                Founder &amp; Lead Clinician
              </div>
            </div>
          </div>

          {/* Body */}
          <div>
            <div className="space-y-5 text-lg leading-relaxed text-foreground-muted">
              <p>
                Dr. Trevino trained as a clinician but thinks like an artist. He
                studies the way light moves through enamel, how a smile sits
                inside a face, how the smallest asymmetries make a result feel
                real instead of manufactured.
              </p>
              <p>
                Every smile he designs is built around <em>you</em> — your
                proportions, your personality, the way your lips move when you
                laugh. The goal isn&apos;t a Hollywood look. It&apos;s the
                version of you that already exists in your head.
              </p>
            </div>

            <blockquote className="mt-10 border-l-2 border-accent pl-7">
              <p className="font-display text-2xl lg:text-3xl italic leading-snug text-foreground text-balance">
                Smile makeovers are crafted to look effortlessly natural, even
                up close. That&apos;s the whole standard.
              </p>
              <footer className="mt-4 text-[11px] uppercase tracking-[0.22em] text-foreground-muted">
                Dr. Ryan Trevino
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
