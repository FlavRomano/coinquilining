<script>
	import cleaning from "$lib/assets/house/cleaning.jpeg";
	import shoppingList from "$lib/assets/house/shoppingList.jpeg";
	import receipts from "$lib/assets/house/receipts.jpeg";
</script>

<div
	class="grid place-items-center gap-4 lg:pt-12 lg:grid lg:grid-cols-3 sm:grid-cols-1 sm:gap-4 md:grid-cols-2 md:gap-4"
>
	<div class="card w-80 bg-base-100 shadow-xl">
		<figure>
			<img src={cleaning} alt="Cleaning things" />
		</figure>
		<div class="card-body">
			<h2 class="card-title">Cleaning rotations</h2>
			<p><i>Shuffle</i> your broom</p>
			<div class="card-actions justify-end">
				<a
					class="btn btn-primary w-full lg:w-fit"
					href="/house/lifestyle/cleaning-rotations">CLICK ME</a
				>
			</div>
		</div>
	</div>

	<div class="card w-80 bg-base-100 shadow-xl">
		<figure>
			<img src={shoppingList} alt="Shopping list" />
		</figure>
		<div class="card-body">
			<h2 class="card-title">Shopping list</h2>
			<p>But not when you're hungry</p>
			<div class="card-actions justify-end">
				<a
					href="/house/lifestyle/shopping-list"
					class="btn btn-primary w-full lg:w-fit">Click me</a
				>
			</div>
		</div>
	</div>

	<div class="card w-80 bg-base-100 shadow-xl">
		<figure>
			<img src={receipts} alt="Receipt" />
		</figure>
		<div class="card-body">
			<h2 class="card-title">Receipts</h2>
			<p>Money is not everything</p>
			<div class="card-actions justify-end">
				<a
					href="/house/lifestyle/receipts"
					class="btn btn-primary w-full lg:w-fit">Click me</a
				>
			</div>
		</div>
	</div>
</div>
