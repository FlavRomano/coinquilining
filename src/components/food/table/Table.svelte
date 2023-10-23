<script lang="ts">
	import {
		Render,
		Subscribe,
		createRender,
		createTable,
	} from "svelte-headless-table";
	import TablePagination from "./TablePagination.svelte";
	import { readable } from "svelte/store";
	import {
		addHiddenColumns,
		addPagination,
		addSelectedRows,
		addSortBy,
		addTableFilter,
	} from "svelte-headless-table/plugins";
	import SelectIndicator from "./SelectIndicator.svelte";
	import TableControls from "./TableControls.svelte";

	export let table: {
		id: any;
		owner_id: any;
		food_name: any;
		kind: any;
		purchased_on: any;
		expiration: any;
		price: any;
		is_expired: any;
	}[];

	export let roommates: { id: string; firstname: string; lastname: string }[];

	const tableStore = readable(table);

	const t = createTable(tableStore, {
		sort: addSortBy({
			disableMultiSort: true,
			initialSortKeys: [{ id: "Expiration", order: "asc" }],
			toggleOrder: ["asc", "desc", undefined],
		}),
		filter: addTableFilter(),
		page: addPagination({
			initialPageSize: 5,
		}),
		select: addSelectedRows(),
		hide: addHiddenColumns({ initialHiddenColumnIds: [] }),
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
			accessor: (item) => {
				return { date: item.expiration, is_expired: item.is_expired };
			},
			cell: ({ value }) => {
				if (value.is_expired)
					return (
						new Date(value.date).toLocaleDateString("it-IT") + " 🤮"
					);
				return new Date(value.date).toLocaleDateString("it-IT");
			},
			plugins: {
				sort: {
					compareFn: (left, right) => {
						if (left.date < right.date) return -1;
						if (left.date > right.date) return 1;
						return 0;
					},
				},
			},
		}),
		t.column({
			header: "Price",
			accessor: (item) =>
				Number(item.price).toLocaleString("it-IT", {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
					style: "currency",
					currency: "EUR",
				}),
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
									{#if cell.id !== "selected"}
										&nbsp;
										{#if props.sort.order === "asc"}
											<span class="text-neutral">↑</span
											><span class="text-accent">↓</span>
										{:else if props.sort.order === "desc"}
											<span class="text-accent">↑</span
											><span class="text-neutral">↓</span>
										{:else}
											<span class="text-neutral">↑↓</span>
										{/if}
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
	<TablePagination {hasNextPage} {hasPreviousPage} {pageIndex} {pageCount} />

	<TableControls
		{table}
		{roommates}
		{selectedDataIds}
		{allRowsSelected}
		{allPageRowsSelected}
	/>
</div>
