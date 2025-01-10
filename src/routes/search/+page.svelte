<script>
	import { onMount } from 'svelte';
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

	const filterKeys = ['about', 'educationalLevel'];

	let query = '';
	let results = [];
	let filters = {};
	let selectedFilters = Object.fromEntries(filterKeys.map((e) => [e, []]));

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

	function fillResults() {
		results = Object.values(index.store).slice(0, 10);
	}

	async function loadIndex() {
		const res = await fetch('/api/search-index');
		const keys = await res.json();
		for (const key in keys) {
			await index.import(key, keys[key]);
		}
		loadFilterOptions();
		fillResults();
	}

	onMount(() => {
		loadIndex();
	});

	function search(event) {
		event.preventDefault();
		const tags = Object.values(selectedFilters).flat();
		const groupedResults = index.search(query, {
			index: ['name', 'about'],
			enrich: true,
			tag: tags
		});
		results = groupedResults.map((g) => g.result.map((r) => r.doc)).flat();
	}

	function handleSelect(val, key) {
		const indexInSelectedFilters = selectedFilters[key].indexOf(val);

		if (indexInSelectedFilters > -1) {
			selectedFilters = {
				...selectedFilters,
				[key]: selectedFilters[key].filter((e) => e !== val)
			};
		} else {
			selectedFilters = { ...selectedFilters, [key]: [...selectedFilters[key], val] };
		}

		search({ preventDefault: function () {} });
	}
</script>

<div class="flex w-3/4 flex-col">
	<form on:submit={search}>
		<div class="flex flex-col">
			<div>
				<label class="input input-bordered flex items-center gap-2">
					<input class="grow" type="text" bind:value={query} placeholder="Suche..." required />
					<Search />
				</label>
			</div>

			<div class="flex flex-row">
				<div class="dropdown">
					<div tabindex="0" role="button" class="btn m-1">Themenfeld</div>
					<ul
						tabindex="0"
						class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
					>
						{#each filters['about'] as filter}
							<li
								class:bg-info={selectedFilters['about'].includes(filter)}
								class:text-black={selectedFilters['about'].includes(filter)}
								on:click={() => handleSelect(filter, 'about')}
							>
								<a>{filter}</a>
							</li>
						{/each}
					</ul>
				</div>

				<div class="dropdown">
					<div tabindex="0" role="button" class="btn m-1">Bildungsstufe</div>
					<ul
						tabindex="0"
						class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
					>
						{#each filters['educationalLevel'] as filter}
							<li
								class:bg-info={selectedFilters['educationalLevel'].includes(filter)}
								class:text-black={selectedFilters['educationalLevel'].includes(filter)}
								on:click={() => handleSelect(filter, 'educationalLevel')}
							>
								<a>{filter}</a>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</form>

	{#if results.length}
		<div class="mt-2">
			<ul>
				<div class="flex flex-col gap-4">
					{#each results as result}
						<li>
							<div class="flex flex-row rounded border border-slate-600 py-2">
								<div class="m-2 w-3/4">
									<p class="text-lg font-bold">{result.name} ({result.P126})</p>
									<p>{result.description}</p>
								</div>

								<div>
									<div class="rounded-full bg-info p-2 text-center text-black">{result.about}</div>
								</div>
							</div>
						</li>
					{/each}
				</div>
			</ul>
		</div>
	{/if}
</div>
