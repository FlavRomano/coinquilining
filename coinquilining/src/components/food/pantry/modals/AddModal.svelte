<script lang="ts">
	export let roommates;
</script>

<dialog id="addModal" class="modal">
	<div class="modal-box w-full max-w-xs">
		<form action="?/add" method="post" class="form-control gap-4">
			<select
				class="select select-bordered w-full max-w-xs"
				name="owner"
				required
			>
				<option disabled selected>Select owner</option>
				{#each roommates as roommate}
					<option value={roommate.id}
						>{roommate.firstname + " " + roommate.lastname}
					</option>
				{/each}
			</select>
			<input
				type="text"
				name="food_name"
				class="input input-bordered w-full max-w-xs"
				minlength="2"
				maxlength="32"
				placeholder="Food"
			/>
			<div class="gap-0">
				<label class="label">
					<span class="label-text">Purchase date</span>
				</label>
				<input
					class="input input-bordered w-full max-w-xs"
					type="date"
					name="purchased_on"
				/>
			</div>
			<div class="gap-0">
				<label class="label">
					<span class="label-text">Expiration date</span>
				</label>
				<input
					class="input input-bordered w-full max-w-xs"
					type="date"
					name="expiration_on"
				/>
			</div>
			<input
				class="input input-bordered w-full max-w-xs"
				type="text"
				name="kind"
				minlength="2"
				maxlength="32"
				placeholder="Kind"
			/>
			<input
				class="input input-bordered w-full max-w-xs"
				type="number"
				step="0.01"
				min="0.01"
				name="price"
				placeholder="Price €"
			/>
			<button class="btn btn-primary w-full max-w-xs">CONFIRM</button>
		</form>
	</div>

	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
