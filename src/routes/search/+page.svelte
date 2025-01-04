<script>
	import { onMount } from 'svelte';
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

	const filterKeys = ['about'];

	let query = '';
	let results = [];
	let filters = {};
	let selectedFilters = Object.fromEntries(filterKeys.map(e => [e, []]));

	async function loadFilterOptions() {
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
	}

	async function loadIndex() {
		const res = await fetch('/api/search-index');
		const keys = await res.json();
		for (const key in keys) {
			await index.import(key, keys[key]);
		}
		loadFilterOptions();
	}

	onMount(() => {
		loadIndex();
	});

	function search(event) {
		event.preventDefault();
    const tags = Object.values(selectedFilters).flat()
		const groupedResults = index.search(query, {
			index: ['name', 'about'],
			enrich: true,
			tag: tags,
		});
		results = groupedResults.map((g) => g.result.map((r) => r.doc)).flat();
	}

	function handleSelect(val, key) {
		const indexInSelectedFilters = selectedFilters[key].indexOf(val);

		if (indexInSelectedFilters > -1) {
			selectedFilters = {...selectedFilters, [key]: selectedFilters[key].filter(e => e !== val)};
		} else {
			selectedFilters = {...selectedFilters, [key]: [...selectedFilters[key], val]};
		}

    search({preventDefault: function() {}})
	}
</script>

<div class="flex flex-col">
	<form on:submit={search}>
		<div class="flex flex-col">
			<div>
				<input type="text" bind:value={query} placeholder="Suche..." required />
				<button type="submit">Search</button>
			</div>
			<details class="dropdown">
				<summary class="btn m-1">Themenfeld</summary>
				<ul class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
					{#each filters['about'] as filter}
						<li 
              class:bg-info={selectedFilters["about"].includes(filter)}
              class:text-black={selectedFilters["about"].includes(filter)}
              on:click={() => handleSelect(filter, 'about')}
            >
              <a>{filter}</a></li>
					{/each}
				</ul>
			</details>
		</div>
	</form>

	{#if results.length}
		<ul>
			{#each results as result}
				<li>{result.name}</li>
			{/each}
		</ul>
	{/if}
</div>
