<script>
	let { concept } = $props();
</script>

{#if concept}
	<div>
		<p>{concept.prefLabel?.de}</p>

		{#if concept.narrower && concept.narrower.length}
			<div style="margin-left: 20px;">
				{#each concept.narrower as narrower}
					<svelte:self concept={narrower} />
				{/each}
			</div>
		{/if}
	</div>
{/if}
