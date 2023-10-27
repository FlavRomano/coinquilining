<script lang="ts">
	import {
		Render,
		Subscribe,
		createRender,
		createTable,
	} from "svelte-headless-table";
	import SelectIndicator from "$components/food/recipes/SelectIndicator.svelte";
	import {
		addPagination,
		addSelectedRows,
		addSortBy,
	} from "svelte-headless-table/plugins";
	import { readable } from "svelte/store";
	import ShoppingControls from "./ShoppingControls.svelte";
	import type { ShoppingListItem } from "$types/lib/schemas";

	export let table: ShoppingListItem[];
	export let roommates;

	export let demo = false;

	const tableData = readable(table);

	const t = createTable(tableData, {
		sort: addSortBy({
			disableMultiSort: true,
			toggleOrder: ["asc", "desc"],
		}),
		page: addPagination({ initialPageSize: 5 }),
		select: addSelectedRows({}),
	});

	const columns = t.createColumns([
		t.display({
			id: "selected",
			header: "",
			cell: ({ row }, { pluginStates }) => {
				const { isSelected } = pluginStates.select.getRowState(row);
				return createRender(SelectIndicator, {
					isSelected,
				});
			},
		}),
		t.column({
			header: "Owner",
			accessor: (item) => {
				const owner = roommates.find(
					(roommate) => roommate.id === item.owner_id
				);
				return owner.firstname;
			},
		}),
		t.column({
			header: "Item",
			accessor: "item",
		}),
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		t.createViewModel(columns);
	const { pageIndex, pageCount, pageSize, hasNextPage, hasPreviousPage } =
		pluginStates.page;
	const { selectedDataIds, allRowsSelected } = pluginStates.select;
</script>

{#if table.length !== 0}
	<table class="table" {...$tableAttrs}>
		<thead>
			{#each $headerRows as headerRow (headerRow.id)}
				<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
					<tr {...rowAttrs}>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe
								attrs={cell.attrs()}
								let:attrs
								props={cell.props()}
								let:props
							>
								<th
									{...attrs}
									on:click={props.sort.toggle}
									class:sorted={props.sort.order !==
										undefined}
								>
									<Render of={cell.render()} />
									{#if props.sort.order === "asc"}
										↓
									{:else if props.sort.order === "desc"}
										↑
									{/if}
								</th>
							</Subscribe>
						{/each}
					</tr>
				</Subscribe>
			{/each}
		</thead>
		<tbody {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe
					rowAttrs={row.attrs()}
					let:rowAttrs
					rowProps={row.props()}
					let:rowProps
				>
					<tr {...rowAttrs} class:selected={rowProps.select.selected}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<td {...attrs}>
									<Render of={cell.render()} />
								</td>
							</Subscribe>
						{/each}
					</tr>
				</Subscribe>
			{/each}
		</tbody>
	</table>

	<div class="flex flex-col place-items-center">
		<ShoppingControls
			{table}
			{selectedDataIds}
			{allRowsSelected}
			{hasPreviousPage}
			{pageIndex}
			{pageCount}
			{hasNextPage}
			{roommates}
			{demo}
		/>
	</div>
{:else}
	<div class="grid place-items-center pt-40">
		<h1 class="prose prose-2xl prose-stone">Nothing to see...</h1>
	</div>
{/if}
