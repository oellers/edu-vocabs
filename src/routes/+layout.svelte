<script>
	import '../app.css';
	import '$lib/i18n.js';
	import { isLoading } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { createIndex } from '$lib/db';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import ScrollNavigation from '$lib/components/ScrollNavigation.svelte';
	let { children } = $props();

	// Initialize the search index
	onMount(() => {
		createIndex();
	});
</script>

<div class="mt-8 flex flex-row">
	{#if !$isLoading}
		<div class="px-4">
			<Sidebar />
		</div>
		<div class="mr-1 w-full">
			{@render children()}
		</div>
		<ScrollNavigation />
	{/if}
</div>
