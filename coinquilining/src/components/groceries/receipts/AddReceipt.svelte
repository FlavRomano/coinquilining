<script lang="ts">
	import { writable } from "svelte/store";

	export let roommates;
	const splitWithSomeone = writable(true);
</script>

<div class="fixed bottom-[15%] left-[80%] sm:left-[50%] translate-x-[-50%]">
	<button
		class="btn btn-circle btn-lg sm:rounded-xl sm:btn-wide btn-primary animate-none"
		on:click={() => document.getElementById("addOutgoing").showModal()}
		>ADD RECEIPT</button
	>
</div>

<dialog id="addOutgoing" class="modal">
	<div class="modal-box max-w-xs">
		<form action="?/add" method="post" class="form-control gap-2">
			<input
				minlength="4"
				maxlength="32"
				type="text"
				name="title"
				class="input input-bordered w-full"
				placeholder="Title"
				required
			/>
			<input
				type="number"
				step="0.01"
				name="price"
				class="input input-bordered w-full"
				placeholder="Price"
				required
			/>

			<label class="label cursor-pointer">
				<span class="label-text">Split with someone</span>
				<input
					type="checkbox"
					class="toggle"
					bind:checked={$splitWithSomeone}
				/>
			</label>
			{#if $splitWithSomeone}
				<ul>
					{#each roommates as roommate}
						<li>
							<label class="label cursor-pointer">
								<span class="label-text"
									>{roommate.firstname +
										" " +
										roommate.lastname}</span
								>
								<input
									type="checkbox"
									checked={false}
									class="checkbox"
									required
								/>
							</label>
						</li>
					{/each}
				</ul>
			{/if}
			<button class="btn btn-primary w-full">ADD</button>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
