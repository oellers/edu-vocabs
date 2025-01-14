<script>
	let { item, extended = true } = $props();
</script>

<svelte:head>
	<title>{item.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={item.title} />
</svelte:head>

<article class="item">
    <h1><a href={`/content/${item.slug}`}>{item.title}</a></h1>
    <p>{item.date}</p>
    {#if extended}
    <div class="item-description">
        <item.content />
    </div>
    {/if}
</article>