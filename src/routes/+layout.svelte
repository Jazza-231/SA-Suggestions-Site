<script lang="ts">
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";
  import "../vars.css";
  import "../app.css";
  import Header from "$lib/Header.svelte";

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<Header />

<main>
  {@render children()}
</main>

<style>
  main {
    padding: 0.5rem;
  }
</style>
