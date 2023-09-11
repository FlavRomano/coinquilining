<script lang="ts">
  import "../app.css";
  import Navbar from "../components/Navbar.svelte";
  import { authStore, firebaseAuth } from "$lib/firebase";
  import { onDestroy, onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { onAuthStateChanged } from "firebase/auth";

  onMount(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        console.log("Logged in ", user);
      } else {
        console.log("Logged out");
        goto("/Signup");
      }
    });
  });

  let isLoggedIn: Boolean;

  let unsubscribe = authStore.subscribe((v) => (isLoggedIn = v));

  onDestroy(unsubscribe);
</script>

{#if isLoggedIn}
  <Navbar />
  <slot />
{:else}
  <slot />
{/if}
