<script lang="ts">
	import SelectTable from "$components/food/recipes/SelectTable.svelte";

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
	const table = [
		{
			house_id: "t0Zpi_o-B",
			food_name: "Uova",
			purchased_on: "1962-03-04",
			expiration: "2023-10-24",
			kind: "Uova",
			price: 1.99,
			id: "4ee5c7ea-d775-4a9c-b57e-5366d786b098",
			owner_id: "someUUID0",
			is_expired: true,
		},
		{
			house_id: "t0Zpi_o-B",
			food_name: "Fusilli",
			purchased_on: "2023-10-16",
			expiration: "2024-02-20",
			kind: "Pasta",
			price: 0.8,
			id: "dddd544c-ae62-493a-a509-5e3a38a0bd62",
			owner_id: "someUUID0",
			is_expired: false,
		},
		{
			house_id: "t0Zpi_o-B",
			food_name: "Broccoli",
			purchased_on: "2023-10-16",
			expiration: "2024-01-20",
			kind: "Surgelato",
			price: 1.7,
			id: "090dd04b-f583-4502-a31f-68395deaae11",
			owner_id: "someUUID1",
			is_expired: false,
		},
		{
			house_id: "t0Zpi_o-B",
			food_name: "Cavoli",
			purchased_on: "2023-10-25",
			expiration: "2024-01-11",
			kind: "Verdure",
			price: 1.5,
			id: "6f0f7d99-8542-485b-b1a7-18b4eae85647",
			owner_id: "someUUID0",
			is_expired: false,
		},
		{
			house_id: "t0Zpi_o-B",
			food_name: "Patate",
			purchased_on: "2023-10-24",
			expiration: "2023-10-24",
			kind: "Verdure",
			price: 1.7,
			id: "192ae535-ad37-457a-ac65-f4389f149aa2",
			owner_id: "someUUID0",
			is_expired: true,
		},
	];
</script>

<div class="text-sm breadcrumbs">
	<ul>
		<li><a href="/demo/house/dashboard">House</a></li>
		<li><a href="/demo/house/food">Food</a></li>
		<li>Recipes</li>
	</ul>
</div>
<SelectTable {table} {roommates} demo={true} />
