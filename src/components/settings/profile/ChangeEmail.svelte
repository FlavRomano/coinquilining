<script lang="ts">
	export let data;

	const { email } = data.user;
</script>

<div class="prose lg:prose-xl pt-14">
	<form method="post" action="?/changeEmail" class="join join-vertical gap-4">
		<span>Email: {email}</span>
		<div class="join-item">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">
				<span class="label-text">New Email</span>
			</label>
			<input
				type="email"
				name="newEmail"
				placeholder="Email"
				class="input input-bordered w-full max-w-full"
				required
			/>
		</div>

		<button class="btn btn-primary w-full max-w-full">CHANGE</button>
	</form>
</div>
