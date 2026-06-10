"use client";
import { supabase } from "@/lib/supabase";
import Filter from "@/components/car-listing/filter";
import CarCard from "@/components/ui/car-card";
import { useEffect, useState, useRef } from "react";
import type { Car } from "@/types/car";
import CarCardSkeleton from "@/components/ui/car-card-skeleton";

export default function Home() {
  const PAGE_SIZE = 12;
  const [data, setdata] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
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
    fetchCars(0);
  }, []);
  useEffect(() => {
    if (page === 0) return;

    fetchCars(page);
  }, [page]);
  const fetchCars = async (currentPage: number) => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const from = currentPage * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .range(from, to);

      if (error) {
        console.log(error.message);
        return;
      }

      if (data) {
        setdata((prev) => [...prev, ...data]);

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
        <div className="flex gap-4 flex-wrap">
          {data.map((car) => (
            <CarCard key={car.id} cars={car} />
          ))}

          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <CarCardSkeleton key={i} />
            ))}
          <div ref={loadMoreRef} className="h-10" />
        </div>
      </div>
    </>
  );
}
