<script lang="ts">
	import PaginationButton from "$components/food/recipes/PaginationButton.svelte";
	import FoodCard from "$components/food/recipes/FoodCard.svelte";
</script>

<div class="flex flex-col place-items-center">
	{#each $recipes as recipesObj}
		{#if recipesObj.page === $pageTab + 1}
			<ul>
				{#each recipesObj.recipes as recipe}
					<li>
						<FoodCard {recipe} />
					</li>
				{/each}
			</ul>
		{/if}
	{/each}
	<PaginationButton {pageTab} {recipes} />
</div>
