<script>
	import { db, search } from '$lib/db';
	import DropdownFilter from '$lib/components/DropdownFilter.svelte';
	import Results from '$lib/components/Results.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import ResetFilters from '$lib/components/ResetFilters.svelte';
	import { t } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$t('brand')}: {$t('search')}</title>
</svelte:head>

<div class="flex flex-col">
	<form onsubmit={(e) => search(e)}>
		<div>
			<div>
				<label class="input input-bordered flex items-center gap-2">
					<input
						class="grow"
						type="text"
						onkeyup={(e) => search(e)}
						bind:value={$db.query}
						placeholder="{$t('search')}..."
					/>
					<SearchIcon />
				</label>
			</div>
			<div class="flex flex-row flex-wrap gap-2">
				<DropdownFilter title={$t('filter.about')} filterKey="about" />
				<DropdownFilter title={$t('filter.educationalLevel')} filterKey="educationalLevel" />
				<div class="ml-auto">
					<ResetFilters />
				</div>
			</div>
		</div>
	</form>

	<Results />
</div>
