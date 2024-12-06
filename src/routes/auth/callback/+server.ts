import { dev } from "$app/environment";
import { redirect } from "@sveltejs/kit";

import { SCRATCH_AUTH_PASSWORD_SALT } from "$env/static/private";

const redirectTo = dev
  ? "http://localhost:5173/auth/callback"
  : "https://sa-suggestions.pages.dev/auth/callback";

async function hashPassword(username: string, salt: string) {
  const initialHash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(username + salt),
  );
  const initialHashHex = Array.from(new Uint8Array(initialHash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(salt),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"],
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: new TextEncoder().encode(salt),
      iterations: 10000,
      hash: "SHA-512",
    },
    keyMaterial,
    { name: "HMAC", hash: "SHA-512", length: 256 },
    false,
    ["sign"],
  );

  const passwordBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(initialHashHex),
  );
  return Array.from(new Uint8Array(passwordBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 72);
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
    const response = await fetch(
      `https://auth.itinerary.eu.org/api/auth/verifyToken?privateCode=${privateCode}`,
    );
    const data = await response.json();

    if (data.valid && data.redirect === redirectTo) {
      const email = `sass-${data.username}@jazza.dev`;
      const password = await hashPassword(data.username, SCRATCH_AUTH_PASSWORD_SALT);

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
