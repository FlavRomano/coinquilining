<script lang="ts">
	export let email: string;
</script>

<div class="prose prose-xl w-full grid lg:grid-cols-2">
	<div>
		<h3>Current</h3>
		<ul class="list-none whitespace-nowrap pl-0">
			<li>Email: {email}</li>
		</ul>
	</div>
	<div class="mt-5 lg:pt-12 lg:mt-0">
		<form action="" class="join join-vertical gap-4">
			<div class="join-item">
				<label class="label">
					<span class="label-text">New Email</span>
				</label>
				<input
					type="email"
					placeholder="Email"
					class="input input-bordered lg:w-80"
				/>
			</div>

			<button class="btn btn-primary lg:w-80">CHANGE</button>
		</form>
	</div>
</div>
