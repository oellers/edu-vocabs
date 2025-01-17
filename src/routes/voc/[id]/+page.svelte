<script>
	import Result from '$lib/components/Result.svelte';
	import Vocab from '$lib/components/Vocab.svelte';
	let { data } = $props();
</script>

<h1 class="text-2xl">Vokabular: Einzelansicht</h1>

<div class="flex w-3/4 flex-col">
	<Result id={data.id} />
	<Vocab id={data.id} />
</div>
