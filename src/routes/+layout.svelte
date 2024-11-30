<script lang="ts">
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";
  import "../vars.css";
  import "../app.css";
  import { Moon, Sun, Load } from "$lib/icons";

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let flag = { first: false, allButFirst: false };
  let theme: "dark" | "light" = $state()!;

  let ThemeToggle = $state(Load);

  $effect(() => {
    if (!flag.first) {
      theme = document.documentElement.dataset.theme as typeof theme;

      const userPrefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const userSetManually = document.documentElement.dataset.theme !== "";
      if (!userSetManually) {
        setTheme(userPrefersDarkMode ? "dark" : "light");
      }

      setTimeout(() => {
        ThemeToggle = theme === "dark" ? Sun : Moon;
      }, 1000);
    }
    flag.first = true;
  });

  $effect(() => {
    theme;

    if (flag.allButFirst) {
      ThemeToggle = theme === "dark" ? Sun : Moon;
    }
    flag.allButFirst = true;
  });

  function setTheme(themeTo: "dark" | "light") {
    theme = themeTo;
    document.documentElement.dataset.theme = themeTo;
    document.cookie = `siteTheme=${themeTo};max-age=31536000;path="/"`;
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }
</script>

<header>
  <nav>
    <a href="/" class="icon">
      <img src="/icon.svg" alt="Scratch Addons" />
      <span>Scratch Addons Suggestions</span>
    </a>

    <button class="theme-toggle" onclick={toggleTheme} class:spin={ThemeToggle === Load}>
      <ThemeToggle />
    </button>
  </nav>
</header>

<main>
  {@render children()}
</main>

<style>
  nav {
    background-color: var(--header);
    transition: background-color 200ms;
    height: 3.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .icon {
      display: inline-flex;
      align-items: center;
      color: var(--text-on-brand);
      text-decoration: none;
      margin: 0.1rem;

      img {
        margin: 0.1rem 0 0 0.1rem;
        height: 3.25rem;
        width: auto;
      }

      span {
        font-size: 1.2rem;
      }
    }
  }

  .theme-toggle {
    background-color: var(--header);
    transition: background-color 200ms;
    border: none;
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 0.3rem;
    display: flex;
    justify-content: center;
    align-items: center;

    :global {
      svg {
        height: 1.5rem;
        width: 1.5rem;
        path {
          fill: white;
          transition: fill 200ms;
        }
      }
    }

    &:hover:not(.spin) {
      background-color: white;

      :global {
        svg {
          path {
            fill: black;
          }
        }
      }
    }

    :global(&.spin) {
      animation: spin 1s linear infinite;
    }
  }

  main {
    padding: 0.5rem;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
