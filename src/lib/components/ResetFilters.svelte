<script>
	import { resetFilters } from '$lib/db';
	import { t } from 'svelte-i18n';
</script>

<button
	onclick={resetFilters}
	type="button"
	onkeydown={(e) => e.key === 'Enter' && resetFilters()}
	tabindex="0"
	class="btn mt-2"
>
	{$t('filter.reset')}
</button>
