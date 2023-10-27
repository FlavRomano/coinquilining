<script lang="ts">
	import ReceiptsNav from "$components/groceries/receipts/ReceiptsNav.svelte";
	import OutgoingsItem from "$components/groceries/receipts/OutgoingsItem.svelte";
	import { writable } from "svelte/store";

	const outgoings = writable([
		{
			id: "item0",
			created_at: "2023-10-13T16:35:48.238698+00:00",
			item_name: "Gnocchetti al sugo",
			price: 3.5,
			from: "someUUID1",
			splitWith: ["someUUID0"],
			house_id: "t0Zpi_o-B",
		},
		{
			id: "item1",
			created_at: "2023-10-21T16:07:52.763933+00:00",
			item_name: "Ombrellone",
			price: 10,
			from: "someUUID1",
			splitWith: ["someUUID0"],
			house_id: "t0Zpi_o-B",
		},
		{
			id: "item2",
			created_at: "2023-10-25T09:35:15.511651+00:00",
			item_name: "Papaveri e paperi",
			price: 2,
			from: "someUUID0",
			splitWith: ["someUUID1"],
			house_id: "t0Zpi_o-B",
		},
	]);

	const roommates = [
		{
			id: "someUUID0",
			email: "fromano000@gmail.com",
			firstname: "Flavio",
			lastname: "Romano",
			house_id: "Zzxjoanw",
			balance: 5.75,
		},
		{
			id: "someUUID1",
			email: "flavio.romano92@gmail.com",
			firstname: "Gabriele",
			lastname: "Patierno",
			house_id: "Zzxjoanw",
			balance: -5.75,
		},
	];
</script>

<div class="text-sm breadcrumbs">
	<ul>
		<li><a href="/demo/house/lifestyle/">Lifestyle</a></li>
		<li>Receipts</li>
	</ul>
</div>

<div class="h-[70vh] w-full overflow-y-scroll rounded-2xl no-scrollbar">
	<!-- display in reverse order -->
	<ul class="rotate-180">
		{#each $outgoings as outgoing, index}
			<li class="rotate-[-180deg] my-3">
				<OutgoingsItem
					{outgoing}
					{roommates}
					outgoingIndex={index}
					demo={true}
				/>
			</li>
		{/each}
	</ul>
</div>

<ReceiptsNav outgoings={true} demo={true} />
