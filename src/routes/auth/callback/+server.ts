import { dev } from "$app/environment";
import { isRedirect, redirect } from "@sveltejs/kit";
import crypto from "crypto";

import { SCRATCH_AUTH_PASSWORD_SALT } from "$env/static/private";

const redirectTo = dev
  ? "http://localhost:5173/auth/callback"
  : "https://sa-suggestions.pages.dev/auth/callback";

function hashPassword(username: string, salt: string) {
  const initialHash = crypto
    .createHash("sha256")
    .update(username + salt)
    .digest("hex");

  return crypto.pbkdf2Sync(initialHash, salt, 10000, 32, "sha512").toString("hex").slice(0, 72);
}

export const GET = async (event) => {
  const {
    url,
    locals: { supabase },
  } = event;
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/";
  const privateCode = url.searchParams.get("privateCode");

  if (privateCode) {
    try {
      const response = await fetch(
        `https://auth.itinerary.eu.org/api/auth/verifyToken?privateCode=${privateCode}`,
      );
      const data = await response.json();

      if (data.valid && data.redirect === redirectTo) {
        const email = `sass-${data.username}@jazza.dev`;
        const password = hashPassword(data.username, SCRATCH_AUTH_PASSWORD_SALT);

        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                username: data.username,
              },
            },
          });

          if (signUpError) {
            console.error("Authentication error:", signUpError);
            redirect(302, "/auth/auth-code-error");
          }
        }

        redirect(307, `/${next.slice(1)}`);
      }

      redirect(302, "/auth/auth-code-error");
    } catch (error) {
      if (isRedirect(error) && error.status === 307) {
        redirect(302, error.location);
      } else {
        console.error("Authentication process error:", error);
        redirect(302, "/auth/auth-code-error");
      }
    }
  }

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      redirect(302, `/${next.slice(1)}`);
    }
  }

  // No valid authentication method found
  console.error("No valid authentication method found");
  redirect(302, "/auth/auth-code-error");
};
