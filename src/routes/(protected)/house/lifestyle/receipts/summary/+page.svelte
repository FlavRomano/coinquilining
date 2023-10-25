<script lang="ts">
	import AddReceipt from "$components/groceries/receipts/AddReceipt.svelte";
	import ReceiptsNav from "$components/groceries/receipts/ReceiptsNav.svelte";
	import SummaryItem from "$components/groceries/receipts/SummaryItem.svelte";
	import type { PageData } from "./$types";
	import { summary, timeout_summary } from "$lib/stores";
	import { getFridge, getPantry } from "$types/lib/utilities";
	import { onMount } from "svelte";
	import { sumPricesByOwner } from "$types/lib";

	export let data: PageData;

	const { roommates, house_id, userId } = data;

	onMount(async () => {
		if (
			$timeout_summary === true ||
			!$summary ||
			$summary.fridgePrices === undefined ||
			$summary.pantryPrices === undefined
		) {
			$timeout_summary = false;
			const fridge = await getFridge(fetch, house_id);
			const pantry = await getPantry(fetch, house_id);

			const fridgePrices = sumPricesByOwner(fridge);
			const pantryPrices = sumPricesByOwner(pantry);

			$summary = { fridgePrices, pantryPrices };

			console.log($summary);
		} else console.log("cached");
	});
</script>

<div class="pr-10 fixed w-full h-full">
	<div class="overflow-auto h-3/5">
		<ul>
			{#each roommates as roommate}
				<li class="my-5">
					<SummaryItem {roommate} {summary} />
				</li>
			{/each}
		</ul>
	</div>
</div>

<div class="grid grid-cols-2 place-items-center">
	<div class="fixed bottom-[15%]">
		<AddReceipt {roommates} {userId} />
	</div>
</div>

<ReceiptsNav summary={true} />
