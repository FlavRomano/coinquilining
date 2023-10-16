<script lang="ts">
	import { writable } from "svelte/store";

	export let roommates: {
		id: string;
		firstname: string;
		lastname: string;
		amount: Number;
	}[];
	export let userId;
	const splitWithSomeone = writable(true);
</script>

<button
	class="btn btn-lg sm:btn-wide btn-primary"
	on:click={() => document.getElementById("addReceipt").showModal()}
	>ADD RECEIPT</button
>

<dialog id="addReceipt" class="modal">
	<div class="modal-box max-w-xs">
		<form action="?/addOutgoing" method="post" class="form-control gap-2">
			<input hidden type="text" name="from" value={userId} />
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
					{#each roommates.filter((obj) => obj.id !== userId) as roommate, i}
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
									value={roommate.id}
									name="split{i}"
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
