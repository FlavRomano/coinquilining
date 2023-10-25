<script lang="ts">
	import "../../app.css";
	import Navbar from "../../components/Navbar.svelte";
	import RedAlert from "$components/errorAlerts/RedAlert.svelte";
	import { page } from "$app/stores";
</script>

<Navbar />
<div class="m-5">
	<slot />
</div>

{#if $page.error}
	<!-- content here -->
	<div class="flex flex-col place-items-center">
		<div class="absolute w-[70%] bottom-[5%] md:w-1/3">
			<RedAlert status={$page.error.code} message={$page.error.message} />
		</div>
	</div>
{/if}
