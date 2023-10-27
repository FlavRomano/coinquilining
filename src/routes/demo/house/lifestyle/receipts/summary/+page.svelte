<script lang="ts">
	import ReceiptsNav from "$components/groceries/receipts/ReceiptsNav.svelte";
</script>

<div class="text-sm breadcrumbs">
	<ul>
		<li><a href="/demo/house/lifestyle/">Lifestyle</a></li>
		<li>Receipts</li>
	</ul>
</div>

<div class=" w-full h-[55vh] overflow-y-scroll no-scrollbar">
	<ul>
		<li class="my-5">
			<div class="collapse bg-info text-info-content'}">
				<input type="checkbox" />
				<div class="collapse-title text-xl font-medium">
					Flavio Romano
					<div class="absolute right-4 top-4">5,75 €</div>
				</div>
				<div class="collapse-content">
					<ul>
						<li>
							<a class="link" href="/house/food/fridge">Fridge</a
							>: 16 €
						</li>
						<li>
							<a class="link" href="/house/food/pantry">Pantry</a
							>: 14 €
						</li>
					</ul>
				</div>
			</div>
		</li>
		<li class="my-5">
			<div class="collapse bg-info text-info-content'}">
				<input type="checkbox" />
				<div class="collapse-title text-xl font-medium">
					Gabriele Patierno
					<div class="absolute right-4 top-4">-5,75 €</div>
				</div>
				<div class="collapse-content">
					<ul>
						<li>
							<a class="link" href="/house/food/fridge">Fridge</a
							>: 16 €
						</li>
						<li>
							<a class="link" href="/house/food/pantry">Pantry</a
							>: 14 €
						</li>
					</ul>
				</div>
			</div>
		</li>
	</ul>
</div>

<div class="grid grid-cols-2 place-items-center">
	<div class="fixed bottom-[15%]">
		<button class="btn btn-lg sm:btn-wide btn-primary">ADD RECEIPT</button>
	</div>
</div>

<ReceiptsNav summary={true} demo={true} />
