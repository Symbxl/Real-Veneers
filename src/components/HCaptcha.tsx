"use client";

import { useEffect, useRef } from "react";

// Minimal typing for the hCaptcha JS API we use.
interface HCaptchaApi {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id: string) => void;
}

declare global {
  interface Window {
    hcaptcha?: HCaptchaApi;
  }
}

const SCRIPT_SRC = "https://js.hcaptcha.com/1/api.js?render=explicit";

// hCaptcha's official "always passes" test site key — used until a real
// NEXT_PUBLIC_HCAPTCHA_SITE_KEY is set in the environment.
const TEST_SITE_KEY = "10000000-ffff-ffff-ffff-000000000001";

// One shared loader promise so the script is only injected once.
let scriptPromise: Promise<void> | null = null;

function loadHCaptcha(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.hcaptcha) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    // Wait for window.hcaptcha to actually attach after the script loads.
    const waitForApi = () => {
      let tries = 0;
      const tick = () => {
        if (window.hcaptcha) return resolve();
        if (++tries > 100) return reject(new Error("hCaptcha load timed out"));
        setTimeout(tick, 50);
      };
      tick();
    };

    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      waitForApi();
      return;
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = waitForApi;
    script.onerror = () => reject(new Error("hCaptcha failed to load"));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export default function HCaptcha({
  onVerify,
  onExpire,
}: {
  onVerify: (token: string) => void;
  onExpire?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  // Keep the latest callbacks in a ref so the render effect runs only once.
  const callbacks = useRef({ onVerify, onExpire });
  useEffect(() => {
    callbacks.current = { onVerify, onExpire };
  }, [onVerify, onExpire]);

  const siteKey =
    process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || TEST_SITE_KEY;

  useEffect(() => {
    let cancelled = false;

    loadHCaptcha()
      .then(() => {
        if (
          cancelled ||
          !containerRef.current ||
          !window.hcaptcha ||
          widgetId.current !== null
        ) {
          return;
        }
        widgetId.current = window.hcaptcha.render(containerRef.current, {
          sitekey: siteKey,
          theme: "light",
          callback: (token: string) => callbacks.current.onVerify(token),
          "expired-callback": () => callbacks.current.onExpire?.(),
          "error-callback": () => callbacks.current.onExpire?.(),
        });
      })
      .catch(() => {
        /* Network or load failure — the captcha slot simply stays empty. */
      });

    return () => {
      cancelled = true;
    };
  }, [siteKey]);

  return (
    <div ref={containerRef} className="flex min-h-[78px] justify-center" />
  );
}
