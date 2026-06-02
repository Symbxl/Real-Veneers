import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About the Practice",
  description:
    "RealVeneers is the cosmetic studio of Trevino Dental Group — a top-rated Sugar Land, TX practice led by Dr. Ryan Trevino, crafting natural, two-day porcelain veneers and comprehensive family care under one roof.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <AboutContent />
      <Footer />
    </>
  );
}
