<script lang="ts">
	export let data;
	const { roommates, house_id } = data;

	async function copyToClipboard() {
		const text = document.getElementById("house_id").innerHTML;
		const copyContent = async () => {
			try {
				await navigator.clipboard.writeText(text);
				alert("Copied to clipboard: " + text);
			} catch (err) {
				alert("Not copied to clipboard");
			}
		};
		await copyContent();
	}
</script>

<div class="text-xl pt-14">
	<p id="house_id" hidden>
		{house_id}
	</p>
	<div class="pb-5">
		<p><b>Invitation code</b>: {house_id}</p>
		<button on:click={copyToClipboard} class="btn btn-info btn-xs w-full"
			>Click to copy</button
		>
	</div>
	<b>Roommates</b>:
	<ol class="list-disc list-inside">
		{#each roommates as roommate}
			<li>{roommate.firstname} {roommate.lastname}</li>
		{/each}
	</ol>
</div>
