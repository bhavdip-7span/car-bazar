import { useCarStore } from "@/store/car-store";
import { useCompareStore } from "@/store/comapre-car";
import Button from "../ui/button";
import MasterCardSkeleton from "./master-card-skeleton";
import Checkbox from "../ui/checkbox";
import Badge from "../ui/badge";
import TransmissionIcon from "../icons/transmission";
import FuelTyepIcon from "../icons/fuel-type";
import OwnerShipIcon from "../icons/ownership";
import KmDrivenIcon from "../icons/km-driven";
export default function MasterCard() {
  const car = useCarStore((state) => state.car);

  const { cars, addCar, removeCar } = useCompareStore();
  const isCompared = car ? cars.some((c) => c.id === car.id) : false;
  const loading = useCarStore((state) => state.loadingCar);
  const disableCompare = !isCompared && cars.length >= 3;
  console.log(loading);
  if (loading) {
    return <MasterCardSkeleton />;
  }

  return (
    <div className=" sticky top-[200px] border border-secondary-200  rounded-lg p-6 shadow">
      <Badge name={car?.badge} className="absolute top-2 right-2" />

      <h1 className="mt-2 font-bold text-xl">
        {car?.registration_year} {car?.brand} {car?.model}
      </h1>

      <p className="font-semibold text-secondary-700">{car?.variant}</p>
      <div className="flex gap-4 items-center mt-2 text-sm text-secondary-500 divide-x divide-secondary-300">
        <div className="flex items-center gap-2 pr-4">
          <TransmissionIcon className="fill-primary" />
          <span>{car?.transmission}</span>
        </div>
        <div className="flex items-center gap-2 pr-4">
          <FuelTyepIcon className="fill-primary" />
          <span>{car?.fuel_type}</span>
        </div>
        <div className="flex items-center gap-2 pr-4">
          <OwnerShipIcon className="fill-primary" />
          <span>{car?.ownership}</span>
        </div>
        <div className="flex items-center gap-2">
          <KmDrivenIcon className="fill-primary" />
          <span>{car?.km_driven}</span>
        </div>
      </div>
      <div className="bg-secondary-100 p-4 mt-2 rounded-lg flex  divide-x divide-primary-400">
        <h2 className="text-lg font-semibold flex items-center pr-4">
          ₹ {car?.discount_price.toLocaleString()}
          <span className=" line-through ml-4 text-xs">
            ₹ {car?.original_price.toLocaleString()}{" "}
          </span>
        </h2>
        {car ? (
          <div className="flex gap-2 items-center pl-4">
            <div className="p-2 rounded-full bg-primary-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#2f6bff"
                  d="M7.5 5.75A.75.75 0 0 1 8.25 5h7.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75zm1 4.1a.9.9 0 1 0 0 1.8a.9.9 0 0 0 0-1.8m2.6.9a.9.9 0 1 1 1.8 0a.9.9 0 0 1-1.8 0m4.4-.9a.9.9 0 1 0 0 1.8a.9.9 0 0 0 0-1.8m-7.9 4.4a.9.9 0 1 1 1.8 0a.9.9 0 0 1-1.8 0m4.4-.9a.9.9 0 1 0 0 1.8a.9.9 0 0 0 0-1.8m2.6.9a.9.9 0 1 1 1.8 0a.9.9 0 0 1-1.8 0m-6.1 2.6a.9.9 0 1 0 0 1.8a.9.9 0 0 0 0-1.8m2.6.9a.9.9 0 1 1 1.8 0a.9.9 0 0 1-1.8 0m4.4-.9a.9.9 0 1 0 0 1.8a.9.9 0 0 0 0-1.8"
                />
                <path
                  fill="##2f6bff"
                  fillRule="evenodd"
                  d="M4.5 4.25A2.25 2.25 0 0 1 6.75 2h10.5a2.25 2.25 0 0 1 2.25 2.25v15.5A2.25 2.25 0 0 1 17.25 22H6.75a2.25 2.25 0 0 1-2.25-2.25zm2.25-.75a.75.75 0 0 0-.75.75v15.5c0 .414.336.75.75.75h10.5a.75.75 0 0 0 .75-.75V4.25a.75.75 0 0 0-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-secondary-600">
                EMI starts at
              </span>
              <span className="text-primary text-xs font-semibold">
                {(((car?.discount_price - 50000) * 10 * 5) / 100 +
                  (car?.discount_price - 50000)) /
                  60}
                /mo
              </span>
            </div>
          </div>
        ) : (
          <span className="w-48 h-4 animate-pulse bg-secondary-300 rounded-lg"></span>
        )}
      </div>
      <div className="flex gap-4 items-center mt-4">
        <Button name="View Seller Details" />
        {car && (
          <Checkbox
            label="Compare"
            className="disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={disableCompare}
            checked={isCompared}
            onChange={(checked) => {
              if (checked) {
                addCar(car);
              } else {
                removeCar(car.id);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
