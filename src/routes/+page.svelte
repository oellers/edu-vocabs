<script lang="ts">
    import type { PageData } from './$types';
    import ContentItem from '$lib/components/ContentItem.svelte';
    let { data }: { data: PageData } = $props();
</script>

<ContentItem contentItem={data.item} />