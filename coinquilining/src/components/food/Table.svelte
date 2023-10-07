<script lang="ts">
	import Grid from "gridjs-svelte";
	import "gridjs/dist/theme/mermaid.css";
	import type { Food } from "$types/lib/server/db/types";
	import { h } from "gridjs";
	import { writable, type Writable } from "svelte/store";

	export let table: Food[];
	export let option: Writable<{
		remove: boolean;
		edit: boolean;
		targets: {
			deleteTargetID: (string) => void;
			editTarget: (string) => void;
		};
	}> = writable({
		remove: false,
		edit: false,
		targets: {
			deleteTargetID: (targetRowID) => undefined,
			editTarget: (targetRowFood) => undefined,
		},
		restore: () => undefined,
	});
</script>

<div class="m-2">
	{#if $option.remove}
		<Grid
			data={table}
			columns={[
				{
					name: "",
					sort: false,
					formatter: (_, row) => {
						return h(
							"button",
							{
								class: "btn btn-xs btn-outline btn-error w-full",
								type: "submit",
								form: "remove",
								onclick: (e) => {
									let targetRowID = row.cells[1].data;
									let targetRowName = row.cells[3].data;

									$option.targets.deleteTargetID(targetRowID);
									!confirm(
										`Are you sure you want to delete ${targetRowName}?`
									) && e.preventDefault();
								},
							},
							"🧨"
						);
					},
				},
				{ id: "id", name: "Id", hidden: true },
				{ id: "owner", name: "Owner" },
				{ id: "food_name", name: "Food" },
				{ id: "kind", name: "Kind" },
				{
					id: "purchased_on",
					name: "Purchased on",
					formatter: (cell, _) => {
						return new Date(cell).toLocaleDateString("it-IT");
					},
				},
				{
					id: "expiration",
					name: "Expiration",
					formatter: (cell, _) => {
						return new Date(cell).toLocaleDateString("it-IT");
					},
				},
				{
					id: "price",
					name: "Price",
					formatter: (cell, _) => {
						return `€${cell}`;
					},
				},
			]}
			sort
			search={{ enabled: true }}
			pagination={{ enabled: true, limit: 5 }}
			autoWidth={true}
			fixedHeader
		/>
	{:else if $option.edit}
		<Grid
			data={table}
			columns={[
				{
					name: "",
					formatter: (_, row) => {
						return h(
							"button",
							{
								class: "btn btn-xs btn-outline w-full",
								onclick: () => {
									document
										.getElementById("editModal")
										.showModal();
									let targetRowFood = [...row.cells]
										.map((v) => v.data)
										.slice(1);

									$option.targets.editTarget(targetRowFood);
								},
							},
							"✏️"
						);
					},
					autoWidth: true,
				},
				{ id: "id", name: "Id", hidden: true },
				{ id: "owner", name: "Owner" },
				{ id: "food_name", name: "Food" },
				{ id: "kind", name: "Kind" },
				{
					id: "purchased_on",
					name: "Purchased on",
					formatter: (cell, _) => {
						return new Date(cell).toLocaleDateString("it-IT");
					},
				},
				{
					id: "expiration",
					name: "Expiration",
					formatter: (cell, _) => {
						return new Date(cell).toLocaleDateString("it-IT");
					},
				},
				{
					id: "price",
					name: "Price",
					formatter: (cell, _) => {
						return `€${cell}`;
					},
				},
			]}
			sort
			search={{ enabled: true }}
			pagination={{ enabled: true, limit: 5 }}
			autoWidth={true}
			fixedHeader
		/>
	{:else}
		<Grid
			data={table}
			columns={[
				{ id: "owner", name: "Owner" },
				{ id: "food_name", name: "Food" },
				{ id: "kind", name: "Kind" },
				{
					id: "purchased_on",
					name: "Purchased on",
					formatter: (cell, _) => {
						return new Date(cell).toLocaleDateString("it-IT");
					},
				},
				{
					id: "expiration",
					name: "Expiration",
					formatter: (cell, _) => {
						return new Date(cell).toLocaleDateString("it-IT");
					},
				},
				{
					id: "price",
					name: "Price",
					formatter: (cell, _) => {
						return `€${cell}`;
					},
				},
			]}
			sort
			search
			pagination={{ enabled: true, limit: 5 }}
			autoWidth={true}
			fixedHeader
		/>
	{/if}
</div>
