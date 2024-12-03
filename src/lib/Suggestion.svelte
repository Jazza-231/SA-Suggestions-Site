<script lang="ts">
  import type { Suggestion } from "../routes/+page.server";
  import potat from "$lib/images/Potat.svg";
  import { fly } from "svelte/transition";

  const {
    title,
    description,
    type,
    tags,
    votes,
    author,
    createdAt,
    images,
    index,
  }: Suggestion & { index: number } = $props();
</script>

<div class="suggestion" transition:fly|global={{ duration: 400, y: 100, delay: index * 100 }}>
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
      <img src={potat} alt="potat" />
      {#if votes}
        <span class="votes-count">{votes}</span>
      {/if}
    </div>
  </div>

  {#if images}
    <div class="images">
      <img
        src={images[0].url}
        alt={images[0].alt}
        onload={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.opacity = "1";
        }}
      />
    </div>
  {/if}
</div>

<style>
  .suggestion {
    background-color: var(--surface1);
    transition:
      background-color 200ms,
      transform 200ms,
      box-shadow 200ms;
    padding: 1rem;
    border-radius: 1rem;
    width: 60%;
    display: flex;
    justify-content: space-between;
    user-select: none;
    cursor: pointer;
    box-shadow: 0 0 1rem 0.1rem rgba(0, 0, 0, 0.3);

    &:hover {
      transform: translateY(-0.2rem);
      z-index: 1;
      box-shadow: 0 0.5rem 1rem 0.1rem rgba(0, 0, 0, 0.3);
    }

    @media (width <= 768px) {
      flex-direction: column;
    }

    .title {
      h2 {
        margin-block-end: 0;
        margin-block-start: 0.5rem;
        font-size: 1.3rem;
      }
    }

    .author {
      .author-date {
        font-size: 0.8rem;
        margin-left: 0.3rem;
      }
    }

    .tags {
      font-size: 0.8rem;
      display: flex;
      gap: 0.4rem;
      margin-block-start: 0.4rem;
      align-items: center;

      .tag {
        background-color: var(--surface2);
        transition: background-color 200ms;
        /* Something I don't like is having to set an arbitrary size to get a pill shape, using percentages does not apply consistent rounding*/
        border-radius: 1rem;
        padding: 0.25rem 0.35rem;
      }
    }

    .votes {
      display: flex;
      width: fit-content;
      min-width: 2rem;
      padding: 0.5rem;
      align-items: center;
      justify-content: center;
      border-radius: 1rem;
      gap: 0.3rem;
      background-color: var(--surface2);
      transition:
        background-color 200ms,
        border 200ms;
      border: transparent 1px solid;

      &:hover {
        border: color-mix(in srgb, var(--text) 80%, transparent) 1px solid;
      }

      .votes-count {
        font-size: 1.1rem;
      }

      img {
        align-self: flex-end;
        position: relative;
        bottom: 2px;
        width: 1rem;
      }
    }

    .images {
      margin-left: 1rem;
      display: flex;
      align-items: center;
      justify-content: end;
      min-width: 15rem;

      @media (width <= 768px) {
        margin-left: 0;
        margin-block-start: 1.5rem;
      }
      img {
        width: auto;
        max-width: 15rem;
        height: auto;
        max-height: 15rem;
        border-radius: 0.6rem;
        opacity: 0;
        transition: opacity 200ms;
      }
    }
  }
</style>
