<script lang="ts">
  import type { Suggestion } from "../routes/+page.server";
  import potat from "$lib/images/Potat.svg";

  const { title, description, type, tags, votes, author, createdAt, images }: Suggestion = $props();
</script>

<div class="suggestion">
  <div class="left">
    <div class="title">
      <h2>{title}</h2>
    </div>

    <div class="author">
      <span class="author-name">{author.username}</span>
      <span class="author-date">{new Date(createdAt).toLocaleDateString()}</span>
    </div>

    {#if tags}
      <div class="tags">
        {#each tags as tag}
          <span class="tag">{tag}</span>
        {/each}
      </div>
    {/if}

    <div class="description">
      <p>{description}</p>
    </div>

    <div class="votes">
      <span class="votes-count">{votes}</span>
      <img src={potat} alt="potat" />
    </div>
  </div>

  <div class="images">
    {#each images as image}
      <img src={image.url} alt={image.alt} />
    {/each}
  </div>
</div>

<style>
  .suggestion {
    background-color: var(--surface1);
    transition: background-color 200ms;
    padding: 1rem;
    border-radius: 1rem;
    width: 90%;
    display: flex;
    justify-content: space-between;

    .title {
      h2 {
        margin-block-end: 0;
      }
    }

    .votes {
      display: flex;
      align-items: center;
      gap: 0.3rem;

      .votes-count {
        font-size: 1.5rem;
      }
      img {
        width: 1rem;
      }
    }
  }
</style>
