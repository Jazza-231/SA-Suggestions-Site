import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_ANON_KEY, SUPABASE_PROJECT_ID } from "$env/static/public";
import type { Database } from "../../database.types";

export const supabase = createClient<Database>(
  `https://${SUPABASE_PROJECT_ID}.supabase.co`,
  PUBLIC_SUPABASE_ANON_KEY,
);
