<script lang="ts">
	export let add_form;
	export let add_constraints;
	export let roommates;
</script>

<div class="flex items-start">
	<form
		class="form-control flex-grow-1 gap-y-4 w-full"
		action="fridge?/insert"
		method="post"
	>
		<label class="label"
			><span class="label-text">Select owner</span>
			<select
				bind:value={$add_form.owner}
				class="select select-bordered w-full max-w-xs"
				name="owner"
			>
				<option disabled selected>Select owner</option>
				{#each roommates as roommate}
					<option>{roommate.firstname} {roommate.lastname}</option>
				{/each}
			</select>
		</label>

		<input
			bind:value={$add_form.food_name}
			class="input input-bordered"
			type="text"
			name="food_name"
			placeholder="food_name"
			{...$add_constraints.food_name}
		/>
		<label class="label">
			<span class="label-text">Purchase date</span>
			<input
				bind:value={$add_form.purchased_on}
				class="input input-bordered"
				type="date"
				name="purchased_on"
				placeholder="purchased_on"
				{...$add_constraints.purchased_on}
			/>
		</label>

		<label class="label">
			<span class="label-text">Expiration date</span>
			<input
				bind:value={$add_form.expiration_on}
				class="input input-bordered"
				type="date"
				name="expiration_on"
				placeholder="expiration_on"
				{...$add_constraints.expiration_on}
			/>
		</label>

		<input
			bind:value={$add_form.kind}
			class="input input-bordered"
			type="text"
			name="kind"
			placeholder="kind"
			{...$add_constraints.kind}
		/>
		<label class="label">
			<span class="label-text">Price</span>
			<input
				bind:value={$add_form.price}
				class="input input-bordered"
				type="number"
				step="0.01"
				min="0.01"
				name="price"
				placeholder="price"
				{...$add_constraints.price}
			/>
		</label>
		<button class="btn btn-primary">ADD</button>
	</form>
</div>
