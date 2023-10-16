<script lang="ts">
	import AddTableModal from "./modals/AddTableModal.svelte";
	import EditTableModal from "./modals/EditTableModal.svelte";

	export let table,
		allPageRowsSelected,
		allRowsSelected,
		selectedDataIds,
		roommates;
</script>

<div class="join fixed bottom-[15%] sm:bottom-[8%] lg:bottom-[8%]">
	<button
		on:click={() => document.getElementById("addModal").showModal()}
		class="btn btn-lg join-item">ADD</button
	>

	<form action="?/delete" method="post">
		<input
			type="hidden"
			name="deleteIds"
			value={table
				.filter((v, i) =>
					Object.keys($selectedDataIds).includes("" + i)
				)
				.map((v) => v.id)}
		/>
		<button
			class="btn btn-lg join-item"
			disabled={Object.keys($selectedDataIds).length === 0}>Delete</button
		>
	</form>

	<button
		on:click={() => document.getElementById("editModal").showModal()}
		disabled={Object.keys($selectedDataIds).length !== 1}
		class="btn join-item btn-lg">EDIT</button
	>
</div>

<AddTableModal {roommates} />
<EditTableModal
	{table}
	selectedFood={table[parseInt(Object.keys($selectedDataIds)[0])]}
	owner={roommates.find((roommate) => {
		if (table[parseInt(Object.keys($selectedDataIds)[0])] !== undefined)
			return (
				roommate.id ===
				table[parseInt(Object.keys($selectedDataIds)[0])].owner_id
			);
	})}
	{selectedDataIds}
	{roommates}
/>
