<script lang="ts">
	import InputPassword from "$components/InputPassword.svelte";
</script>

<div class="pt-12 prose prose-xl w-full grid lg:grid-cols-2">
	<div class="lg:pt-12 lg:pl-52">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<form action="" class="join join-vertical gap-4">
			<div class="join-item">
				<label class="label">
					<span class="label-text">Old Password</span>
				</label>
				<InputPassword />
			</div>

			<div class="join-item">
				<label class="label">
					<span class="label-text">New Password</span>
				</label>
				<InputPassword />
			</div>

			<button class="btn btn-primary">CHANGE</button>
		</form>
	</div>
</div>
