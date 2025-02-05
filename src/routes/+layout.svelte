<script>
	import '../app.css';
	import '$lib/i18n.js';
	import { isLoading } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { createIndex } from '$lib/db';
	import Menu from '$lib/components/Menu.svelte';
	import ScrollTop from '$lib/components/ScrollTop.svelte';
	let { children } = $props();

	// Initialize the search index
	onMount(() => {
		createIndex();
	});
</script>

<div class="mt-4 flex flex-row overflow-x-hidden max-lg:px-2 lg:px-8">
	{#if !$isLoading}
		<div class="w-full max-lg:pr-8 lg:w-3/4">
			<Menu />
			{@render children()}
		</div>
		<ScrollTop />
	{/if}
</div>
