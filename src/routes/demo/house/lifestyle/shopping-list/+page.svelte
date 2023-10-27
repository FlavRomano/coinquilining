<script lang="ts">
	import ShoppingCard from "$components/groceries/shopping-list/ShoppingCard.svelte";

	const shoppingLists: { id: string; name: string; date: string }[] = [
		{
			id: "fake1",
			name: "Ikea",
			date: "2023-10-12",
		},
		{
			id: "fake2",
			name: "Lidl",
			date: "2023-10-12",
		},
		{
			id: "fake3",
			name: "Penny market",
			date: "2023-10-12",
		},
	];

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

<div class="text-sm breadcrumbs pb-5">
	<ul>
		<li><a href="/demo/house/lifestyle/">Lifestyle</a></li>
		<li>Shopping lists</li>
	</ul>
</div>

<div
	class="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
>
	{#each shoppingLists as list}
		<ShoppingCard
			color={"bg-primary"}
			id={list.id}
			title={list.name}
			paragraph={list.date}
			demo={true}
		/>
	{/each}
	<ShoppingCard />
</div>
