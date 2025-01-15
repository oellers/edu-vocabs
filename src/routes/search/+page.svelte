<script>
	import { db, search } from '$lib/db';
	import DropdownFilter from '$lib/components/DropdownFilter.svelte';
	import Results from '$lib/components/Results.svelte';
	import Search from '$lib/icons/Search.svelte';
	import ResetFilters from '$lib/components/ResetFilters.svelte';
</script>

<div class="flex w-3/4 flex-col">
	<form onsubmit={(e) => search(e)}>
		<div class="flex flex-col">
			<div>
				<label class="input input-bordered flex items-center gap-2">
					<input class="grow" type="text" bind:value={$db.query} placeholder="Suche..." />
					<Search />
				</label>
			</div>
			<div class="flex w-full flex-row gap-3">
				<DropdownFilter title="Themenfeld" filterKey="about" />
				<DropdownFilter title="Bildungsstufe" filterKey="educationalLevel" />
				<div class="ml-auto">
					<ResetFilters />
				</div>
			</div>
		</div>
	</form>

	<Results />
</div>
