import { supabase } from "@/lib/supabase";

export async function getCarBySlug(slug: string) {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    return null;
  }

  return data;
}
