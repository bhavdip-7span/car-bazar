"use client";
import { useState, useEffect } from "react";

import RangeSlider from "../ui/range-silder";
import Accordion from "../ui/accodion";
import Checkbox from "../ui/checkbox";
import Input from "../ui/input";
import type { Car } from "@/types/car";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import type { CarFilters } from "@/types/car-filter";
import Button from "../ui/button";

import { getFilter } from "@/service/get-filter";
import Spinner from "../ui/spinner";

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
type FilterProps = {
  filters: CarFilters;
  brands: string[];
  models: string[];
  colors: string[];
  ownership: string[];
  bodyType: string[];
  fuelTypes: string[];
  location: string[];
  seats: number[];
  transmissions: string[];

  minPrice: number;
  maxPrice: number;

  minYear: number;
  maxYear: number;

  minKm: number;
  maxKm: number;
  searchParamString: string;
  updateURL: (filters: any) => void;
};
export default function Filter({
  filters,
  updateURL,
  minPrice,
  maxPrice,
  minYear,
  maxYear,
  minKm,
  maxKm,
  transmissions,
  models,
  brands,
  colors,
  fuelTypes,
  ownership,
  location,
  seats,
  bodyType,
  searchParamString,
}: FilterProps) {
  const [expandAll, setExpandAll] = useState(false);
  const pathname = usePathname();
  const [carModelSearch, setCarModelSearch] = useState("");

  const [filteredBrandModel, setFilteredBrandModel] = useState<string[]>([]);

  useEffect(() => {
    if (!carModelSearch.trim()) return;

    const search = carModelSearch.trim().toLocaleLowerCase();
    const filteredBrandModel = [...brands, ...models].filter((item) =>
      item.toLowerCase().includes(search),
    );
    setFilteredBrandModel(filteredBrandModel || []);
  }, [carModelSearch]);
  const router = useRouter();

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      price:
        prev.price[0] === 0 && prev.price[1] === 0
          ? [minPrice, maxPrice]
          : prev.price,
      year:
        prev.year[0] === 0 && prev.year[1] === 0
          ? [minYear, maxYear]
          : prev.year,
      kms: prev.kms[0] === 0 && prev.kms[1] === 0 ? [minKm, maxKm] : prev.kms,
    }));
  }, [minPrice, maxPrice, minYear, maxYear, minKm, maxKm]);

  useEffect(() => {
    setFilters({
      price: [
        Number(filters.price[0] || minPrice),
        Number(filters.price[1] || maxPrice),
      ],
      year: [
        Number(filters.year[0] || minYear),
        Number(filters.year[1] || maxYear),
      ],
      kms: [Number(filters.kms[0] || minKm), Number(filters.kms[1] || maxKm)],
      location: filters.location,
      bodyType: filters.bodyType,
      brands: filters.brands,
      colors: filters.colors,
      fuelTypes: filters.fuelTypes,
      transmissions: filters.transmissions,
      models: filters.models,
      owner: filters.ownership,
      seats: filters.seats,
      engine: filters.engine,
    });
  }, [searchParamString]);

  const initialFilters: Filters = {
    price: [minPrice, maxPrice],
    year: [minYear, maxYear],
    kms: [minKm, maxKm],

    brands: filters.brands,
    bodyType: filters.bodyType,
    seats: filters.seats,
    location: filters.location,
    colors: filters.colors,
    fuelTypes: filters.fuelTypes,
    transmissions: filters.transmissions,
    models: filters.models,
    owner: filters.ownership,
    engine: filters.engine,
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
  const [filter, setFilters] = useState<Filters>(initialFilters);

  function clearFilter() {
    setFilters(defaultFilters);
    router.push(pathname);
  }
  const isFiltersActive = searchParamString.toString() ? true : false;
  const isBelow5L = filter.price[0] === minPrice && filter.price[1] <= 500000;
  console.log(minPrice);
  const isAbove10L =
    filters.price[0] >= 1000000 && filters.price[1] === maxPrice;

  return (
    <>
      <div className="flex flex-col gap-4 pb-10">
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
            value={filter.price}
            onChange={(value) => {
              const newFilters = {
                ...filter,
                price: value,
              };

              setFilters(newFilters);
              updateURL(newFilters);
            }}
          />
          <div className="mt-4 flex flex-col gap-4">
            <Checkbox
              label="below 5 lakh"
              checked={isBelow5L}
              onChange={() => {
                const newFilters = {
                  ...filter,
                  price: isBelow5L ? [minPrice, maxPrice] : [minPrice, 500000],
                };

                updateURL(newFilters);
              }}
            />

            <Checkbox
              label="Above 10 lakh"
              checked={isAbove10L}
              onChange={() => {
                const newFilters = {
                  ...filters,
                  price: isAbove10L
                    ? [minPrice, maxPrice]
                    : [1000000, maxPrice],
                };

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
            value={filter.year}
            onChange={(value) => {
              const newFilters = {
                ...filter,
                year: value,
              };

              setFilters(newFilters);
              updateURL(newFilters);
            }}
          />
          <div className="mt-4 flex flex-col gap-4">
            <Checkbox
              label="less then 1 year old"
              checked={filter.year[0] == maxYear - 1}
              onChange={() => {
                const checked = filter.year[0] == maxYear - 1;
                const newFilters = {
                  ...filters,
                  year: checked ? [minYear, maxYear] : [maxYear - 1, maxYear],
                };

                updateURL(newFilters);
              }}
            />
            <Checkbox
              label="less then 3 year old"
              checked={filter.year[0] == maxYear - 3}
              onChange={() => {
                const checked = filter.year[0] == maxYear - 3;
                const newFilters = {
                  ...filter,
                  year: checked ? [minYear, maxYear] : [maxYear - 3, maxYear],
                };

                updateURL(newFilters);
              }}
            />
            <Checkbox
              label="less then 5 year old"
              checked={filter.year[0] == maxYear - 5}
              onChange={() => {
                const checked = filter.year[0] == maxYear - 5;
                const newFilters = {
                  ...filters,
                  year: checked ? [minYear, maxYear] : [maxYear - 5, maxYear],
                };

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
                    checked={filter.brands.includes(brand)}
                    onChange={() => {
                      const newFilters = {
                        ...filter,
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
                    checked={filter.models.includes(brand)}
                    onChange={() => {
                      const newFilters = {
                        ...filter,
                        models: filter.models.includes(brand)
                          ? filter.models.filter((b) => b !== brand)
                          : [...filter.models, brand],
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
                      filter.brands.includes(item) ||
                      filter.models.includes(item)
                    }
                    onChange={() => {
                      if (brands.includes(item)) {
                        const newFilters = {
                          ...filter,
                          brands: filter.brands.includes(item)
                            ? filter.brands.filter((b) => b !== item)
                            : [...filter.brands, item],
                        };
                        setFilters(newFilters);
                        updateURL(newFilters);
                      } else {
                        const newFilters = {
                          ...filter,
                          models: filter.models.includes(item)
                            ? filter.models.filter((b) => b !== item)
                            : [...filter.models, item],
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
            value={filter.kms}
            onChange={(value) => {
              const newFilters = {
                ...filter,
                kms: value,
              };

              setFilters(newFilters);
              updateURL(newFilters);
            }}
          />
          <div className="mt-4 flex flex-col gap-4">
            <Checkbox
              label="< 10000 km"
              checked={filter.kms[1] == 10000}
              onChange={() => {
                const checked = filter.kms[1] == 10000;
                const newFilters = {
                  ...filter,
                  kms: checked ? [minKm, maxKm] : [minKm, 10000],
                };

                updateURL(newFilters);
              }}
            />
            <Checkbox
              label="< 20000 km"
              checked={filter.kms[1] == 20000 && filters.kms[0] == minKm}
              onChange={() => {
                const checked =
                  filter.kms[1] == 20000 && filters.kms[0] == minKm;
                const newFilters = {
                  ...filter,
                  kms: checked ? [minKm, maxKm] : [minKm, 20000],
                };

                updateURL(newFilters);
              }}
            />
            <Checkbox
              label="< 50000 km"
              checked={filter.kms[1] == 50000}
              onChange={() => {
                const checked = filters.kms[1] == 50000;
                const newFilters = {
                  ...filter,
                  kms: checked ? [minKm, maxKm] : [minKm, 50000],
                };

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
                checked={filter.fuelTypes.includes(item)}
                onChange={() => {
                  const newFilters = {
                    ...filter,
                    fuelTypes: filter.fuelTypes.includes(item)
                      ? filter.fuelTypes.filter((b) => b !== item)
                      : [...filter.fuelTypes, item],
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
                checked={filter.transmissions.includes(item)}
                onChange={() => {
                  const newFilters = {
                    ...filter,
                    transmissions: filter.transmissions.includes(item)
                      ? filter.transmissions.filter((b) => b !== item)
                      : [...filter.transmissions, item],
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
                checked={filter.colors.includes(item)}
                onChange={() => {
                  const newFilters = {
                    ...filter,
                    colors: filter.colors.includes(item)
                      ? filter.colors.filter((b) => b !== item)
                      : [...filter.colors, item],
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
                checked={filter.location.includes(item)}
                onChange={() => {
                  const newFilters = {
                    ...filter,
                    location: filter.location.includes(item)
                      ? filter.location.filter((b) => b !== item)
                      : [...filter.location, item],
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
                checked={filter.bodyType.includes(item)}
                onChange={() => {
                  const newFilters = {
                    ...filter,
                    bodyType: filter.bodyType.includes(item)
                      ? filter.bodyType.filter((b) => b !== item)
                      : [...filter.bodyType, item],
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
                checked={filter.owner.includes(item)}
                onChange={() => {
                  const newFilters = {
                    ...filters,
                    owner: filter.owner.includes(item)
                      ? filter.owner.filter((b) => b !== item)
                      : [...filter.owner, item],
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
                  checked={filter.seats.includes(item)}
                  onChange={() => {
                    const newFilters = {
                      ...filter,
                      seats: filter.seats.includes(item)
                        ? filter.seats.filter((b) => b !== item)
                        : [...filter.seats, item],
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
              checked={filter.engine === "999"}
              onChange={() => {
                const newFilters = {
                  ...filter,
                  engine: filter.engine === "999" ? null : "999",
                };

                setFilters(newFilters);
                updateURL(newFilters);
              }}
            />
            <Checkbox
              label="below 1299cc"
              checked={filter.engine === "1299"}
              onChange={() => {
                const newFilters = {
                  ...filter,
                  engine: filter.engine === "1299" ? null : "1299",
                };

                setFilters(newFilters);
                updateURL(newFilters);
              }}
            />
            <Checkbox
              label="below 1999cc"
              checked={filter.engine === "1999"}
              onChange={() => {
                const newFilters = {
                  ...filter,
                  engine: filter.engine === "1999" ? null : "1999",
                };

                setFilters(newFilters);
                updateURL(newFilters);
              }}
            />
            <Checkbox
              label="above 1999cc"
              checked={filter.engine === "above_1999"}
              onChange={() => {
                const newFilters = {
                  ...filter,
                  engine: filter.engine === "above_1999" ? null : "above_1999",
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
