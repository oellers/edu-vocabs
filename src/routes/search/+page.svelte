<script>
	import { onMount } from 'svelte';
	import pkg from 'flexsearch';
	const { Document } = pkg;

	const index = new Document({
		tokenize: 'forward',
    preset: "match",
    depth: 3,
		document: {
			id: 'id',
			index: ['name', 'about'],
			store: true
		}
	});

	let query = '';
	let results = [];

	async function loadIndex() {
		const res = await fetch('/api/search-index');
		const keys = await res.json();
		for (const key in keys) {
			await index.import(key, keys[key]);
		}
	}

	onMount(loadIndex);

	function search(event) {
		event.preventDefault();
		const groupedResults = index.search(query, {
			index: ['name', 'about'],
			enrich: true
		});
		results = groupedResults.map((g) => g.result.map((r) => r.doc)).flat();
	}
</script>

<h1>Suche</h1>

<form on:submit={search}>
	<input type="text" bind:value={query} placeholder="Suche..." required />
	<button type="submit">Search</button>
</form>

{#if results.length}
	<ul>
		{#each results as result}
			<li>{result.name}</li>
		{/each}
	</ul>
{/if}
