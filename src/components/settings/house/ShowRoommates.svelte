<script lang="ts">
	export let roommates: string[] = ["Flavio Romano", "Gabriele Patierno"];
</script>

<div class="text-xl">
	<ul>
		{#each roommates as roommate}
			<li>{roommate}</li>
		{/each}
	</ul>
</div>
