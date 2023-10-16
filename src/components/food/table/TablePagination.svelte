<script lang="ts">
	export let hasNextPage, hasPreviousPage, pageIndex, pageCount;
</script>

<div class="join fixed bottom-[25%] sm:bottom-[20%]">
	<button
		class="join-item btn"
		disabled={!$hasPreviousPage}
		on:click={() => $pageIndex--}>«</button
	>
	<button class="join-item btn">Page {$pageIndex + 1} of {$pageCount}</button>
	<button
		class="join-item btn"
		disabled={!$hasNextPage}
		on:click={() => $pageIndex++}>»</button
	>
</div>
