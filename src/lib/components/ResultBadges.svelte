<script>
	import { VOCAB_PROPERTIES as vp } from '$lib/constants';
	import { config } from '$lib/config';
	let { result } = $props();
</script>

{#each config.filterKeys as key}
	{#if result[vp[key]]}
		<div class="badge badge-primary badge-outline m-2 p-6">
			{result[vp[key]]}
		</div>
	{/if}
{/each}
