import { supabase } from "@/lib/supabase";

export async function getCarBySlug(slug: string) {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.log("CAR_NOT_FOUND");
  }

  return data ?? null;
}
