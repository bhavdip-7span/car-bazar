import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Car } from "@/types/car";

type CompareStore = {
  cars: Car[];
  addCar: (car: Car) => void;
  removeCar: (id: string) => void;
  clear: () => void;
};

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      cars: [],

      addCar: (car) => {
        if (!car || !car.id) return;

        const cars = get().cars;

        if (cars.find((c) => c.id === car.id)) return;
        if (cars.length >= 3) return;

        set({
          cars: [...cars, car],
        });
      },

      removeCar: (id) => {
        set({
          cars: get().cars.filter((c) => c.id !== id),
        });
      },

      clear: () => set({ cars: [] }),
    }),
    {
      name: "compare-cars-storage",
    },
  ),
);
