<script lang="ts">
	import Grid from "gridjs-svelte/gridjs.svelte";
	import { h } from "gridjs";
	import "gridjs/dist/theme/mermaid.css";
	import type { PageData } from "./$types";

	export let data: PageData;
	let table = data.table;

	let checkedList: { food_name: string; checked: boolean }[] = [];

	async function logRecipes() {
		const response = await fetch("/api/recipes", {
			headers: {
				foods: checkedList.map((obj) => obj.food_name).join("+"),
			},
		});
	}
</script>

<div class="m-5">
	<Grid
		data={table}
		columns={[
			{
				id: "checkBox",
				name: "",
				width: "10%",
				formatter: (cell, row) => {
					return h("input", {
						class: "checkBox w-full",
						type: "checkBox",
						form: "remove",
						onclick: (_) => {
							let food_name = row.cells[2].data.toString();

							for (let food of checkedList) {
								let isSameFood = food_name === food.food_name;

								if (isSameFood) {
									food.checked = !food.checked;
									return;
								}
							}

							checkedList.push({
								food_name: food_name,
								checked: true,
							});
						},
					});
				},
			},
			{ id: "owner", name: "Owner" },
			{ id: "food_name", name: "Food" },
			{ id: "kind", name: "Kind" },

			{
				id: "expiration",
				name: "Expiration",
				formatter: (cell, _) => {
					return new Date(cell).toLocaleDateString("it-IT");
				},
			},
		]}
	/>

	<button class="btn btn-primary btn-wide"> SEARCH </button>
</div>
