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

<div class="text-sm breadcrumbs">
	<ul>
		<li><a href="/house/lifestyle">Lifestyle</a></li>
		<li><a href="/house/lifestyle/shopping-list">Shopping-lists</a></li>
		<li>{listName}</li>
	</ul>
</div>

<ShoppingInput {roommates} />
<ShoppingTable table={shoppingList} {roommates} />
