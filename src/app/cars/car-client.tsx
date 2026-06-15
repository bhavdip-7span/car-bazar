"use client";
import { supabase } from "@/lib/supabase";

import { motion, AnimatePresence } from "framer-motion";
import Filter from "@/components/car-listing/filter";
import { useRecentViewStore } from "@/store/recently-viewed-car";
import CarCard from "@/components/ui/car-card";
import { useEffect, useState, useRef } from "react";
import type { Car } from "@/types/car";
import CarCardSkeleton from "@/components/ui/car-card-skeleton";
import Button from "@/components/ui/button";
import { getFilter } from "@/service/get-filter";
import { useCarFilters } from "@/hook/use-filter";
import { useRouter } from "next/navigation";

import Spinner from "@/components/ui/spinner";
export default function CarClinet() {
  const [sortBy, setSortBy] = useState("relevance");
  const { filters, searchParamsString } = useCarFilters();
  const recentCar = useRecentViewStore((s) => s.recentCars);
  const clearRecentCar = useRecentViewStore((s) => s.clearRecent);
  const [filterOpen, setFilterOpen] = useState(false);
  const PAGE_SIZE = 12;
  const [cars, setCars] = useState<Car[]>([]);
  const [data, setdata] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  async function fetchFilter() {
    try {
      const data = await getFilter();

      if (data) {
        setCars(data);
      }
    } catch (error) {
      console.log("something wrong", error);
      setCars([]);
    }
  }

  useEffect(() => {
    fetchFilter();
  }, []);
  const brands = [...new Set(cars.map((car) => car.brand?.trim()))];

  const models = [...new Set(cars.map((car) => car.model?.trim()))];

  const colors = [...new Set(cars.map((car) => car.color))];
  const ownership = [...new Set(cars.map((car) => car.ownership))];
  const bodyType = [...new Set(cars.map((car) => car.body_type))];

  const fuelTypes = [...new Set(cars.map((car) => car.fuel_type))];
  const location = [...new Set(cars.map((car) => car.registration_location))];
  const seats = [...new Set(cars.map((car) => car.seats))];

  const transmissions = [...new Set(cars.map((car) => car.transmission))];
  const prices = cars.map((car) => car.original_price);

  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  const years = cars.map((car) => car.registration_year);

  const minYear = years.length ? Math.min(...years) : 0;
  const maxYear = years.length ? Math.max(...years) : 0;
  const kms = cars.map((car) => car.km_driven);

  const minKm = kms.length ? Math.min(...kms) : 0;
  const maxKm = kms.length ? Math.max(...kms) : 0;

  const updateURL = (filters: any) => {
    if (!cars.length) return;
    const params = new URLSearchParams(window.location.search);

    // update only what changed
    filters.brands.length
      ? params.set("brands", filters.brands.join(","))
      : params.delete("brands");
    filters.models.length
      ? params.set("models", filters.models.join(","))
      : params.delete("models");

    filters.colors.length
      ? params.set("colors", filters.colors.join(","))
      : params.delete("colors");
    filters.bodyType.length
      ? params.set("body_type", filters.bodyType.join(","))
      : params.delete("body_type");

    filters.fuelTypes.length
      ? params.set("fuel_types", filters.fuelTypes.join(","))
      : params.delete("fuel_types");
    filters.location.length
      ? params.set("location", filters.location.join(","))
      : params.delete("location");

    filters.transmissions.length
      ? params.set("transmissions", filters.transmissions.join(","))
      : params.delete("transmissions");
    filters.ownership?.length
      ? params.set("ownership", filters.ownership.join(","))
      : params.delete("ownership");
    filters.seats.length
      ? params.set("seats", filters.seats.join(","))
      : params.delete("seats");
    filters.engine
      ? params.set("engine_cc", filters.engine)
      : params.delete("engine_cc");

    const isPriceChanged =
      filters.price[0] !== Number(minPrice) ||
      filters.price[1] !== Number(maxPrice);

    if (isPriceChanged && filters.price[0] != 0 && filters.price[1] != 0) {
      params.set("min_price", String(filters.price[0]));
      params.set("max_price", String(filters.price[1]));
    } else {
      params.delete("min_price");
      params.delete("max_price");
    }

    const isYearChanged =
      filters.year[0] !== minYear || filters.year[1] !== maxYear;
    if (isYearChanged && filters.year[0] != 0 && filters.year[1] != 0) {
      params.set("min_year", String(filters.year[0]));
      params.set("max_year", String(filters.year[1]));
    } else {
      params.delete("min_year");
      params.delete("max_year");
    }
    const isKmChanged = filters.kms[0] !== minKm || filters.kms[1] !== maxKm;
    if (isKmChanged && filters.kms[0] != 0 && filters.kms[1] != 0) {
      params.set("min_km", String(filters.kms[0]));
      params.set("max_km", String(filters.kms[1]));
    } else {
      params.delete("min_km");
      params.delete("max_km");
    }
    router.push(`?${params.toString()}`);
  };

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

      if (filters.search) {
        query = query.or(
          `brand.ilike.%${filters.search}%,model.ilike.%${filters.search}%,variant.ilike.%${filters.search}%`,
        );
      }
      if (filters.brands.length) {
        query = query.in("brand", filters.brands);
      }
      if (filters.ownership.length) {
        query = query.in("ownership", filters.ownership);
      }

      if (filters.seats.length) {
        query = query.in("seats", filters.seats);
      }
      if (filters.bodyType.length) {
        query = query.in("body_type", filters.bodyType);
      }
      if (filters.colors.length) {
        query = query.in("color", filters.colors);
      }

      if (filters.location.length) {
        query = query.in("registration_location", filters.location);
        console.log(filters.location);
      }

      if (filters.fuelTypes.length) {
        query = query.in("fuel_type", filters.fuelTypes);
      }

      if (filters.transmissions.length) {
        query = query.in("transmission", filters.transmissions);
      }
      if (filters.engine) {
        if (filters.engine == "above_1999") {
          query = query.gte("engine_cc", Number(1999));
        } else {
          query = query.lte("engine_cc", Number(filters.engine));
        }
      }
      if (filters.price[0] != minPrice) {
        query = query.gte("original_price", Number(minPrice));
      }

      if (filters.price[1] != maxPrice) {
        query = query.lte("original_price", Number(maxPrice));
      }

      if (filters.year[0] != minYear) {
        query = query.gte("registration_year", Number(minYear));
      }

      if (filters.year[1] != maxYear) {
        query = query.lte("registration_year", Number(maxYear));
      }
      if (filters.kms[0] != minKm) {
        query = query.gte("km_driven", Number(minKm));
      }

      if (filters.kms[1] != maxKm) {
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
      {filterOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute left-0 top-0  z-[9999] h-full w-4/5 bg-white shadow-xl p-4 overflow-y-auto animate-slideIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Filters</h2>
              <Button
                onClick={() => setFilterOpen(false)}
                name="✕"
                className="rounded-lg px-2 py-1"
                variant="outline"
              ></Button>
            </div>
            {cars.length === 0 ? (
              <div className="flex min-h-screen justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <Filter
                filters={filters}
                minKm={minKm}
                minPrice={minPrice}
                minYear={minYear}
                maxKm={maxKm}
                maxPrice={maxPrice}
                maxYear={maxYear}
                updateURL={updateURL}
                searchParamString={searchParamsString}
                brands={brands}
                models={models}
                transmissions={transmissions}
                colors={colors}
                bodyType={bodyType}
                seats={seats}
                fuelTypes={fuelTypes}
                ownership={ownership}
                location={location}
              />
            )}
          </div>
        </div>
      )}
      <div className="max-w-xxl mx-auto w-full px-4 md:px-8 mt-8 flex flex-col md:flex-row  gap-4 h-[calc(100vh-120px)] overflow-hidden">
        <div className=" hidden min-w-78 h-full px-2 overflow-y-auto md:flex flex-col gap-4 scrollbar-thin">
          {cars.length === 0 ? (
            <div className="flex min-h-screen justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <Filter
              filters={filters}
              minKm={minKm}
              minPrice={minPrice}
              minYear={minYear}
              maxKm={maxKm}
              maxPrice={maxPrice}
              maxYear={maxYear}
              updateURL={updateURL}
              searchParamString={searchParamsString}
              brands={brands}
              models={models}
              transmissions={transmissions}
              colors={colors}
              bodyType={bodyType}
              seats={seats}
              fuelTypes={fuelTypes}
              ownership={ownership}
              location={location}
            />
          )}
        </div>
        <div className="md:hidden flex justify-end">
          <Button
            onClick={() => setFilterOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg shadow"
            name="Filters"
          ></Button>
        </div>
        <div className="flex-1 h-full overflow-y-auto scrollbar-thin">
          <div className="mb-4">
            <h1 className="font-bold text-2xl"> Used Cars for Sale </h1>
            <p className="text-sm font-medium text-secondary-600">
              Browse verified used cars from trusted sellers at competitive
              prices.
            </p>
            <div className="flex items-center justify-between mt-4 pr-4">
              <p className="font-semibold text-sm">
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
            <div className="flex flex-col  gap-2 items-center  text-lg font-semibold">
              <img
                src="/page-not-found.svg"
                alt="no found"
                className=" size-48 md:h-64 w-96"
              ></img>
              <p> Car not found</p>
            </div>
          ) : (
            <>
              <div className=" p-4 border border-gray-300 rounded-lg shadow mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-xl text-primary-500">
                    Recently viewed cars
                  </h2>
                  <Button
                    name="Clear"
                    className="rounded-lg disabled:opacity-70 disabled:cursor-not-allowed px-4 py-2"
                    disabled={recentCar.length == 0}
                    onClick={() => clearRecentCar()}
                  ></Button>
                </div>
                <div className="flex mb-4 gap-4 overflow-x-auto flex-nowrap scroll-smooth snap-x snap-mandatory scrollbar-thin ">
                  {recentCar.length != 0
                    ? recentCar.map((item) => (
                        <div className="flex-shrink-0 max-w-78">
                          <CarCard cars={item} key={item.slug} />
                        </div>
                      ))
                    : "No cars viewed yet"}
                </div>
              </div>
              <div className="grid grid-cols-1 justify-items-center lg:grid-cols-2 xl:grid-cols-3 items-center  gap-4">
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
                      <CarCard cars={car} />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {loading &&
                  Array.from({ length: 6 }).map((_, i) => (
                    <CarCardSkeleton key={i} />
                  ))}
                <div ref={loadMoreRef} className="h-10" />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
