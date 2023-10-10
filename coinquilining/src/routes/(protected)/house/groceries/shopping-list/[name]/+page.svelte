<script lang="ts">
	import ShoppingInput from "$components/groceries/ShoppingInput.svelte";
	import ShoppingTable from "$components/groceries/ShoppingTable.svelte";
	import type { ShoppingListItem } from "$types/lib/schemas";
	import type { PageData } from "./$types";

	export let data: PageData;
	const roommates = data.roommates;
	const shoppingList: ShoppingListItem[] = data.shoppingList;
</script>

<div class="m-5">
	<ShoppingInput {roommates} />
	<ShoppingTable table={shoppingList} />
</div>
