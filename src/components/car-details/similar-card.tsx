import { useCarStore } from "@/store/car-store";
import CarCard from "../ui/car-card";
import CarCardSkeleton from "../ui/car-card-skeleton";
type Props = {
  refProp: React.RefObject<HTMLDivElement | null>;
};
export default function SimilarCard({ refProp }: Props) {
  const car = useCarStore((state) => state.similarCars);
  const loading = useCarStore((state) => state.loadingRecommendedCars);
  const loadingSimiler = useCarStore((state) => state.loadingSimilarCars);
  const reCar = useCarStore((state) => state.recommendedCar);
  console.log(loadingSimiler);
  return (
    <div
      className="border border-gray-200 p-6 rounded-lg  shadow mb-2"
      ref={refProp}
    >
      <h3 className="text-xl font-semibold">Similar Cars</h3>
      <div className="mt-8 relative">
        <div className="flex gap-4 overflow-x-auto flex-nowrap scroll-smooth snap-x snap-mandatory scrollbar-thin">
          {loadingSimiler ? (
            <CarCardSkeleton />
          ) : car.length !== 0 ? (
            car.map((car) => (
              <div key={car.id} className="flex-shrink-0 snap-start w-[280px]">
                <CarCard cars={car} imageCarousel={false} />
              </div>
            ))
          ) : (
            <p className="text-red-500 font-medium text-sm">
              No similar cars found
            </p>
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-8 pt-4 border-t border-gray-300">
        Recommended Cars
      </h3>
      <div className="mt-8 relative">
        <div className="flex gap-4 overflow-x-auto flex-nowrap scroll-smooth snap-x snap-mandatory scrollbar-thin">
          {loading ? (
            <CarCardSkeleton />
          ) : reCar.length !== 0 ? (
            reCar.map((car) => (
              <div key={car.id} className="flex-shrink-0 snap-start w-[280px]">
                <CarCard cars={car} imageCarousel={false} />
              </div>
            ))
          ) : (
            <p className="text-red-500 font-medium text-sm">
              No similar cars found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
