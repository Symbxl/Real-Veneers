import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import RealSection from "@/components/RealSection";
import GoogleReviews from "@/components/GoogleReviews";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <RealSection />
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
