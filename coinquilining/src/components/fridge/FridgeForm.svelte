<script lang="ts">
	export let fridge_form;
	export let fridge_constraints;
</script>

<form
	class="form-control gap-4 w-full max-w-xs"
	action="fridge?/insert"
	method="post"
>
	<input
		bind:value={$fridge_form.owner}
		class="input input-bordered join-item"
		type="text"
		name="owner"
		placeholder="Owner"
		{...$fridge_constraints.owner}
	/>

	<input
		bind:value={$fridge_form.food_name}
		class="input input-bordered join-item"
		type="text"
		name="food_name"
		placeholder="food_name"
		{...$fridge_constraints.food_name}
	/>
	<label class="label">
		<span class="label-text">Purchase date</span>
		<input
			bind:value={$fridge_form.purchased_on}
			class="input input-bordered join-item"
			type="date"
			name="purchased_on"
			placeholder="purchased_on"
			{...$fridge_constraints.purchased_on}
		/>
	</label>

	<label class="label">
		<span class="label-text">Purchase date</span>
		<input
			bind:value={$fridge_form.expiration_on}
			class="input input-bordered join-item"
			type="date"
			name="expiration_on"
			placeholder="expiration_on"
			{...$fridge_constraints.expiration_on}
		/>
	</label>

	<input
		bind:value={$fridge_form.kind}
		class="input input-bordered join-item"
		type="text"
		name="kind"
		placeholder="kind"
		{...$fridge_constraints.kind}
	/>
	<label class="label">
		<span class="label-text">Price</span>
		<input
			bind:value={$fridge_form.price}
			class="input input-bordered join-item"
			type="text"
			name="price"
			placeholder="price"
			{...$fridge_constraints.price}
		/>
	</label>
	<button class="btn btn-primary">INSERT</button>
</form>
