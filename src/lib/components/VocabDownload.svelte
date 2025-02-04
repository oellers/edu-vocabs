<script>
	import { VOCAB_PROPERTIES as vp } from '$lib/constants';
	import DownloadIcon from '$lib/icons/DownloadIcon.svelte';
	let { vocabDistribution } = $props();
</script>

<div class="dropdown dropdown-left">
	<button class="btn btn-outline join-item btn-sm h-auto w-full border-slate-400 py-2">
		<DownloadIcon /> Download
	</button>
	<ul class="menu dropdown-content rounded-box bg-base-100 p-2 shadow-md">
		{#each vocabDistribution as dist}
			{#each dist[vp.fileFormat] as format}
				<li>
					<a target="_blank" href={dist.contentUrl} class="btn btn-ghost" download>
						{format}
					</a>
				</li>
			{/each}
		{/each}
	</ul>
</div>
