<script>
	import fridge from "$lib/assets/food/fridge.jpeg";
	import pantry from "$lib/assets/food/pantry.jpeg";
	import recipes from "$lib/assets/food/recipes.jpeg";
</script>

<div
	class="grid place-items-center gap-4 lg:pt-12 lg:grid lg:grid-cols-3 sm:grid-cols-1 sm:gap-4 md:grid-cols-2 md:gap-4"
>
	<div class="card w-80 bg-base-100 shadow-xl">
		<figure>
			<img src={fridge} alt="Fridge" />
		</figure>
		<div class="card-body">
			<h2 class="card-title">Fridge</h2>
			<p>The one and only</p>
			<div class="card-actions justify-end">
				<a
					class="btn btn-primary w-full lg:w-fit"
					href="/demo/house/food/fridge">Click me</a
				>
			</div>
		</div>
	</div>

	<div class="card w-80 bg-base-100 shadow-xl">
		<figure>
			<img src={pantry} alt="Pantry" />
		</figure>
		<div class="card-body">
			<h2 class="card-title">Pantry</h2>
			<p>Onions, tuna, pasta... what else?</p>
			<div class="card-actions justify-end">
				<a
					class="btn btn-primary w-full lg:w-fit"
					href="/demo/house/food/pantry">Click me</a
				>
			</div>
		</div>
	</div>

	<div class="card w-80 bg-base-100 shadow-xl">
		<figure>
			<img src={recipes} alt="Recipes" />
		</figure>
		<div class="card-body">
			<h2 class="card-title">Recipes</h2>
			<p>Dream big, but first let's eat</p>
			<div class="card-actions justify-end">
				<a
					class="btn btn-primary w-full lg:w-fit"
					href="/demo/house/food/recipes">Click me</a
				>
			</div>
		</div>
	</div>
</div>
