<script lang="ts">
	import ReceiptsNav from "$components/groceries/receipts/ReceiptsNav.svelte";
	import OutgoingsItem from "$components/groceries/receipts/OutgoingsItem.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	const roommates = data.roommates;
	const outgoings = data.outgoings;
</script>

<div class="fixed w-full h-full">
	<div class="m-5 overflow-auto h-3/5">
		<ul>
			{#each outgoings as outgoing, index}
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
