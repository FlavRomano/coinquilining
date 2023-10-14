<script lang="ts">
	import AddModal from "./modals/AddModal.svelte";
	import EditModal from "./modals/EditModal.svelte";

	export let table,
		allPageRowsSelected,
		allRowsSelected,
		selectedDataIds,
		roommates;
</script>

<div class="join fixed bottom-[15%] sm:bottom-[8%] lg:bottom-[8%]">
	<form action="?/add">
		<button
			on:click={() => document.getElementById("addModal").showModal()}
			class="btn btn-lg join-item">ADD</button
		>
	</form>
	<form action="?/delete" method="post">
		<input
			type="hidden"
			name="deleteIds"
			value={table
				.filter((v, i) =>
					Object.keys($selectedDataIds).includes("" + i)
				)
				.map((v) => v.id)
				.join(";")}
		/>
		<button
			class="btn btn-lg join-item"
			disabled={Object.keys($selectedDataIds).length === 0}>Delete</button
		>
	</form>

	<button
		on:click={() => document.getElementById("editModal").showModal()}
		disabled={Object.keys($selectedDataIds).length != 1}
		class="btn btn-lg join-item">Edit</button
	>
</div>

<AddModal {roommates} />
<EditModal {table} {selectedDataIds} {roommates} />
