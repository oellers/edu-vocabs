<script>
	import VocabConcept from '$lib/components/VocabConcept.svelte';
	let { concept } = $props();
</script>

{#if concept}
	<div>
		<p>{concept.prefLabel?.de}</p>

		{#if concept.narrower && concept.narrower.length}
			<div style="margin-left: 20px;">
				{#each concept.narrower as narrower}
					<VocabConcept concept={narrower} />
				{/each}
			</div>
		{/if}
	</div>
{/if}
