<script lang="ts">
	import ContentItemList from '$lib/components/ContentItemList.svelte';
	let { data } = $props();
</script>

<main>
	<ContentItemList items={data.items} />
</main>
