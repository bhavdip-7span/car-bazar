"use client";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import Filter from "@/components/car-listing/filter";
import CarCard from "@/components/ui/car-card";
import { useEffect, useState, useRef } from "react";
import type { Car } from "@/types/car";
import CarCardSkeleton from "@/components/ui/car-card-skeleton";

import { useSearchParams } from "next/navigation";
export default function Home() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState("relevance");
  const searchParamsString = searchParams.toString();
  const brands = searchParams.get("brands")?.split(",") || [];
  const colors = searchParams.get("colors")?.split(",") || [];
  const fuelType = searchParams.get("fuel_types")?.split(",") || [];
  const transmission = searchParams.get("transmissions")?.split(",") || [];
  const ownership = searchParams.get("ownership")?.split(",") || [];
  const seats = searchParams.get("seats")?.split(",") || [];
  const bodyType = searchParams.get("body_type")?.split(",") || [];

  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");
  const minYear = searchParams.get("min_year");
  const maxYear = searchParams.get("max_year");
  const minKm = searchParams.get("min_km");
  const maxKm = searchParams.get("max_km");
  const engine = searchParams.get("engine_cc");

  const search = searchParams.get("search");
  const location = searchParams.get("location")?.split(",") || [];

  const PAGE_SIZE = 12;

  const [data, setdata] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      {
        rootMargin: "100px",
      },
    );

    const currentRef = loadMoreRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loading, hasMore]);
  useEffect(() => {
    setdata([]);
    setPage(0);
    setHasMore(true);

    fetchCars(0);
  }, [searchParamsString, sortBy]);
  useEffect(() => {
    if (page === 0) return;

    fetchCars(page);
  }, [page]);
  const fetchCars = async (currentPage: number) => {
    setLoading(true);

    try {
      const from = currentPage * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase.from("cars").select("*");

      if (search) {
        query = query.or(
          `brand.ilike.%${search}%,model.ilike.%${search}%,variant.ilike.%${search}%`,
        );
      }
      if (brands.length) {
        query = query.in("brand", brands);
      }
      if (ownership.length) {
        query = query.in("ownership", ownership);
      }

      if (seats.length) {
        query = query.in("seats", seats);
      }
      if (bodyType.length) {
        query = query.in("body_type", bodyType);
      }
      if (colors.length) {
        query = query.in("color", colors);
      }

      if (location.length) {
        query = query.in("registration_location", location);
      }

      if (fuelType.length) {
        query = query.in("fuel_type", fuelType);
      }

      if (transmission.length) {
        query = query.in("transmission", transmission);
      }
      if (engine) {
        if (engine == "above_1999") {
          query = query.gte("engine_cc", Number(1999));
        } else {
          query = query.lte("engine_cc", Number(engine));
        }
      }
      if (minPrice) {
        query = query.gte("original_price", Number(minPrice));
      }

      if (maxPrice) {
        query = query.lte("original_price", Number(maxPrice));
      }

      if (minYear) {
        query = query.gte("registration_year", Number(minYear));
      }

      if (maxYear) {
        query = query.lte("registration_year", Number(maxYear));
      }
      if (minKm) {
        query = query.gte("km_driven", Number(minKm));
      }

      if (maxKm) {
        query = query.lte("km_driven", Number(maxKm));
      }
      switch (sortBy) {
        case "price-asc":
          query = query.order("original_price", { ascending: true });
          break;

        case "price-desc":
          query = query.order("original_price", { ascending: false });
          break;

        case "km-asc":
          query = query.order("km_driven", { ascending: true });
          break;

        case "km-desc":
          query = query.order("km_driven", { ascending: false });
          break;

        case "year-desc":
          query = query.order("registration_year", { ascending: false });
          break;

        case "year-asc":
          query = query.order("registration_year", { ascending: true });
          break;

        default:
          query = query.order("created_at", { ascending: false });
      }
      // pagination LAST
      query = query.range(from, to);

      const { data, error } = await query;

      if (error) {
        console.log(error.message);
        return;
      }

      if (data) {
        setdata((prev) => {
          const merged = currentPage === 0 ? data : [...prev, ...data];

          return merged.filter(
            (car, index, self) =>
              index === self.findIndex((c) => c.id === car.id),
          );
        });

        if (data.length < PAGE_SIZE) {
          setHasMore(false);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="max-w-xxl mx-auto w-full px-8 mt-8 flex  gap-4 h-[calc(100vh-120px)] overflow-hidden">
        <div className="min-w-96 h-full overflow-y-auto px-2 flex flex-col gap-4 scrollbar-thin">
          <Filter />
        </div>
        <div className="flex-1 h-full overflow-y-auto scrollbar-thin">
          <div className="mb-4">
            <h1 className="font-bold text-2xl"> Used Cars for Sale </h1>
            <p className="text-sm font-medium text-secondary-600">
              Browse verified used cars from trusted sellers at competitive
              prices.
            </p>
            <div className="flex items-center justify-between mt-4 pr-4">
              <p className="font-semibold text-lg">
                {data.length} Cars Available
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border border-secondary-300 rounded-lg shadow outline-none cursor-pointer"
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price - Low to High</option>
                <option value="price-desc">Price - High to Low</option>
                <option value="km-asc">KM - Low to High</option>
                <option value="km-desc">KM - High to Low</option>
                <option value="year-desc">Newest First</option>
                <option value="year-asc">Oldest First</option>
              </select>
            </div>
          </div>
          {data.length == 0 && !loading ? (
            <div className="flex flex-col justify-center items-center min-h-full text-lg font-semibold">
              <img src="/no-found.svg" alt="no found" className="size-48"></img>
              No cars found
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center  gap-4">
              <AnimatePresence>
                {data.map((car) => (
                  <motion.div
                    key={car.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{
                      y: -2,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <CarCard cars={car} size="sm" />
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <CarCardSkeleton key={i} />
                ))}
              <div ref={loadMoreRef} className="h-10" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
