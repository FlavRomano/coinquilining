<script lang="ts">
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";

	import { loginSchema } from "$lib/schemas";

	export let data: PageData;

	const { form, constraints, message, enhance } = superForm(data.form, {
		taintedMessage: null,
		validators: loginSchema,
	});
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="flex flex-col items-center border-opacity-50">
	<div class="grid h-20 card rounded-box place-items-center">
		<form
			class="form-control join-vertical gap-4"
			method="post"
			use:enhance
		>
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<input
				bind:value={$form.email}
				class="input input-bordered w-full max-w-xs join-item"
				name="email"
				type="email"
				placeholder="Email"
				{...$constraints.email}
			/>
			<input
				bind:value={$form.password}
				class="input input-bordered w-full max-w-xs join-item"
				name="password"
				type="password"
				placeholder="Password"
				{...$constraints.password}
			/>
			<button class="btn join-item btn-accent">Login</button>

			<div class="divider">OR</div>
		</form>
		<div class="prose">
			<p>Click <a href="/register">here</a> to register</p>
		</div>
		{#if $message}
			<div class="alert alert-error w-full mt-4">
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
				<span>Invalid login credentials</span>
			</div>
		{/if}
	</div>
</div>
