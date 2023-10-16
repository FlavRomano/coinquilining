<script lang="ts">
	import SelectTable from "$components/food/recipes/SelectTable.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
	const table = data.table;
	const roommates = data.roommates;
</script>

<div class="m-5">
	<div class="text-sm breadcrumbs">
		<ul>
			<li><a href="/house/dashboard">House</a></li>
			<li><a href="/house/food">Food</a></li>
			<li>Recipes</li>
		</ul>
	</div>
	<SelectTable {table} {roommates} />
</div>
