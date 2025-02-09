<script>
	import { db, paginatedResults } from '$lib/db';
	import { VOCAB_PROPERTIES as vp } from '$lib/constants';
	import Pagination from '$lib/components/Pagination.svelte';
	import SelectedFilter from '$lib/components/SelectedFilter.svelte';
	import Result from '$lib/components/Result.svelte';
	import { t } from 'svelte-i18n';
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
				<p>{$t('searchresults')}: {$db.results.length}</p>
			</div>
			<div>
				{#each $paginatedResults as result (result.id)}
					<Result id={result.id} hideButtons={[vp.repo, vp.distribution, vp.endpointUrl]} />
				{/each}
			</div>
		</div>
		<div class="flex justify-center">
			<Pagination />
		</div>
	{/if}
</div>
