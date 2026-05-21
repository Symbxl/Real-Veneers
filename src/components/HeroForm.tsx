"use client";

import { useState } from "react";

export default function HeroForm() {
  const [step, setStep] = useState<0 | 1>(0);
  const [phone, setPhone] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [consent, setConsent] = useState(true);
  const [verified, setVerified] = useState(false);

  return (
    <div className="relative bg-surface rounded-2xl p-7 lg:p-9 shadow-[0_30px_80px_-20px_rgba(15,15,16,0.22),0_8px_24px_-12px_rgba(15,15,16,0.12)] ring-1 ring-line/60">
      <div className="flex items-center gap-7 pb-5 border-b border-line">
        <button
          type="button"
          onClick={() => setStep(0)}
          className="flex items-center gap-2.5 text-sm"
        >
          <span
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              step === 0 ? "bg-accent-deep" : "border border-line bg-background"
            }`}
          />
          <span
            className={
              step === 0
                ? "font-semibold text-foreground"
                : "text-foreground-muted"
            }
          >
            Fill out the form
          </span>
        </button>
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex items-center gap-2.5 text-sm"
        >
          <span
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              step === 1 ? "bg-accent-deep" : "border border-line bg-background"
            }`}
          />
          <span
            className={
              step === 1
                ? "font-semibold text-foreground"
                : "text-foreground-muted"
            }
          >
            Book your visit
          </span>
        </button>
      </div>

      <h3 className="mt-6 font-display text-3xl lg:text-4xl leading-tight tracking-tight">
        Free Smile Consultation
      </h3>
      <p className="mt-3 text-foreground-muted leading-relaxed">
        Excited to speak with you about{" "}
        <a
          href="#portfolio"
          className="text-accent-deep underline underline-offset-4 decoration-accent/60 hover:decoration-accent-deep"
        >
          your new smile
        </a>
        .
        <br />
        Book a call below to see if we&apos;re a fit.
      </p>

      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setStep(1);
        }}
      >
        <div className="flex items-stretch border border-line rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-accent/40 focus-within:border-accent transition">
          <div className="flex items-center gap-2 px-4 border-r border-line text-sm bg-background/50">
            <span aria-hidden className="text-base leading-none">
              🇺🇸
            </span>
            <span className="font-medium">+1</span>
          </div>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(555) 123-4567"
            className="flex-1 bg-transparent px-4 py-3.5 text-base focus:outline-none placeholder:text-foreground-muted/60"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            placeholder="First name **"
            className="bg-transparent border border-line rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition placeholder:text-foreground-muted/60"
            required
          />
          <input
            type="text"
            value={last}
            onChange={(e) => setLast(e.target.value)}
            placeholder="Last name **"
            className="bg-transparent border border-line rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition placeholder:text-foreground-muted/60"
            required
          />
        </div>

        <div className="bg-[#fafbfc] border border-[#e0e3e8] rounded-md px-3 py-2.5 flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <button
              type="button"
              role="checkbox"
              aria-checked={verified}
              onClick={() => setVerified((v) => !v)}
              className={`relative w-6 h-6 rounded border bg-white transition-colors ${
                verified
                  ? "border-[#00838f]"
                  : "border-[#c5c9d0] hover:border-[#9aa0a6]"
              }`}
            >
              {verified && (
                <svg
                  viewBox="0 0 24 24"
                  className="absolute inset-0 m-auto w-4 h-4 text-[#00838f]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
            <span className="text-sm text-[#3c4043]">I am human</span>
          </label>
          <div className="flex flex-col items-end leading-none">
            <div className="flex items-center gap-1.5">
              <svg
                viewBox="0 0 32 32"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path
                  d="M16 2 L4 8 v9 c0 7 5 12 12 13 7-1 12-6 12-13 V8 L16 2 z"
                  fill="#00838f"
                />
                <path
                  d="M11 11 v10 M11 16 h5 M16 11 v10"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <span className="text-[11px] font-medium text-[#3c4043] tracking-tight">
                hCaptcha
              </span>
            </div>
            <div className="mt-1 text-[10px] text-[#70757a]">
              <a href="#" className="hover:underline">
                Privacy
              </a>
              <span> · </span>
              <a href="#" className="hover:underline">
                Terms
              </a>
            </div>
          </div>
        </div>

        <label className="flex items-start gap-3 pt-1 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 w-4 h-4 shrink-0"
            style={{ accentColor: "var(--accent-deep)" }}
          />
          <span className="text-xs text-foreground-muted leading-relaxed">
            By entering your information, you consent to your data being saved
            in accordance with our{" "}
            <a href="#" className="underline text-foreground">
              Terms
            </a>{" "}
            &amp;{" "}
            <a href="#" className="underline text-foreground">
              Privacy Policy
            </a>
            .
          </span>
        </label>

        <button
          type="submit"
          disabled={!consent}
          className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-foreground text-background px-6 py-4 text-base tracking-wide hover:bg-accent-deep transition-colors group disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_12px_30px_-12px_rgba(15,15,16,0.45)]"
        >
          Continue
          <span className="group-hover:translate-x-0.5 transition-transform">
            →
          </span>
        </button>
      </form>
    </div>
  );
}
