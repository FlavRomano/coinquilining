<script lang="ts">
	import ShoppingCard from "$components/groceries/shopping-list/ShoppingCard.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
	const shoppingLists: { id: string; name: string; date: string }[] =
		data.shoppingLists;
</script>

<div
	class="grid grid-cols-1 place-items-center m-5 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
>
	{#each shoppingLists as list}
		<ShoppingCard
			color={"bg-primary"}
			id={list.id}
			title={list.name}
			paragraph={list.date}
		/>
	{/each}
	<ShoppingCard />
</div>

<dialog id="newShoppingListModal" class="modal">
	<div class="modal-box">
		<form action="?/new" method="post" class="form-control gap-4">
			<input
				minlength="4"
				maxlength="18"
				type="text"
				placeholder="List name"
				name="shoppingListName"
				class="input input-bordered"
			/>
			<button class="btn btn-primary">CREATE</button>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
