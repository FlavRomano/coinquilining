<script lang="ts">
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";
	import { user } from "$lib/schemas";
	import { writable } from "svelte/store";

	let userInputStore = writable([{ name: "user1", id: 1 }]);

	function addUserToStore() {
		let lastId = $userInputStore[$userInputStore.length - 1].id;
		if (lastId < 6) {
			$userInputStore = [
				...$userInputStore,
				{ name: `user${++lastId}`, id: lastId },
			];
		}
	}

	function removeUserToStore() {
		let lastId = $userInputStore[$userInputStore.length - 1].id;
		if (lastId !== 1) {
			$userInputStore = [
				...$userInputStore.filter((obj) => obj.id !== lastId),
			];
		}
	}

	export let data: PageData;
</script>

<svelte:head>
	<title>House Creation</title>
</svelte:head>
<div class="flex flex-col items-center border-opacity-50">
	<div class="grid h-20 card rounded-box place-items-center">
		<div class="prose">
			<form method="post" name="homeForm">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<div class="form-control join-vertical flex flex-col gap-4">
					<div class="grid grid-cols-2 content-center">
						<button
							type="button"
							class="btn btn-sm btn-outline btn-info"
							on:click={addUserToStore}>+</button
						>
						<button
							type="button"
							class="btn btn-sm btn-outline btn-warning"
							on:click={removeUserToStore}>-</button
						>
					</div>
					<input
						class="input input-bordered w-full max-w-xs join-item"
						name="houseName"
						type="text"
						placeholder="House name"
						required
					/>
					{#each $userInputStore as user}
						<input
							class="input input-bordered w-full max-w-xs join-item"
							name={user.name}
							id={user.id.toString()}
							type="email"
							placeholder={`Mate ${user.id} email`}
						/>
					{/each}

					<button class="btn join-item btn-primary"
						>Create House</button
					>
				</div>
				<div class="divider">OR</div>
			</form>
			<p>
				Click <button
					on:click={() =>
						document.getElementById("modalHouseCode")?.showModal()}
					><u><b>here</b></u></button
				> to enter in an existing house
			</p>
			<dialog id="modalHouseCode" class="modal">
				<div class="modal-box">
					<h3 class="font-bold text-lg">Enter an house code</h3>
					<br />
					<div class="flex flex-col items-center">
						<input
							class="input input-bordered input-secondary w-full max-w-xs"
							type="text"
							name="houseCode"
							placeholder="House code"
							required
						/>
					</div>
					<div class="modal-action">
						<form method="dialog">
							<button class="btn">Close</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	</div>
	<!-- <pre>{JSON.stringify($page, null, 2)}</pre> -->
</div>
