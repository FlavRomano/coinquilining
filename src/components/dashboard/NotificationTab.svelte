<script lang="ts">
	export let notifications;
</script>

<div class="bg-secondary rounded-2xl h-fit">
	<div class="py-2 px-5">
		<h1 class="sticky top-0 font-medium prose-2xl text-secondary-content">
			Notifications
		</h1>

		<div
			class="container h-64 text-secondary-content overflow-y-scroll no-scrollbar"
		>
			{#if $notifications.length !== 0}
				<!-- content here -->
				<ul>
					{#each $notifications as food}
						<li>
							<div class="relative">
								<a class="link" href="/house/food/{food.where}"
									>{food.food_name}</a
								>
								is expiring
								<span class="absolute right-0 opacity-60">
									[{food.expiration}]</span
								>
							</div>
						</li>
					{/each}
				</ul>
			{:else}
				<div class="flex h-full">
					<div class="m-auto">
						<span class="loading loading-ball loading-lg" />
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
