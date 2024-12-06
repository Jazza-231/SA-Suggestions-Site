import { supabase } from "$lib/supabaseClient";
import type { PageServerLoad } from "./$types";
import type { Database } from "../../database.types";

type author = { id: string; username: string };
type images = { id: string; alt: string; url: string }[] | null;
type type = "bug" | "improvement" | "new";
type status = "pending" | "good" | "done" | "in-progress" | "rejected";
type tags = ("editor" | "website")[] | string[];

export type Suggestion = Omit<
  Database["public"]["Tables"]["suggestions"]["Row"],
  "author" | "images"
> & { author: author } & { images: images } & { type: type } & { status: status } & { tags: tags };

export const load = (async () => {
  const query = (async () =>
    await supabase
      .from("suggestions")
      .select("*")
      .order("createdAt", { ascending: false })
      .returns<Suggestion[]>())();

  query.catch((error) => {
    console.error(error);
  });

  return { suggestions: query };
}) satisfies PageServerLoad;
