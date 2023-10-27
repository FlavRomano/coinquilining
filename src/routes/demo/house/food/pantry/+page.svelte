<script lang="ts">
	import Table from "$components/food/table/Table.svelte";

	let table: {
		id: any;
		owner_id: any;
		food_name: any;
		kind: any;
		purchased_on: any;
		expiration: any;
		price: any;
		is_expired: any;
	}[] = [
		{
			food_name: "Fusilli",
			purchased_on: "2023-10-16",
			expiration: "2024-02-20",
			kind: "Pasta",
			price: 0.8,
			id: "dddd544c-ae62-493a-a509-5e3a38a0bd62",
			owner_id: "someUUID1",
			is_expired: false,
		},
		{
			food_name: "Broccoli",
			purchased_on: "2023-10-16",
			expiration: "2024-01-20",
			kind: "Surgelato",
			price: 1.7,
			id: "090dd04b-f583-4502-a31f-68395deaae11",
			owner_id: "someUUID0",
			is_expired: false,
		},
		{
			food_name: "Cavoli",
			purchased_on: "2023-10-25",
			expiration: "2024-01-11",
			kind: "Verdure",
			price: 1.5,
			id: "6f0f7d99-8542-485b-b1a7-18b4eae85647",
			owner_id: "someUUID1",
			is_expired: false,
		},
		{
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
		<li><a href="/demo/house/dashboard">House</a></li>
		<li><a href="/demo/house/food">Food</a></li>
		<li>Pantry</li>
	</ul>
</div>

<Table {table} {roommates} demo={true} />
<div class="flex flex-col place-items-center">
	<div class="join fixed bottom-[25%] sm:bottom-[20%]">
		<button class="join-item btn" disabled={true}>«</button>
		<button class="join-item btn">Page 1 of 1</button>
		<button class="join-item btn" disabled={true}>»</button>
	</div>

	<div class="join fixed bottom-[15%] sm:bottom-[8%] lg:bottom-[8%]">
		<button class="btn btn-lg join-item">ADD</button>

		<form action="?/delete" method="post">
			<input type="hidden" name="deleteIds" />
			<button class="btn btn-lg join-item" disabled={true}>Delete</button>
		</form>

		<button disabled={true} class="btn join-item btn-lg">EDIT</button>
	</div>
</div>
