import CTASection from "@/components/home/cta-section";
import Footer from "@/components/home/footer";

import HeroSection from "@/components/home/hero-section";
import PopularBrandSection from "@/components/home/popular-brand-section";
export default function Home() {
  return (
    <>
      <HeroSection />
      <PopularBrandSection />
      <CTASection />
      <Footer />
    </>
  );
}
