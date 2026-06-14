import Link from "next/link";

export default function CTASection() {
  return (
    <section className="max-w-xxl mx-auto px-4 md:px-8 my-12 md:my-24">
      <div className="relative overflow-hidden rounded-4xl bg-gradient-to-r from-primary to-primary/80 p-8 md:p-20 text-white">
        <div className="max-w-2xl">
          <span className=" text-sm md:text-sm font-medium uppercase tracking-widest">
            Start Your Journey
          </span>

          <h2 className=" mt-2 md:mt-4 text-2xl md:text-5xl font-bold leading-tight">
            Find Your Perfect Used Car Today
          </h2>

          <p className="mt-4 text-white/80 text-base md:text-lg">
            Search, compare, and discover verified cars from trusted sellers
            across India.
          </p>

          <div className="mt-4 md:mt-8 flex flex-wrap gap-4">
            <Link
              href="/cars"
              className="rounded-xl bg-white text-primary px-6 py-3 font-semibold"
            >
              Explore Cars
            </Link>
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 size-64 rounded-full bg-white/10" />
        <div className="absolute right-40 top-10 size-24 rounded-full bg-white/10" />
      </div>
    </section>
  );
}
