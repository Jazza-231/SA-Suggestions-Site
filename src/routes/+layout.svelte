<script lang="ts">
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";
  import "../vars.css";
  import "../app.css";
  import Header from "./Header.svelte";
  import { invalidate } from "$app/navigation";

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
  let { session, supabase } = $derived(data);

  $effect(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => data.subscription.unsubscribe();
  });
</script>

<Header {session} />

<main>
  {@render children()}
</main>

<style>
  main {
    padding: 0.5rem;
  }
</style>
