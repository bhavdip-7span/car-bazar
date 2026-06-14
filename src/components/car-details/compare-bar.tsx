"use client";
import { useCompareStore } from "@/store/comapre-car";

import Button from "../ui/button";
import { useRouter } from "next/navigation";
export default function CompareBar() {
  const router = useRouter();
  const { cars, removeCar } = useCompareStore();
  const ids = cars.map((c) => c.id);
  console.log(ids.length);
  if (cars.length === 0) return null;
  const handleCompare = () => {
    if (ids.length < 2) return;

    router.push(`/compare-car/${ids.join("_vs_")}`);
  };
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-300 p-3 flex items-center overflow-x-auto justify-between z-50">
      <div className="flex gap-3 divide-x divide-secondary">
        {cars.map((car) => (
          <div key={car.id} className="flex items-center gap-2 px-4">
            <Button
              variant="outline"
              className="p-2 rounded-full"
              onClick={() => removeCar(car.id)}
              name={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#bdbdbd"
                    d="m8.382 17.025l-1.407-1.4L10.593 12L6.975 8.4L8.382 7L12 10.615L15.593 7L17 8.4L13.382 12L17 15.625l-1.407 1.4L12 13.41z"
                  />
                </svg>
              }
            />
            <div className="h-18 w-18 rounded-lg overflow-hidden">
              <img
                src={car.images[0]}
                alt=" car image"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">
                {car.brand} {car.model}
              </p>
              <div className="flex gap-1 items-center text-xs font-medium text-secondary">
                <span>{car.km_driven}</span>
                <span className="text-gray-400">•</span>
                <span>{car.fuel_type}</span>
                <span className="text-gray-400">•</span>
                <span>{car.transmission}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {ids.length != 0 && (
        <Button
          disabled={ids.length < 2}
          onClick={() => handleCompare()}
          className=" disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
          name={`Compare (${cars.length})`}
        ></Button>
      )}
    </div>
  );
}
