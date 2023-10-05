<script lang="ts">
	import Table from "$components/Table.svelte";
	import {
		foodAddSchema,
		foodRemoveSchema,
		foodEditSchema,
	} from "$types/lib/schemas.js";
	import { superForm } from "sveltekit-superforms/client";

	import type { Food } from "$types/lib/server/db/types";
	import { writable } from "svelte/store";
	import type { PageData } from "./$types";
	import TableControls from "$components/TableControls.svelte";

	export let data: PageData;
	const table: Food[] = data.table;
	const roommates: { firstname: string; lastname: string }[] = data.roommates;

	const { form: fridgeAdd_form, constraints: fridgeAdd_constraints } =
		superForm(data.insertFoodForm, {
			taintedMessage: null,
			validators: foodAddSchema,
		});

	const { form: fridgeRemove_form, constraints: fridgeRemove_constraints } =
		superForm(data.deleteFoodForm, {
			taintedMessage: null,
			validators: foodRemoveSchema,
		});

	const { form: fridgeEdit_form, constraints: fridgeEdit_constraints } =
		superForm(data.editFoodForm, {
			taintedMessage: null,
			validators: foodEditSchema,
		});

	let option = writable({
		remove: false,
		edit: false,
		targets: {
			deleteTargetID: (targetRowID) => {
				$fridgeRemove_form.id = targetRowID;
			},
			editTarget: (targetRowFood) => {
				$fridgeEdit_form.id = targetRowFood[0];
				$fridgeEdit_form.owner = targetRowFood[1];
				$fridgeEdit_form.food_name = targetRowFood[2];
				$fridgeEdit_form.kind = targetRowFood[3];
				$fridgeEdit_form.purchased_on = targetRowFood[4];
				$fridgeEdit_form.expiration_on = targetRowFood[5];
				$fridgeEdit_form.price = targetRowFood[6];
			},
		},
		restore: () => {
			$option.remove = false;
			$option.edit = false;
			$fridgeRemove_form.id = undefined;
		},
	});
</script>

<div class="flex flex-col items-center pb-4">
	<TableControls
		{option}
		{roommates}
		add_form={fridgeAdd_form}
		add_constraints={fridgeAdd_constraints}
		edit_form={fridgeEdit_form}
		edit_constraints={fridgeEdit_constraints}
		remove_form={fridgeRemove_form}
		remove_constraints={fridgeRemove_constraints}
	/>
</div>
<Table {table} {option} />
