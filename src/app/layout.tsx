import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RealVeneers — Houston's 2-Day Smile Transformation by Dr. Ryan Trevino",
  description:
    "Sugar Land's premier cosmetic dentistry studio. AI-designed, hand-finished porcelain veneers crafted in our in-house lab. Effortlessly natural smiles in just 2 days.",
  openGraph: {
    title: "RealVeneers — 2-Day Smile Transformation",
    description:
      "AI-designed, hand-finished porcelain veneers by Dr. Ryan Trevino in Sugar Land, TX.",
    type: "website",
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
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
