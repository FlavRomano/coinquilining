<script lang="ts">
	export let queryFoods, currentPage;

	currentPage = parseInt(currentPage);

	// n.b: external permette il refresh delle pagine, altrimenti non funziona il gioco
</script>

<div class="join">
	{#if currentPage > 1}
		<a
			href="/house/food/recipes/{queryFoods}/{currentPage - 1}"
			rel="external"
			class="join-item btn">«</a
		>
	{:else}
		<button disabled class="join-item btn">«</button>
	{/if}

	<button class="join-item btn">Page {currentPage}</button>
	<a
		href="/house/food/recipes/{queryFoods}/{currentPage + 1}"
		rel="external"
		class="join-item btn">»</a
	>
</div>
