<script lang="ts">
	let settingsOptions = 1;

	async function copyToClipboard() {
		const text = "Zzxjoanw";
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

<div class="flex flex-row gap-5">
	<div class="basis-1/4">
		<ul class="menu lg:menu-lg lg:bg-base-200 rounded-box">
			<li>
				<h1 class="menu-title">Profile</h1>
				<ul>
					<li>
						<button
							class={settingsOptions === 1 ? "active" : ""}
							on:click={() => (settingsOptions = 1)}
							>Change name</button
						>
					</li>
					<li>
						<button
							class={settingsOptions === 2 ? "active" : ""}
							on:click={() => (settingsOptions = 2)}
							>Change email</button
						>
					</li>
					<li>
						<button
							class={settingsOptions === 3 ? "active" : ""}
							on:click={() => (settingsOptions = 3)}
							>Reset password</button
						>
					</li>
				</ul>
			</li>
			<li>
				<p class="menu-title">House</p>
				<ul>
					<li>
						<button
							class={settingsOptions === 4 ? "active" : ""}
							on:click={() => (settingsOptions = 4)}
							>Show code</button
						>
					</li>
					<li>
						<button
							class="hover:bg-warning {settingsOptions === 5
								? 'active'
								: ''}"
							on:click={() => (settingsOptions = 5)}
							>Destroy house</button
						>
					</li>
				</ul>
			</li>
		</ul>
	</div>
	<div class="grow">
		<div class="flex flex-col place-items-center">
			{#if settingsOptions === 1}
				<div class="prose prose-xl">
					<div class="flex flex-col place-items-start lg:pt-12">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<span>Firstname: Flavio <br /> Lastname: Romano</span>
						<div class="join join-vertical gap-4">
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<div class="join-item">
								<label class="label">
									<span class="label-text">New Firstname</span
									>
								</label>
								<input
									type="text"
									placeholder="Firstname"
									name="firstname"
									class="input input-bordered w-full max-w-full"
								/>
								<label class="label">
									<span class="label-text">New Lastname</span>
								</label>
								<input
									type="text"
									placeholder="Lastname"
									name="lastname"
									class="input input-bordered w-full max-w-full"
								/>
							</div>

							<button class="btn btn-primary w-full max-w-full"
								>CHANGE</button
							>
						</div>
					</div>
				</div>
			{:else if settingsOptions === 2}
				<div class="prose lg:prose-xl pt-14">
					<div class="join join-vertical gap-4">
						<span>Email: flavioromano@example.com</span>
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

						<button class="btn btn-primary w-full max-w-full"
							>CHANGE</button
						>
					</div>
				</div>
			{:else if settingsOptions === 3}
				<div class="flex flex-col items-center pt-14">
					<div class="form-control gap-4">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<div class="w-fit">
							<label class="label">
								<span class="label-text">Old Password</span>
							</label>
							<input
								placeholder="Password"
								class="input input-bordered w-full max-w-xs"
								type="password"
								name="oldPassword"
								required
							/>
							<label class="label">
								<span class="label-text">New Password</span>
							</label>
							<input
								placeholder="Password"
								class="input input-bordered w-full max-w-xs"
								type="password"
								name="oldPassword"
								required
							/>
						</div>
						<button class="btn btn-primary w-full max-w-full"
							>CHANGE</button
						>
					</div>
				</div>
			{:else if settingsOptions === 4}
				<div class="text-xl pt-14">
					<div class="pb-5">
						<p><b>Invitation code:</b> Zzxjoanw</p>
						<button
							on:click={copyToClipboard}
							class="btn btn-info btn-xs w-full"
							>Click to copy</button
						>
					</div>
					<b>Roommates</b>:
					<ol class="list-disc list-inside">
						<li>Flavio Romano</li>
						<li>Gabriele Patierno</li>
					</ol>
				</div>
			{:else if settingsOptions === 5}
				<div class="container prose prose-sm sm:prose-xl">
					<p class="text-center prose-p">
						Copy the following words to <b>delete permanently</b> the
						house:
					</p>
					<p class="text-center text-primary-focus">
						<b>Arthur-King-of-the-Britons</b>
					</p>
					<p class=" text-center prose-p">
						Let your roommates know what you are doing,
						Coinquilining won't.
					</p>

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
										>Insert the words (including the
										hyphens)</span
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
				</div>
			{/if}
		</div>
	</div>
</div>
