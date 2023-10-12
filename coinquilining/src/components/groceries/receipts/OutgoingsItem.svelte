<script lang="ts">
	import OutgoingsIcon from "./OutgoingsIcon.svelte";
	export let outgoing, roommates;
	let item = outgoing.title;
	let owner = outgoing.from.name + " " + outgoing.from.surname;
	let price = Number(outgoing.price).toLocaleString("it-IT", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
		style: "currency",
		currency: "EUR",
	});
</script>

<button class="bg-base-200 relative rounded-lg w-full">
	<div class="mx-3">
		<div class="float-left mr-5">
			<OutgoingsIcon />
		</div>
		<div class="float-left">
			<p
				class="prose prose-stone prose-lg font-semibold lg:prose-xl break-words text-left"
			>
				{item}<br />{owner}
			</p>
		</div>

		<div class="absolute right-4 top-4">
			<p class="prose prose-xl font-semibold">{price}</p>
		</div>
	</div>
</button>
