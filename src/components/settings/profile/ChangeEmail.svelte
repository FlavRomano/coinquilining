<script lang="ts">
	export let data;

	const { email } = data.user;
</script>

<div class="prose lg:prose-xl w-full grid lg:grid-cols-2">
	<div>
		<h3>Current</h3>
		{email}
	</div>
	<div class="mt-5 lg:pt-12 lg:mt-0">
		<form
			method="post"
			action="?/changeEmail"
			class="join join-vertical gap-4"
		>
			<div class="join-item">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">New Email</span>
				</label>
				<input
					type="email"
					name="newEmail"
					placeholder="Email"
					class="input input-bordered lg:w-80"
					required
				/>
			</div>

			<button class="btn btn-primary lg:w-80">CHANGE</button>
		</form>
	</div>
</div>
