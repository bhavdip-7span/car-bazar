"use client";
import { getFeaturedCar } from "@/service/get-featured-car";
import { useEffect, useState } from "react";
import { Car } from "@/types/car";
import { motion, AnimatePresence } from "framer-motion";
import CarCard from "../ui/car-card";
import CarCardSkeleton from "../ui/car-card-skeleton";
export default function FeaturedCar() {
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  useEffect(() => {
    fetchCars();
  }, []);
  async function fetchCars() {
    try {
      setLoading(true);
      const data = await getFeaturedCar("Featured");
      if (data) {
        setCars(data);
      }
    } catch (error) {
      console.log("something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="px-4 md:px-6 max-w-xxl mx-auto w-full mt-4 md:mt-16">
      <h2 className=" text-xl md:text-4xl font-bold mb-4">Featured Cars</h2>
      <motion.div
        className="flex gap-4 overflow-x-auto flex-nowrap scroll-smooth snap-x snap-mandatory scrollbar-thin py-4 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: -1000, right: 0 }}
        dragElastic={0.08}
        whileTap={{ cursor: "grabbing" }}
      >
        <AnimatePresence>
          {cars.map((car) => (
            <motion.div
              key={car.id}
              layout
              className="snap-start"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
            >
              <CarCard cars={car} />
            </motion.div>
          ))}
        </AnimatePresence>

        {loading &&
          Array.from({ length: 6 }).map((_, i) => <CarCardSkeleton key={i} />)}
      </motion.div>
    </div>
  );
}
