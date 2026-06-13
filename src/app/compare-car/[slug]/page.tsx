"use client";
import { useCompareStore } from "@/store/comapre-car";
import { compareSections } from "@/constant/compare-section";
import CarCard from "@/components/ui/car-card";
import { Car } from "@/types/car";
export default function CarCompare() {
  const { cars } = useCompareStore();
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
      <h1 className="text-3xl font-bold mb-8 w-fit mx-auto mt-4">
        Compare Cars
      </h1>
      <div className="flex justify-center items-center gap-4">
        {cars.map((item) => (
          <CarCard key={item.id} cars={item} imageCarousel={false} />
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-8 mb-4">
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
