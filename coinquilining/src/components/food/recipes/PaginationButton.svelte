<script lang="ts">
	export let pageTab, recipes;
</script>

<div class="join">
	<button
		on:click={() => {
			if ($pageTab > 0) {
				$pageTab--;
				document.documentElement.scrollTop = 0;
			}
		}}
		class="join-item btn">«</button
	>
	<button class="join-item btn">Page {$pageTab + 1}</button>
	<button
		on:click={() => {
			if ($pageTab < $recipes.length - 1) {
				$pageTab++;
				document.documentElement.scrollTop = 0;
			}
		}}
		class="join-item btn">»</button
	>
</div>
