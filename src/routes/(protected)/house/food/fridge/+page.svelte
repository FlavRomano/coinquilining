<script lang="ts">
	import Table from "$components/food/table/Table.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	let table: {
		id: any;
		owner_id: any;
		food_name: any;
		kind: any;
		purchased_on: any;
		expiration: any;
		price: any;
	}[] = data.table;

	const roommates = data.roommates;
</script>

<div class="m-5">
	<div class="text-sm breadcrumbs">
		<ul>
			<li><a href="/house/dashboard">House</a></li>
			<li><a href="/house/food">Food</a></li>
			<li>Fridge</li>
		</ul>
	</div>
	<Table {table} {roommates} />
</div>
