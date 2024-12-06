import { dev } from "$app/environment";
import { redirect } from "@sveltejs/kit";
import crypto from "crypto";

import { SCRATCH_AUTH_PASSWORD_SALT } from "$env/static/private";

const redirectTo = dev
  ? "http://localhost:5173/auth/callback"
  : "https://sa-suggestions.pages.dev/auth/callback";

function hashPassword(username: string, salt: string) {
  return crypto.pbkdf2Sync(username, salt, 10000, 64, "sha512").toString("hex");
}

export const GET = async (event) => {
  const {
    url,
    locals: { supabase },
  } = event;
  const code = url.searchParams.get("code") as string;
  const next = url.searchParams.get("next") ?? "/";
  console.log("🚀 ~ GET ~ next:", next);
  const privateCode = url.searchParams.get("privateCode") as string;

  if (privateCode) {
    console.log("🚀 ~ GET ~ privateCode:", privateCode);

    fetch(`https://auth.itinerary.eu.org/api/auth/verifyToken?privateCode=${privateCode}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(async (data) => {
        console.log("🚀 ~ .then ~ data:", data);

        if (data.valid && data.redirect === redirectTo) {
          const email = `sass-${data.username}@jazza.dev`;
          const password = hashPassword(data.username, SCRATCH_AUTH_PASSWORD_SALT);

          let { error } = await supabase.auth.signInWithPassword({ email, password });

          if (!error) throw redirect(302, "/");

          ({ error } = await supabase.auth.signUp({ email, password }));

          if (!error) throw redirect(302, "/");

          throw redirect(302, "/auth/auth-code-error");
        }
      });
  }

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      throw redirect(302, `/${next.slice(1)}`);
    }
  }

  throw redirect(302, "/auth/auth-code-error");
};
