<script>
    import ContentItem from './ContentItem.svelte';
	let { contentItems, extended = false } = $props();
</script>
<ul>
    {#each contentItems as item}
    <li>
        <ContentItem contentItem={item} extended={extended} />
    </li>
    {/each}
</ul>