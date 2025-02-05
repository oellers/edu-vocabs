<script>
	import Result from '$lib/components/Result.svelte';
	import Vocab from '$lib/components/Vocab.svelte';
	let { data } = $props();
	import { t } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$t('brand')}: {$t('voc.view')}</title>
</svelte:head>

<h1 class="text-2xl">{$t('voc.view')}</h1>

<div class="flex w-full flex-col pr-1 lg:w-3/4">
	<Result id={data.id} />
	<Vocab id={data.id} />
</div>
