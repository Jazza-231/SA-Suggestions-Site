<script lang="ts">
  import { browser } from "$app/environment";
  import { Sun, Moon } from "$lib/icons";

  let theme: "dark" | "light" = $state()!;
  let setTheme: Function = $state()!;

  if (browser) {
    theme = localStorage.theme;

    setTheme = function (themeTo: "dark" | "light") {
      theme = themeTo;
      document.documentElement.dataset.theme = themeTo;
      localStorage.theme = themeTo;
    };
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

    <button class="theme-toggle" onclick={toggleTheme}>
      <div class="sun">
        <Sun />
      </div>
      <div class="moon">
        <Moon />
      </div>
    </button>
  </nav>
</header>

<style>
  :global {
    :root {
      .sun {
        display: none;
      }

      .moon {
        display: block;
      }
    }
    :root[data-theme="dark"] {
      .sun {
        display: block;
      }
      .moon {
        display: none;
      }
    }
  }

  nav {
    background-color: var(--header);
    transition:
      background-color 200ms,
      box-shadow 200ms;
    height: 3.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: var(--header-drop-shadow);

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
          fill: var(--header-theme-toggle-fill);
          transition: fill 200ms;
        }
      }
    }

    &:hover {
      background-color: color-mix(in srgb, white, transparent 50%);

      :global {
        svg {
          path {
            fill: black;
          }
        }
      }
    }
  }
</style>
