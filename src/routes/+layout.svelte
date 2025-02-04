<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { createIndex } from '$lib/db';
	import Sidebar from '$lib/components/Sidebar.svelte';
	let { children } = $props();

	// Initialize the search index
	onMount(() => {
		createIndex();
	});
</script>

<div class="mt-8 flex flex-row">
	<div class="px-4">
		<Sidebar />
	</div>
	<div class="mr-1 w-full">
		{@render children()}
	</div>
</div>
