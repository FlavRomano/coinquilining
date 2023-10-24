<script lang="ts">
	export const overviewItems = [];
</script>

<div class="bg-primary rounded-2xl">
	<div class="py-2 px-5">
		<div class="font-medium prose-2xl text-primary-content">Overview</div>
		<div class="text-primary-content">
			<ul>
				{#each overviewItems as item}
					<!-- content here -->
				{/each}
				<li>- item</li>
			</ul>
		</div>
	</div>
</div>
