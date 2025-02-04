<script>
	let { result } = $props();
	import { db } from '$lib/db';
	import { VOCAB_PROPERTIES as vp } from '$lib/constants';
	import InternalLinkIcon from '$lib/icons/InternalLinkIcon.svelte';
	import ExternalLinkIcon from '$lib/icons/ExternalLinkIcon.svelte';
	import VocabDownload from './VocabDownload.svelte';
	import { t } from 'svelte-i18n';
	const vocabDistribution = $derived(result[vp.distribution]?.map((e) => $db.index.store[e]));
</script>

<div class="join join-vertical">
	<a
		class="btn btn-outline join-item btn-sm h-auto border-slate-400 py-2"
		aria-label={$t('voc.preview')}
		href={`/voc/${encodeURIComponent(result[vp.id])}`}
		><InternalLinkIcon /> {$t('preview')}
	</a>
	{#if result[vp.describedAt]}
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
	{#if vocabDistribution}
		<VocabDownload {vocabDistribution} />
	{/if}
</div>
