import { useCarStore } from "@/store/car-store";
import TransmissionIcon from "../icons/transmission";
import FuelTyepIcon from "../icons/fuel-type";
import OwnerShipIcon from "../icons/ownership";
import KmDrivenIcon from "../icons/km-driven";
import RegisterLocationIcon from "../icons/register-location";
import EngineIcon from "../icons/engine";
type Props = {
  refProp: React.RefObject<HTMLDivElement | null>;
};

export default function OverviewCard({ refProp }: Props) {
  const car = useCarStore((state) => state.car);
  return (
    <div ref={refProp} className="border border-gray-200 p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold">Car Overview</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8 font-semibold text-sm">
        <div className="flex flex-col gap-4 text-secondary-400">
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
            >
              <path
                fill="#bdbdbd"
                d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zM5 8h14V6H5zm0 0V6z"
              />
            </svg>
            <span>Registration Year</span>
          </div>
          <div className="flex items-center gap-2">
            <FuelTyepIcon />
            <span>Fuel Type</span>
          </div>
          <div className="flex items-center gap-2">
            <KmDrivenIcon />
            <span>Kms Driven</span>
          </div>
          <div className="flex items-center gap-2">
            <OwnerShipIcon />
            <span>Ownership</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-secondary-700">
          {!car ? (
            <span className="w-18 animate-pulse bg-gray-300 rounded-sm h-4"></span>
          ) : (
            <span>{car?.registration_year}</span>
          )}
          {!car ? (
            <span className="w-18 animate-pulse bg-gray-300 rounded-sm h-4"></span>
          ) : (
            <span>{car?.fuel_type}</span>
          )}
          {!car ? (
            <span className="w-18 animate-pulse bg-gray-300 rounded-sm h-4"></span>
          ) : (
            <span>{car?.km_driven}</span>
          )}
          {!car ? (
            <span className="w-18 animate-pulse bg-gray-300 rounded-sm h-4"></span>
          ) : (
            <span>{car?.ownership}</span>
          )}
        </div>
        <div className="flex flex-col gap-4 text-secondary-400">
          <div className="flex items-center gap-2">
            <TransmissionIcon />
            <span>Transmission</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
            >
              <path
                fill="#bdbdbd"
                d="M7 18S4 10 4 6s2-4 2-4h1s1 0 1 1s-1 1-1 3s3 4 3 7s-3 5-3 5m5-1c-1 0-4 2.5-4 2.5c-.3.2-.2.5 0 .8c0 0 1 1.8 3 1.8h6c1.1 0 2-.9 2-2v-1c0-1.1-.9-2-2-2h-5Z"
              />
            </svg>
            <span>Seats</span>
          </div>
          <div className="flex items-center gap-2">
            <RegisterLocationIcon />
            <span>RTO</span>
          </div>
          <div className="flex items-center gap-2">
            <EngineIcon />
            <span>Engine cc</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-secondary-700">
          {!car ? (
            <span className="w-18 animate-pulse bg-gray-300 rounded-sm h-4"></span>
          ) : (
            <span>{car?.transmission}</span>
          )}
          {!car ? (
            <span className="w-18 animate-pulse bg-gray-300 rounded-sm h-4"></span>
          ) : (
            <span>{car?.seats}</span>
          )}
          {!car ? (
            <span className="w-18 animate-pulse bg-gray-300 rounded-sm h-4"></span>
          ) : (
            <span>{car?.registration_location}</span>
          )}
          {!car ? (
            <span className="w-18 animate-pulse bg-gray-300 rounded-sm h-4"></span>
          ) : (
            <span>{car?.engine_cc}</span>
          )}
        </div>
      </div>
    </div>
  );
}
