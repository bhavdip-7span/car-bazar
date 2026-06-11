import { create } from "zustand";
import { Car } from "@/types/car";

type CarStore = {
  car: Car | null;
  similarCars: Car[];
  recommendedCar: Car[];
  loadingRecommendedCars: boolean;
  loadingSimilarCars: boolean;
  loadingCar: boolean;
  setLoadingCar: (loading: boolean) => void;
  setLoadingRecommendedCars: (loading: boolean) => void;
  setLoadingSimilarCars: (loading: boolean) => void;
  setSimilarCars: (cars: Car[]) => void;
  setRecommendedCar: (cars: Car[]) => void;
  setCar: (car: Car) => void;
};
export const useCarStore = create<CarStore>((set) => ({
  car: null,
  similarCars: [],
  loadingCar: true,
  loadingRecommendedCars: true,
  loadingSimilarCars: true,
  recommendedCar: [],
  setLoadingCar: (loading) => set({ loadingCar: loading }),
  setLoadingSimilarCars: (loading) => set({ loadingSimilarCars: loading }),

  setLoadingRecommendedCars: (loading) =>
    set({ loadingRecommendedCars: loading }),
  setSimilarCars: (cars) => set({ similarCars: cars }),
  setRecommendedCar: (cars) => set({ recommendedCar: cars }),
  setCar: (car) => set({ car }),
}));
