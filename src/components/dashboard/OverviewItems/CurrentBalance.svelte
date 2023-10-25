<script lang="ts">
	export let roommate;

	const formatEuro = (amount) => {
		return Number(amount).toLocaleString("it-IT", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
			style: "currency",
			currency: "EUR",
		});
	};

	let balance = formatEuro(roommate.balance);
</script>

<div class="collapse bg-transparent collapse-open">
	<input type="checkbox" />
	<div class="collapse-title text-xl font-medium">
		{roommate.firstname + " " + roommate.lastname}
		<div class="absolute right-4 top-4">{balance}</div>
	</div>
</div>
