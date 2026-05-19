"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#process", label: "The Process" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "Dr. Trevino" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/75 border-b border-line/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-display text-2xl tracking-tight text-foreground">
            Real<span className="text-accent-deep italic">Veneers</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm tracking-wide text-foreground/75 hover:text-foreground transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+12819801733"
            className="text-sm tracking-wide text-foreground/75 hover:text-foreground transition-colors"
          >
            (281) 980-1733
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm tracking-wide hover:bg-accent-deep transition-colors"
          >
            Book Consult
            <span aria-hidden>→</span>
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`h-px bg-foreground transition-transform ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px bg-foreground transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px bg-foreground transition-transform ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-line/60 bg-background/95 backdrop-blur-xl">
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-foreground text-background px-5 py-3 text-sm"
            >
              Book Consult →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
