<script lang="ts">
	import { changeNameSchema } from "$types/lib/schemas";
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "../../../routes/(protected)/settings/$types";
	export let data: PageData;

	const { firstname, lastname } = data.user;

	const { form, constraints, message, enhance } = superForm(
		data?.changeNameForm,
		{
			taintedMessage: null,
			validators: changeNameSchema,
		}
	);
</script>

<div class="prose prose-xl w-full grid lg:grid-cols-2">
	<div>
		<h3>Current</h3>
		<ul class="list-none whitespace-nowrap pl-0">
			<li>Firstname: {firstname}</li>
			<li>Lastname: {lastname}</li>
		</ul>
	</div>
	<div class="lg:pt-12">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<form
			method="POST"
			action="?/changeName"
			class="join join-vertical gap-4"
		>
			<div class="join-item">
				<label class="label">
					<span class="label-text">New Firstname</span>
				</label>
				<input
					bind:value={$form.firstname}
					type="text"
					placeholder="Firstname"
					name="firstname"
					class="input input-bordered lg:w-80"
					{...$constraints.firstname}
				/>
			</div>

			<div class="join-item">
				<label class="label">
					<span class="label-text">New Lastname</span>
				</label>
				<input
					bind:value={$form.lastname}
					type="text"
					placeholder="Lastname"
					name="lastname"
					class="input input-bordered lg:w-80"
					{...$constraints.lastname}
				/>
			</div>

			<button class="btn btn-primary lg:w-80">CHANGE</button>
		</form>
	</div>
</div>
