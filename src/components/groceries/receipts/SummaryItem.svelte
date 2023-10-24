<script lang="ts">
	export let roommate;

	export let fridgePrices = [];
	export let pantryPrices = [];

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

	const roommateFridgePrice = fridgePrices.filter(
		(obj) => obj.owner_id === roommate.id
	);
	const pantryFridgePrice = pantryPrices.filter(
		(obj) => obj.owner_id === roommate.id
	);
</script>

<div
	class="collapse collapse-plus {isOverview
		? 'bg-transparent collapse-open'
		: 'bg-base-200'}"
>
	<input type="checkbox" />
	<div class="collapse-title text-xl font-medium">
		{roommate.firstname + " " + roommate.lastname}
		<div class="absolute right-4 top-4">{balance}</div>
	</div>
	{#if !isOverview}
		<div class="collapse-content">
			<a href="/house/lifestyle/receipts" class="link">Receipts</a>

			<p class="prose-md">Other expenses</p>
			<ul>
				<li>
					<a class="link" href="/house/food/fridge">Fridge</a>:
					{roommateFridgePrice.length === 0
						? formatEuro(0)
						: formatEuro(roommateFridgePrice[0].price)}
				</li>
				<li>
					<a class="link" href="/house/food/pantry">Pantry</a>:
					{pantryFridgePrice.length === 0
						? formatEuro(0)
						: formatEuro(pantryFridgePrice[0].price)}
				</li>
			</ul>
		</div>
	{/if}
</div>
