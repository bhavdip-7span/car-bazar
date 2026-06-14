import { supabase } from "@/lib/supabase";

export async function getCars() {
  const { data, error } = await supabase.from("cars").select("slug");

  if (error) {
    console.error("Error fetching cars:", error);
    return [];
  }

  return data;
}
