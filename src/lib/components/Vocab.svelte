<script>
	import VocabConcept from '$lib/components/VocabConcept.svelte';
	import { t } from 'svelte-i18n';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import { getVocabEntries } from '$lib/utils';
	let { id } = $props();
</script>

{#await getVocabEntries(id)}
	<LoadingSpinner />
{:then entries}
	<div class="card mt-1 flex flex-row justify-between bg-base-100 shadow-md">
		<div class="card-body mt-1 flex flex-col overflow-y-auto p-2">
			{#if entries.error}
				<p>{$t('error.vocab', { values: { vocabName: '' } })}</p>
			{:else}
				<h2 class="card-title text-xl">{$t('voc.preview')}</h2>
				{#each entries.hasTopConcept as topConcept (topConcept)}
					<VocabConcept concept={topConcept} />
				{/each}
			{/if}
		</div>
	</div>
{:catch}
	<p class="mt-2">{$t('error.vocab', { values: { vocabName: '' } })}</p>
{/await}
