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
  owner: string[];
  fuelTypes: string[];
  transmissions: string[];
  colors: string[];
  engine: string | null;
  seats: number[];
  bodyType: string[];
};
export default function Filter() {
  const searchParams = useSearchParams();
  const [expandAll, setExpandAll] = useState(false);
  const pathname = usePathname();
  const [carModelSearch, setCarModelSearch] = useState("");
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredBrandModel, setFilteredBrandModel] = useState([]);
  async function fetchCars() {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select(
          "brand, model, color, fuel_type, transmission, registration_year, km_driven, original_price,registration_location,ownership,seats,body_type",
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
  useEffect(() => {
    if (!carModelSearch.trim()) return;
    console.log("hello");
    const search = carModelSearch.trim().toLocaleLowerCase();
    const filteredBrandModel = [...brands, ...models].filter((item) =>
      item.toLowerCase().includes(search),
    );
    setFilteredBrandModel(filteredBrandModel || []);
  }, [carModelSearch]);
  const router = useRouter();
  const updateURL = (filters: any) => {
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
    filters.owner.length
      ? params.set("ownership", filters.owner.join(","))
      : params.delete("ownership");
    filters.seats.length
      ? params.set("seats", filters.seats.join(","))
      : params.delete("seats");
    filters.engine
      ? params.set("engine_cc", filters.engine)
      : params.delete("engine_cc");

    const isPriceChanged =
      filters.price[0] !== minPrice || filters.price[1] !== maxPrice;

    if (isPriceChanged) {
      params.set("min_price", String(filters.price[0]));
      params.set("max_price", String(filters.price[1]));
    } else {
      params.delete("min_price");
      params.delete("max_price");
    }

    const isYearChanged =
      filters.year[0] !== minYear || filters.year[1] !== maxYear;
    if (isYearChanged) {
      params.set("min_year", String(filters.year[0]));
      params.set("max_year", String(filters.year[1]));
    } else {
      params.delete("min_year");
      params.delete("max_year");
    }
    const isKmChanged = filters.kms[0] !== minKm || filters.kms[1] !== maxKm;
    if (isKmChanged) {
      params.set("min_km", String(filters.kms[0]));
      params.set("max_km", String(filters.kms[1]));
    } else {
      params.delete("min_km");
      params.delete("max_km");
    }
    router.push(`?${params.toString()}`);
  };
  useEffect(() => {
    if (!cars.length) return;

    setFilters({
      price: [
        Number(searchParams.get("min_price")) || minPrice,
        Number(searchParams.get("max_price")) || maxPrice,
      ],
      year: [
        Number(searchParams.get("min_year")) || minYear,
        Number(searchParams.get("max_year")) || maxYear,
      ],
      kms: [
        Number(searchParams.get("min_km")) || minKm,
        Number(searchParams.get("max_km")) || maxKm,
      ],
      location: searchParams.get("location")?.split(",") || [],
      bodyType: searchParams.get("location")?.split(",") || [],
      brands: searchParams.get("brands")?.split(",") || [],
      colors: searchParams.get("colors")?.split(",") || [],
      fuelTypes: searchParams.get("fuel_types")?.split(",") || [],
      transmissions: searchParams.get("transmissions")?.split(",") || [],
      models: searchParams.get("models")?.split(",") || [],
      owner: searchParams.get("ownership")?.split(",") || [],
      seats: searchParams.get("seats")?.split(",").map(Number) || [],
      engine: searchParams.get("engine_cc"),
    });
  }, [cars]);

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
      Number(searchParams.get("min_price")) || minPrice,
      Number(searchParams.get("max_price")) || maxPrice,
    ],
    year: [minYear, maxYear],
    kms: [minKm, maxKm],

    brands: searchParams.get("brands")?.split(",") || [],
    bodyType: searchParams.get("brands")?.split(",") || [],
    seats: searchParams.get("seats")?.split(",").map(Number) || [],
    location: searchParams.get("location")?.split(",") || [],
    colors: searchParams.get("colors")?.split(",") || [],
    fuelTypes: searchParams.get("fuel_types")?.split(",") || [],
    transmissions: searchParams.get("transmissions")?.split(",") || [],
    models: searchParams.get("models")?.split(",") || [],
    owner: searchParams.get("owner")?.split(",") || [],
    engine: searchParams.get("engine_cc"),
  };
  const defaultFilters: Filters = {
    price: [minPrice, maxPrice],
    year: [minYear, maxYear],
    kms: [minKm, maxKm],
    brands: [],
    location: [],
    colors: [],
    seats: [],
    fuelTypes: [],
    transmissions: [],
    bodyType: [],
    models: [],
    owner: [],
    engine: null,
  };
  const [filters, setFilters] = useState<Filters>(initialFilters);

  function clearFilter() {
    setFilters(defaultFilters);
    router.push(pathname);
  }
  const isFiltersActive = searchParams.toString() ? true : false;

  return (
    <>
      <div className="px-8 flex flex-col gap-4 pb-10 ">
        <div className="flex items-center justify-between">
          <Button
            name={expandAll ? "Collapse All" : "Expand All"}
            variant="link"
            className="w-fit disabled:cursor-not-allowed disabled:opacity-70"
            onClick={() => setExpandAll(!expandAll)}
          />
          <Button
            name="Clear Filters"
            variant="link"
            disabled={!isFiltersActive}
            className="w-fit disabled:cursor-not-allowed disabled:opacity-70"
            onClick={clearFilter}
          />
        </div>
        <Accordion title="Price" defaultOpen={expandAll}>
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
            <Checkbox
              label="below 5 lakh"
              checked={filters.price[1] === 500000}
              onChange={() => {
                const checked = filters.price[1] === 500000;

                const newFilters = {
                  ...filters,
                  price: checked ? [minPrice, maxPrice] : [minPrice, 500000],
                };

                setFilters(newFilters);
                updateURL(newFilters);
              }}
            />
            <Checkbox
              label="5 - 8 lakh"
              checked={
                filters.price[1] === 800000 && filters.price[0] == 500000
              }
              onChange={() => {
                const checked =
                  filters.price[1] === 800000 && filters.price[0] == 500000;

                const newFilters = {
                  ...filters,
                  price: checked ? [minPrice, maxPrice] : [500000, 800000],
                };

                setFilters(newFilters);
                updateURL(newFilters);
              }}
            />
            <Checkbox
              label="8 - 10 lakh"
              checked={
                filters.price[1] === 1000000 && filters.price[0] == 800000
              }
              onChange={() => {
                const checked =
                  filters.price[1] === 1000000 && filters.price[0] == 800000;

                const newFilters = {
                  ...filters,
                  price: checked ? [minPrice, maxPrice] : [800000, 1000000],
                };

                setFilters(newFilters);
                updateURL(newFilters);
              }}
            />
            <Checkbox
              label="above 10 lakh"
              checked={filters.price[0] === 1000000}
              onChange={() => {
                const checked = filters.price[0] === 1000000;

                const newFilters = {
                  ...filters,
                  price: checked ? [minPrice, maxPrice] : [1000000, maxPrice],
                };

                setFilters(newFilters);
                updateURL(newFilters);
              }}
            />
          </div>
        </Accordion>
        <Accordion title="Year" defaultOpen={expandAll}>
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
              checked={filters.year[0] == maxYear - 1}
              onChange={() => {
                const checked = filters.year[0] == maxYear - 1;
                const newFilters = {
                  ...filters,
                  year: checked ? [minYear, maxYear] : [maxYear - 1, maxYear],
                };

                setFilters(newFilters);
                updateURL(newFilters);
              }}
            />
            <Checkbox
              label="less then 3 year old"
              checked={filters.year[0] == maxYear - 3}
              onChange={() => {
                const checked = filters.year[0] == maxYear - 3;
                const newFilters = {
                  ...filters,
                  year: checked ? [minYear, maxYear] : [maxYear - 3, maxYear],
                };

                setFilters(newFilters);
                updateURL(newFilters);
              }}
            />
            <Checkbox
              label="less then 5 year old"
              checked={filters.year[0] == maxYear - 5}
              onChange={() => {
                const checked = filters.year[0] == maxYear - 5;
                const newFilters = {
                  ...filters,
                  year: checked ? [minYear, maxYear] : [maxYear - 5, maxYear],
                };

                setFilters(newFilters);
                updateURL(newFilters);
              }}
            />
            {/* <Checkbox
              label="less then 7 year old"
                checked={filters.year[0] == maxYear - 1}
              onChange={() => {
                const checked = filters.year[0] == maxYear - 1;
                const newFilters = {
                  ...filters,
                  year: checked ? [minYear, maxYear] : [maxYear - 1, maxYear],
                };

                setFilters(newFilters);
                updateURL(newFilters);
              }}
            /> */}
          </div>
        </Accordion>
        <Accordion title="Brand+Model" defaultOpen={expandAll}>
          <Input
            placeholder="Search brand or model"
            className="w-full"
            value={carModelSearch}
            onChange={(e) => setCarModelSearch(e.target.value)}
          />
          {!carModelSearch ? (
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
                    checked={filters.models.includes(brand)}
                    onChange={() => {
                      const newFilters = {
                        ...filters,
                        models: filters.models.includes(brand)
                          ? filters.models.filter((b) => b !== brand)
                          : [...filters.models, brand],
                      };

                      setFilters(newFilters);
                      updateURL(newFilters);
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-2">
              {filteredBrandModel.length > 0 ? (
                filteredBrandModel.map((item) => (
                  <Checkbox
                    key={item}
                    label={item}
                    checked={
                      filters.brands.includes(item) ||
                      filters.models.includes(item)
                    }
                    onChange={() => {
                      if (brands.includes(item)) {
                        const newFilters = {
                          ...filters,
                          brands: filters.brands.includes(item)
                            ? filters.brands.filter((b) => b !== item)
                            : [...filters.brands, item],
                        };
                        setFilters(newFilters);
                        updateURL(newFilters);
                      } else {
                        const newFilters = {
                          ...filters,
                          models: filters.models.includes(item)
                            ? filters.models.filter((b) => b !== item)
                            : [...filters.models, item],
                        };
                        setFilters(newFilters);
                        updateURL(newFilters);
                      }
                    }}
                  />
                ))
              ) : (
                <p className="text-red-500 text-sm font-semibold">
                  No matching brand or model found
                </p>
              )}
            </div>
          )}
        </Accordion>
        <Accordion title="Km driven" defaultOpen={expandAll}>
          <RangeSlider
            min={minKm}
            max={maxKm}
            step={1000}
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
            <Checkbox
              label="< 10000 km"
              checked={filters.kms[1] == 10000}
              onChange={() => {
                const checked = filters.kms[1] == 10000;
                const newFilters = {
                  ...filters,
                  kms: checked ? [minKm, maxKm] : [minKm, 10000],
                };

                setFilters(newFilters);
                updateURL(newFilters);
              }}
            />
            <Checkbox
              label="< 20000 km"
              checked={filters.kms[1] == 20000}
              onChange={() => {
                const checked = filters.kms[1] == 20000;
                const newFilters = {
                  ...filters,
                  kms: checked ? [minKm, maxKm] : [minKm, 20000],
                };

                setFilters(newFilters);
                updateURL(newFilters);
              }}
            />
            <Checkbox
              label="< 50000 km"
              checked={filters.kms[1] == 50000}
              onChange={() => {
                const checked = filters.kms[1] == 50000;
                const newFilters = {
                  ...filters,
                  kms: checked ? [minKm, maxKm] : [minKm, 50000],
                };

                setFilters(newFilters);
                updateURL(newFilters);
              }}
            />
            {/* <Checkbox
              label="< 100000 km"
              checked={filters.kms[1] == 100000}
              onChange={() => {
                const checked = filters.kms[1] == 100000;
                const newFilters = {
                  ...filters,
                  kms: checked ? [minKm, maxKm] : [minKm, 100000],
                };

                setFilters(newFilters);
                updateURL(newFilters);
              }}
            /> */}
          </div>
        </Accordion>
        <Accordion title="Fuel Type" defaultOpen={expandAll}>
          <div className="mt-4 flex flex-col gap-4">
            {fuelTypes.map((item) => (
              <Checkbox
                key={item}
                label={item}
                checked={filters.fuelTypes.includes(item)}
                onChange={() => {
                  const newFilters = {
                    ...filters,
                    fuelTypes: filters.fuelTypes.includes(item)
                      ? filters.fuelTypes.filter((b) => b !== item)
                      : [...filters.fuelTypes, item],
                  };

                  setFilters(newFilters);
                  updateURL(newFilters);
                }}
              />
            ))}
          </div>
        </Accordion>
        <Accordion title="Transmission" defaultOpen={expandAll}>
          <div className="mt-4 flex flex-col gap-4">
            {transmissions.map((item) => (
              <Checkbox
                key={item}
                label={item}
                checked={filters.transmissions.includes(item)}
                onChange={() => {
                  const newFilters = {
                    ...filters,
                    transmissions: filters.transmissions.includes(item)
                      ? filters.transmissions.filter((b) => b !== item)
                      : [...filters.transmissions, item],
                  };

                  setFilters(newFilters);
                  updateURL(newFilters);
                }}
              />
            ))}
          </div>
        </Accordion>
        <Accordion title="Color" defaultOpen={expandAll}>
          <div className="mt-4 flex flex-col gap-4">
            {colors.map((item) => (
              <Checkbox
                key={item}
                label={item}
                checked={filters.colors.includes(item)}
                onChange={() => {
                  const newFilters = {
                    ...filters,
                    colors: filters.colors.includes(item)
                      ? filters.colors.filter((b) => b !== item)
                      : [...filters.colors, item],
                  };

                  setFilters(newFilters);
                  updateURL(newFilters);
                }}
              />
            ))}
          </div>
        </Accordion>
        <Accordion title="Location" defaultOpen={expandAll}>
          <div className="mt-4 flex flex-col gap-4 max-h-96 overflow-y-auto pb-8">
            {location.map((item) => (
              <Checkbox
                key={item}
                label={item}
                checked={filters.location.includes(item)}
                onChange={() => {
                  const newFilters = {
                    ...filters,
                    location: filters.location.includes(item)
                      ? filters.location.filter((b) => b !== item)
                      : [...filters.location, item],
                  };

                  setFilters(newFilters);
                  updateURL(newFilters);
                }}
              />
            ))}
          </div>
        </Accordion>
        <Accordion title="Body Type" defaultOpen={expandAll}>
          <div className="mt-4 flex flex-col gap-4 max-h-96 overflow-y-auto pb-8">
            {bodyType.map((item) => (
              <Checkbox
                key={item}
                label={item}
                checked={filters.bodyType.includes(item)}
                onChange={() => {
                  const newFilters = {
                    ...filters,
                    bodyType: filters.bodyType.includes(item)
                      ? filters.bodyType.filter((b) => b !== item)
                      : [...filters.bodyType, item],
                  };

                  setFilters(newFilters);
                  updateURL(newFilters);
                }}
              />
            ))}
          </div>
        </Accordion>
        <Accordion title="Ownership" defaultOpen={expandAll}>
          <div className="mt-4 flex flex-col gap-4 max-h-96 pb-8">
            {ownership.map((item) => (
              <Checkbox
                key={item}
                label={item}
                checked={filters.owner.includes(item)}
                onChange={() => {
                  const newFilters = {
                    ...filters,
                    owner: filters.owner.includes(item)
                      ? filters.owner.filter((b) => b !== item)
                      : [...filters.owner, item],
                  };

                  setFilters(newFilters);
                  updateURL(newFilters);
                }}
              />
            ))}
          </div>
        </Accordion>
        <Accordion title="Seats" defaultOpen={expandAll}>
          <div className="mt-4 flex flex-col gap-4 max-h-96 pb-8">
            {[...seats]
              .sort((a, b) => a - b)
              .map((item) => (
                <Checkbox
                  key={item}
                  label={String(item)}
                  checked={filters.seats.includes(item)}
                  onChange={() => {
                    const newFilters = {
                      ...filters,
                      seats: filters.seats.includes(item)
                        ? filters.seats.filter((b) => b !== item)
                        : [...filters.seats, item],
                    };

                    setFilters(newFilters);
                    updateURL(newFilters);
                  }}
                />
              ))}
          </div>
        </Accordion>
        <Accordion title="Engine cc" defaultOpen={expandAll}>
          <div className="mt-4 flex flex-col gap-4 max-h-96 pb-8">
            <Checkbox
              label="below 999cc"
              checked={filters.engine === "999"}
              onChange={() => {
                const newFilters = {
                  ...filters,
                  engine: filters.engine === "999" ? null : "999",
                };

                setFilters(newFilters);
                updateURL(newFilters);
              }}
            />
            <Checkbox
              label="below 1299cc"
              checked={filters.engine === "1299"}
              onChange={() => {
                const newFilters = {
                  ...filters,
                  engine: filters.engine === "1299" ? null : "1299",
                };

                setFilters(newFilters);
                updateURL(newFilters);
              }}
            />
            <Checkbox
              label="below 1999cc"
              checked={filters.engine === "1999"}
              onChange={() => {
                const newFilters = {
                  ...filters,
                  engine: filters.engine === "1999" ? null : "1999",
                };

                setFilters(newFilters);
                updateURL(newFilters);
              }}
            />
            <Checkbox
              label="above 1999cc"
              checked={filters.engine === "above_1999"}
              onChange={() => {
                const newFilters = {
                  ...filters,
                  engine: filters.engine === "above_1999" ? null : "above_1999",
                };

                setFilters(newFilters);
                updateURL(newFilters);
              }}
            />
          </div>
        </Accordion>
      </div>
    </>
  );
}
