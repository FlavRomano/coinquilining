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

		/**
		 * https://github.com/sveltejs/kit/issues/8080
		 */
		if (!navigator.onLine) {
			console.log("offline");

			return new Response(fallbackPage, {
				status: 408,
				headers: { "Content-Type": "text/html" },
			});
		}

		// for everything else, try the network first, but
		// fall back to the cache if we're offline
		try {
			console.log("network first...");
			const response = await fetch(event.request);

			if (response.status === 200) {
				await cache.put(event.request, response.clone());
			}

			return response;
		} catch (error) {
			const lastCacheMatchAttempt = await cache.match(event.request);

			if (lastCacheMatchAttempt) {
				return lastCacheMatchAttempt;
			}
			// Insanity is doing the same thing twice and hoping for a different result
			return new Response(null, { status: 405 });
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
    <title>MemoClip</title>
    <link rel="icon" href="/favicon.ico" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Share & Pin your favourite discovered resources on the Web 🗂️" />
    <meta name="theme-color" content="#0f1729" />
    <link rel="manifest" crossorigin="use-credentials" href="/manifest.json" />
    <style>
      body {
        background-color: #fffff;
        line-height: 1.5;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
        font-feature-settings: normal;
        font-variation-settings: normal;
      }

      h2 {
        color: #ad86f4;
      }

      p {
        margin-block: 1rem;
      }

      button {
        color: #00000;
        display: block;
        padding: 0.5rem;
        border: solid 1px #0c0c16;
        border-radius: 0.5em;
        text-decoration: none;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <h2>You are offline</h2>
    <p>Click the button below to try reloading.</p>
    <div id="btn-block">
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
</html>`;
