import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import RealSection from "@/components/RealSection";
import VideoSection from "@/components/VideoSection";
import GoogleReviews from "@/components/GoogleReviews";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { faqs } from "@/content/faqs";
import { faqSchema } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      {/* FAQ rich-result block — mirrors the on-page FAQ section verbatim
          so Google (and LLMs) treat these answers as the canonical ones. */}
      <JsonLd data={faqSchema(faqs)} />
      <Nav />
      <main className="flex-1">
        <Hero />
        <RealSection />
        <VideoSection />
        <PortfolioShowcase />
        <About />
        <GoogleReviews />
        <Portfolio />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
