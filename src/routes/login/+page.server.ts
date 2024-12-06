import { redirect, type Actions } from "@sveltejs/kit";
import { dev } from "$app/environment";

export const actions: Actions = {
  github: async ({ locals: { supabase } }) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: dev
          ? "http://localhost:5173/auth/callback"
          : "https://sa-suggestions.pages.dev/auth/callback",
      },
    });

    if (data.url) redirect(302, data.url);

    console.log({ data, error });
  },
};
