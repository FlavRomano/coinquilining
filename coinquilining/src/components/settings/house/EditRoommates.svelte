<script lang="ts">
	export let roommates: string[] = ["Flavio Romano", "Gabriele Patierno"];
</script>

<ul>
	{#each roommates as roommate}
		<li>{roommate}</li>
	{/each}
</ul>
