<script lang="ts">
    import type { PageData } from './$types';
    import ContentItemList from '$lib/components/ContentItemList.svelte';
    let { data }: { data: PageData } = $props();
</script>

<main>
    <ContentItemList contentItems={data.contentItems} />
</main>