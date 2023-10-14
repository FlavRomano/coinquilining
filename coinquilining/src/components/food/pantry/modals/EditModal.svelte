<script lang="ts">
	export let table, selectedDataIds, roommates;
	const selectedIndex = parseInt(Object.keys($selectedDataIds)[0]);
	const row = table[selectedIndex];
	console.log(row);
</script>

<dialog id="editModal" class="modal">
	<div class="modal-box">
		<div class="flex flex-col place-items-center">
			<form
				action="?/edit"
				method="post"
				class="form-control w-full max-w-xs gap-4"
			>
				<select
					class="select select-bordered w-full max-w-xs"
					name="owner"
					required
				>
					{#each roommates as roommate}
						{#if table
							.filter( (vs, i) => Object.keys($selectedDataIds).includes("" + i) )
							.map((v) => v.owner)[0] === roommate.firstname + " " + roommate.lastname}
							<option selected
								>{roommate.firstname + " " + roommate.lastname}
							</option>
						{:else}
							<option
								>{roommate.firstname + " " + roommate.lastname}
							</option>
						{/if}
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
				<button class="btn btn-primary w-full max-w-xs">
					CONFIRM
				</button>
			</form>
		</div>
	</div>

	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
