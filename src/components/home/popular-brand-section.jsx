"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { popularBrands } from "@/constant/popular-brand";
import Badge from "../ui/badge";
export default function PopularBrandSection() {
  const brands = [...popularBrands, ...popularBrands];
  return (
    <section className="max-w-xxl mx-auto w-full mt-8 px-4 md:px-8">
      <div className="text-center mb-12">
        <Badge name="TOP BRANDS" />

        <h2 className=" text-xl md:text-4xl font-bold mt-2">Browse by Brand</h2>

        <p className="text-muted-foreground mt-2 md:mt-4">
          Explore thousands of verified used cars from leading manufacturers.
        </p>
      </div>
      <div className="relative overflow-x-hidden  py-4">
        <motion.div
          className="flex gap-6 w-max"
          initial={{ x: 0 }}
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {brands.map((brand, index) => (
            <Link
              key={`${brand.name}-${index}`}
              href={`/cars?brands=${encodeURIComponent(brand.name)}`}
              className="group"
            >
              <div
                className="
                  w-40 h-40
                  rounded-3xl
                  border
                  border-gray-300
                  bg-white
                  shadow-sm
                  hover:shadow-xl
                  transition-all
                  duration-300
                  flex flex-col
                  items-center
                  justify-center
                  gap-4
                  hover:-translate-y-1
                "
              >
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={60}
                  height={60}
                  className="object-contain"
                  loading="lazy"
                />

                <span className="font-medium text-center">{brand.name}</span>
              </div>
            </Link>
          ))}
        </motion.div>

        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent pointer-events-none" />

        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
