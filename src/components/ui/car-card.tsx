"use client";
import Button from "./button";
import { Car } from "@/types/car";
import ImageCarousel from "./image-carousel";

import { useRouter } from "next/navigation";
type CarCardProps = {
  cars: Car;
};

export default function CarCard({ cars }: CarCardProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/cars/${cars.slug}`);
  };
  return (
    <div className="w-96 rounded-xl overflow-hidden border border-secondary-300 cursor-pointer">
      {/* <div className="w-full h-48 overflow-hidden">
        <img
          src={cars.images?.[0]}
          alt={cars.model}
          className="w-full h-full object-cover"
        />
      </div> */}
      <ImageCarousel images={cars.images} onClick={handleClick} />
      <div className="mt-4 px-4" onClick={handleClick}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-semibold">{cars.model}</h3>

            <span className="px-2 py-1 text-[10px] font-medium rounded-md bg-secondary-100 text-secondary-600">
              {cars.registration_year}
            </span>
          </div>
          <p className="text-xl font-semibold"> {cars.original_price}</p>
        </div>
        <div className="mt-8">
          <div className="flex items-center text-sm text-secondary-600">
            <span>{cars.km_driven} kms</span>

            <div className="mx-2 w-1 h-1 rounded-full bg-secondary-600 translate-y-0.5" />

            <span>{cars.transmission}</span>

            <div className="mx-2 w-1 h-1 rounded-full bg-secondary-600 translate-y-0.5" />

            <span>{cars.fuel_type}</span>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
            >
              <path
                fill="#000000"
                d="M12 19.35q3.05-2.8 4.525-5.087T18 10.2q0-2.725-1.737-4.462T12 4T7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35m0 1.975q-.35 0-.7-.125t-.625-.375Q9.05 19.325 7.8 17.9t-2.087-2.762t-1.275-2.575T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 1.125-.437 2.363t-1.275 2.575T16.2 17.9t-2.875 2.925q-.275.25-.625.375t-.7.125M12 12q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12"
              />
            </svg>
            <span className="text-secondary-600 text-sm">
              {cars.registration_location}
            </span>
          </div>
        </div>
        <Button name="View details" className="w-full mt-4 mb-4" />
      </div>
    </div>
  );
}
