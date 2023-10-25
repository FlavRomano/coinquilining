<script lang="ts">
	import { onMount } from "svelte";

	export let roommate;

	export let summary;

	export let isOverview = false;

	const formatEuro = (amount) => {
		return Number(amount).toLocaleString("it-IT", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
			style: "currency",
			currency: "EUR",
		});
	};

	let balance = formatEuro(roommate.balance);

	let roommateFridgePrice = [];
	let roommatePantryPrice = [];

	$: if ($summary.fridgePrices && $summary.pantryPrices) {
		roommateFridgePrice = $summary.fridgePrices.filter(
			(obj) => obj.owner_id === roommate.id
		);
		roommatePantryPrice = $summary.pantryPrices.filter(
			(obj) => obj.owner_id === roommate.id
		);
	}
</script>

<div
	class="collapse {isOverview
		? 'bg-transparent collapse-open'
		: 'bg-info text-info-content'}"
>
	<input type="checkbox" />
	<div class="collapse-title text-xl font-medium">
		{roommate.firstname + " " + roommate.lastname}
		<div class="absolute right-4 top-4">{balance}</div>
	</div>
	{#if !isOverview}
		<div class="collapse-content">
			<ul>
				<li>
					<a class="link" href="/house/food/fridge">Fridge</a>:
					{roommateFridgePrice.length === 0
						? formatEuro(0)
						: formatEuro(roommateFridgePrice[0].price)}
				</li>
				<li>
					<a class="link" href="/house/food/pantry">Pantry</a>:
					{roommatePantryPrice.length === 0
						? formatEuro(0)
						: formatEuro(roommatePantryPrice[0].price)}
				</li>
			</ul>
		</div>
	{/if}
</div>
