<script lang="ts">
  import Login from "../../components/Login.svelte";
  import Register from "../../components/Register.svelte";

  let tabActive = false;
</script>

<div class="grid place-items-center grid-rows-3 grid-flow-row-dense">
  <div class="tabs tabs-boxed">
    <a
      class="tab {!tabActive ? 'tab-active' : ''}"
      on:click={() => (tabActive = !tabActive)}>Login</a
    >
    <a
      class="tab {tabActive ? 'tab-active' : ''}"
      on:click={() => (tabActive = !tabActive)}>Signup</a
    >
  </div>
  {#if tabActive}
    <Register />
  {:else}
    <Login />
  {/if}
  <div />
</div>
