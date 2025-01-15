<script>
	import ContentItem from './ContentItem.svelte';
	let { items, extended = false } = $props();
</script>

<section>
	<ul class="posts">
		{#each items as item}
			<li class="post">
				<ContentItem {item} {extended} />
			</li>
		{/each}
	</ul>
</section>
