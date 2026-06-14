import { supabase } from "@/lib/supabase";

export async function getFilter() {
  const { data, error } = await supabase.from("cars").select("*");

  if (error || !data) {
    console.log("CAR_NOT_FOUND");
  }

  return data ?? null;
}
