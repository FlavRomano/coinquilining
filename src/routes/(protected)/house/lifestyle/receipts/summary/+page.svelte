<script lang="ts">
	import AddReceipt from "$components/groceries/receipts/AddReceipt.svelte";
	import ReceiptsNav from "$components/groceries/receipts/ReceiptsNav.svelte";
	import SummaryItem from "$components/groceries/receipts/SummaryItem.svelte";
	import type { PageData } from "./$types";
	import { summary, timeout_summary } from "$lib/stores";
	// import { getFridge, getPantry } from "$types/lib/utilities";
	import { onMount } from "svelte";
	import { sumPricesByOwner } from "$types/lib";

	export let data: PageData;

	const { roommates, house_id, userId } = data;
	let loaded = false;

	onMount(async () => {
		if (
			$timeout_summary === true ||
			!$summary.fridgePrices ||
			!$summary.pantryPrices
		) {
			$timeout_summary = false;
			const fridge = await (async () => {
				const response = await fetch(
					`/api/fridge?house_id=${house_id}`
				);
				if (response.ok) return await response.json();
			})();
			const pantry = await (async () => {
				const response = await fetch(
					`/api/pantry?house_id=${house_id}`
				);
				if (response.ok) return await response.json();
			})();

			const fridgePrices = sumPricesByOwner(fridge);
			const pantryPrices = sumPricesByOwner(pantry);

			summary.set({ fridgePrices, pantryPrices });

			console.log($summary);
		}
		loaded = true;
	});
</script>

<div class="text-sm breadcrumbs">
	<ul>
		<li><a href="/house/lifestyle/">Lifestyle</a></li>
		<li>Receipts</li>
	</ul>
</div>

<div class="w-full h-[55vh] overflow-y-scroll no-scrollbar">
	{#if loaded}
		<ul>
			{#each roommates as roommate}
				<li class="my-5">
					<SummaryItem {roommate} {summary} />
				</li>
			{/each}
		</ul>
	{:else}
		<div class="flex flex-col items-center">
			<span class="loading loading-spinner loading-lg" />
		</div>
	{/if}
</div>

<div class="grid grid-cols-2 place-items-center">
	<div class="fixed bottom-[15%]">
		<AddReceipt {roommates} {userId} />
	</div>
</div>

<ReceiptsNav summary={true} />
