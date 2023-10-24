<script lang="ts">
	import NotificationsTab from "$components/dashboard/NotificationTab.svelte";
	import type { PageData } from "./$types";
	import { onMount } from "svelte";
	import { notifications, timeout } from "$lib/stores";
	import type { Food } from "$types/lib/server/db/types";
	import OverviewTab from "$components/dashboard/OverviewTab.svelte";

	export let data: PageData;

	const { house_id, roommates } = data;

	onMount(async () => {
		if ($notifications.length === 0 || $timeout === true) {
			const expiringFoods: Food[] = await (async () => {
				const response = await fetch(
					`/api/house/expired?house_id=${house_id}`
				);
				if (response.ok) return await response.json();
			})();
			$timeout = false;
			$notifications = [...expiringFoods];

			const status = await Notification.requestPermission();

			if (status !== "granted") {
				const grant = confirm("Allow push notifications");
				if (grant) {
					const reg = await navigator.serviceWorker.ready;
					reg.pushManager.subscribe({ userVisibleOnly: true });
				}
			}

			if (status === "granted" && $notifications.length !== 0) {
				const reg = await navigator.serviceWorker.ready;
				reg.showNotification("Something is going rotten 🤮", {
					icon: "/favicon.ico",
				});
			}
		} else console.log("cached");
	});
</script>

<div />
<div class="lg:grid lg:grid-cols-3 gap-4">
	<div class="col-span-2 pb-5">
		<OverviewTab {roommates} {house_id} />
	</div>
	<div>
		<NotificationsTab {notifications} />
	</div>
</div>
