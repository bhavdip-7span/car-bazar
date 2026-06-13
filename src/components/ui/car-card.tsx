"use client";
import Button from "./button";
import { Car } from "@/types/car";
import ImageCarousel from "./image-carousel";

import { useRouter } from "next/navigation";
import Badge from "./badge";
type CarCardProps = {
  cars: Car;
  imageCarousel?: boolean;
  size?: "sm" | "md" | "lg";
};

export default function CarCard({
  cars,
  size = "md",
  imageCarousel = true,
}: CarCardProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/cars/${cars.slug}`);
  };
  const cardWidth = {
    sm: "w-78",
    md: "w-96",
    lg: "w-[28rem]",
  };
  return (
    <div
      className={` w-full max-w-78 relative rounded-xl overflow-hidden cursor-pointer p-2 shadow-lg border border-secondary-200`}
    >
      <Badge name={cars.badge} className="absolute z-40 top-4 right-4" />
      {imageCarousel ? (
        <ImageCarousel images={cars.images} onClick={handleClick} />
      ) : (
        <div
          className="w-full h-48 overflow-hidden rounded-lg"
          onClick={handleClick}
        >
          <img
            src={cars.images?.[0]}
            alt={cars.model}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="mt-4 px-2" onClick={handleClick}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">{cars.model}</h3>
            <span className="text-xs font-medium text-secondary">
              {cars.registration_year}
            </span>
          </div>
          <div className="flex flex-col">
            <span className=" font-semibold text-sm text-primary">
              ₹ {cars.discount_price.toLocaleString()}
            </span>
            <span className=" font-semibold line-through text-xs self-end">
              ₹ {cars.original_price.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="flex items-center text-xs text-secondary-600 divide-x divide-secondary-300">
            <div className="flex items-center gap-2 pr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#64748b"
                  d="M12.275 19q.3-.025.513-.238T13 18.25q0-.35-.225-.562T12.2 17.5q-1.025.075-2.175-.562t-1.45-2.313q-.05-.275-.262-.45T7.825 14q-.35 0-.575.263t-.15.612q.425 2.275 2 3.25t3.175.875M12 22q-3.425 0-5.712-2.35T4 13.8q0-2.5 1.988-5.437T12 2q4.025 3.425 6.013 6.363T20 13.8q0 3.5-2.287 5.85T12 22"
                />
              </svg>
              <span>{cars?.fuel_type}</span>
            </div>
            <div className="flex items-center gap-2 px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#64748b"
                  d="M4 21q-1.25 0-2.125-.875T1 18q0-.975.563-1.75T3 15.175v-6.35q-.875-.3-1.437-1.075T1 6q0-1.25.875-2.125T4 3t2.125.875T7 6q0 .975-.562 1.75T5 8.825V11h6V8.825q-.875-.3-1.437-1.075T9 6q0-1.25.875-2.125T12 3t2.125.875T15 6q0 .975-.562 1.75T13 8.825V11h5q.425 0 .713-.287T19 10V8.825q-.875-.3-1.437-1.075T17 6q0-1.25.875-2.125T20 3t2.125.875T23 6q0 .975-.562 1.75T21 8.825V10q0 1.25-.875 2.125T18 13h-5v2.175q.875.3 1.438 1.075T15 18q0 1.25-.875 2.125T12 21t-2.125-.875T9 18q0-.975.563-1.75T11 15.175V13H5v2.175q.875.3 1.438 1.075T7 18q0 1.25-.875 2.125T4 21m0-2q.425 0 .713-.288T5 18t-.288-.712T4 17t-.712.288T3 18t.288.713T4 19M4 7q.425 0 .713-.288T5 6t-.288-.712T4 5t-.712.288T3 6t.288.713T4 7m8 12q.425 0 .713-.288T13 18t-.288-.712T12 17t-.712.288T11 18t.288.713T12 19m0-12q.425 0 .713-.288T13 6t-.288-.712T12 5t-.712.288T11 6t.288.713T12 7m8 0q.425 0 .713-.288T21 6t-.288-.712T20 5t-.712.288T19 6t.288.713T20 7m0-1"
                />
              </svg>
              <span>{cars?.transmission}</span>
            </div>

            <div className="flex items-center gap-2 pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#64748b"
                  d="M12 4C6.486 4 2 8.486 2 14a9.9 9.9 0 0 0 1.051 4.445c.17.34.516.555.895.555h16.107c.379 0 .726-.215.896-.555A9.9 9.9 0 0 0 22 14c0-5.514-4.486-10-10-10m7.41 13H4.59A7.9 7.9 0 0 1 4 14c0-4.411 3.589-8 8-8s8 3.589 8 8a7.9 7.9 0 0 1-.59 3"
                />
                <path
                  fill="#64748b"
                  d="M10.939 12.939a1.53 1.53 0 0 0 0 2.561a1.53 1.53 0 0 0 2.121-.44l3.962-6.038a.03.03 0 0 0 0-.035a.033.033 0 0 0-.045-.01z"
                />
              </svg>
              <span>{cars?.km_driven}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 border-t border-secondary-200 pt-1">
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
            <span className="text-secondary-600 text-xs">
              {cars.registration_location}
            </span>
          </div>
        </div>
        <Button name="View details" className="w-full mt-4 mb-4" />
      </div>
    </div>
  );
}
