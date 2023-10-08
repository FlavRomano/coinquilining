<script lang="ts">
	import Grid from "gridjs-svelte/gridjs.svelte";
	import { h } from "gridjs";
	import "gridjs/dist/theme/mermaid.css";

	export let table, checkedList;
</script>

<Grid
	sort
	search={{ enabled: true }}
	pagination={{ enabled: true, limit: 5 }}
	data={table}
	columns={[
		{
			id: "checkBox",
			name: "",
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
