import { useCarStore } from "@/store/car-store";
type Props = {
  refProp: React.RefObject<HTMLDivElement | null>;
};
export default function SpecsFeaturesCard({ refProp }: Props) {
  const car = useCarStore((state) => state.car);
  return (
    <div ref={refProp} className="flex flex-col gap-8">
      <div className="border border-gray-200 p-6 rounded-lg  shadow">
        <h3 className="text-xl font-semibold">Features</h3>
        <div className="mt-8 flex gap-8 flex-wrap">
          {car
            ? car.feature.map((item) => (
                <div className="flex items-center gap-2" key={item}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <g fill="#43a147" fillRule="evenodd" clipRule="evenodd">
                      <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12" />
                      <path d="m17.608 9l-7.726 7.726L6 12.093l1.511-1.31l2.476 3.01l6.207-6.207z" />
                    </g>
                  </svg>
                  <span className="text-secondary-400 font-medium">{item}</span>
                </div>
              ))
            : ""}
        </div>
      </div>
      <div className="border border-gray-200 p-6 rounded-lg  shadow">
        <h3 className="text-xl font-semibold">Specifications</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8 text-sm">
          <div className="flex flex-col gap-4 text-secondary-400">
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
                  d="M12.275 19q.3-.025.513-.238T13 18.25q0-.35-.225-.562T12.2 17.5q-1.025.075-2.175-.562t-1.45-2.313q-.05-.275-.262-.45T7.825 14q-.35 0-.575.263t-.15.612q.425 2.275 2 3.25t3.175.875M12 22q-3.425 0-5.712-2.35T4 13.8q0-2.5 1.988-5.437T12 2q4.025 3.425 6.013 6.363T20 13.8q0 3.5-2.287 5.85T12 22"
                />
              </svg>
              <span>Fuel Type</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-secondary-700">
            {!car ? (
              <span className="w-18 animate-pulse bg-gray-300 rounded-sm h-4"></span>
            ) : (
              <span>{car?.engine_cc}</span>
            )}
            {!car ? (
              <span className="w-18 animate-pulse bg-gray-300 rounded-sm h-4"></span>
            ) : (
              <span>{car?.transmission}</span>
            )}
            {!car ? (
              <span className="w-18 animate-pulse bg-gray-300 rounded-sm h-4"></span>
            ) : (
              <span>{car?.fuel_type}</span>
            )}
          </div>

          <div className="flex flex-col gap-4 text-secondary-400">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#bdbdbd"
                  d="M29.805 29.777L242.14 209.55H118.712l112.54 86.784H95.995l225.656 174.012l-81.537-116.05l66.487.143l179.185 138.175l-171.96-244.746h84.568L248.082 29.776z"
                />
              </svg>
              <span>Power</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 32 32"
              >
                <path
                  fill="#bdbdbd"
                  d="M30.47 16.76h-3.05v-3.05h3.05v-1.52H25.9v1.52h-1.52v4.58h1.52v1.52h4.57v-1.52H32v-4.58h-1.53zm-3.05 6.1h1.53v4.57h-1.53Zm-4.57-1.53v1.53h-1.52v4.57h1.52v1.52h4.57v-1.52h-3.04v-4.57h3.04v-1.53zm4.57-10.66V9.14h1.53V4.57h-1.53v3.05H25.9V6.09h-1.52V4.57h3.04V3.05h-4.57v1.52h-1.52v4.57h1.52v1.53zM18.28 25.9h1.52v4.58h-1.52ZM19.8 1.52h-1.52V0h-4.57v1.52h-1.52v4.57h1.52v1.53h4.57V6.09h1.52zm-6.09 28.96h4.57V32h-4.57Zm0-6.1h4.57v1.52h-4.57Zm-1.52 1.52h1.52v4.58h-1.52Zm-3.05 3.05v-1.52h1.52v-4.57H9.14v-1.53H4.57v1.53h3.04v4.57H4.57v1.52zm1.52-24.38H9.14V3.05H4.57v1.52h3.04v1.52H6.09v1.53H4.57V4.57H3.04v4.57h1.53v1.53h4.57V9.14h1.52zM3.04 22.86h1.53v4.57H3.04Zm-1.52-3.05h4.57v-1.52h1.52v-4.58H6.09v-1.52H1.52v1.52h3.05v3.05H1.52v-3.05H0v4.58h1.52z"
                />
              </svg>
              <span>Mileage</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-secondary-700">
            {!car ? (
              <span className="w-18 animate-pulse bg-gray-300 rounded-sm h-4"></span>
            ) : (
              <span>{car?.power}</span>
            )}
            {!car ? (
              <span className="w-18 animate-pulse bg-gray-300 rounded-sm h-4"></span>
            ) : (
              <span>{car?.mileage}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
