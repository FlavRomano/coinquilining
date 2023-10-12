<script lang="ts">
	import ReceiptsNav from "$components/groceries/receipts/ReceiptsNav.svelte";
	import SummaryItem from "$components/groceries/receipts/SummaryItem.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	let roommates = data.roommates;

	let outgoings = [
		{
			id: 1,
			title: "Lampadina",
			price: 6.5,
			from: roommates[0],
			splitWith: [roommates[1]],
		},
		{
			id: 2,
			title: "Chair",
			price: 45.0,
			from: roommates[1],
			splitWith: [roommates[0]],
		},
		{
			id: 3,
			title: "Table",
			price: 80.0,
			from: roommates[1],
			splitWith: [roommates[0]],
		},
	];

	let payments = [
		{
			id: 1,
			amount: 3.25,
			from: roommates[1],
			to: [roommates[0]],
		},
	];
</script>

<div class="fixed w-full h-full">
	<div class="m-5 overflow-auto h-3/5">
		<ul>
			{#each roommates as roommate}
				<li class="my-5">
					<SummaryItem {roommate} {outgoings} {payments} />
				</li>
			{/each}
		</ul>
	</div>
</div>

<ReceiptsNav summary={true} {roommates} />
