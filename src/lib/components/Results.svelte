<script>
	import { db } from '$lib/db';
	import Pagination from '$lib/components/Pagination.svelte';
	import SelectedFilter from '$lib/components/SelectedFilter.svelte';
	import Result from '$lib/components/Result.svelte';
</script>

<div class="flex w-full flex-col items-center justify-center gap-2">
	{#if $db.results.length}
		<div class="mb-4 mt-2 w-full">
			<div class="flex flex-row justify-between">
				<div class="flex cursor-pointer flex-row flex-wrap gap-2">
					{#each Object.entries($db.selectedFilters) as filter}
						{#each filter[1] as f}
							<SelectedFilter val={f} key={filter[0]} />
						{/each}
					{/each}
				</div>
				<p class="shrink-0">Suchergebnisse: {$db.results.length}</p>
			</div>
			{#each $db.paginatedResults as result (result.id)}
				<Result externalLink={true} id={result.id} />
			{/each}
		</div>
	{/if}

	<Pagination />
</div>
