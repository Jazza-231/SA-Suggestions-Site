<script lang="ts">
  import Suggestion from "$lib/Suggestion.svelte";

  const { data } = $props();
  const { suggestions } = data;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div class="suggestions">
  {#each suggestions as suggestion}
    <Suggestion {...suggestion} />
  {/each}
</div>

<style>
  .suggestions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
</style>
