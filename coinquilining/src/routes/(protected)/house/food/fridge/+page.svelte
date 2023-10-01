<script lang="ts">
	import Table from "$components/Table.svelte";
	import FridgeForm from "$components/fridge/FridgeForm.svelte";
	import { fridgeSchema } from "$types/lib/schemas.js";
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";
	import type { Food } from "$types/lib/server/db/types";

	export let data: PageData;
	const table: Food[] = data.table;
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

<div class="flex flex-col items-center pb-4">
	<div class="join join-horizontal gap-2">
		<button class="btn lg:btn-wide btn-lg btn-outline btn-primary join-item"
			>Add</button
		>
		<button class="btn lg:btn-wide btn-lg btn-outline btn-error join-item"
			>Remove</button
		>
		<button class="btn lg:btn-wide btn-lg btn-outline btn-neutral join-item"
			>Edit</button
		>
	</div>
</div>
<Table {table} />
<!-- <FridgeForm {fridge_form} {fridge_constraints} /> -->
