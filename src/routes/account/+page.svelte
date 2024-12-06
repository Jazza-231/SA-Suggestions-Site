<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  let { user } = $derived(data);
</script>

<div class="account">
  <h1>Account of {user?.user_metadata?.name || user?.user_metadata?.username}</h1>

  <form action="?/logout" method="POST">
    <button type="submit">Logout</button>
  </form>
</div>

<style>
  .account {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
