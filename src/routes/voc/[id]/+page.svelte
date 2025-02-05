<script>
	import Result from '$lib/components/Result.svelte';
	import Vocab from '$lib/components/Vocab.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { VOCAB_PROPERTIES as vp } from '$lib/constants';
	import { t } from 'svelte-i18n';
	import { db } from '$lib/db';
	let { data } = $props();
	const result = $db.index?.store?.[data.id];
</script>

<svelte:head>
	<title>{$t('brand')}: {$t('voc.detailview')}</title>
</svelte:head>

{#if $db.initialized}
	<div class="flex w-full flex-col">
		{#if result}
			<div class="text-md breadcrumbs">
				<ul>
					<li>
						<a aria-label={$t('menu.search')} href="/search">{$t('menu.search')}</a>
					</li>
					<li>
						<span>{$t('voc.label')}: {result[vp.name]}</span>
					</li>
				</ul>
			</div>
			<h1 class="text-2xl">{$t('voc.detailview')}</h1>
			<Result id={data.id} hideButtons={[vp.id]} />
			<Vocab id={data.id} />
		{:else}
			<p>{$t('voc.notfound')}</p>
		{/if}
	</div>
{:else}
	<LoadingSpinner />
{/if}
