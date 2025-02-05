<script>
	import Result from '$lib/components/Result.svelte';
	import Vocab from '$lib/components/Vocab.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { t } from 'svelte-i18n';
	import { db } from '$lib/db';
	let { data } = $props();
</script>

<svelte:head>
	<title>{$t('brand')}: {$t('voc.view')}</title>
</svelte:head>

{#if $db.initialized}
	<div class="flex w-full flex-col">
		{#if $db.index?.store?.[data.id]}
			<h1 class="text-2xl">{$t('voc.view')}</h1>
			<Result id={data.id} hideButtons={['details']} />
			<Vocab id={data.id} />
		{:else}
			<p>{$t('voc.notfound')}</p>
		{/if}
	</div>
{:else}
	<LoadingSpinner />
{/if}
