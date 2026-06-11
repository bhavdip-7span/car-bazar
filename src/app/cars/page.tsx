"use client";
import { supabase } from "@/lib/supabase";
import Filter from "@/components/car-listing/filter";
import CarCard from "@/components/ui/car-card";
import { useEffect, useState, useRef } from "react";
import type { Car } from "@/types/car";
import CarCardSkeleton from "@/components/ui/car-card-skeleton";
import { useSearchParams } from "next/navigation";
export default function Home() {
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const brands = searchParams.get("brands")?.split(",") || [];
  const colors = searchParams.get("colors")?.split(",") || [];
  const fuelType = searchParams.get("fuel-types")?.split(",") || [];
  const transmission = searchParams.get("transmissions")?.split(",") || [];
  const minPrice = searchParams.get("min-price");
  const maxPrice = searchParams.get("max-price");
  const minYear = searchParams.get("min-year");
  const maxYear = searchParams.get("max-year");
  const minKm = searchParams.get("min-km");
  const maxKm = searchParams.get("max-km");

  console.log(brands, colors, transmission, fuelType, minPrice, maxPrice);
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
  }, [search]);
  useEffect(() => {
    if (page === 0) return;

    fetchCars(page);
  }, [page]);
  const fetchCars = async (currentPage: number) => {
    setLoading(true);
    console.log("hello je ");
    try {
      const from = currentPage * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase.from("cars").select("*");

      if (brands.length) {
        query = query.in("brand", brands);
        console.log("hello");
      }

      if (colors.length) {
        query = query.in("color", colors);
      }

      if (fuelType.length) {
        query = query.in("fuel_type", fuelType);
      }

      if (transmission.length) {
        query = query.in("transmission", transmission);
      }
      if (minPrice) {
        query = query
          .gte("original_price", minPrice)
          .lte("original_price", maxPrice);
      }
      if (minYear) {
        query = query
          .gte("registration_year", minYear)
          .lte("registration_year ", maxYear);
      }
      if (minKm) {
        query = query.gte("km_driven", minKm).lte("km_driven ", maxKm);
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
      <div className="max-w-xxl mx-auto w-full px-8 mt-8 flex  gap-4">
        <Filter />
        {data.length == 0 && !loading ? (
          <div className="flex justify-center items-center text-lg font-semibold text-red-500 flex-1 max-h-screen sticky top-2">
            {" "}
            No cars found
          </div>
        ) : (
          <div className="flex gap-4 flex-wrap items-start">
            {data.map((car) => (
              <CarCard key={car.id} cars={car} />
            ))}

            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <CarCardSkeleton key={i} />
              ))}
            <div ref={loadMoreRef} className="h-10" />
          </div>
        )}
      </div>
    </>
  );
}
