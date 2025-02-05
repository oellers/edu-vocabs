<script>
	let { result, hideButtons = [] } = $props();
	import { db } from '$lib/db';
	import { VOCAB_PROPERTIES as vp } from '$lib/constants';
	import InternalLinkIcon from '$lib/icons/InternalLinkIcon.svelte';
	import ExternalLinkIcon from '$lib/icons/ExternalLinkIcon.svelte';
	import VocabDownload from './VocabDownload.svelte';
	import { t } from 'svelte-i18n';
	const vocabDistribution = $derived(result[vp.distribution]?.map((e) => $db.index.store[e]));
</script>

<div class="join join-vertical">
	{#if !hideButtons.includes('details')}
		<a
			class="btn btn-outline join-item btn-sm h-auto border-slate-400 py-2"
			aria-label={$t('voc.preview')}
			href={`/voc/${encodeURIComponent(result[vp.id])}`}
			><InternalLinkIcon /> {$t('details')}
		</a>
	{/if}
	{#if result[vp.describedAt] && !hideButtons.includes('external')}
		<a
			class="btn btn-outline join-item btn-sm h-auto border-slate-400 py-2"
			aria-label={$t('buttons.external')}
			href={result[vp.describedAt]}
			target="_blank"
		>
			<ExternalLinkIcon />
			{$t('buttons.external')}
		</a>
	{/if}
	{#if vocabDistribution && vocabDistribution.length && !hideButtons.includes('download')}
		<VocabDownload {vocabDistribution} />
	{/if}
</div>
