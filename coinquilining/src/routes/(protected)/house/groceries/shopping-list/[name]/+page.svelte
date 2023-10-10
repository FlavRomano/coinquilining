<script lang="ts">
	import ShoppingInput from "$components/groceries/ShoppingInput.svelte";
	import ShoppingTable from "$components/groceries/ShoppingTable.svelte";
	import { page } from "$app/stores";

	let table: { id: string; owner: string; item: string }[] = [
		{ id: "1", owner: "Flavio", item: "Porchetta" },
		{ id: "2", owner: "Gabriele", item: "Benzina" },
	];

	const roommates = $page.data.roommates;
</script>

<div class="m-5">
	<ShoppingInput {roommates} />
	<ShoppingTable {table} />
</div>
