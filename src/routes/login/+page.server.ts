import { redirect, type Actions } from "@sveltejs/kit";
import { dev } from "$app/environment";
const { Buffer } = await import("buffer/"); // note: the trailing slash is important!

const redirectTo = dev
  ? "http://localhost:5173/auth/callback"
  : "https://sa-suggestions.pages.dev/auth/callback";

export const actions: Actions = {
  github: async ({ locals: { supabase } }) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo,
      },
    });

    if (data.url) redirect(302, data.url);
    if (error) throw error;
  },
  scratch: async () => {
    const redirectLocation = Buffer.from(redirectTo).toString("base64");

    redirect(
      302,
      `https://auth.itinerary.eu.org/auth/?redirect=${redirectLocation}&name=Scratch Addons Suggestions`,
    );
  },
};
