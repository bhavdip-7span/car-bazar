"use client";
import { useCompareStore } from "@/store/comapre-car";
import { compareSections } from "@/constant/compare-section";
import CarCard from "@/components/ui/car-card";
import { Car } from "@/types/car";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/button";
export default function CarCompare() {
  const params = useParams();
  const [checkParams, setCheckParams] = useState(true);
  useEffect(() => {
    if (params.slug != compareSlug) {
      setCheckParams(false);
      console.log("hello");
    }
  }, [params.slug]);
  const { cars } = useCompareStore();
  const compareSlug = cars.map((car) => car.id).join("_vs_");

  function getWinnerIndexes(
    cars: Car[],
    key: keyof Car,
    better: "higher" | "lower",
  ) {
    const values = cars.map((car) => {
      if (key === "ownership") {
        const ownershipMap: Record<string, number> = {
          First: 1,
          Second: 2,
          Third: 3,
          Fourth: 4,
        };

        return ownershipMap[String(car.ownership)] ?? 99;
      }

      return Number(car[key]);
    });

    const target =
      better === "lower" ? Math.min(...values) : Math.max(...values);

    return values
      .map((value, index) => (value === target ? index : -1))
      .filter((index) => index !== -1);
  }
  if (!checkParams) {
    return (
      <div className="flex min-h-[100vh-120x] justify-center items-center flex-col">
        <img
          src="/page-not-found.svg"
          alt="page not found"
          className="size-48 md:size-96"
        ></img>
        <h1 className=" text-lg md:text-xl font-semibold">
          Comparison Not Found
        </h1>
        <p className=" text-sm md:text-base font-medium text-secondary-400 w-full max-w-96 text-center">
          We couldn't find the cars in this comparison. Start a new comparison
          from our listings.
        </p>
        <Link href="/cars" className="mt-2">
          <Button name="Browse Cars" className="rounded-lg" />
        </Link>
      </div>
    );
  }
  if (cars.length < 2) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold">
          Select at least 2 cars to compare
        </h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 px-8">
      <h1 className="text-3xl font-bold w-fit mx-auto mt-4">Compare Cars</h1>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        {cars.map((item) => (
          <CarCard key={item.id} cars={item} imageCarousel={false} />
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-8 mb-4 overflow-x-auto">
        {compareSections.map((section) => (
          <div
            key={section.title}
            className="border border-secondary-300 rounded-xl overflow-hidden shadow"
          >
            <div className="px-6 py-5">
              <h2 className="text-2xl font-bold">{section.title}</h2>
            </div>

            {section.fields.map((field) => {
              const winners = field.better
                ? getWinnerIndexes(cars, field.key, field.better)
                : [];

              return (
                <div key={field.key}>
                  <div className="bg-secondary-100 py-4 text-center font-semibold text-secondary-700">
                    {field.label}
                  </div>

                  <div
                    className={`grid ${
                      cars.length === 2 ? "grid-cols-2" : "grid-cols-3"
                    }`}
                  >
                    {cars.map((car, index) => (
                      <div
                        key={car.id}
                        className={`p-4 text-center border-r border-secondary-300 ${
                          winners.includes(index) ? "bg-emerald-100" : ""
                        }`}
                      >
                        <span className="text-sm font-semibold">
                          {field.key.includes("price")
                            ? `₹ ${Number(car[field.key]).toLocaleString()}`
                            : String(car[field.key] ?? "-")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
