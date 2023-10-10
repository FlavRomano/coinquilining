<script lang="ts">
	export let id = "new";
	export let color = "bg-base-300";
	export let title = "New Shopping list";
	export let paragraph =
		"Add something to the list before your trip to Lidl.";
</script>

<div class="card w-80 {color} {id !== 'new' ? 'text-primary-content' : ''}">
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		<p>
			{paragraph[0] !== "A"
				? new Date().toLocaleDateString("it-IT")
				: paragraph}
		</p>
		<div class="card-actions justify-end">
			{#if id !== "new"}
				<a
					href="/house/groceries/shopping-list/{id}"
					class="btn btn-error">DELETE</a
				>
				<a href="/house/groceries/shopping-list/{id}" class="btn"
					>OPEN</a
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
