<script>
    import Showdown from 'showdown';
	let { contentItem, extended = true } = $props();
    const converter = new Showdown.Converter();
    const htmlContent = converter.makeHtml(contentItem.content);
</script>
<article>
    <h1><a href={`/content/${contentItem.fields.slug}`}>{contentItem.fields.title}</a></h1>
    <p>{contentItem.fields.date}</p>
    {#if extended}
        <p>{@html htmlContent}</p>
    {/if}
</article>