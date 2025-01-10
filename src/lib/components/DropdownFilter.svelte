<script>
	import { db, handleFilterSelect } from '$lib/db';
	import CaretDown from '$lib/icons/CaretDown.svelte';

	export let title;
	export let bereich;
</script>

<div class="dropdown">
	<div
		tabindex="0"
		role="button"
		class="mt-2
           w-52
           rounded-lg
           border
           border-gray-300
           bg-white
           px-2
           py-2
           text-gray-700
           shadow-sm
           focus:outline-none
           focus:ring-2
           focus:ring-gray-300"
	>
		<div class="flex flex-row items-center justify-between">
			<span>{title}</span>
			<CaretDown />
		</div>
		<ul
			tabindex="0"
			class="menu dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
		>
			{#each $db.filters[bereich] as filter}
				<li
					class="overflow-hidden rounded"
					class:bg-info={$db.selectedFilters[bereich].includes(filter)}
					class:text-black={$db.selectedFilters[bereich].includes(filter)}
					onclick={() => handleFilterSelect(bereich, filter)}
				>
					<a>{filter}</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
