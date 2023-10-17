<script>
	import { writable } from "svelte/store";

	// SETTINGS:
	/* 
            - Giorni della settimana in cui si è disponibili per lavare
            (opzione tasto "copy" e "all") 
            - Quante zone ci sono da lavare (e.g bagno,
            cucina, salotto, stanzino, sgabuzzino +++) 

            n.b: se non sono presenti alcuni setting nel db => si apre automaticamente settings
    */
	const numberOfZones = writable(1);
</script>

<div class="m-5">
	<div class="text-sm breadcrumbs">
		<ul>
			<li><a href="/house/lifestyle/">Lifestyle</a></li>
			<li>
				<a href="/house/lifestyle/cleaning-rotations"
					>Cleaning rotations</a
				>
			</li>
			<li>Settings</li>
		</ul>
	</div>
</div>

<div class="grid grid-cols-2 m-5">
	<div class="m-5">
		<h1 class="text-xl">Select the days of the week you clean house</h1>
		<hr />
		<form class="form-control" action="?/week" method="post">
			<div class="grid grid-cols-1 grid-flow-row gap-4 m-2">
				<label class="label cursor-pointer">
					<span class="label-text">Sunday</span>
					<input type="checkbox" checked="checked" class="checkbox" />
				</label>
				<label class="label cursor-pointer">
					<span class="label-text">Monday</span>
					<input type="checkbox" checked="checked" class="checkbox" />
				</label>
				<label class="label cursor-pointer">
					<span class="label-text">Tuesday</span>
					<input type="checkbox" checked="checked" class="checkbox" />
				</label>
				<label class="label cursor-pointer">
					<span class="label-text">Wednesday</span>
					<input type="checkbox" checked="checked" class="checkbox" />
				</label>
				<label class="label cursor-pointer">
					<span class="label-text">Thursday</span>
					<input type="checkbox" checked="checked" class="checkbox" />
				</label>
				<label class="label cursor-pointer">
					<span class="label-text">Friday</span>
					<input type="checkbox" checked="checked" class="checkbox" />
				</label>
				<label class="label cursor-pointer">
					<span class="label-text">Saturday</span>
					<input type="checkbox" checked="checked" class="checkbox" />
				</label>
			</div>
		</form>
	</div>

	<div class="m-5">
		<h1 class="text-xl">
			How many regions of the house do you need to clean?
		</h1>
		<hr />
		<form class="form-control" action="?/areas" method="post">
			{#each { length: $numberOfZones } as _, i}
				<!-- content here -->
				<label class="label">
					<span class="label-text">Zone {i + 1}</span>
				</label>
				<input
					on:input={() => numberOfZones.set(i + 2)}
					type="text"
					placeholder="Insert here..."
					class="input input-bordered w-full max-w-xs"
				/>
			{/each}
		</form>
	</div>
</div>
