import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Features from "@/components/Features";
import Products from "@/components/Products";
import Showcase from "@/components/Showcase";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative">
      <div className="bg-aurora" />
      <div className="bg-grid" />

      <Navbar />
      <Hero />
      <Marquee />
      <Features />
      <Products />
      <Showcase />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
