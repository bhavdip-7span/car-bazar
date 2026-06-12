import { useCarStore } from "@/store/car-store";
type Props = {
  refProp: React.RefObject<HTMLDivElement | null>;
};

export default function OverviewCard({ refProp }: Props) {
  const car = useCarStore((state) => state.car);
  return (
    <div
      ref={refProp}
      className="border border-gray-200 p-6 rounded-lg  shadow"
    >
      <h3 className="text-xl font-semibold">Car Overview</h3>
      <div className="grid grid-cols-4 gap-8 mt-8 font-semibold text-sm">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
            >
              <path
                fill="#bdbdbd"
                d="M12.275 19q.3-.025.513-.238T13 18.25q0-.35-.225-.562T12.2 17.5q-1.025.075-2.175-.562t-1.45-2.313q-.05-.275-.262-.45T7.825 14q-.35 0-.575.263t-.15.612q.425 2.275 2 3.25t3.175.875M12 22q-3.425 0-5.712-2.35T4 13.8q0-2.5 1.988-5.437T12 2q4.025 3.425 6.013 6.363T20 13.8q0 3.5-2.287 5.85T12 22"
              />
            </svg>
            <span>Fuel Type</span>
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
                d="M12 4C6.486 4 2 8.486 2 14a9.9 9.9 0 0 0 1.051 4.445c.17.34.516.555.895.555h16.107c.379 0 .726-.215.896-.555A9.9 9.9 0 0 0 22 14c0-5.514-4.486-10-10-10m7.41 13H4.59A7.9 7.9 0 0 1 4 14c0-4.411 3.589-8 8-8s8 3.589 8 8a7.9 7.9 0 0 1-.59 3"
              />
              <path
                fill="#bdbdbd"
                d="M10.939 12.939a1.53 1.53 0 0 0 0 2.561a1.53 1.53 0 0 0 2.121-.44l3.962-6.038a.03.03 0 0 0 0-.035a.033.033 0 0 0-.045-.01z"
              />
            </svg>
            <span>Kms Driven</span>
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
                d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 6v-.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18"
              />
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
            >
              <path
                fill="#bdbdbd"
                d="M4 21q-1.25 0-2.125-.875T1 18q0-.975.563-1.75T3 15.175v-6.35q-.875-.3-1.437-1.075T1 6q0-1.25.875-2.125T4 3t2.125.875T7 6q0 .975-.562 1.75T5 8.825V11h6V8.825q-.875-.3-1.437-1.075T9 6q0-1.25.875-2.125T12 3t2.125.875T15 6q0 .975-.562 1.75T13 8.825V11h5q.425 0 .713-.287T19 10V8.825q-.875-.3-1.437-1.075T17 6q0-1.25.875-2.125T20 3t2.125.875T23 6q0 .975-.562 1.75T21 8.825V10q0 1.25-.875 2.125T18 13h-5v2.175q.875.3 1.438 1.075T15 18q0 1.25-.875 2.125T12 21t-2.125-.875T9 18q0-.975.563-1.75T11 15.175V13H5v2.175q.875.3 1.438 1.075T7 18q0 1.25-.875 2.125T4 21m0-2q.425 0 .713-.288T5 18t-.288-.712T4 17t-.712.288T3 18t.288.713T4 19M4 7q.425 0 .713-.288T5 6t-.288-.712T4 5t-.712.288T3 6t.288.713T4 7m8 12q.425 0 .713-.288T13 18t-.288-.712T12 17t-.712.288T11 18t.288.713T12 19m0-12q.425 0 .713-.288T13 6t-.288-.712T12 5t-.712.288T11 6t.288.713T12 7m8 0q.425 0 .713-.288T21 6t-.288-.712T20 5t-.712.288T19 6t.288.713T20 7m0-1"
              />
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
            >
              <path
                fill="#bdbdbd"
                d="M15 9h2v2h-2zm2-4h-2v2h2zm-6 10h2v-2h-2zm2-10h-2v2h2zm-2 6h2V9h-2zM9 5H7v2h2zm0 4H7v2h2zm5.55 12H13v-3.5h-2V21H5V3h14v8.03c.71.06 1.39.28 2 .6V1H3v22h12.91c-.41-.56-.91-1.24-1.36-2M7 19h2v-2H7zm2-6H7v2h2zm13 3.5c0 2.6-3.5 6.5-3.5 6.5S15 19.1 15 16.5c0-1.9 1.6-3.5 3.5-3.5s3.5 1.6 3.5 3.5m-2.3.1c0-.6-.6-1.2-1.2-1.2s-1.2.5-1.2 1.2c0 .6.5 1.2 1.2 1.2s1.3-.6 1.2-1.2"
              />
            </svg>
            <span>RTO</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="#bdbdbd"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              >
                <path d="M14.25 21a2.249 2.249 0 1 0 4.498 0a2.249 2.249 0 0 0-4.498 0m-10.5 0a2.25 2.25 0 1 0 4.5 0a2.25 2.25 0 0 0-4.5 0m10.632.75H8.118" />
                <path d="M3.881 21.75H2.25a1.5 1.5 0 0 1-1.5-1.5v-1.5a3 3 0 0 1 3-3l1.835-3.671a1.5 1.5 0 0 1 1.342-.829h4.9a1.5 1.5 0 0 1 1.342.829L15 15.75h5.25a3 3 0 0 1 3 3v1.5a1.5 1.5 0 0 1-1.5 1.5h-3.13m-3.62-6H3.75" />
                <path d="m15 15.75l4.5-4.5h3m0-3.75a2.45 2.45 0 0 1-.75-1.841c0-1.227 1.5-1.841 1.5-3.068A2.45 2.45 0 0 0 22.5.75M18 9a2.45 2.45 0 0 1-.75-1.841c0-1.227 1.5-1.841 1.5-3.068A2.45 2.45 0 0 0 18 2.25" />
              </g>
            </svg>
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
