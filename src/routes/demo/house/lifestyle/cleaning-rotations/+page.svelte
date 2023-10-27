<script lang="ts">
	import Calendar from "@event-calendar/core";
	import TimeGrid from "@event-calendar/time-grid";
	import DayGrid from "@event-calendar/day-grid";
	import Interaction from "@event-calendar/interaction";
	import { writable, type Writable } from "svelte/store";
	import type { PageData } from "./$types";
	import { createEvents } from "$types/lib";

	/**
	 * Example for event-calendar:
	 *      https://stackblitz.com/edit/sveltejs-kit-template-default-mvpsgx?file=src%2Froutes%2F%2Bpage.js,src%2Froutes%2F%2Bpage.svelte
	 */

	type Event = {
		id: string;
		start: string;
	};

	const modifiedEvents: Writable<Event[]> = writable([]);

	const calendar = [
		{
			roommate: { firstname: "Flavio", lastname: "Romano" },
			events: '[{"id":"c8HPAphX","zone":"bagno","cleaningDay":"2023-10-14T22:00:00.683Z"},{"id":"SY49YuDY","zone":"cucina","cleaningDay":"2023-10-06T22:00:00.683Z"},{"id":"myEKX9vp","zone":"cucina","cleaningDay":"2023-10-28T22:00:00.683Z"},{"id":"frIqUHiN","zone":"bagno","cleaningDay":"2023-10-20T22:00:00.683Z"}]',
		},
		{
			roommate: { firstname: "Gabriele", lastname: "Patierno" },
			events: '[{"id":"gF3mTKFU","zone":"bagno","cleaningDay":"2023-10-27T22:00:00.683Z"},{"id":"YiWeauCC","zone":"cucina","cleaningDay":"2023-10-21T22:00:00.683Z"},{"id":"qAwJ-K7T","zone":"bagno","cleaningDay":"2023-10-13T22:00:00.683Z"},{"id":"gG4eKKCr","zone":"cucina","cleaningDay":"2023-10-07T22:00:00.683Z"}]',
		},
	];

	let plugins = [TimeGrid, DayGrid, Interaction];

	let changingEvents = false;

	let options = {
		view: "dayGridMonth",
		events: createEvents(calendar),

		pointer: true,

		eventDrop: (info) => {
			if (!changingEvents) changingEvents = !changingEvents;
			const { id, start } = info.event;

			if ($modifiedEvents.filter((event) => event.id === id).length !== 0)
				$modifiedEvents = $modifiedEvents.filter(
					(event) => event.id !== id
				);
			$modifiedEvents = [...$modifiedEvents, { id, start }];
		},

		views: {
			timeGridWeek: { pointer: true },
			resourceTimeGridWeek: { pointer: true },
		},
		headerToolbar: {
			start: "prev,next today",
			center: "title",
			end: "dayGridMonth,timeGridWeek,timeGridDay",
		},
		selectable: true,
		nowIndicator: true,
	};
</script>

<div class="text-sm breadcrumbs">
	<ul>
		<li><a href="/demo/house/lifestyle/">Lifestyle</a></li>
		<li>Cleaning rotations</li>
	</ul>
</div>
<div class="pb-5 flex flex-col place-items-center sm:pb-0">
	<div class="join">
		<button class="btn md:btn-wide join-item">SHUFFLE</button>
		<a
			href="/demo/house/lifestyle/cleaning-rotations/settings/"
			class="btn md:btn-wide join-item">SETTINGS</a
		>
	</div>
</div>
<div class="flex flex-col justify-center gap-5">
	<Calendar {plugins} {options} />
	<div class="flex flex-col place-items-center">
		{#if changingEvents}
			<input
				class="w-full"
				type="text"
				name="events"
				hidden
				value={JSON.stringify($modifiedEvents)}
			/>
			<button class="btn btn-primary btn-md w-1/3">Confirm</button>
		{/if}
	</div>
</div>
