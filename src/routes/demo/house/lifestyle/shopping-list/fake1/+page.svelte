<script lang="ts">
	import ShoppingInput from "$components/groceries/shopping-list/ShoppingInput.svelte";
	import ShoppingTable from "$components/groceries/shopping-list/ShoppingTable.svelte";
	import type { ShoppingListItem } from "$types/lib/schemas";

	const roommates = [
		{
			id: "someUUID0",
			email: "fromano000@gmail.com",
			firstname: "Flavio",
			lastname: "Romano",
			house_id: "Zzxjoanw",
			balance: 5.75,
		},
		{
			id: "someUUID1",
			email: "flavio.romano92@gmail.com",
			firstname: "Gabriele",
			lastname: "Patierno",
			house_id: "Zzxjoanw",
			balance: -5.75,
		},
	];
	const shoppingList: ShoppingListItem[] = [
		{ id: "fakeId0", owner_id: "someUUID1", item: "Bullone" },
		{ id: "fakeId1", owner_id: "someUUID0", item: "Rondella" },
		{ id: "fakeId2", owner_id: "someUUID1", item: "Pomello" },
	];
	const listName: string = "Ikea";
</script>

<div class="text-sm breadcrumbs">
	<ul>
		<li><a href="/demo/house/lifestyle">Lifestyle</a></li>
		<li>
			<a href="/demo/house/lifestyle/shopping-list">Shopping-lists</a>
		</li>
		<li>{listName}</li>
	</ul>
</div>

<ShoppingInput {roommates} demo={true} />
<ShoppingTable table={shoppingList} {roommates} demo={true} />
