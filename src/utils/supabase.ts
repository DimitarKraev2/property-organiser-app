import { createClient } from "@supabase/supabase-js";
import type { Property } from "../types";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export async function getProperties(): Promise<Property[]> {
  const { data, error } = await supabase.from("properties").select("*");
  if (error) throw error;
  return data;
}

export async function addNewProperty(property: Property) {
  const { error } = await supabase.from("properties").insert([property]);
  if (error) throw error;
}

export async function deletePropertyById(id: number) {
  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) throw error;
}

export async function updatePropertyInSupabase(id: number, updated: Partial<Property>) {
  const { error } = await supabase.from("properties").update(updated).eq("id", id);
  if (error) throw error;
}

export async function fetchPropertyFromUrl(sourceUrl: string): Promise<Partial<Property>> {
  const apiBaseUrl = "https://property-scraper-api-2.onrender.com";
  const response = await fetch(`${apiBaseUrl}/api/scrape?url=${encodeURIComponent(sourceUrl)}`);
  if (!response.ok) throw new Error("Failed to fetch property data");
  return response.json();
}
