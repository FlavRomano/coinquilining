<script lang="ts">
	import AddForm from "./AddForm.svelte";
	import EditForm from "./EditForm.svelte";
	export let option, roommates, section;
	export let add_form, add_constraints;
	export let edit_form, edit_constraints;
	export let remove_form, remove_constraints;
</script>

<dialog id="addModal" class="modal">
	<div class="modal-box">
		<AddForm {section} {add_form} {add_constraints} {roommates} />
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<dialog id="editModal" class="modal">
	<div class="modal-box">
		<EditForm {edit_form} {edit_constraints} {roommates} />
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<div class="join join-horizontal gap-1">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<button
		class="btn lg:btn-wide btn-lg btn-outline btn-primary join-item"
		on:click={() => {
			$option.restore();
			document.getElementById("addModal").showModal();
		}}>ADD</button
	>

	<button
		class="btn lg:btn-wide btn-lg btn-outline btn-error join-item {$option.remove
			? 'btn-active'
			: ''}"
		on:click={() => {
			if (!$option.remove) $option.restore();
			$option.remove = !$option.remove;
		}}>Remove</button
	>

	<button
		class="btn lg:btn-wide btn-lg btn-outline btn-neutral join-item {$option.edit
			? 'btn-active'
			: ''}"
		on:click={() => {
			if (!$option.edit) $option.restore();
			$option.edit = !$option.edit;
		}}>Edit</button
	>
</div>

<form action="{section}?/delete" id="remove" method="post">
	<input
		bind:value={$remove_form.id}
		type="text"
		name="id"
		hidden
		{...$remove_constraints.id}
	/>
</form>
