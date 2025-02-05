<script>
	import InfoIcon from '$lib/icons/InfoIcon.svelte';
	import { VOCAB_PROPERTIES as vp, METADATA_KEYS as mdk } from '$lib/constants';
	import { t } from 'svelte-i18n';
	let { result } = $props();
</script>

<div class="dropdown">
	<div
		tabindex="0"
		aria-label={$t('result.info')}
		role="button"
		class="btn btn-circle btn-ghost btn-xs text-secondary"
	>
		<InfoIcon />
	</div>
	<div class="card dropdown-content compact z-[1] w-64 rounded-box bg-base-100 shadow">
		<div class="card-body">
			<h2 class="card-title">{$t('info')}</h2>
			<ul>
				{#each mdk as key}
					{#if result[vp[key]]}
						<li>{$t('md.' + key)}: {result[vp[key]]}</li>
					{/if}
				{/each}
			</ul>
		</div>
	</div>
</div>
