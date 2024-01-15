<script lang="ts">
	export let id = "new";
	export let color = "bg-base-300";
	export let title = "New Shopping list";
	export let paragraph =
		"Add something to the list before your trip to Lidl.";
	export let date = undefined;
	export let demo = false;
</script>

<div class="card w-80 {color} {id !== 'new' ? 'text-primary-content' : ''}">
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		<p>
			{id !== "new"
				? new Date(date).toLocaleDateString("it-IT")
				: paragraph}
		</p>
		<div class="card-actions justify-end">
			{#if id !== "new"}
				<form action="?/delete" method="post">
					<input type="text" name="deleteId" value={id} hidden />
					<button class="btn btn-error">DELETE</button>
				</form>
				<a
					href={demo
						? "/demo/house/lifestyle/shopping-list/" + id
						: "/house/lifestyle/shopping-list/" + id}
					class="btn">OPEN</a
				>
			{:else}
				<button
					on:click={() =>
						document
							.getElementById("newShoppingListModal")
							.showModal()}
					class="btn">NEW</button
				>
			{/if}
		</div>
	</div>
</div>
