<script>
	import { handleFilterSelect } from '$lib/db';
	import { t } from 'svelte-i18n';
	let { val, key } = $props();
</script>

<button
	aria-label={$t('filter.remove', { values: { filterName: $t('terms.' + val) } })}
	onclick={() => handleFilterSelect(key, val)}
	class="btn btn-outline btn-primary btn-xs mb-1 mr-1 h-auto p-1"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		class="inline-block h-4 w-4 stroke-current"
	>
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"
		></path>
	</svg>
	{$t('terms.' + val)}
</button>
