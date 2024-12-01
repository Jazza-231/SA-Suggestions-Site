import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_PROJECT_ID } from "$env/static/private";
import type { Database } from "../../database.types";

export const supabase = createClient<Database>(
  `https://${SUPABASE_PROJECT_ID}.supabase.co`,
  SUPABASE_ANON_KEY,
);
