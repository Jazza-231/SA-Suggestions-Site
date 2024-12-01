import { supabase } from "$lib/supabaseClient";
import type { PageServerLoad } from "./$types";
import type { Database } from "../../database.types";

export type Suggestion = Omit<
  Database["public"]["Tables"]["suggestions"]["Row"],
  "author" | "images"
> & {
  author: { id: string; username: string };
  images: { id: string; alt: string; url: string }[];
};

export const load = (async () => {
  const data = supabase.from("suggestions").select("*").returns<Suggestion[]>();
  return { data };
}) satisfies PageServerLoad;
