<script lang="ts">
	export let firstname, lastname: string;
</script>

<div class="pt-12 prose prose-xl w-full grid lg:grid-cols-2">
	<div class="lg:pt-12 lg:pl-52">
		<form action="" class="join join-vertical gap-4">
			<div class="join-item">
				<label class="label">
					<span class="label-text">Old Password</span>
				</label>
				<input
					type="password"
					placeholder="Password"
					class="input input-bordered lg:w-80"
				/>
			</div>

			<div class="join-item">
				<label class="label">
					<span class="label-text">New Password</span>
				</label>
				<input
					type="text"
					placeholder="Password"
					class="input input-bordered lg:w-80"
				/>
			</div>

			<button class="btn btn-primary lg:w-80">CHANGE</button>
		</form>
	</div>
</div>
