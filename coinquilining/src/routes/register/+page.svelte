<script lang="ts">
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";
	import { user } from "$lib/schemas";

	export let data: PageData;

	const { form, errors, constraints, message, enhance, capture, restore } =
		superForm(data.form, {
			taintedMessage: null,
			validators: user,
		});
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<div class="flex flex-col items-center">
	<form method="post" use:enhance>
		<div class="form-control">
			<input
				bind:value={$form.email}
				name="email"
				type="email"
				placeholder="Email"
				{...$constraints.email}
			/>
			<input
				bind:value={$form.password}
				name="password"
				type="password"
				placeholder="Password"
				{...$constraints.password}
			/>
			<input
				bind:value={$form.name}
				name="name"
				type="text"
				placeholder="Name"
				{...$constraints.name}
			/>
			<input
				bind:value={$form.surname}
				name="surname"
				type="text"
				placeholder="Surname"
				{...$constraints.surname}
			/>
			<button>Register</button>
			{#each Object.entries($errors) as [err, message]}
				{#if message}
					<p>{err}</p>
					<p>--{message}</p>
				{/if}
			{/each}
		</div>
	</form>
	<!-- <pre>{JSON.stringify($page, null, 2)}</pre> -->
</div>
