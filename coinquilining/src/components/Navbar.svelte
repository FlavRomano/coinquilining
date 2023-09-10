<script lang="ts">
  let isLoggedIn = false;
</script>

<div class="navbar bg-base-100 pb-5">
  <div class="navbar-start">
    <div class="dropdown">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label tabindex="-1" class="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16"
          /></svg
        >
      </label>
      <ul
        tabindex="-1"
        class="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li><a href="/House">House</a></li>
        <li>
          <a href="/Food">Food</a>
        </li>
        <li><a href="/Shopping">Shopping</a></li>
      </ul>
    </div>
    <a class="btn btn-ghost normal-case text-xl" href="/">coinquilining</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li><a href="/House">House</a></li>
      <li><a href="/Food">Food</a></li>
      <li><a href="Shopping">Shopping</a></li>
    </ul>
  </div>
  <div class="navbar-end">
    {#if isLoggedIn}
      <a class="btn">Account</a>
    {:else}
      <a class="btn">Signup</a>
    {/if}
  </div>
</div>
