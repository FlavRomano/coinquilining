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

<div class="flex flex-col items-center border-opacity-50">
	<div class="grid h-20 card rounded-box place-items-center">
		<form method="post" use:enhance>
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<div class="form-control join-vertical gap-4">
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
				<input
					bind:value={$form.name}
					class="input input-bordered w-full max-w-xs join-item"
					name="name"
					type="text"
					placeholder="Name"
					{...$constraints.name}
				/>
				<input
					bind:value={$form.surname}
					class="input input-bordered w-full max-w-xs join-item"
					name="surname"
					type="text"
					placeholder="Surname"
					{...$constraints.surname}
				/>
				<button class="btn join-item btn-primary">Register</button>
			</div>
			<div class="divider">OR</div>
		</form>
		<div class="prose">
			<p>Click <a href="/login">here</a> to login</p>
		</div>
	</div>
	<!-- <pre>{JSON.stringify($page, null, 2)}</pre> -->
</div>
