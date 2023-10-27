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
			food_name: "Uova",
			purchased_on: "1962-03-04",
			expiration: "2023-10-24",
			kind: "Uova",
			price: 1.99,
			id: "4ee5c7ea-d775-4a9c-b57e-5366d786b098",
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
		<li>Fridge</li>
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
