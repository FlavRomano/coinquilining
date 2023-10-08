<script lang="ts">
	import SelectTable from "$components/food/recipes/SelectTable.svelte";
	import { writable } from "svelte/store";
	import type { PageData } from "./$types";
	import FoodCard from "$components/food/recipes/FoodCard.svelte";
	import PaginationButton from "$components/food/recipes/PaginationButton.svelte";

	export let data: PageData;
	let table = data.table;

	let checkedList: { food_name: string; checked: boolean }[] = [];
	let recipes = writable([]);
	let pageTab = writable(0);

	async function logRecipes() {
		console.log("start");
		recipes.set([]);

		const response = await fetch("/api/recipes", {
			headers: {
				foods: checkedList.map((obj) => obj.food_name).join("+"),
			},
		});

		$recipes = [...(await response.json())];
	}

	let recipeTab = false;
</script>

<div class="flex flex-col items-center">
	<div class="tabs">
		<button
			on:click={() => (recipeTab = !recipeTab && $recipes.length !== 0)}
			class="tab tab-bordered {recipeTab ? '' : 'tab-active'}"
			>Select</button
		>
		<a
			href="/house/food/recipes/{checkedList
				.map((obj) => obj.food_name)
				.join('+')}"
			class="tab tab-bordered {recipeTab ? 'tab-active' : ''}">Recipes</a
		>
	</div>
</div>
<div class="m-5">
	<SelectTable {table} {checkedList} />
	<button
		class="btn btn-primary w-full md:w-1/3 md:float-right md:right-5"
		on:click={() => {
			logRecipes();
			recipeTab = !recipeTab;
		}}
	>
		SEARCH
	</button>
</div>
