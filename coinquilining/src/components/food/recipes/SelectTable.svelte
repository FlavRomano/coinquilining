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

	export let table;

	const data = readable(table);

	const t = createTable(data, {
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
			accessor: "owner",
		}),
		t.column({
			header: "Food",
			accessor: "food_name",
		}),
		t.column({
			header: "Kind",
			accessor: "kind",
		}),
		t.column({
			header: "Expiration",
			accessor: "expiration",
		}),
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		t.createViewModel(columns);
	const { pageIndex, pageCount, pageSize, hasNextPage, hasPreviousPage } =
		pluginStates.page;
	const { selectedDataIds } = pluginStates.select;
</script>

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
								class:sorted={props.sort.order !== undefined}
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
	<div class="join fixed bottom-1/4 md:bottom-1/3">
		<button
			class="join-item btn"
			disabled={!$hasPreviousPage}
			on:click={() => $pageIndex--}>«</button
		>
		<button class="join-item btn"
			>Page {$pageIndex + 1} of {$pageCount}</button
		>
		<button
			class="join-item btn"
			disabled={!$hasNextPage}
			on:click={() => $pageIndex++}>»</button
		>
	</div>
</div>
<div class="pt-5">
	<a
		href="/house/food/recipes/{table
			.filter((_, i) => Object.keys($selectedDataIds).includes('' + i))
			.map((v) => v.food_name)
			.join('+')}/1"
		class="btn btn-primary w-full md:w-1/3 md:float-right md:right-5"
	>
		SEARCH
	</a>
</div>
