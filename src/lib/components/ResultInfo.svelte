<script>
	import InfoIcon from '$lib/icons/InfoIcon.svelte';
	import { VOCAB_PROPERTIES as vp } from '$lib/constants';
	let { result } = $props();
	console.log(result[vp['format']]);
	const metadataKeys = ['issued', 'compliesWith'];
</script>

<div class="dropdown">
	<div tabindex="0" role="button" class="btn btn-circle btn-ghost btn-xs text-secondary">
		<InfoIcon />
	</div>
	<div class="card dropdown-content compact z-[1] w-64 rounded-box bg-base-100 shadow">
		<div class="card-body">
			<h2 class="card-title">Info</h2>
			<ul>
				{#each metadataKeys as key}
					{#if result[vp[key]]}
						<li>{key}: {result[vp[key]]}</li>
					{/if}
				{/each}
			</ul>
		</div>
	</div>
</div>
