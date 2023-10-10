<script lang="ts">
	export let roommates: { firstname: string; lastname: string }[] = [
		{ firstname: "Anacleto", lastname: "De Paperoni" },
	];
</script>

<form action="?/add" method="post">
	<div class="m-5">
		<table class="table">
			<thead
				><tr>
					<th>Add Owner</th>
					<th>Add Item</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<select
							class="select select-bordered w-full max-w-xs"
							name="owner"
							required
						>
							<option disabled selected value=""
								>Select owner</option
							>
							{#each roommates as roommate}
								<option
									>{roommate.firstname +
										" " +
										roommate.lastname}
								</option>
							{/each}
						</select>
					</td>
					<td
						><input
							type="text"
							class="input input-primary w-full"
							name="item"
							placeholder="Item"
						/></td
					>
					<td
						><button
							class="btn btn-primary w-full"
							placeholder="Item">ADD</button
						></td
					>
				</tr>
			</tbody>
		</table>
	</div>
</form>
