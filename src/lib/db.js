import { writable, get, derived } from 'svelte/store';
import { config } from '$lib/config';
import pkg from 'flexsearch';

export const db = writable({
	resultsPerPage: 10,
	activePage: 1,
	query: '',
	results: [],
	filters: {},
	index: {},
	filterKeys: config.filterKeys,
	selectedFilters: initFilters()
});

export const paginatedResults = derived(db, ($db) => {
	const startIndex = $db.activePage * $db.resultsPerPage;
	const endIndex = startIndex + $db.resultsPerPage;
	const paginatedResults = $db.results.slice(startIndex, endIndex);
	return paginatedResults;
});

export function updatePagination(direction) {
	db.update((db) => {
		const activePage = db.activePage + direction;
		return { ...db, activePage };
	});
}

const { Document } = pkg;
const index = new Document({ ...config.index });
const filterKeys = get(db).filterKeys;

function initFilters() {
	return Object.fromEntries(config.filterKeys.map((e) => [e, []]));
}

export function resetFilters() {
	db.update((db) => {
		return {
			...db,
			query: '',
			selectedFilters: initFilters()
		};
	});
	fillResults();
}

export function fillResults() {
	const results = Object.values(get(db).index.store).filter((e) =>
		e.type.includes('http://www.wikidata.org/entity/Q1469824')
	);
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

export function handleFilterSelect(key, val) {
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
		return { ...db, results, activePage: 0 };
	});
}

export async function createFilterOptions() {
	let filters = {};
	filterKeys.forEach((k) => {
		filters = {
			...filters,
			[k]: new Set(
				Object.values(index.store)
					.map((e) => e[k])
					.flat()
					.filter((e) => e !== undefined)
			)
		};
	});
	return filters;
}

export async function createIndex() {
	const res = await fetch('/api/search-index');
	const keys = await res.json();
	for (const key in keys) {
		await index.import(key, keys[key]);
	}
	const filters = await createFilterOptions();
	db.update((db) => {
		return { ...db, filters };
	});
	db.update((db) => {
		return { ...db, index };
	});
	fillResults();
}
