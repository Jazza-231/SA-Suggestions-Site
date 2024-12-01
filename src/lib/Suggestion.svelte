<script lang="ts">
  import type { PageData } from "../routes/$types";
  type Suggestion = PageData["suggestions"][number];

  const data: Suggestion = $props();
</script>

<div class="suggestions">
  <h2>{data.title}</h2>
  <sub>{data.author.username}</sub>
</div>

<style>
  .suggestions {
    display: flex;
    flex-direction: column;
    align-items: start;
    background-color: color-mix(in srgb, var(--background), var(--text) 5%);
    transition: background-color 200ms;
    border-radius: 1rem;
    width: 80%;
    padding: 0 1.5rem;

    h2 {
      margin-block-end: 0.3rem;
    }

    sub {
      margin-block-end: 1rem;
    }
  }
</style>
