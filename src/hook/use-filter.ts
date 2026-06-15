"use client";

import { CarFilters } from "@/types/car-filter";
import { useSearchParams } from "next/navigation";

export function useCarFilters() {
  const searchParams = useSearchParams();

  const filters: CarFilters = {
    brands: searchParams.get("brands")?.split(",") || [],
    models: searchParams.get("models")?.split(",") || [],
    colors: searchParams.get("colors")?.split(",") || [],
    fuelTypes: searchParams.get("fuel_types")?.split(",") || [],
    transmissions: searchParams.get("transmissions")?.split(",") || [],
    ownership: searchParams.get("ownership")?.split(",") || [],
    seats: searchParams.get("seats")?.split(",")?.map(Number) || [],
    bodyType: searchParams.get("body_type")?.split(",") || [],
    location: searchParams.get("location")?.split(",") || [],
    search: searchParams.get("search"),

    price: [
      Number(searchParams.get("min_price")) || 0,
      Number(searchParams.get("max_price")) || 0,
    ],

    year: [
      Number(searchParams.get("min_year")) || 0,
      Number(searchParams.get("max_year")) || 0,
    ],

    kms: [
      Number(searchParams.get("min_km")) || 0,
      Number(searchParams.get("max_km")) || 0,
    ],

    engine: searchParams.get("engine_cc"),
  };

  return {
    searchParamsString: searchParams.toString(),
    filters,
  };
}
