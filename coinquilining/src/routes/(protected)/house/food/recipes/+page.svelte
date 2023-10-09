<script lang="ts">
	import SelectTable from "$components/food/recipes/SelectTable.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
	let table = data.table;
</script>

<div class="m-5">
	<SelectTable {table} />
</div>
