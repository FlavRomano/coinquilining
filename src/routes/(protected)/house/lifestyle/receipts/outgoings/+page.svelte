<script lang="ts">
	import ReceiptsNav from "$components/groceries/receipts/ReceiptsNav.svelte";
	import OutgoingsItem from "$components/groceries/receipts/OutgoingsItem.svelte";
	import type { PageData } from "./$types";
	import { outgoings, timeout_ougoings } from "$types/lib/stores";
	import { onMount } from "svelte";

	export let data: PageData;

	const { house_id, roommates } = data;

	onMount(async () => {
		if ($outgoings.length === 0 || $timeout_ougoings === true) {
			const currentOutgoings = await (async () => {
				const response = await fetch(
					`/api/receipts/outgoings?house_id=${house_id}`
				);
				if (response.ok) return await response.json();
			})();
			$timeout_ougoings = false;
			$outgoings = [...currentOutgoings];
		} else console.log("cached");
	});
</script>

<div class="text-sm breadcrumbs">
	<ul>
		<li><a href="/house/lifestyle/">Lifestyle</a></li>
		<li>Receipts</li>
	</ul>
</div>

<div class="pr-5 fixed w-full h-full">
	<div class="pr-5 overflow-auto h-3/5">
		<ul>
			{#each $outgoings as outgoing, index}
				<li class="my-3">
					<OutgoingsItem
						{outgoing}
						{roommates}
						outgoingIndex={index}
					/>
				</li>
			{/each}
		</ul>
	</div>
</div>
<ReceiptsNav outgoings={true} />
