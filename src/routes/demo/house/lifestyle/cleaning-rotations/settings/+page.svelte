<script lang="ts">
	import { writable, type Writable } from "svelte/store";
	import type { PageData } from "./$types";
	import { onMount } from "svelte";

	export let data: PageData;

	const [cleaning_days, cleaning_zones] = [
		[false, false, false, false, false, true, true],
		["cucina", " bagno"],
	];

	const zones: Writable<string> = writable(cleaning_zones.join(","));
	let checkedWeek: boolean[] = cleaning_days;
</script>

<div class="m-5">
	<div class="text-sm breadcrumbs">
		<ul>
			<li><a href="/demo/house/lifestyle/">Lifestyle</a></li>
			<li>
				<a href="/demo/house/lifestyle/cleaning-rotations"
					>Cleaning rotations</a
				>
			</li>
			<li>Settings</li>
		</ul>
	</div>
</div>

<div class="lg:grid lg:grid-cols-2 m-5">
	<div class="m-5">
		<h1 class="text-xl">Select cleaning days</h1>
		<hr />
		<div class="form-control">
			<div class="grid grid-cols-1 grid-flow-row gap-4 m-2">
				<label class="label cursor-pointer">
					<span class="label-text">Sunday</span>
					<input
						hidden
						type="text"
						value={checkedWeek.toString()}
						name="weekdays"
					/>
					<input
						type="checkbox"
						bind:checked={checkedWeek[0]}
						class="checkbox"
					/>
				</label>
				<label class="label cursor-pointer">
					<span class="label-text">Monday</span>
					<input
						type="checkbox"
						bind:checked={checkedWeek[1]}
						class="checkbox"
					/>
				</label>
				<label class="label cursor-pointer">
					<span class="label-text">Tuesday</span>
					<input
						type="checkbox"
						bind:checked={checkedWeek[2]}
						class="checkbox"
					/>
				</label>
				<label class="label cursor-pointer">
					<span class="label-text">Wednesday</span>
					<input
						type="checkbox"
						bind:checked={checkedWeek[3]}
						class="checkbox"
					/>
				</label>
				<label class="label cursor-pointer">
					<span class="label-text">Thursday</span>
					<input
						type="checkbox"
						bind:checked={checkedWeek[4]}
						class="checkbox"
					/>
				</label>
				<label class="label cursor-pointer">
					<span class="label-text">Friday</span>
					<input
						type="checkbox"
						bind:checked={checkedWeek[5]}
						class="checkbox"
					/>
				</label>
				<label class="label cursor-pointer">
					<span class="label-text">Saturday</span>
					<input
						type="checkbox"
						bind:checked={checkedWeek[6]}
						class="checkbox"
					/>
				</label>
			</div>
		</div>
	</div>

	<div class="m-5">
		<h1 class="text-xl">Add zone to clean</h1>
		<hr />
		<div class="form-control">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">
				<span class="label-text"
					>Separate every zone with a comma
				</span>
			</label>
			<textarea
				bind:value={$zones}
				name="zones"
				class="textarea textarea-bordered h-24"
				placeholder="e.g: First zone, second zone..."
				disabled={$zones.split(",").filter((v) => v.trim().length !== 0)
					.length > 10}
			/>
			{#if $zones
				.split(",")
				.filter((v) => v.trim().length !== 0).length > 10}
				<div class="alert alert-error my-5">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>Can't have more then 10 zone, delete one.</span>
				</div>
			{/if}
			<!-- svelte-ignore a11y-label-has-associated-control -->
		</div>
		{#if $zones !== undefined}
			<div class="flex flex-row flex-wrap gap-2 pt-4 mx-2">
				{#each $zones
					.split(",")
					.filter((v) => v.trim().length !== 0) as zone, i}
					<div id="zone{i}" class="badge badge-accent capitalize">
						<button
							on:click={() => {
								const deleting = confirm(
									`Are you sure you want to delete "${zone}"?`
								);
								if (deleting) {
									var found = false;
									$zones = $zones
										.split(",")
										.filter(
											(v) =>
												v.trim().length !== 0 &&
												(found || !(found = v === zone))
										)
										.join(",");
								}
							}}>x</button
						>&nbsp
						{zone}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
<button
	disabled={$zones.trim() === "" ||
		$zones.split(",").filter((v) => v.trim().length !== 0).length > 10 ||
		checkedWeek.filter((v) => !v).length === 7}
	class="float-right m-5 btn btn-primary"
>
	save settings
</button>
