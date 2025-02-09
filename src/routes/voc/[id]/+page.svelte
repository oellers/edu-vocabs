<script>
	import Result from '$lib/components/Result.svelte';
	import Vocab from '$lib/components/Vocab.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { VOCAB_PROPERTIES as vp, PROJECT_URL as url } from '$lib/constants';
	import { t } from 'svelte-i18n';
	import { db } from '$lib/db';
	import ReportIcon from '$lib/icons/ReportIcon.svelte';
	let { data } = $props();
	let result = $state({});

	$effect(() => {
		if ($db.initialized) {
			result = $db.index?.store?.[data.id] || {};
		}
	});
</script>

<svelte:head>
	<title>{$t('brand')}: {$t('voc.detailview')}</title>
</svelte:head>

{#if $db.initialized}
	<div class="flex w-full flex-col">
		{#if result}
			<div class="flex w-full flex-row">
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
				<a
					target="_blank"
					aria-label={$t('voc.report')}
					title={$t('voc.report')}
					href={url.report +
						'?labels=invalid&body=Affected%20data%20URI%3A%20' +
						encodeURIComponent(result[vp.id]) +
						'&title=Data%20issue%20report%3A%20' +
						encodeURIComponent(result[vp.name])}
					class="btn btn-ghost ml-auto"
				>
					<ReportIcon />
				</a>
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
