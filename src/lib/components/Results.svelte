<script>
	import { db, paginatedResults } from '$lib/db';
	import Pagination from '$lib/components/Pagination.svelte';
	import SelectedFilter from '$lib/components/SelectedFilter.svelte';
	import Result from '$lib/components/Result.svelte';
</script>

<div class="flex flex-col">
	{#if $db.results.length}
		<div class="my-2">
			<div>
				<div>
					{#each Object.entries($db.selectedFilters) as filter}
						{#each filter[1] as f}
							<SelectedFilter val={f} key={filter[0]} />
						{/each}
					{/each}
				</div>
				<p>Suchergebnisse: {$db.results.length}</p>
			</div>
			<div>
				{#each $paginatedResults as result (result.id)}
					<Result externalLink={false} id={result.id} />
				{/each}
			</div>
		</div>
	{/if}
	<Pagination />
</div>
