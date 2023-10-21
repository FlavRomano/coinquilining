<script lang="ts">
	export let data;

	const words = data.wordsForDestroy;
</script>

<div class="prose prose-xl">
	<p class="prose-p">
		Copy the following words to <b>delete permanently</b> the house:
	</p>
	<p class="text-center text-primary-focus">
		<b>{words}</b>
	</p>
	<p class="prose-p">
		Let your roommates know what you are doing, Coinquilining won't.
	</p>
</div>
<div class="pt-5 grid grid-cols-1 place-items-center">
	<form
		action="?/destroyHouse"
		method="POST"
		class="form-control gap-4 w-full max-w-xs"
	>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<div class="join-item">
			<label class="label">
				<span class="label-text"
					>Insert the words (including the hyphens)</span
				>
			</label>
			<input
				type="text"
				placeholder="Dangerous words"
				name="words"
				class="input input-bordered w-full max-w-xs"
				required
			/>
		</div>

		<button class="btn btn-error">DESTROY</button>
	</form>
</div>
