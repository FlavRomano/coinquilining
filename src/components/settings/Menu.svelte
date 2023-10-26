<script lang="ts">
	import ChangeName from "$components/settings/profile/ChangeName.svelte";
	import ChangeEmail from "$components/settings/profile/ChangeEmail.svelte";
	import ResetPassword from "$components/settings/profile/ResetPassword.svelte";
	import DestroyHouse from "$components/settings/house/DestroyHouse.svelte";
	import ShowRoommates from "$components/settings/house/ShowRoommates.svelte";

	let settingsOptions = 1;

	export let data;
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
				<ChangeName {data} />
			{:else if settingsOptions === 2}
				<ChangeEmail {data} />
			{:else if settingsOptions === 3}
				<ResetPassword {data} />
			{:else if settingsOptions === 4}
				<ShowRoommates {data} />
			{:else if settingsOptions === 5}
				<DestroyHouse {data} />
			{/if}
		</div>
	</div>
</div>
