<script lang="ts">
	import Table from "$components/Table.svelte";
	import FridgeAddForm from "$components/fridge/FridgeAddForm.svelte";
	import FridgeEditForm from "$components/fridge/FridgeEditForm.svelte";
	import {
		fridgeAddSchema,
		fridgeRemoveSchema,
		fridgeEditSchema,
	} from "$types/lib/schemas.js";
	import { superForm } from "sveltekit-superforms/client";

	import type { Food } from "$types/lib/server/db/types";
	import { writable } from "svelte/store";
	import type { PageData } from "./$types";

	export let data: PageData;
	const table: Food[] = data.table;
	const roommates: { firstname: string; lastname: string }[] = data.roommates;

	const { form: fridgeAdd_form, constraints: fridgeAdd_constraints } =
		superForm(data.insertFoodForm, {
			taintedMessage: null,
			validators: fridgeAddSchema,
		});

	const { form: fridgeRemove_form, constraints: fridgeRemove_constraints } =
		superForm(data.deleteFoodForm, {
			taintedMessage: null,
			validators: fridgeRemoveSchema,
		});

	const { form: fridgeEdit_form, constraints: fridgeEdit_constraints } =
		superForm(data.editFoodForm, {
			taintedMessage: null,
			validators: fridgeEditSchema,
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
	<div class="join join-horizontal gap-1">
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<button
			class="btn lg:btn-wide btn-lg btn-outline btn-primary join-item"
			on:click={() => {
				$option.restore();
				document.getElementById("addModal").showModal();
			}}>ADD</button
		>
		<dialog id="addModal" class="modal">
			<div class="modal-box">
				<FridgeAddForm
					{fridgeAdd_form}
					{fridgeAdd_constraints}
					{roommates}
				/>
			</div>
			<form method="dialog" class="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>

		<button
			class="btn lg:btn-wide btn-lg btn-outline btn-error join-item"
			on:click={() => {
				if (!$option.remove) $option.restore();
				$option.remove = !$option.remove;
			}}>Remove</button
		>
		<form action="fridge?/delete" id="remove" method="post">
			<input
				bind:value={$fridgeRemove_form.id}
				type="text"
				name="id"
				hidden
				{...$fridgeRemove_constraints.id}
			/>
		</form>

		<button
			class="btn lg:btn-wide btn-lg btn-outline btn-neutral join-item"
			on:click={() => {
				if (!$option.edit) $option.restore();
				$option.edit = !$option.edit;
			}}>Edit</button
		>
		<dialog id="editModal" class="modal">
			<div class="modal-box">
				<FridgeEditForm
					{fridgeEdit_form}
					{fridgeEdit_constraints}
					{roommates}
				/>
			</div>
			<form method="dialog" class="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	</div>
</div>
<Table {table} {option} />
