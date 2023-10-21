<script lang="ts">
	import ChangeName from "$components/settings/profile/ChangeName.svelte";
	import ChangeEmail from "$components/settings/profile/ChangeEmail.svelte";
	import ResetPassword from "$components/settings/profile/ResetPassword.svelte";
	import EditRoommates from "$components/settings/house/EditRoommates.svelte";
	import DestroyHouse from "$components/settings/house/DestroyHouse.svelte";
	import RedAlert from "$components/errorAlerts/RedAlert.svelte";
	import { page } from "$app/stores";

	let settingsOptions = 1;

	export let data;
</script>

<div class="grid grid-cols-3 grid-flow-col-dense m-2 lg:m-5">
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
						>Edit roommates</button
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
	<div class="pl-5 sm:pl-24 col-span-2">
		{#if settingsOptions === 1}
			<ChangeName {data} />
		{:else if settingsOptions === 2}
			<ChangeEmail {data} />
		{:else if settingsOptions === 3}
			<ResetPassword {data} />
		{:else if settingsOptions === 4}
			<EditRoommates />
		{:else if settingsOptions === 5}
			<DestroyHouse {data} />
		{/if}

		{#if $page.status >= 400}
			<div class="flex flex-col place-items-center">
				<div
					class="fixed bottom-[20%] sm:bottom-[5%] lg:bottom-[10%] m-2 w-fit"
				>
					<RedAlert
						status={$page.status}
						message={$page.form.message}
					/>
				</div>
			</div>
		{/if}
	</div>
</div>
