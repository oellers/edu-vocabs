<script>
	import { db, handleFilterSelect } from '$lib/db';
	import CaretDown from '$lib/icons/CaretDown.svelte';

	let { title, filterKey } = $props();
</script>

<div class="dropdown">
	<div tabindex="0" role="button" class="my-3 select-none rounded-md border p-2">
		<div class="flex flex-row items-center justify-between gap-2">
			<span>{title}</span>
			<CaretDown />
		</div>
		<ul
			class="menu dropdown-content z-[20] max-h-96 w-64 flex-nowrap gap-2 overflow-y-auto rounded-box bg-base-100 p-2 shadow"
		>
			{#each $db.filters[filterKey] as filterVal}
				<li class="overflow-hidden rounded">
					<button
						type="button"
						role="option"
						class="btn btn-ghost font-normal"
						class:btn-active={$db.selectedFilters[filterKey].includes(filterVal)}
						aria-selected={$db.selectedFilters[filterKey].includes(filterVal)}
						onclick={() => handleFilterSelect(filterKey, filterVal)}
					>
						{filterVal}
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>
