<script lang="ts">
	export let roommate;

	let balance = Number(roommate.balance).toLocaleString("it-IT", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
		style: "currency",
		currency: "EUR",
	});
</script>

<div class="collapse bg-base-200">
	<input type="checkbox" />
	<div class="collapse-title text-xl font-medium">
		{roommate.firstname + " " + roommate.lastname}
		<div class="absolute right-4 top-4">{balance}</div>
	</div>
	<div class="collapse-content">TODO</div>
</div>
