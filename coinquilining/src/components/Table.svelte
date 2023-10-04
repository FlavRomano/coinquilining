<script lang="ts">
	import Grid from "gridjs-svelte";
	import "gridjs/dist/theme/mermaid.css";
	import type { Food } from "$types/lib/server/db/types";

	export let table: Food[];
</script>

<div class="m-2">
	<Grid
		data={table}
		columns={[
			{ id: "owner", name: "Owner" },
			{ id: "food_name", name: "Food" },
			{ id: "kind", name: "Kind" },
			{ id: "purchased_on", name: "Purchased on" },
			{ id: "expiration", name: "Expiration" },
			{ id: "price", name: "Price" },
		]}
		sort
		search
		pagination={{ enabled: true, limit: 10 }}
		autoWidth={true}
		fixedHeader
	/>
</div>
