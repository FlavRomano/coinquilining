<script lang="ts">
	import PantryTable from "$components/food/pantry/PantryTable.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	let table: {
		id: any;
		owner: any;
		food_name: any;
		kind: any;
		purchased_on: any;
		expiration: any;
		price: any;
	}[] = data.table;

	const roommates = data.roommates;
</script>

<div class="m-5">
	<PantryTable {table} {roommates} />
</div>
