<script lang="ts">
	import OutgoingsIcon from "./OutgoingsIcon.svelte";
	export let outgoing, roommates, outgoingIndex;
	export let demo = false;

	let item = outgoing.item_name;
	let price = Number(outgoing.price).toLocaleString("it-IT", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
		style: "currency",
		currency: "EUR",
	});
	let id = outgoing.id;
	const owner = roommates.find((roommate) => roommate.id === outgoing.from);
</script>

<button
	on:click={() =>
		document.getElementById(`editOutgoing${outgoingIndex}`).showModal()}
	class="bg-accent rounded-lg w-full relative"
>
	<div class="mx-3">
		<div class="float-left mr-5">
			<OutgoingsIcon />
		</div>
		<div
			class="float-left prose text-accent-content prose-lg font-semibold lg:prose-xl"
		>
			<p class="break-words text-left">
				{item} <br />
				<span class="font-normal"
					>{owner.firstname + " " + owner.lastname}</span
				>
			</p>
		</div>
	</div>
	<div class="absolute top-[22%] right-5">
		<span class="prose prose-xl font-semibold">{price}</span>
	</div>
</button>

<dialog id={`editOutgoing${outgoingIndex}`} class="modal">
	<div class="modal-box max-w-xs">
		<form
			action="?/edit"
			method={demo ? "" : "POST"}
			class="form-control gap-2"
		>
			<input type="text" name="id" value={id} hidden />
			<select
				name="owner"
				class="select select-bordered w-full max-w-xs"
				required
			>
				<option value={owner.id} selected
					>From: {owner.firstname + " " + owner.lastname}</option
				>
				{#each roommates.filter((obj) => obj.id !== owner.id) as roommate}
					<option value={roommate.id}
						>From: {roommate.firstname +
							" " +
							roommate.lastname}</option
					>
				{/each}
			</select>
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
			{#if outgoing.splitWith !== null && outgoing.splitWith.length !== 0}
				<ul>
					<span class="label-text">Splitting with:</span>
					{#each roommates.filter((obj) => obj.id !== owner.id) as roommate, i}
						<li>
							<label class="label cursor-pointer">
								<span class="label-text"
									>{roommate.firstname +
										" " +
										roommate.lastname}</span
								>
								<input
									type="checkbox"
									checked={outgoing.splitWith.includes(
										roommate.id
									)
										? true
										: false}
									class="checkbox"
									value={roommate.id}
									name="split{i}"
								/>
							</label>
						</li>
					{/each}
				</ul>
			{:else}
				<ul>
					<span class="label-text">Wanna split?</span>
					{#each roommates.filter((obj) => obj.id !== owner.id) as roommate, i}
						<li>
							<label class="label cursor-pointer">
								<span class="label-text"
									>{roommate.firstname +
										" " +
										roommate.lastname}</span
								>
								<input
									type="checkbox"
									class="checkbox"
									value={roommate.id}
									name="split{i}"
								/>
							</label>
						</li>
					{/each}
				</ul>
			{/if}
			<button class="btn btn-info w-full">EDIT</button>
		</form>
		<div class="divider">OR</div>
		<form
			action="?/delete"
			method={demo ? "" : "POST"}
			class="form-control gap-2"
		>
			<input type="text" name="id" value={id} hidden />
			<button class="btn btn-error w-full">DELETE</button>
		</form>
	</div>

	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
