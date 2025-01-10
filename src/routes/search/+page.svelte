<script>
	import { onMount } from 'svelte';
	import { db, search, fillResults } from '$lib/db';
	import DropdownFilter from '$lib/components/DropdownFilter.svelte';
  import Results from '$lib/components/Results.svelte';
	import Search from '$lib/icons/Search.svelte';
	import pkg from 'flexsearch';
	const { Document } = pkg;

	const index = new Document({
		tokenize: 'forward',
		language: 'de',
		encoder: 'advanced',
		charset: 'latin',
		document: {
			id: 'id',
			index: ['name', 'about'],
			tag: 'tag',
			store: true
		}
	});

	const filterKeys = $db.filterKeys;

	async function loadFilterOptions() {
		let filters = {};
		filterKeys.forEach((k) => {
			filters = {
				...filters,
				[k]: new Set(
					Object.values(index.store)
						.map((e) => e[k])
						.filter((e) => e !== undefined)
				)
			};
		});
		return filters;
	}

	async function loadIndex() {
		const res = await fetch('/api/search-index');
		const keys = await res.json();
		for (const key in keys) {
			await index.import(key, keys[key]);
		}
		const filters = await loadFilterOptions();
		db.update((db) => {
			return { ...db, filters };
		});
		db.update((db) => {
			return { ...db, index };
		});
		fillResults();
	}

	onMount(() => {
		loadIndex();
	});
</script>

<div class="flex w-3/4 flex-col">
	<form on:submit={(e) => search(e)}>
		<div class="flex flex-col">
			<div>
				<label class="input input-bordered flex items-center gap-2">
					<input class="grow" type="text" bind:value={$db.query} placeholder="Suche..." required />
					<Search />
				</label>
			</div>
			<div class="flex flex-row gap-3">
				<DropdownFilter title="Themenfeld" bereich="about" />
				<DropdownFilter title="Bildungsstufe" bereich="educationalLevel" />
			</div>
		</div>
	</form>

  <Results />

</div>
