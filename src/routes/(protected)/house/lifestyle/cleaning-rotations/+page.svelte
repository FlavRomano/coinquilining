<script lang="ts">
	import Calendar from "@event-calendar/core";
	import TimeGrid from "@event-calendar/time-grid";
	import DayGrid from "@event-calendar/day-grid";
	import "@event-calendar/interaction";
	import { writable, type Writable } from "svelte/store";

	type Event = {
		title: string;
	};

	const selectedEvent: Writable<Event> = writable();

	let plugins = [TimeGrid, DayGrid];
	let options = {
		view: "dayGridMonth",
		events: [{ title: "Gabriele bagno", allDay: true }],
		eventClick: function (info) {
			selectedEvent.set(info.event);
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

	// SETTINGS:
	/* 
            - Giorni della settimana in cui si è disponibili per lavare
            (opzione tasto "copy" e "all") 
            - Quante zone ci sono da lavare (e.g bagno,
            cucina, salotto, stanzino, sgabuzzino +++) 

            n.b: se non sono presenti alcuni setting nel db => si apre automaticamente settings
    */

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
			<button class="btn md:btn-wide join-item">SHUFFLE</button>
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
