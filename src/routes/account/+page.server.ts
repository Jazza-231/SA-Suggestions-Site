import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  logout: async ({ locals: { supabase } }) => {
    await supabase.auth.signOut();
    return redirect(302, "/");
  },
};
