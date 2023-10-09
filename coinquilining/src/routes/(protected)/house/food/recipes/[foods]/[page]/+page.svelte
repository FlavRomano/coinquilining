<script lang="ts">
	import PaginationButton from "$components/food/recipes/PaginationButton.svelte";
	import FoodCard from "$components/food/recipes/FoodCard.svelte";
	import { writable } from "svelte/store";
	import { page, updated } from "$app/stores";
	import { onMount } from "svelte";

	let recipes = writable([]);
	const queryFoods = $page.params.foods;
	const currentPage = $page.params.page;
	let loaded = false;

	async function logRecipes() {
		const response = await fetch("/api/recipes", {
			headers: {
				foods: queryFoods,
				page: currentPage,
			},
		});

		$recipes = [...(await response.json())];
		loaded = true;
	}

	onMount(() => {
		logRecipes();
	});
</script>

{#if loaded}
	<div class="m-5">
		<div class="flex flex-col place-items-center">
			<a class="btn btn-neutral" href="/house/food/recipes"
				>BACK TO TABLE</a
			>
			{#each $recipes as recipesObj}
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
{:else}
	<div class="flex h-screen">
		<div class="m-auto">
			<span class="loading loading-spinner loading-lg" />
		</div>
	</div>
{/if}
