<script lang="ts">
	export let recipe;
</script>

<div class="card md:card-side bg-base-100 shadow-xl m-5">
	<figure>
		<img src={recipe.img} alt={recipe.title} width="360px" height="300px" />
	</figure>
	<div class="card-body">
		<h2 class="card-title break-words">
			{recipe.title}
		</h2>
		<p />
		<div class="card-actions justify-end">
			<a
				href={recipe.link}
				target="_blank"
				rel="noopener noreferrer"
				class="btn btn-primary w-full md:btn-wide">Open</a
			>
		</div>
	</div>
</div>
