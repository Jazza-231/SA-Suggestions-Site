import { supabase } from "$lib/supabaseClient";
import type { PageServerLoad } from "./$types";
import type { Database } from "../../database.types";

type Row = Database["public"]["Tables"]["suggestions"]["Row"];
type Suggestions = Omit<Row, "author" | "images"> & {
  author: { id: string; username: string };
  images: { id: string; alt: string; url: string }[];
};

export const load = (async () => {
  const { data } = await supabase.from("suggestions").select("*").returns<Suggestions[]>();

  return { suggestions: data || [] };
}) satisfies PageServerLoad;
