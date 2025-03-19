<script>
	import { db, search } from '$lib/db';
	import { t } from 'svelte-i18n';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
</script>

<label class="input input-bordered flex items-center max-lg:w-3/4 lg:w-full">
	<input
		class="grow"
		type="text"
		name="searchbox"
		onkeyup={(e) => search(e)}
		bind:value={$db.query}
		placeholder="{$t('search')}..."
	/>
	<SearchIcon />
</label>
