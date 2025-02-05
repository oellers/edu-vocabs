<script>
	import { db, updatePagination } from '$lib/db';
	import { t } from 'svelte-i18n';

	/**
	 * Update the active page
	 *
	 * @param {number} page - the number of pages to move forward or backward
	 */
	function updatePage(page) {
		updatePagination(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	const totalPages = $derived(Math.ceil($db.results.length / $db.resultsPerPage));
</script>

{#if $db.resultsPerPage < $db.results.length}
	<div class="pagination join m-2">
		<!-- First page -->
		<button
			aria-label={$t('pagination.first')}
			disabled={$db.activePage === 0}
			onclick={() => updatePage(-$db.activePage)}
			class="btn btn-outline join-item">&laquo;</button
		>
		<!-- Previous page -->

		<button
			aria-label={$t('pagination.previous')}
			disabled={$db.activePage === 0}
			onclick={() => updatePage(-1)}
			class="btn btn-outline join-item">&lsaquo;</button
		>
		<!-- Pagination buttons -->
		{#each [-2, -1, 0, 1, 2] as offset (offset)}
			{#if $db.activePage + offset >= 0 && $db.activePage + offset < totalPages}
				<button
					aria-label={$t('pagination.to', { values: { pageNumber: $db.activePage + offset + 1 } })}
					class="btn btn-outline join-item {offset === 0 ? 'btn-active' : ''}"
					onclick={() => updatePage(offset)}
				>
					{$db.activePage + offset + 1}</button
				>
			{/if}
		{/each}
		<!-- Next page -->
		<button
			aria-label={$t('pagination.next')}
			disabled={$db.activePage + 1 === totalPages}
			onclick={() => updatePage(1)}
			class="btn btn-outline join-item">&rsaquo;</button
		>
		<!-- Last page -->
		<button
			aria-label={$t('pagination.last')}
			disabled={$db.activePage + 1 === totalPages}
			onclick={() => updatePage(totalPages - $db.activePage - 1)}
			class="btn btn-outline join-item">&raquo;</button
		>
	</div>
{/if}
