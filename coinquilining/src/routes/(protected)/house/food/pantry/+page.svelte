<script lang="ts">
	import Table from "$components/food/Table.svelte";
	import {
		foodAddSchema,
		foodRemoveSchema,
		foodEditSchema,
	} from "$types/lib/schemas.js";
	import { superForm } from "sveltekit-superforms/client";

	import type { Food } from "$types/lib/server/db/types";
	import { writable } from "svelte/store";
	import type { PageData } from "./$types";
	import TableControls from "$components/food/TableControls.svelte";

	export let data: PageData;
	const table: Food[] = data.table;
	const roommates: { firstname: string; lastname: string }[] = data.roommates;

	const { form: pantryAdd_form, constraints: pantryAdd_constraints } =
		superForm(data.insertFoodForm, {
			taintedMessage: null,
			validators: foodAddSchema,
		});

	const { form: pantryRemove_form, constraints: pantryRemove_constraints } =
		superForm(data.deleteFoodForm, {
			taintedMessage: null,
			validators: foodRemoveSchema,
		});

	const { form: pantryEdit_form, constraints: pantryEdit_constraints } =
		superForm(data.editFoodForm, {
			taintedMessage: null,
			validators: foodEditSchema,
		});

	let option = writable({
		remove: false,
		edit: false,
		targets: {
			deleteTargetID: (targetRowID) => {
				$pantryRemove_form.id = targetRowID;
			},
			editTarget: (targetRowFood) => {
				$pantryEdit_form.id = targetRowFood[0];
				$pantryEdit_form.owner = targetRowFood[1];
				$pantryEdit_form.food_name = targetRowFood[2];
				$pantryEdit_form.kind = targetRowFood[3];
				$pantryEdit_form.purchased_on = targetRowFood[4];
				$pantryEdit_form.expiration_on = targetRowFood[5];
				$pantryEdit_form.price = targetRowFood[6];
			},
		},
		restore: () => {
			$option.remove = false;
			$option.edit = false;
			$pantryRemove_form.id = undefined;
		},
	});
</script>

<Table {table} {option} />
<div class="flex flex-col items-center pb-4">
	<div
		class="fixed bottom-[8%] sm:bottom-[10%] md:bottom-[12%] lg:bottom-[16%]"
	>
		<TableControls
			section={"pantry"}
			{option}
			{roommates}
			add_form={pantryAdd_form}
			add_constraints={pantryAdd_constraints}
			edit_form={pantryEdit_form}
			edit_constraints={pantryEdit_constraints}
			remove_form={pantryRemove_form}
			remove_constraints={pantryRemove_constraints}
		/>
	</div>
</div>
