import { writable, get } from 'svelte/store';

const filterKeys = ['about', 'educationalLevel'];

export const db = writable({
  resultsPerPage: 10,
  activePage: 0,
	query: '',
	results: [],
	filters: {},
	index: {},
	filterKeys,
	selectedFilters: Object.fromEntries(filterKeys.map((e) => [e, []]))
});

export function fillResults() {
	const results = Object.values(get(db).index.store).slice(0, 10);
	updateResults(results);
}

export function search(event) {
	event.preventDefault();
	const tags = Object.values(get(db).selectedFilters).flat();
	const groupedResults = get(db).index.search(get(db).query, {
		index: ['name', 'about'],
		enrich: true,
		tag: tags
	});
	const results = groupedResults.map((g) => g.result.map((r) => r.doc)).flat();
	if (results.length === 0 && Object.values(get(db).selectedFilters).flat()) {
		fillResults();
	} else {
		updateResults(results);
	}
}

export function handleFilterSelect(key,val) {
	db.update((db) => {
		const indexInSelectedFilters = db.selectedFilters[key].indexOf(val);
		let selectedFilters;
		if (indexInSelectedFilters > -1) {
			selectedFilters = {
				...db.selectedFilters,
				[key]: db.selectedFilters[key].filter((e) => e !== val)
			};
		} else {
			selectedFilters = { ...db.selectedFilters, [key]: [...db.selectedFilters[key], val] };
		}
		return { ...db, selectedFilters };
	});
	search({ preventDefault: function () {} });
}

export function updateResults(results) {
	db.update((db) => {
		return { ...db, results };
	});
}
