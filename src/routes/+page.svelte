<script lang="ts">
  import Suggestion from "$lib/Suggestion.svelte";

  const { data } = $props();
  const { data: promise } = data;
</script>

<div class="suggestions-container">
  {#await promise}
    Loading suggestions...
  {:then { data: suggestions }}
    {#if suggestions}
      <div class="suggestions">
        {#each suggestions as suggestion}
          <Suggestion {...suggestion} />
        {/each}
      </div>
    {:else}
      <h2>No suggestions found</h2>
    {/if}
  {:catch error}
    <h2>An error occurred: {error}</h2>
  {/await}
</div>

<style>
  .suggestions-container {
    margin-block-start: 2rem;

    .suggestions {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
      width: 100%;
    }
  }
</style>
