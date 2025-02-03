<script>
	import { db, search } from '$lib/db';
	import DropdownFilter from '$lib/components/DropdownFilter.svelte';
	import Results from '$lib/components/Results.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import ResetFilters from '$lib/components/ResetFilters.svelte';
</script>

<svelte:head>
	<title>EduVocs: Suche</title>
</svelte:head>

<div class="flex w-full flex-col lg:w-3/4">
	<form onsubmit={(e) => search(e)}>
		<div>
			<div>
				<label class="input input-bordered flex items-center gap-2">
					<input
						class="grow"
						type="text"
						onkeyup={(e) => search(e)}
						bind:value={$db.query}
						placeholder="Suche..."
					/>
					<SearchIcon />
				</label>
			</div>
			<div class="flex flex-row flex-wrap gap-2">
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
