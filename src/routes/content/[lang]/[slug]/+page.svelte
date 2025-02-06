<script>
	import ContentItem from '$lib/components/ContentItem.svelte';
	let { data } = $props();
</script>

<ContentItem item={data.item} />
