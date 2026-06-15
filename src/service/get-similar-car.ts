import { supabase } from "@/lib/supabase";
import { Car } from "@/types/car";
export async function getSimilarCars(car: Car, slug: string) {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("body_type", car.body_type)
    .gte("original_price", car.original_price - 300000)
    .lte("original_price", car.original_price + 300000)
    .neq("slug", slug)
    .limit(8);

  if (error || !data) {
    throw new Error("CAR_NOT_FOUND");
  }

  return data ?? null;
}
