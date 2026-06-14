import CTASection from "@/components/home/cta-section";
import FeaturedCar from "@/components/home/featured-car";
import Footer from "@/components/home/footer";

import HeroSection from "@/components/home/hero-section";
import PopularBrandSection from "@/components/home/popular-brand-section";
export default function Home() {
  return (
    <>
      <HeroSection />
      <PopularBrandSection />
      <FeaturedCar />
      <CTASection />
      <Footer />
    </>
  );
}
