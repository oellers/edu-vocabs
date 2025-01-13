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

<div class="flex flex-row">
	<div class="mt-8 basis-1/4 pl-4">
		<Sidebar />
	</div>
	<div class="mt-8 w-full">
		{@render children()}
	</div>
</div>
