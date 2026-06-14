import { supabase } from "@/lib/supabase";

export async function getFeaturedCar(badge: string) {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("badge", badge);

  if (error || !data) {
    console.log("CAR_NOT_FOUND");
  }

  return data ?? null;
}
