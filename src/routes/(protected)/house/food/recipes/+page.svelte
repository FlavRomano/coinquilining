<script lang="ts">
	import SelectTable from "$components/food/recipes/SelectTable.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
	const fridge = data.fridge;
	const pantry = data.pantry;
	const table = [...fridge, ...pantry];
	const roommates = data.roommates;
</script>

<div class="text-sm breadcrumbs">
	<ul>
		<li><a href="/house/dashboard">House</a></li>
		<li><a href="/house/food">Food</a></li>
		<li>Recipes</li>
	</ul>
</div>
<SelectTable {table} {roommates} />
