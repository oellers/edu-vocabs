<script>
	import { db } from '$lib/db';
	import { parseToSkos } from '$lib/utils';
	import VocabConcept from '$lib/components/VocabConcept.svelte';

	let { id } = $props();
	let vocabData = $state(null);
	const result = $db.index?.store?.[id] ?? {};

	const distribution = $derived(result?.distribution?.map((e) => $db.index.store[e]));
	const rawVocab = $derived(result?.rawVocab?.[0] ?? '');

	if (distribution && distribution.length) {
		const jsonLink = distribution.find((d) => d.fileFormat.includes('application/json'));
		if (jsonLink) {
			getVocabs(jsonLink.contentUrl).then((data) => {
				vocabData = data;
			});
		}
	} else if (rawVocab.length) {
		vocabData = parseToSkos(rawVocab);
	}

	async function getVocabs(uri) {
		const res = await fetch(uri);
		const json = await res.json();
		return json;
	}
</script>

{#if vocabData}
	<div>
		<h1>Vokabular-Vorschau</h1>
		{#each vocabData.hasTopConcept as topConcept}
			<VocabConcept concept={topConcept} />
		{/each}
	</div>
{/if}
