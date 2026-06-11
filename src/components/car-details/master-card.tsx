import { useCarStore } from "@/store/car-store";
import Button from "../ui/button";
import MasterCardSkeleton from "./master-card-skeleton";
export default function MasterCard() {
  const car = useCarStore((state) => state.car);
  const loading = useCarStore((state) => state.loadingCar);
  console.log(loading);
  if (loading) {
    console.log("hello");
    return <MasterCardSkeleton />;
  }
  return (
    <div className=" sticky top-[200px] border border-gray-300 rounded-lg p-6">
      <span className="bg-primary-50 text-primary-800 tracking-wide font-semibold text-xs px-2 py-1 absolute top-2 right-2 rounded-lg">
        {car?.badge}
      </span>

      <h1 className="mt-2 font-bold text-xl">
        {car?.registration_year} {car?.brand} {""} {car?.model}
      </h1>

      <p className="font-semibold text-secondary-700">{car?.model}</p>
      <div className="flex gap-4 items-center mt-2 text-secondary-500">
        <span>{car?.transmission}</span>
        <span className="border-t h-1 w-1 rounded-full bg-secondary"></span>
        <span>{car?.fuel_type}</span>

        <span className="border-t h-1 w-1 rounded-full bg-secondary"></span>
        <span>{car?.ownership} owner</span>
        <span className="border-t h-1 w-1 rounded-full bg-secondary"></span>
        <span>{car?.km_driven.toLocaleString()}</span>
      </div>
      <div className="bg-secondary-100 p-4 mt-2 rounded-lg">
        <h2 className="text-lg font-semibold">
          ₹ {car?.discount_price.toLocaleString()}
          <span className=" line-through ml-4">
            ₹ {car?.original_price.toLocaleString()}{" "}
          </span>
        </h2>
        {car ? (
          <span className="text-sm font-medium text-secondary-600">
            EMI starts @{" "}
            {(((car?.discount_price - 50000) * 10 * 5) / 100 +
              (car?.discount_price - 50000)) /
              60}
            /mo
          </span>
        ) : (
          <span className="w-48 h-4 animate-pulse bg-secondary-300 rounded-lg"></span>
        )}
      </div>
      <Button name="View Seller Details" className="mt-4" />
    </div>
  );
}
