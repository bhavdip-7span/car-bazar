"use client";
import Button from "./button";
import { Car } from "@/types/car";
import ImageCarousel from "./image-carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Badge from "./badge";
import TransmissionIcon from "../icons/transmission";
import FuelTyepIcon from "../icons/fuel-type";
import KmDrivenIcon from "../icons/km-driven";
import RegisterLocationIcon from "../icons/register-location";
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
          className="relative w-full h-48 overflow-hidden rounded-lg"
          onClick={handleClick}
        >
          <Image
            src={cars.images?.[0] || "/placeholder-car.jpg"}
            alt={cars.model}
            fill
            className="object-cover"
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
              <FuelTyepIcon />
              <span>{cars?.fuel_type}</span>
            </div>
            <div className="flex items-center gap-2 px-3">
              <TransmissionIcon />
              <span>{cars?.transmission}</span>
            </div>

            <div className="flex items-center gap-2 pl-3">
              <KmDrivenIcon />
              <span>{cars?.km_driven}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 border-t border-secondary-200 pt-1">
            <RegisterLocationIcon />
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
