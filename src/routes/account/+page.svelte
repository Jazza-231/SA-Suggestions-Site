<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  let { user } = $derived(data);
</script>

<div class="account">
  <h1>Account of {user?.user_metadata?.name || user?.user_metadata?.username}</h1>
</div>

<style>
  .account {
    display: flex;
    justify-content: center;
  }
</style>
