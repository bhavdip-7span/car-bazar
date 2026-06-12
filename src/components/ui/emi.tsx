"use client";
import { useCarStore } from "@/store/car-store";
import { useState } from "react";
import SingleRangeSlider from "./single-range-silder";

SingleRangeSlider;
type Props = {
  refProp: React.RefObject<HTMLDivElement | null>;
};
export default function EMI({ refProp }: Props) {
  const car = useCarStore((state) => state.car);
  const [priceRange, setPriceRange] = useState(50000);
  const [year, SetYear] = useState(5);
  const interest = car
    ? ((car?.discount_price - priceRange) * year * 10) / 100
    : 0;
  console.log(interest);
  const emiPerMonth = car
    ? (interest + (car?.discount_price - priceRange)) / (year * 12)
    : 0;
  return (
    <div
      ref={refProp}
      className="border border-gray-200 p-6 rounded-lg  shadow"
    >
      <h3 className="text-xl font-semibold">EMI calculator</h3>
      <div className="flex  gap-8 mt-8">
        <div className=" flex flex-col gap-8 w-4/10">
          <div className="flex flex-col gap-1">
            <span className="text-base font-medium text-secondary-700">
              Down payment
            </span>
            {car ? (
              <SingleRangeSlider
                min={10000}
                max={car.discount_price}
                step={10000}
                value={priceRange}
                onChange={setPriceRange}
              />
            ) : (
              <span className="bg-secondary-300 w-full rounded-sm h-4 animate-pulse"></span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-base font-medium text-secondary-700">
              Year
            </span>
            <SingleRangeSlider
              min={1}
              max={5}
              step={1}
              value={year}
              onChange={SetYear}
            />
          </div>
        </div>
        <div className="ml-8  w-6/10 flex flex-col ">
          <div className="grid grid-cols-2 gap-8 border-b border-gray-300 pb-4">
            <div className="flex  flex-col gap-8 ">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-secondary-700">
                  Loan amount
                </span>
                {car && (
                  <span className="text-sm text-secondary-400">
                    ₹{(car?.original_price - priceRange).toLocaleString()}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-secondary-700">
                  Down payment
                </span>
                <span className="text-sm text-secondary-400">
                  ₹{priceRange.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-secondary-700">
                  Year
                </span>
                <span className="text-sm text-secondary-400">{year}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-secondary-700">
                  Rate
                </span>
                <span className="text-sm text-secondary-400">10 %</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-2">
            <div className="flex flex-col gap-2 font-semibold text-lg text-secondary-400">
              <span>EMI per month</span>
              <span>Total Payable Amount</span>
            </div>
            <div className="flex flex-col gap-2 font-semibold text-lg text-secondary-600">
              <span>₹ {emiPerMonth.toFixed(2)}</span>
              {car && (
                <span>
                  {" "}
                  ₹{" "}
                  {(
                    interest +
                    (car?.original_price - priceRange)
                  ).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
