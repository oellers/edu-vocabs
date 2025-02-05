<script>
	import { db } from '$lib/db';
	import { parseToSkos } from '$lib/utils';
	import VocabConcept from '$lib/components/VocabConcept.svelte';
	import { VOCAB_PROPERTIES as vp } from '$lib/constants';
	import { t } from 'svelte-i18n';
	let { id } = $props();
	let vocabData = $state(null);

	const result = $db.index?.store?.[id] ?? {};
	const vocabDistribution = $derived(result[vp.distribution]?.map((e) => $db.index.store[e]));
	const jsonLink = vocabDistribution?.find((d) => d[vp.fileFormat].includes('application/json'));
	const rawVocab = $derived(result[vp.rawVocab]?.[0] ?? '');

	if (vocabDistribution && vocabDistribution.length) {
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

<div class="card mt-1 flex flex-row justify-between bg-base-100 shadow-md">
	<div class="card-body flex flex-col">
		{#if vocabData}
			<h2 class="card-title text-xl">{$t('voc.preview')}</h2>
			{#each vocabData.hasTopConcept as topConcept}
				<VocabConcept concept={topConcept} />
			{/each}
		{/if}
	</div>
</div>
