<script lang="ts">
	export let roommates;
	export let demo = false;
</script>

<form action="?/add" method={demo ? "" : "POST"}>
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
							name="owner_id"
							required
						>
							<option disabled selected value=""
								>Select owner</option
							>
							{#each roommates as roommate}
								<option value={roommate.id}
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
							minlength="2"
							maxlength="64"
							class="input input-primary w-full"
							name="item"
							placeholder="Item"
							required
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
