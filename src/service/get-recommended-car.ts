import { supabase } from "@/lib/supabase";
import { Car } from "@/types/car";

export async function getRecommendedCars(car: Car, slug: string) {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .lt("original_price", car.original_price + 200000)
    .gt("original_price", car.original_price - 200000)
    .neq("slug", slug)
    .limit(8);

  if (error || !data) {
    throw new Error("CAR_NOT_FOUND");
  }

  return data ?? null;
}
