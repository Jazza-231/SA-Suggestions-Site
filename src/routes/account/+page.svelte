<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  let { user } = data;
</script>

<h1>Account of {user?.identities?.[0].identity_data?.name}</h1>
