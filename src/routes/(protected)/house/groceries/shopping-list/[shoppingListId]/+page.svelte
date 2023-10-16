<script lang="ts">
	import ShoppingInput from "$components/groceries/shopping-list/ShoppingInput.svelte";
	import ShoppingTable from "$components/groceries/shopping-list/ShoppingTable.svelte";
	import type { ShoppingListItem } from "$types/lib/schemas";
	import type { PageData } from "./$types";

	export let data: PageData;
	const roommates = data.roommates;
	const shoppingList: ShoppingListItem[] = data.shoppingList;
	const listName: string = data.listName;
</script>

<div class="ml-5">
	<div class="text-sm breadcrumbs">
		<ul>
			<li><a href="/house/groceries">Groceries</a></li>
			<li><a href="/house/groceries/shopping-list">Shopping-lists</a></li>
			<li>{listName}</li>
		</ul>
	</div>
</div>
<div class="m-5">
	<ShoppingInput {roommates} />
	<ShoppingTable table={shoppingList} {roommates} />
</div>
