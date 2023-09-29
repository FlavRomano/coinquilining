<script lang="ts">
	import {
		createSvelteTable,
		defaultColumnSizing,
		flexRender,
		getCoreRowModel,
	} from "@tanstack/svelte-table";
	import { writable } from "svelte/store";
	import type { ColumnDef, TableOptions } from "@tanstack/svelte-table";
	import type { Food } from "$lib/server/db/types.js";
	import Table from "$components/Table.svelte";
	import { fridgeSchema } from "$types/lib/schemas.js";
	import { superForm } from "sveltekit-superforms/client";
	import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	const {
		form: fridge_form,
		errors: fridge_errors,
		constraints: fridge_constraints,
		message: fridge_message,
		enhance: fridge_enhance,
		capture: fridge_capture,
		restore: fridge_restore,
	} = superForm(data.insertFoodForm, {
		taintedMessage: null,
		validators: fridgeSchema,
	});

	$: if ($fridge_form.price && typeof $fridge_form.price === "string") {
		$fridge_form.price = parseFloat($fridge_form.price);
	}

	$: if ($fridge_form.expiration_on) {
		$fridge_form.expiration_on = new Date($fridge_form.expiration_on);
	}
</script>

<Table {data} />
<div>
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
		<!-- <label class="label">
			<span class="label-text">Purchase date</span>
		</label> -->
		<input
			bind:value={$fridge_form.purchased_on}
			class="input input-bordered join-item"
			type="date"
			name="purchased_on"
			placeholder="purchased_on"
			{...$fridge_constraints.purchased_on}
		/>

		<input
			bind:value={$fridge_form.expiration_on}
			class="input input-bordered join-item"
			type="date"
			name="expiration_on"
			placeholder="expiration_on"
			{...$fridge_constraints.expiration_on}
		/>

		<input
			bind:value={$fridge_form.kind}
			class="input input-bordered join-item"
			type="text"
			name="kind"
			placeholder="kind"
			{...$fridge_constraints.kind}
		/>
		<input
			bind:value={$fridge_form.price}
			class="input input-bordered join-item"
			type="text"
			name="price"
			placeholder="price"
			{...$fridge_constraints.price}
		/>
		<button class="btn btn-primary">INSERT</button>
	</form>
</div>
