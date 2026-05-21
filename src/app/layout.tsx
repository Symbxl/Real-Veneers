import type { Metadata } from "next";
import { Alegreya_Sans_SC, EB_Garamond } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import { dentistSchema } from "@/lib/structured-data";

// Subheader / kicker font — small-caps.
const alegreyaSC = Alegreya_Sans_SC({
  variable: "--font-alegreya",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// Header fallback — a faithful Garamond shown when "Adobe Garamond Pro"
// (a licensed Adobe font) isn't available on the visitor's system.
const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  display: "swap",
});

// metadataBase lets Next resolve every relative canonical URL and OG image to
// an absolute URL — required for correct sharing previews and SEO.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "RealVeneers — Sugar Land's 2-Day Smile Transformation by Dr. Ryan Trevino",
    // Page titles render as "Page Title | RealVeneers".
    template: "%s | RealVeneers",
  },
  description:
    "Sugar Land's premier cosmetic dentistry studio. AI-designed, hand-finished porcelain veneers crafted in our in-house lab. Effortlessly natural smiles in just 2 days.",
  applicationName: "RealVeneers",
  keywords: [
    "RealVeneers",
    "Real Veneers",
    "veneers Sugar Land",
    "porcelain veneers Sugar Land TX",
    "cosmetic dentist Sugar Land",
    "veneers Houston",
    "smile makeover Sugar Land",
    "Dr. Ryan Trevino",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "RealVeneers — 2-Day Smile Transformation in Sugar Land, TX",
    description:
      "AI-designed, hand-finished porcelain veneers by Dr. Ryan Trevino in Sugar Land, TX.",
    url: SITE_URL,
    siteName: "RealVeneers",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RealVeneers — 2-Day Smile Transformation in Sugar Land, TX",
    description:
      "AI-designed, hand-finished porcelain veneers by Dr. Ryan Trevino in Sugar Land, TX.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${alegreyaSC.variable} ${ebGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Site-wide business identity — feeds the "Real Veneers" knowledge panel. */}
        <JsonLd data={dentistSchema()} />
        {children}
      </body>
    </html>
  );
}
