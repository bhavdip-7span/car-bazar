import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Car } from "@/types/car";

type RecentViewStore = {
  recentCars: Car[];
  addRecentCar: (car: Car) => void;
  clearRecent: () => void;
};

export const useRecentViewStore = create<RecentViewStore>()(
  persist(
    (set, get) => ({
      recentCars: [],

      addRecentCar: (car) => {
        const current = get().recentCars;

        // remove duplicate
        const filtered = current.filter((c) => c.id !== car.id);

        const updated = [car, ...filtered];

        set({ recentCars: updated.slice(0, 5) });
      },

      clearRecent: () => set({ recentCars: [] }),
    }),
    {
      name: "recent-view-cars",
    },
  ),
);
