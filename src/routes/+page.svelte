<script lang="ts">
  import Load from "$lib/icons/Load.svelte";
  import Suggestion from "$lib/Suggestion.svelte";
  import { fade } from "svelte/transition";

  const { data } = $props();
  const { suggestions: query } = data;
</script>

<div class="suggestions-container">
  {#await query}
    <div class="loading" in:fade|global={{ duration: 200 }} out:fade|global={{ duration: 200 }}>
      <Load />
    </div>
  {:then { data: suggestions }}
    {#if suggestions}
      <div class="suggestions">
        {#each suggestions as suggestion, index}
          <Suggestion {...suggestion} {index} length={suggestions.length} />
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

    .loading {
      display: flex;
      justify-content: center;
      height: 0px;

      /* Note: :global {svg {}} does not work in this case, it must be :global(svg) {} */
      :global(svg) {
        height: 3rem;
        width: 3rem;
        animation: spinner 1s linear infinite;

        :global(path) {
          fill: var(--brand);
        }
      }
    }

    .suggestions {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
      width: 100%;
    }
  }

  @keyframes spinner {
    0% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
</style>
