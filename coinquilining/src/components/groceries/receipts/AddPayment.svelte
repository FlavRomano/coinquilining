<script lang="ts">
	export let roommates: {
		id: string;
		firstname: string;
		lastname: string;
		amount: Number;
	}[];
	export let userId;

	let fromRoommate = "";
</script>

<button
	class="btn btn-lg sm:btn-wide btn-primary"
	on:click={() => document.getElementById("addPayment").showModal()}
	>ADD PAYMENT</button
>

<dialog id="addPayment" class="modal">
	<div class="modal-box max-w-xs">
		<form action="?/addPayment" method="post" class="form-control gap-2">
			<input
				type="number"
				step="0.01"
				name="amount"
				class="input input-bordered w-full"
				placeholder="Amount"
				required
			/>

			<select
				bind:value={fromRoommate}
				class="select select-bordered w-full max-w-xs"
				required
			>
				<option value="" disabled selected hidden>From</option>
				{#each roommates as roommate}
					<option value={roommate.id}
						>From: {roommate.firstname +
							" " +
							roommate.lastname}</option
					>
				{/each}
			</select>

			<select class="select select-bordered w-full max-w-xs" required>
				<option value="" disabled selected hidden>To</option>
				{#each roommates.filter((obj) => obj.id !== fromRoommate) as roommate}
					<option value={roommate.id}
						>To: {roommate.firstname +
							" " +
							roommate.lastname}</option
					>
				{/each}
			</select>

			<input hidden type="text" name="from" value={userId} />

			<button class="btn btn-primary w-full">ADD</button>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
