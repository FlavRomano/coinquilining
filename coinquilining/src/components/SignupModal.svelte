<script lang="ts">
	let showModalSignup = () => {
		document
			? document.getElementById("my_modal_2")?.showModal()
			: undefined;
	};
	let closeModalSignup = () => {
		document ? document.getElementById("my_modal_2")?.close() : undefined;
	};
</script>

<div class="dropdown dropdown-end">
	<label tabindex="-1" class="btn m-1">Account</label>
	<ul
		tabindex="-1"
		class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
	>
		<li><a on:click={showModalSignup}>Settings</a></li>
		<li><a href="/">Quit</a></li>
	</ul>
</div>

<dialog id="my_modal_2" class="modal">
	<div class="modal-box" />
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
