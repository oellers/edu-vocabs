<script>
	import { resetFilters } from '$lib/db';
	import { t } from 'svelte-i18n';
</script>

<button
	onclick={resetFilters}
	type="button"
	aria-label={$t('filter.reset')}
	onkeydown={(e) => e.key === 'Enter' && resetFilters()}
	tabindex="0"
	class="btn btn-outline btn-sm my-4"
>
	{$t('filter.reset')}
</button>
