import { Car } from "@/types/car";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const updateURL = (
  filters: any,
  cars: Car[],
  minYear: Number,
  maxYear: Number,
  minPrice: Number,
  maxPrice: Number,
  minKm: Number,
  maxKm: Number,
  router: AppRouterInstance,
) => {
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
