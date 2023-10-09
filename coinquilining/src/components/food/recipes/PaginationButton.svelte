<script lang="ts">
	export let queryFoods, currentPage;

	currentPage = parseInt(currentPage);

	// n.b: external permette il refresh delle pagine, altrimenti non funziona il gioco
</script>

<div class="join">
	<a
		href="/house/food/recipes/{queryFoods}/{currentPage > 0
			? currentPage - 1
			: ''}"
		rel="external"
		class="join-item btn">«</a
	>
	<button class="join-item btn">Page {currentPage}</button>
	<a
		href="/house/food/recipes/{queryFoods}/{currentPage + 1}"
		rel="external"
		class="join-item btn">»</a
	>
</div>
