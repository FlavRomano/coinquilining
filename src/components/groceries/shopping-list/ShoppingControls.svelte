<script lang="ts">
	export let table,
		selectedDataIds,
		allRowsSelected,
		hasPreviousPage,
		pageIndex,
		pageCount,
		hasNextPage,
		roommates;

	export let demo = false;
</script>

{#if demo}
	<div class="join fixed bottom-[25%] sm:bottom-[18%] md:bottom-[18%]">
		<button
			class="join-item btn"
			disabled={!$hasPreviousPage}
			on:click={() => $pageIndex--}>«</button
		>
		<button class="join-item btn"
			>Page {$pageIndex + 1} of {$pageCount}</button
		>
		<button
			class="join-item btn"
			disabled={!$hasNextPage}
			on:click={() => $pageIndex++}>»</button
		>
	</div>

	<div class="join fixed bottom-[15%] sm:bottom-[8%] lg:bottom-[8%]">
		<button
			on:click={() => ($allRowsSelected = !$allRowsSelected)}
			class="btn btn-lg join-item">All</button
		>

		<button
			class="btn btn-lg join-item"
			disabled={Object.keys($selectedDataIds).length === 0}>Delete</button
		>

		<button
			disabled={Object.keys($selectedDataIds).length != 1}
			class="btn btn-lg join-item">Edit</button
		>
	</div>
{:else}
	<div class="join fixed bottom-[25%] sm:bottom-[18%] md:bottom-[18%]">
		<button
			class="join-item btn"
			disabled={!$hasPreviousPage}
			on:click={() => $pageIndex--}>«</button
		>
		<button class="join-item btn"
			>Page {$pageIndex + 1} of {$pageCount}</button
		>
		<button
			class="join-item btn"
			disabled={!$hasNextPage}
			on:click={() => $pageIndex++}>»</button
		>
	</div>

	<div class="join fixed bottom-[15%] sm:bottom-[8%] lg:bottom-[8%]">
		<button
			on:click={() => ($allRowsSelected = !$allRowsSelected)}
			class="btn btn-lg join-item">All</button
		>
		<form action="?/delete" method="post">
			<input
				type="hidden"
				name="deleteIds"
				value={table
					.filter((_, i) =>
						Object.keys($selectedDataIds).includes("" + i)
					)
					.map((v) => v.id)
					.join(";")}
			/>
			<button
				class="btn btn-lg join-item"
				disabled={Object.keys($selectedDataIds).length === 0}
				>Delete</button
			>
		</form>

		<button
			on:click={() => document.getElementById("editModal").showModal()}
			disabled={Object.keys($selectedDataIds).length != 1}
			class="btn btn-lg join-item">Edit</button
		>
	</div>

	<dialog id="editModal" class="modal">
		<div class="modal-box">
			<div class="flex flex-col place-items-center">
				<form
					action="?/edit"
					method="post"
					class="form-control w-full max-w-xs gap-4"
				>
					<input
						type="hidden"
						name="editId"
						value={table
							.filter((v, i) =>
								Object.keys($selectedDataIds).includes("" + i)
							)
							.map((v) => v.id)
							.join(";")}
					/>
					<select
						class="select select-bordered w-full max-w-xs"
						name="owner_id"
						required
					>
						{#each roommates as roommate}
							{#if table
								.filter( (_, i) => Object.keys($selectedDataIds).includes("" + i) )
								.map((v) => v.owner_id)[0] === roommate.id}
								<option selected value={roommate.id}
									>{roommate.firstname +
										" " +
										roommate.lastname}
								</option>
							{:else}
								<option value={roommate.id}
									>{roommate.firstname +
										" " +
										roommate.lastname}
								</option>
							{/if}
						{/each}
					</select>
					<input
						type="text"
						name="item"
						class="input input-bordered w-full max-w-xs"
						value={table
							.filter((_, i) =>
								Object.keys($selectedDataIds).includes("" + i)
							)
							.map((v) => v.item)
							.join("")}
						placeholder="Item"
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
{/if}
