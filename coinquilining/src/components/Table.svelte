<script lang="ts">
	import Grid from "gridjs-svelte";
	import "gridjs/dist/theme/mermaid.css";
	import type { Food } from "$types/lib/server/db/types";

	export let table: Food[];
</script>

<Grid
	width=""
	data={table}
	sort
	search
	pagination={{ enabled: true, limit: 10 }}
	fixedHeader
/>
