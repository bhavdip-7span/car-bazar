import { Suspense } from "react";
import CarsClient from "./car-client";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CarsClient />
    </Suspense>
  );
}
