"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import RangeSlider from "../ui/range-silder";
import Accordion from "../ui/accodion";
import Checkbox from "../ui/checkbox";
import Input from "../ui/input";
import type { Car } from "@/types/car";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";

import Button from "../ui/button";
type Filters = {
  price: [number, number];
  year: [number, number];
  kms: [number, number];
  models: string[];
  brands: string[];
  location: string[];
  fuelTypes: string[];
  transmissions: string[];
  colors: string[];
};
export default function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [cars, setCars] = useState<Car[]>([]);
  async function fetchCars() {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select(
          "brand, model, color, fuel_type, transmission, registration_year, km_driven, original_price,registration_location",
        );

      if (error) {
        console.log(error.message);
        return;
      }

      setCars(data || []);
    } catch (error) {
      console.log("something wrong", error);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);
  const router = useRouter();
  const updateURL = (filters: any) => {
    const params = new URLSearchParams(window.location.search);

    // update only what changed
    filters.brands.length
      ? params.set("brands", filters.brands.join(","))
      : params.delete("brands");

    filters.colors.length
      ? params.set("colors", filters.colors.join(","))
      : params.delete("colors");

    filters.fuelTypes.length
      ? params.set("fuel-types", filters.fuelTypes.join(","))
      : params.delete("fuel-types");
    filters.location.length
      ? params.set("location", filters.location.join(","))
      : params.delete("location");

    filters.transmissions.length
      ? params.set("transmissions", filters.transmissions.join(","))
      : params.delete("transmissions");

    const isPriceChanged =
      filters.price[0] !== minPrice || filters.price[1] !== maxPrice;
    if (isPriceChanged) {
      params.set("min-price", String(filters.price[0]));
      params.set("max-price", String(filters.price[1]));
    }
    const isYearChanged =
      filters.year[0] !== minYear || filters.year[1] !== maxYear;
    if (isYearChanged) {
      params.set("min-year", String(filters.year[0]));
      params.set("max-year", String(filters.year[1]));
    }
    const isKmChanged = filters.kms[0] !== minKm || filters.kms[1] !== maxKm;
    if (isKmChanged) {
      params.set("min-km", String(filters.kms[0]));
      params.set("max-km", String(filters.kms[1]));
    }
    router.push(`?${params.toString()}`);
  };
  useEffect(() => {
    if (!cars.length) return;

    setFilters({
      price: [
        Number(searchParams.get("min-price")) || minPrice,
        Number(searchParams.get("max-price")) || maxPrice,
      ],
      year: [
        Number(searchParams.get("min-year")) || minYear,
        Number(searchParams.get("max-year")) || maxYear,
      ],
      kms: [
        Number(searchParams.get("min-km")) || minKm,
        Number(searchParams.get("max-km")) || maxKm,
      ],
      location: searchParams.get("location")?.split(",") || [],
      brands: searchParams.get("brands")?.split(",") || [],
      colors: searchParams.get("colors")?.split(",") || [],
      fuelTypes: searchParams.get("fuel-types")?.split(",") || [],
      transmissions: searchParams.get("transmissions")?.split(",") || [],
      models: searchParams.get("models")?.split(",") || [],
    });
  }, [cars]);

  const brands = [...new Set(cars.map((car) => car.brand?.trim()))];
  console.log(brands);
  const models = [...new Set(cars.map((car) => car.model?.trim()))];

  const colors = [...new Set(cars.map((car) => car.color))];

  const fuelTypes = [...new Set(cars.map((car) => car.fuel_type))];
  const location = [...new Set(cars.map((car) => car.registration_location))];
  console.log(location);
  const transmissions = [...new Set(cars.map((car) => car.transmission))];
  const prices = cars.map((car) => car.original_price);

  const minPrice = Math.min(...prices) || 0;
  const maxPrice = Math.max(...prices) || 0;
  const years = cars.map((car) => car.registration_year);

  const minYear = Math.min(...years) || 0;
  const maxYear = Math.max(...years) || 0;
  const kms = cars.map((car) => car.km_driven);

  const minKm = Math.min(...kms) || 0;
  const maxKm = Math.max(...kms) || 0;
  const initialFilters: Filters = {
    price: [
      Number(searchParams.get("min-price")) || minPrice,
      Number(searchParams.get("max-price")) || maxPrice,
    ],
    year: [minYear, maxYear],
    kms: [minKm, maxKm],

    brands: searchParams.get("brands")?.split(",") || [],
    location: searchParams.get("location")?.split(",") || [],
    colors: searchParams.get("colors")?.split(",") || [],
    fuelTypes: searchParams.get("fuel-types")?.split(",") || [],
    transmissions: searchParams.get("transmissions")?.split(",") || [],
    models: searchParams.get("models")?.split(",") || [],
  };
  const defaultFilters: Filters = {
    price: [minPrice, maxPrice],
    year: [minYear, maxYear],
    kms: [minKm, maxKm],
    brands: [],
    location: [],
    colors: [],
    fuelTypes: [],
    transmissions: [],
    models: [],
  };
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const [bmw, setBmw] = useState(false);

  const toggleArrayFilter = (
    key: keyof Pick<
      Filters,
      "brands" | "fuelTypes" | "transmissions" | "colors" | "models"
    >,
    value: string,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };
  function clearFilter() {
    setFilters(defaultFilters);
    router.push(pathname);
  }
  const isFiltersActive = searchParams.toString() ? true : false;

  return (
    <>
      <div className="px-8 flex flex-col gap-4 pb-10">
        <Button
          name="Clear Filters"
          variant="link"
          disabled={!isFiltersActive}
          className="w-fit ml-auto disabled:cursor-not-allowed disabled:opacity-70"
          onClick={clearFilter}
        />
        <Accordion title="Price">
          <RangeSlider
            min={minPrice}
            max={maxPrice}
            step={10000}
            value={filters.price}
            onChange={(value) => {
              const newFilters = {
                ...filters,
                price: value,
              };

              setFilters(newFilters);
              updateURL(newFilters);
            }}
          />
          <div className="mt-4 flex flex-col gap-4">
            <Checkbox label="under 2 lakh" checked={bmw} onChange={setBmw} />
            <Checkbox label="2 - 3 lakh" checked={bmw} onChange={setBmw} />
            <Checkbox label="8 - 10 lakh" checked={bmw} onChange={setBmw} />
            <Checkbox label="above 10 lakh" checked={bmw} onChange={setBmw} />
          </div>
        </Accordion>
        <Accordion title="Year">
          <RangeSlider
            min={minYear}
            max={maxYear}
            step={1}
            value={filters.year}
            onChange={(value) => {
              const newFilters = {
                ...filters,
                year: value,
              };

              setFilters(newFilters);
              updateURL(newFilters);
            }}
          />
          <div className="mt-4 flex flex-col gap-4">
            <Checkbox
              label="less then 1 year old"
              checked={filters.brands.includes("BMW")}
              onChange={() => toggleArrayFilter("brands", "BMW")}
            />
            <Checkbox
              label="less then 3 year old"
              checked={bmw}
              onChange={setBmw}
            />
            <Checkbox
              label="less then 5 year old"
              checked={bmw}
              onChange={setBmw}
            />
            <Checkbox
              label="less then 7 year old"
              checked={bmw}
              onChange={setBmw}
            />
          </div>
        </Accordion>
        <Accordion title="Brand+Model">
          <Input placeholder="Search brand or model" className="w-full" />
          <div className="mt-4 flex flex-col gap-4">
            <h4>Brand</h4>
            <div className="max-h-36 overflow-y-auto scrollbar-thin">
              {brands.map((brand) => (
                <Checkbox
                  key={brand}
                  label={brand}
                  checked={filters.brands.includes(brand)}
                  onChange={() => {
                    const newFilters = {
                      ...filters,
                      brands: filters.brands.includes(brand)
                        ? filters.brands.filter((b) => b !== brand)
                        : [...filters.brands, brand],
                    };

                    setFilters(newFilters);
                    updateURL(newFilters);
                  }}
                />
              ))}
            </div>
            <h4>Model</h4>
            <div className="max-h-56 overflow-y-auto scrollbar-thin">
              {models.map((brand) => (
                <Checkbox
                  key={brand}
                  label={brand}
                  checked={filters.brands.includes(brand)}
                  onChange={() => toggleArrayFilter("brands", brand)}
                />
              ))}
            </div>
          </div>
        </Accordion>
        <Accordion title="Km driven">
          <RangeSlider
            min={minKm}
            max={maxKm}
            step={2000}
            value={filters.kms}
            onChange={(value) => {
              const newFilters = {
                ...filters,
                kms: value,
              };

              setFilters(newFilters);
              updateURL(newFilters);
            }}
          />
          <div className="mt-4 flex flex-col gap-4">
            <Checkbox label="< 50000 km" checked={bmw} onChange={setBmw} />
            <Checkbox label="< 70000 km" checked={bmw} onChange={setBmw} />
            <Checkbox label="< 80000 km" checked={bmw} onChange={setBmw} />
            <Checkbox label="< 100000 km" checked={bmw} onChange={setBmw} />
          </div>
        </Accordion>
        <Accordion title="Fuel Type">
          <div className="mt-4 flex flex-col gap-4">
            {fuelTypes.map((brand) => (
              <Checkbox
                key={brand}
                label={brand}
                checked={filters.fuelTypes.includes(brand)}
                onChange={() => {
                  const newFilters = {
                    ...filters,
                    fuelTypes: filters.fuelTypes.includes(brand)
                      ? filters.fuelTypes.filter((b) => b !== brand)
                      : [...filters.fuelTypes, brand],
                  };

                  setFilters(newFilters);
                  updateURL(newFilters);
                }}
              />
            ))}
          </div>
        </Accordion>
        <Accordion title="Transmission">
          <div className="mt-4 flex flex-col gap-4">
            {transmissions.map((brand) => (
              <Checkbox
                key={brand}
                label={brand}
                checked={filters.transmissions.includes(brand)}
                onChange={() => {
                  const newFilters = {
                    ...filters,
                    transmissions: filters.transmissions.includes(brand)
                      ? filters.transmissions.filter((b) => b !== brand)
                      : [...filters.transmissions, brand],
                  };

                  setFilters(newFilters);
                  updateURL(newFilters);
                }}
              />
            ))}
          </div>
        </Accordion>
        <Accordion title="Color">
          <div className="mt-4 flex flex-col gap-4">
            {colors.map((brand) => (
              <Checkbox
                key={brand}
                label={brand}
                checked={filters.colors.includes(brand)}
                onChange={() => {
                  const newFilters = {
                    ...filters,
                    colors: filters.colors.includes(brand)
                      ? filters.colors.filter((b) => b !== brand)
                      : [...filters.colors, brand],
                  };

                  setFilters(newFilters);
                  updateURL(newFilters);
                }}
              />
            ))}
          </div>
        </Accordion>
        <Accordion title="Location">
          <div className="mt-4 flex flex-col gap-4 max-h-96 overflow-scroll pb-8">
            {location.map((brand) => (
              <Checkbox
                key={brand}
                label={brand}
                checked={filters.location.includes(brand)}
                onChange={() => {
                  const newFilters = {
                    ...filters,
                    location: filters.location.includes(brand)
                      ? filters.location.filter((b) => b !== brand)
                      : [...filters.location, brand],
                  };

                  setFilters(newFilters);
                  updateURL(newFilters);
                }}
              />
            ))}
          </div>
        </Accordion>
      </div>
    </>
  );
}
