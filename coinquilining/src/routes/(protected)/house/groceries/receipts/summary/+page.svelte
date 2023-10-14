<script lang="ts">
	import AddReceipt from "$components/groceries/receipts/AddReceipt.svelte";
	import AddPayment from "$components/groceries/receipts/AddPayment.svelte";
	import ReceiptsNav from "$components/groceries/receipts/ReceiptsNav.svelte";
	import SummaryItem from "$components/groceries/receipts/SummaryItem.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	const roommates: {
		id: string;
		firstname: string;
		lastname: string;
		amount: Number;
	}[] = data.roommates;
	const userId = data.userId;
</script>

<div class="fixed w-full h-full">
	<div class="m-5 overflow-auto h-3/5">
		<ul>
			{#each roommates as roommate}
				<li class="my-5">
					<SummaryItem {roommate} />
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
