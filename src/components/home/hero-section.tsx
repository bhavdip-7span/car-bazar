import Link from "next/link";
export default function HeroSection() {
  return (
    <section className="relative h-[100vh] max-w-xxl mx-auto w-full">
      <img
        src="/hero-car-image.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-8">
        <div className="max-w-xl text-white">
          <p className="text-sm uppercase tracking-widest">
            India's Trusted Used Car Marketplace
          </p>

          <h1 className="text-6xl font-bold leading-tight mt-4 w-full md:w-md">
            Find Your Perfect Ride
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            Browse thousands of verified used cars, compare prices
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              href="/cars"
              className="bg-primary px-6 py-3 rounded-lg hover:bg-primary-700 transition duration-200"
            >
              Explore Cars
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
