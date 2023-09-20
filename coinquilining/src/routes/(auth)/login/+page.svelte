<script lang="ts">
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";

	import { loginSchema } from "$lib/schemas";

	export let data: PageData;

	const { form, errors, constraints, message, enhance, capture, restore } =
		superForm(data.form, {
			taintedMessage: null,
			validators: loginSchema,
		});
</script>

<svelte:head>
	<title>Login</title>
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
				<button class="btn join-item btn-accent">Login</button>
			</div>
			<div class="divider">OR</div>
		</form>
		<div class="prose">
			<p>Click <a href="/register">here</a> to register</p>
		</div>
	</div>
	<!-- <pre>{JSON.stringify($page, null, 2)}</pre> -->
</div>
