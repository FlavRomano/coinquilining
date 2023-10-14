<script lang="ts">
	import {
		Render,
		Subscribe,
		createRender,
		createTable,
	} from "svelte-headless-table";
	import PantryTablePagination from "./PantryTablePagination.svelte";
	import { readable } from "svelte/store";
	import {
		addPagination,
		addSelectedRows,
		addSortBy,
		addTableFilter,
	} from "svelte-headless-table/plugins";
	import SelectIndicator from "$components/food/recipes/SelectIndicator.svelte";
	import PantryTableControls from "./PantryTableControls.svelte";

	export let table: {
		id: any;
		owner: any;
		food_name: any;
		kind: any;
		purchased_on: any;
		expiration: any;
		price: any;
	}[];

	export let roommates;

	const tableStore = readable(table);

	const t = createTable(tableStore, {
		sort: addSortBy({
			disableMultiSort: true,
			toggleOrder: ["asc", "desc"],
		}),
		filter: addTableFilter(),
		page: addPagination({ initialPageSize: 8 }),
		select: addSelectedRows(),
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
			header: "Food",
			accessor: (item) => item.food_name,
		}),
		t.column({
			header: "Kind",
			accessor: (item) => item.kind,
		}),

		t.column({
			header: "Purchased on",
			accessor: (item) =>
				new Date(item.purchased_on).toLocaleDateString("it-IT"),
		}),
		t.column({
			header: "Expiration",
			accessor: (item) =>
				new Date(item.expiration).toLocaleDateString("it-IT"),
		}),
		t.column({
			header: "Owner",
			accessor: (item) => item.owner,
		}),
	]);

	const {
		visibleColumns,
		headerRows,
		pageRows,
		tableAttrs,
		tableBodyAttrs,
		pluginStates,
	} = t.createViewModel(columns);
	const { pageIndex, pageCount, pageSize, hasNextPage, hasPreviousPage } =
		pluginStates.page;
	const { selectedDataIds, allPageRowsSelected, allRowsSelected } =
		pluginStates.select;
	const { filterValue } = pluginStates.filter;
</script>

<div class="overflow-x-scroll sm:overflow-x-hidden">
	<table class="table md:table-lg" {...$tableAttrs}>
		<thead>
			<th colspan={$visibleColumns.length}>
				<input
					type="text"
					class="input input-sm input-bordered lg:w-1/4"
					bind:value={$filterValue}
					placeholder="Search..."
				/>
			</th>
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
</div>

<div class="flex flex-col place-items-center">
	<PantryTablePagination
		{hasNextPage}
		{hasPreviousPage}
		{pageIndex}
		{pageCount}
	/>

	<PantryTableControls
		{table}
		{roommates}
		{selectedDataIds}
		{allRowsSelected}
		{allPageRowsSelected}
	/>
</div>
