<script lang="ts">
	import type { Food } from "$types/lib/server/db/types";
	import {
		latestShoppingLists,
		timeout_shoppingList,
	} from "$types/lib/stores";
	import { onMount } from "svelte";
	import CurrentBalance from "./OverviewItems/CurrentBalance.svelte";

	export let roommates;
	export let house_id;

	onMount(async () => {
		if (
			$latestShoppingLists.length === 0 ||
			$timeout_shoppingList === true
		) {
			const latestSL: Food[] = await (async () => {
				const response = await fetch(
					`/api/shopping-list?house_id=${house_id}&latest=true`
				);
				if (response.ok) return await response.json();
			})();
			$timeout_shoppingList = false;
			$latestShoppingLists = [...latestSL];
		}
	});
</script>

<div class="bg-primary rounded-2xl">
	<div class="py-2 px-5">
		<div class="font-medium prose-2xl text-primary-content">Overview</div>
		<div class="text-primary-content">
			<ul class="space-y-2">
				<li>
					<div
						class="collapse collapse-plus bg-neutral bg-opacity-30"
					>
						<input type="checkbox" />
						<div class="collapse-title text-xl font-medium">
							Balance
						</div>
						<div class="collapse-content">
							{#each roommates as roommate}
								<CurrentBalance {roommate} />
							{/each}
						</div>
					</div>
				</li>
				<li>
					<div
						class="collapse collapse-plus bg-neutral bg-opacity-30"
					>
						<input type="checkbox" />
						<div class="collapse-title text-xl font-medium">
							Latest shopping list
						</div>
						<div class="collapse-content">
							{#if $latestShoppingLists.length == 0}
								Nothing to see...
							{/if}
							<ul>
								{#each $latestShoppingLists as shoppingList}
									<div class="relative">
										<a
											class="link"
											href="/house/lifestyle/shopping-list/{shoppingList.id}"
											>{shoppingList.name}</a
										>
										<span
											class="absolute right-0 opacity-60"
										>
											[{shoppingList.date}]</span
										>
									</div>
								{/each}
							</ul>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>
