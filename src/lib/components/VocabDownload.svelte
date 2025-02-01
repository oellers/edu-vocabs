<script>
	import { VOCAB_PROPERTIES as vp } from '$lib/constants';
	import DownloadIcon from '$lib/icons/DownloadIcon.svelte';
	let { vocabDistribution } = $props();
</script>

<div class="dropdown">
	<button class="btn">
		Download <DownloadIcon />
	</button>
	<ul class="menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow">
		{#each vocabDistribution as dist}
			{#each dist[vp.fileFormat] as format}
				<li>
					<a target="_blank" href={dist.contentUrl} class="btn btn-ghost w-full text-left" download>
						{format}
					</a>
				</li>
			{/each}
		{/each}
	</ul>
</div>
