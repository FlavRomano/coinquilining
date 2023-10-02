<script lang="ts">
	export let firstname, lastname: string;
</script>

<div class="prose prose-xl w-full grid lg:grid-cols-2">
	<div>
		<h3>Current</h3>
		<ul class="list-none whitespace-nowrap pl-0">
			<li>Firstname: {firstname}</li>
			<li>Lastname: {lastname}</li>
		</ul>
	</div>
	<div class="lg:pt-12">
		<form action="" class="join join-vertical gap-4">
			<div class="join-item">
				<label class="label">
					<span class="label-text">New Firstname</span>
				</label>
				<input
					type="text"
					placeholder="Firstname"
					class="input input-bordered lg:w-80"
				/>
			</div>

			<div class="join-item">
				<label class="label">
					<span class="label-text">New Lastname</span>
				</label>
				<input
					type="text"
					placeholder="Lastname"
					class="input input-bordered lg:w-80"
				/>
			</div>

			<button class="btn btn-primary lg:w-80">CHANGE</button>
		</form>
	</div>
</div>
