import { useCarStore } from "@/store/car-store";
import { useCompareStore } from "@/store/comapre-car";
import Button from "../ui/button";
import MasterCardSkeleton from "./master-card-skeleton";
import Checkbox from "../ui/checkbox";
import Badge from "../ui/badge";
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
          >
            <path
              fill="#2f6bff"
              d="M4 21q-1.25 0-2.125-.875T1 18q0-.975.563-1.75T3 15.175v-6.35q-.875-.3-1.437-1.075T1 6q0-1.25.875-2.125T4 3t2.125.875T7 6q0 .975-.562 1.75T5 8.825V11h6V8.825q-.875-.3-1.437-1.075T9 6q0-1.25.875-2.125T12 3t2.125.875T15 6q0 .975-.562 1.75T13 8.825V11h5q.425 0 .713-.287T19 10V8.825q-.875-.3-1.437-1.075T17 6q0-1.25.875-2.125T20 3t2.125.875T23 6q0 .975-.562 1.75T21 8.825V10q0 1.25-.875 2.125T18 13h-5v2.175q.875.3 1.438 1.075T15 18q0 1.25-.875 2.125T12 21t-2.125-.875T9 18q0-.975.563-1.75T11 15.175V13H5v2.175q.875.3 1.438 1.075T7 18q0 1.25-.875 2.125T4 21m0-2q.425 0 .713-.288T5 18t-.288-.712T4 17t-.712.288T3 18t.288.713T4 19M4 7q.425 0 .713-.288T5 6t-.288-.712T4 5t-.712.288T3 6t.288.713T4 7m8 12q.425 0 .713-.288T13 18t-.288-.712T12 17t-.712.288T11 18t.288.713T12 19m0-12q.425 0 .713-.288T13 6t-.288-.712T12 5t-.712.288T11 6t.288.713T12 7m8 0q.425 0 .713-.288T21 6t-.288-.712T20 5t-.712.288T19 6t.288.713T20 7m0-1"
            />
          </svg>
          <span>{car?.transmission}</span>
        </div>
        <div className="flex items-center gap-2 pr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
          >
            <path
              fill="#2f6bff"
              d="M12.275 19q.3-.025.513-.238T13 18.25q0-.35-.225-.562T12.2 17.5q-1.025.075-2.175-.562t-1.45-2.313q-.05-.275-.262-.45T7.825 14q-.35 0-.575.263t-.15.612q.425 2.275 2 3.25t3.175.875M12 22q-3.425 0-5.712-2.35T4 13.8q0-2.5 1.988-5.437T12 2q4.025 3.425 6.013 6.363T20 13.8q0 3.5-2.287 5.85T12 22"
            />
          </svg>
          <span>{car?.fuel_type}</span>
        </div>
        <div className="flex items-center gap-2 pr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
          >
            <path
              fill="#2f6bff"
              d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 6v-.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18"
            />
          </svg>
          <span>{car?.ownership}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
          >
            <path
              fill="#2f6bff"
              d="M12 4C6.486 4 2 8.486 2 14a9.9 9.9 0 0 0 1.051 4.445c.17.34.516.555.895.555h16.107c.379 0 .726-.215.896-.555A9.9 9.9 0 0 0 22 14c0-5.514-4.486-10-10-10m7.41 13H4.59A7.9 7.9 0 0 1 4 14c0-4.411 3.589-8 8-8s8 3.589 8 8a7.9 7.9 0 0 1-.59 3"
            />
            <path
              fill="#2f6bff"
              d="M10.939 12.939a1.53 1.53 0 0 0 0 2.561a1.53 1.53 0 0 0 2.121-.44l3.962-6.038a.03.03 0 0 0 0-.035a.033.033 0 0 0-.045-.01z"
            />
          </svg>
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
