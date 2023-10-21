<script lang="ts">
	export let text, name;
	export let form, constraints;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="label">
	<span class="label-text">{text}</span>
</label>
<div class="join join-horizontal gap-2 w-full">
	{#if name === "oldPassword"}
		<input
			bind:value={$form.oldPassword}
			placeholder="Password"
			class="input input-bordered w-full max-w-xs"
			type="password"
			{name}
			{...$constraints.oldPassword}
			required
		/>
	{:else}
		<input
			bind:value={$form.newPassword}
			placeholder="Password"
			class="input input-bordered w-full max-w-xs"
			type="password"
			{name}
			{...$constraints.newPassword}
			required
		/>
	{/if}
</div>
