<script lang="ts">
	import Calendar from "@event-calendar/core";
	import TimeGrid from "@event-calendar/time-grid";
	import DayGrid from "@event-calendar/day-grid";
	import "@event-calendar/interaction";
	import { writable, type Writable } from "svelte/store";
	import type { PageData } from "./$types";

	type Event = {
		title: string;
		start: string;
		end: string;
		allDay: boolean;
	};

	export let data: PageData;
	const selectedEvent: Writable<Event> = writable();

	const calendar = data.calendar;

	function createEvent() {
		// start, end, title, allDay: true
		const res = [];

		for (const { roommate, events } of calendar) {
			let jsonEvents: { zone: string; cleaningDay: string } =
				JSON.parse(events);
			for (const { zone, cleaningDay } of Object.values(jsonEvents)) {
				const title =
					roommate.firstname + " " + roommate.lastname + " " + zone;
				const [start, end] = [cleaningDay, cleaningDay];
				const allDay = true;

				const event = { title, start, end, allDay };
				res.push(event);
			}
		}

		return res;
	}

	let plugins = [TimeGrid, DayGrid];
	let options = {
		view: "dayGridMonth",
		events: [...createEvent()],
		eventClick: function (info) {
			selectedEvent.set(info.event);
			console.log(JSON.stringify(info, null, 2));
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
		flexibleSlotTimeLimits: true,
	};
	// SHUFFLE:
	/* 
            - Siano n i giorni della settimana selezionati in settings
                - aggiunge n eventi al calendario a partire dalla data odierna
                - gli eventi seguono i giorni della settimana stabiliti in settings
                - ogni evento avrà associato l'id di un coinquilino e un'azione da svolgere per quel giorno
                    - la scelta avverrà casualmente
            - È possibile eseguire massimo 3 shuffle a settimana, per evitare che il coinquilino bari (opzione disattivabile dai settings)
    */
</script>

<div class="m-5">
	<div class="text-sm breadcrumbs">
		<ul>
			<li><a href="/house/lifestyle/">Lifestyle</a></li>
			<li>Cleaning rotations</li>
		</ul>
	</div>
	<div class="pb-5 flex flex-col place-items-center sm:pb-0">
		<div class="join">
			<form action="?/shuffle" method="post">
				<button class="btn md:btn-wide join-item">SHUFFLE</button>
			</form>
			<a
				href="/house/lifestyle/cleaning-rotations/settings/"
				class="btn md:btn-wide join-item">SETTINGS</a
			>
		</div>
	</div>
	<Calendar {plugins} {options} />
	{#if $selectedEvent}
		{$selectedEvent.title}
	{/if}
</div>
