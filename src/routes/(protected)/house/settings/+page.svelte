<script lang="ts">
	import Menu from "$components/settings/Menu.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<Menu {data} />
