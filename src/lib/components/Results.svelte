<script>
	import { db, paginatedResults } from '$lib/db';
	import Pagination from '$lib/components/Pagination.svelte';
	import SelectedFilter from '$lib/components/SelectedFilter.svelte';
	import Result from '$lib/components/Result.svelte';
</script>

<div class="flex w-full flex-col">
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
			<div class="flex flex-col items-center justify-center">
				{#each $paginatedResults as result (result.id)}
					<Result externalLink={true} id={result.id} />
				{/each}
			</div>
		</div>
	{/if}
	<Pagination />
</div>
