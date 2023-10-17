<script lang="ts">
	import PaginationButton from "$components/food/recipes/PaginationButton.svelte";
	import FoodCard from "$components/food/recipes/FoodCard.svelte";
	import { page } from "$app/stores";

	const queryFoods = $page.params.foods;
	const currentPage = $page.params.page;

	async function logRecipes() {
		const response = await fetch("/api/recipes", {
			headers: {
				foods: queryFoods,
				page: currentPage,
			},
		});

		return [...(await response.json())];
	}
</script>

{#await logRecipes()}
	<div class="flex h-screen">
		<div class="m-auto">
			<span class="loading loading-spinner loading-lg" />
		</div>
	</div>
{:then recipes}
	<div class="m-5">
		<div class="flex flex-col place-items-center">
			<a class="btn btn-neutral" href="/house/food/recipes"
				>BACK TO TABLE</a
			>
			{#each recipes as recipesObj}
				<ul>
					{#each recipesObj.recipes as recipe}
						<li>
							<FoodCard {recipe} />
						</li>
					{/each}
				</ul>
			{/each}
			<PaginationButton {queryFoods} {currentPage} />
		</div>
	</div>
{/await}
