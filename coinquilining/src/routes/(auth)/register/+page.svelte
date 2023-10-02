<script lang="ts">
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";
	import { houseSchema, user } from "$lib/schemas";
	import { nanoid } from "nanoid";
	import { fade } from "svelte/transition";

	export let data: PageData;
	let nextPage = false;

	let houseCode = nanoid(9);
	let insertingHouseCode = false;

	const {
		form: registration_form,
		errors: registration_errors,
		constraints: registration_constraints,
		message: registration_message,
		enhance: registration_enhance,
		capture: registration_capture,
		restore: registration_restore,
		allErrors: registration_allErrors,
	} = superForm(data.registrationForm, {
		taintedMessage: null,
		validators: user,
		resetForm: true,
	});

	const {
		form: house_form,
		errors: house_errors,
		constraints: house_constraints,
		message: house_message,
		enhance: house_enhance,
		capture: house_capture,
		restore: house_restore,
		allErrors: house_allErrors,
	} = superForm(data.houseForm, {
		taintedMessage: null,
		validators: houseSchema,
	});

	$: if (!$house_form.enteringExistingHouse) {
		$house_form.code = houseCode;
	} else {
		$house_form.name = "";
	}

	$: if ($registration_allErrors.length != 0) {
		nextPage = false;
	}
</script>

<svelte:head>
	<title>{nextPage ? "House creation" : "Registration"}</title>
</svelte:head>
<div class="flex flex-col items-center border-opacity-50">
	{#if !nextPage}
		<ul class="steps">
			<li class="step step-primary">Credentials</li>
			<li class="step">House</li>
		</ul>
		<div class="pt-5 grid h-20 card rounded-box place-items-center">
			<form
				method="post"
				action="/register?/userSection"
				use:registration_enhance
				on:submit={() => (nextPage = !nextPage)}
			>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<div class="form-control join-vertical gap-4">
					<input
						bind:value={$registration_form.email}
						class="input input-bordered w-full max-w-xs join-item"
						name="email"
						type="email"
						placeholder="Email"
						{...$registration_constraints.email}
					/>

					<input
						bind:value={$registration_form.password}
						class="input input-bordered w-full max-w-xs join-item"
						name="password"
						type="password"
						placeholder="Password"
						{...$registration_constraints.password}
					/>
					<input
						bind:value={$registration_form.firstname}
						class="input input-bordered w-full max-w-xs join-item"
						name="firstname"
						type="text"
						placeholder="Name"
						{...$registration_constraints.firstname}
					/>
					<input
						bind:value={$registration_form.lastname}
						class="input input-bordered w-full max-w-xs join-item"
						name="lastname"
						type="text"
						placeholder="Surname"
						{...$registration_constraints.lastname}
					/>
					<button class="btn join-item btn-outline"> NEXT</button>
				</div>
				<div class="divider">OR</div>
			</form>
			<div class="prose">
				<p>Click <a href="/login">here</a> to login</p>
			</div>
			{#if $registration_allErrors.length}
				<ul>
					{#each $registration_allErrors as error}
						<li>
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
								<span>{error.messages.join(". ")} </span>
							</div>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{:else}
		<ul class="steps">
			<li class="step step-primary">Credentials</li>
			<li class="step step-primary">House</li>
		</ul>
		<div class="pt-5 prose">
			<form
				method="post"
				action="/register?/houseSection"
				use:house_enhance
			>
				<button
					type="button"
					on:click={() => (nextPage = !nextPage)}
					class="join-item btn btn-sm btn-outline w-1/2">BACK</button
				>
				<div class="form-control w-60 join-vertical gap-4">
					<label class="label cursor-pointer pt-6">
						<span class="label-text"
							>Enter in an existing house</span
						>
						<input
							bind:checked={$house_form.enteringExistingHouse}
							type="checkbox"
							class="checkbox"
							name="enteringExistingHouse"
							on:click={() =>
								(insertingHouseCode = !insertingHouseCode)}
						/>
					</label>

					{#if !insertingHouseCode}
						<input
							bind:value={$house_form.name}
							class="input input-bordered input-primary max-w-xs join-item"
							type="text"
							name="name"
							placeholder="House name"
							{...$house_constraints.name}
						/>
					{:else}
						<input value="NONAME" type="text" name="name" hidden />
					{/if}

					{#if !insertingHouseCode}
						<input
							value={$house_form.code}
							type="text"
							name="code"
							hidden
						/>
						<label
							><span>Click to copy on clipboard:</span><button
								on:click={async () => {
									await navigator.clipboard.writeText(
										houseCode
									);
									alert("Copied to clipboard");
								}}
								class="input input-bordered w-full max-w-xs join-item"
								type="button"><b>{houseCode}</b></button
							></label
						>
					{:else}
						<label>
							<span>Insert a valid house code:</span>
							<input
								bind:value={$house_form.code}
								class="input input-bordered input-primary w-full max-w-xs join-item"
								type="text"
								name="code"
								placeholder="House code"
								{...$house_constraints.code}
							/>
						</label>
					{/if}

					<button type="submit" class="btn join-item btn-primary"
						>Create House</button
					>
					{#if $house_allErrors.length}
						<ul>
							{#each $house_allErrors as error}
								<li>
									<div
										class="alert alert-error w-full mt-4"
										transition:fade
									>
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
										<span
											>{error.messages.join(". ")}
										</span>
									</div>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			</form>
		</div>
	{/if}
</div>
