<script lang="ts">
	import { changeNameSchema } from "$types/lib/schemas";
	import { superForm } from "sveltekit-superforms/client";

	export let data;

	const { firstname, lastname } = data.user;

	const { form, constraints, message, enhance } = superForm(
		data?.changeNameForm,
		{
			taintedMessage: null,
			validators: changeNameSchema,
		}
	);
</script>

<div class="prose prose-xl">
	<div class="flex flex-col place-items-start lg:pt-12">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<span>Firstname: {firstname} <br /> Lastname: {lastname}</span>
		<form
			method="POST"
			action="?/changeName"
			class="join join-vertical gap-4"
		>
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<div class="join-item">
				<label class="label">
					<span class="label-text">New Firstname</span>
				</label>
				<input
					bind:value={$form.firstname}
					type="text"
					placeholder="Firstname"
					name="firstname"
					class="input input-bordered w-full max-w-full"
					{...$constraints.firstname}
				/>
				<label class="label">
					<span class="label-text">New Lastname</span>
				</label>
				<input
					bind:value={$form.lastname}
					type="text"
					placeholder="Lastname"
					name="lastname"
					class="input input-bordered w-full max-w-full"
					{...$constraints.lastname}
				/>
			</div>

			<button class="btn btn-primary w-full max-w-full">CHANGE</button>
		</form>
	</div>
</div>
