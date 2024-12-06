import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  github: async ({ locals: { supabase } }) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:5173/auth/callback/",
      },
    });

    if (data.url) redirect(302, data.url);

    console.log({ data, error });
  },
};
