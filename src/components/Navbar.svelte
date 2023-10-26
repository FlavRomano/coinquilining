<script lang="ts">
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<div class="dropdown lg:hidden">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="-1" class="btn btn-ghost m-1"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				></label
			>
			<ul
				tabindex="0"
				class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
			>
				<li><a href="/house/lifestyle">Lifestyle</a></li>
				<li>
					<a href="/house/food">Food</a>
				</li>
			</ul>
		</div>
		<a class="btn btn-ghost normal-case text-xl" href="/house/dashboard"
			>coinquilining</a
		>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/house/lifestyle">Lifestyle</a></li>
			<li><a href="/house/food">Food</a></li>
		</ul>
	</div>
	<div class="navbar-end">
		<div class="dropdown dropdown-end">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="-1" class="btn m-1">Account</label>
			<ul
				tabindex="-1"
				class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li><a href="/house/settings">Settings</a></li>
				<li><a href="/signout">Quit</a></li>
			</ul>
		</div>
	</div>
</div>
