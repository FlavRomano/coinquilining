<script lang="ts">
  import { goto } from "$app/navigation";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { firebaseAuth } from "$lib/firebase";
  import { authUser } from "$lib/authStore";

  let email: string;
  let password: string;
  let errorCode: string;
  let errorMessage: string;

  let success: boolean | undefined = undefined;

  const login = () => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        $authUser = {
          uid: userCredential.user.uid,
          email: userCredential.user.email || "",
        };
        goto("/");
      })
      .catch((error) => {
        errorCode = error.code;
        errorMessage = error.message;
        success = false;
      });
  };
</script>

<form
  class="w-4/5 flex flex-col gap-4 bg-white
    md:w-1/3 sm:w-10/12"
  on:submit|preventDefault={login}
>
  <input
    type="email"
    placeholder="Email"
    class="input input-bordered w-full"
    required
    bind:value={email}
  />

  <input
    type="password"
    placeholder="Password"
    class="input input-bordered w-full"
    required
    bind:value={password}
  />
  <button type="submit" class="default-action btn btn-primary">Login</button>
</form>

{#if !success && success !== undefined}
  <div class="w-4/5 alert alert-error md:w-1/3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      /></svg
    >
    <span>{errorMessage}</span>
  </div>
{/if}
