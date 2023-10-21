/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = self as unknown as ServiceWorkerGlobalScope;
import { build, files, version } from "$service-worker";

const CACHE = `mc-cache-${version}`;

const ASSETS = [
	...build, // the app itself
	...files, // everything in `static`
];

console.log(ASSETS);

sw.addEventListener("install", (event) => {
	console.log("Service Worker installing.");
	async function addFilesToCacheAndSkipWaiting() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
		await sw.skipWaiting();
	}

	event.waitUntil(addFilesToCacheAndSkipWaiting());
});

sw.addEventListener("activate", (event) => {
	console.log("Service Worker activating.");
	// Remove previous cached data from disk
	async function deleteOldCachesAndClaimClients() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}

		await sw.clients.claim();
	}

	event.waitUntil(deleteOldCachesAndClaimClients());
});

sw.addEventListener("fetch", (event) => {
	// Ignore requests that should be cached
	const matchUrl = new URL(event.request.url);
	if (event.request.method !== "GET") return;
	if (matchUrl.pathname.startsWith("/api")) return;

	console.log("fetching request -> ", event.request.url);

	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE);

		// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

		// `build`/`files` can always be served from the cache
		// Here we can end up in a crazy state where some of the cache is gone, which
		// leads us to white screen of death
		const cacheMatch = await cache.match(event.request);

		// TODO: make issue on Kit github
		// Work around for if cache has been partly deleted
		if (ASSETS.includes(url.pathname) && cacheMatch) {
			console.log("cache match -> ", url.pathname);
			return cacheMatch;
		}

		// for everything else, try the network first, but
		// fall back to the cache if we're offline
		try {
			console.log("network first...");
			const response = await fetch(event.request);

			if (response.status === 200) {
				console.log("200 OK -> ", response);
				await cache.put(event.request, response.clone());
			} else {
				console.log("%d -> ", response.status);
			}

			return response;
		} catch (error) {
			// Insanity is doing the same thing twice and hoping for a different result
			const lastCacheMatchAttempt = await cache.match(event.request);

			if (lastCacheMatchAttempt) {
				return lastCacheMatchAttempt;
			} else {
				console.log("offline -> ", error);
				return new Response(fallbackPage, {
					status: 408,
					headers: { "Content-Type": "text/html" },
				});
			}
		}
	}

	// TODO!: Would be better to omit this(?) if the response is undefined
	event.respondWith(respond());
});

sw.addEventListener("notificationclick", (event: any) => {
	const clickedNotification = event?.notification;

	console.log(clickedNotification);
	clickedNotification.close();

	const url = clickedNotification.data.url;

	event.waitUntil(
		sw.clients
			.matchAll({ type: "window" })
			.then((clientsArr) => {
				// https://web-push-book.gauntface.com/common-notification-patterns/

				// If we have a client, pick the first one and open it
				const hadWindowToFocus =
					clientsArr.length && clientsArr.length > 0;

				// Otherwise, open a new tab to the applicable URL and focus it.
				if (hadWindowToFocus) {
					const client = clientsArr[0];
					if (!client.url.includes(url)) {
						client.navigate(url);
					}
					client.focus();
				} else
					sw.clients
						.openWindow(url)
						.then((windowClient) =>
							windowClient ? windowClient.focus() : null
						);
			})
			.catch((e) => {
				console.error(e);
			})
	);
});

const fallbackPage = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="manifest" href="./manifest.json" crossorigin="use-credentials" />
    <title>Coinquilining</title>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png">
    <link rel="mask-icon" href="./safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
</head>

<body>
    <h2>You are offline</h2>

    <p>Click the button below to try reloading.</p>
    <div id="btn-block">
        <a href="/">Go to Explore</a>
        <button type="button">⤾ Reload</button>
    </div>
    <script>
        document.querySelector('button').addEventListener('click', () => {
            window.location.reload()
        })

        window.addEventListener('online', () => {
            window.location.reload()
        })
    </script>
</body>

</html>
`;
