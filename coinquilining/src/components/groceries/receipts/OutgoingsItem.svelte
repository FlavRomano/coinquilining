<script lang="ts">
	import OutgoingsIcon from "./OutgoingsIcon.svelte";
	export let outgoing, roommates, outgoingIndex;
	let item = outgoing.item_name;
	let price = Number(outgoing.price).toLocaleString("it-IT", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
		style: "currency",
		currency: "EUR",
	});
	const owner = roommates.find((roommate) => roommate.id === outgoing.from);
</script>

<button
	on:click={() =>
		document.getElementById(`editOutgoing${outgoingIndex}`).showModal()}
	class="bg-base-200 relative rounded-lg w-full"
>
	<div class="mx-3">
		<div class="float-left mr-5">
			<OutgoingsIcon />
		</div>
		<div class="float-left">
			<p
				class="prose prose-stone prose-lg font-semibold lg:prose-xl break-words text-left"
			>
				{item}<br />{owner.firstname + " " + owner.lastname}
			</p>
		</div>

		<div class="absolute right-4 top-4">
			<p class="prose prose-xl font-semibold">{price}</p>
		</div>
	</div>
</button>

<dialog id={`editOutgoing${outgoingIndex}`} class="modal">
	<div class="modal-box max-w-xs">
		<form action="?/edit" method="post" class="form-control gap-2">
			<input hidden type="text" name="from" value={owner.id} />
			<input
				value={item}
				minlength="4"
				maxlength="32"
				type="text"
				name="title"
				class="input input-bordered w-full"
				placeholder="Title"
				required
			/>
			<input
				value={parseFloat(price)}
				type="number"
				step="0.01"
				name="price"
				class="input input-bordered w-full"
				placeholder="Price"
				required
			/>
			<button class="btn btn-info w-full">EDIT</button>
		</form>
		<div class="divider">OR</div>
		<form action="?/delete" method="post" class="form-control gap-2">
			<button class="btn btn-error w-full">DELETE</button>
		</form>
	</div>

	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
