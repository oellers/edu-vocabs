<script>
	import { db } from '$lib/db';
	import { parseToSkos } from '$lib/utils';
	import VocabConcept from '$lib/components/VocabConcept.svelte';
	import { VOCAB_PROPERTIES as vp } from '$lib/constants';

	let { id } = $props();
	let vocabData = $state(null);
	const result = $db.index?.store?.[id] ?? {};

	const distribution = $derived(result[vp.distribution]?.map((e) => $db.index.store[e]));
	const jsonLink = distribution?.find((d) => d[vp.fileFormat].includes('application/json'));
	const ttlLink = distribution?.find((d) => d[vp.fileFormat].includes('text/turtle'));
	const rawVocab = $derived(result[vp.rawVocab]?.[0] ?? '');

	if (distribution && distribution.length) {
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
	<div class="mt-1 flex flex-row justify-between">
		<div class="flex flex-col">
			<h1 class="text-xl">Vokabular-Vorschau</h1>
			{#each vocabData.hasTopConcept as topConcept}
				<VocabConcept concept={topConcept} />
			{/each}
		</div>
		<div>
			{#if jsonLink}
				<a href={jsonLink.contentUrl} class="btn">JSON</a>
			{/if}
			{#if ttlLink}
				<a href={ttlLink.contentUrl} class="btn">Turtle</a>
			{/if}
		</div>
	</div>
{/if}
