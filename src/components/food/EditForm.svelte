<script lang="ts">
	export let edit_form;
	export let edit_constraints;
	export let roommates;
</script>

<div class="flex items-start">
	<form
		class="form-control flex-grow-1 gap-y-4 w-full"
		action="fridge?/edit"
		method="post"
	>
		<label class="label"
			><span class="label-text">Select owner</span>
			<select
				bind:value={$edit_form.owner}
				class="select select-bordered w-full max-w-xs"
				name="owner"
				required
			>
				{#each roommates as roommate}
					{#if roommate.firstname === $edit_form.owner}
						<option value={roommate.firstname} selected
							>{roommate.firstname} {roommate.lastname}</option
						>
					{:else}
						<option value={roommate.firstname}
							>{roommate.firstname} {roommate.lastname}</option
						>
					{/if}
				{/each}
			</select>
		</label>

		<input
			bind:value={$edit_form.id}
			type="text"
			name="id"
			hidden
			{...$edit_constraints.id}
		/>
		<label class="label"
			><span class="label-text">Food name</span>
			<input
				bind:value={$edit_form.food_name}
				class="input input-bordered"
				type="text"
				name="food_name"
				placeholder="food_name"
				{...$edit_constraints.food_name}
			/></label
		>

		<label class="label">
			<span class="label-text">Purchase date</span>
			<input
				bind:value={$edit_form.purchased_on}
				class="input input-bordered"
				type="date"
				name="purchased_on"
				placeholder="purchased_on"
				{...$edit_constraints.purchased_on}
			/>
		</label>

		<label class="label">
			<span class="label-text">Expiration date</span>
			<input
				bind:value={$edit_form.expiration_on}
				class="input input-bordered"
				type="date"
				name="expiration_on"
				placeholder="expiration_on"
				{...$edit_constraints.expiration_on}
			/>
		</label>

		<label class="label"
			><span class="label-text">Food name</span>
			<input
				bind:value={$edit_form.kind}
				class="input input-bordered"
				type="text"
				name="kind"
				placeholder="kind"
				{...$edit_constraints.kind}
			/></label
		>

		<label class="label">
			<span class="label-text">Price</span>
			<input
				bind:value={$edit_form.price}
				class="input input-bordered"
				type="number"
				step="0.01"
				min="0.01"
				name="price"
				placeholder="price"
				{...$edit_constraints.price}
			/>
		</label>
		<button class="btn btn-neutral">CHANGE</button>
	</form>
</div>
