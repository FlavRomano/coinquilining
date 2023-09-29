<script lang="ts">
	import type { Food } from "$types/lib/server/db/types";
	import {
		flexRender,
		type ColumnDef,
		type TableOptions,
		getCoreRowModel,
		createSvelteTable,
	} from "@tanstack/svelte-table";
	import { writable } from "svelte/store";

	export let data;

	const defaultColumns: ColumnDef<Food>[] = [
		{ accessorKey: "owner", id: "owner", cell: (info) => info.getValue() },
		{
			accessorKey: "food_name",
			id: "food_name",
			cell: (info) => info.getValue(),
			header: "food name",
		},
		{
			accessorKey: "purchased_on",
			id: "purchased_on",
			cell: (info) => info.getValue(),
			header: "purchased on",
		},
		{
			accessorKey: "expiration",
			id: "expiration",
			cell: (info) => info.getValue(),
			header: "expiration date",
		},
		{ accessorKey: "kind", id: "kind", cell: (info) => info.getValue() },
	];

	const options = writable<TableOptions<Food>>({
		data: data.table,
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	let table = createSvelteTable(options);
</script>

<table class="table border-red-600 border">
	<thead>
		{#each $table.getHeaderGroups() as headerGroup}
			<tr>
				{#each headerGroup.headers as header}
					<th colspan={header.colSpan} class="mt-0 z-[2] sticky">
						{#if !header.isPlaceholder}
							<svelte:component
								this={flexRender(
									header.column.columnDef.header,
									header.getContext()
								)}
							/>
						{/if}
					</th>
				{/each}
			</tr>
		{/each}
	</thead>
	<tbody>
		{#each $table.getRowModel().rows as row}
			<tr
				><td>Flavio</td><td>Pizza margherita</td><td>2023-09-12</td><td
					>2023-08-15</td
				><td>Surgelato</td>
			</tr>
			<tr
				><td>Flavio</td><td>Pizza margherita</td><td>2023-09-12</td><td
					>2023-08-15</td
				><td>Surgelato</td>
			</tr>
			<tr
				><td>Flavio</td><td>Pizza margherita</td><td>2023-09-12</td><td
					>2023-08-15</td
				><td>Surgelato</td>
			</tr>
			<tr
				><td>Flavio</td><td>Pizza margherita</td><td>2023-09-12</td><td
					>2023-08-15</td
				><td>Surgelato</td>
			</tr>
			<tr
				><td>Flavio</td><td>Pizza margherita</td><td>2023-09-12</td><td
					>2023-08-15</td
				><td>Surgelato</td>
			</tr>
			<tr
				><td>Flavio</td><td>Pizza margherita</td><td>2023-09-12</td><td
					>2023-08-15</td
				><td>Surgelato</td>
			</tr>
			<tr>
				{#each row.getVisibleCells() as cell}
					<td
						><svelte:component
							this={flexRender(
								cell.column.columnDef.cell,
								cell.getContext()
							)}
						/></td
					>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
