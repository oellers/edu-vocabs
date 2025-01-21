<script>
	import { db, updatePagination } from '$lib/db';

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
	<div class="pagination">
		<!-- First page -->
		<button
			disabled={$db.activePage === 0}
			onclick={() => updatePage(-$db.activePage)}
			class="btn join-item">&laquo;</button
		>
		<!-- Previous page -->
		<button disabled={$db.activePage === 0} onclick={() => updatePage(-1)} class="btn join-item"
			>&lsaquo;</button
		>
		<!-- Pagination buttons -->
		{#each [-2, -1, 0, 1, 2] as offset (offset)}
			{#if $db.activePage + offset >= 0 && $db.activePage + offset < totalPages}
				<button
					class="btn join-item {offset === 0 ? 'btn-disabled btn-active' : ''}"
					disabled={offset === 0}
					onclick={() => updatePage(offset)}
				>
					{$db.activePage + offset + 1}</button
				>
			{/if}
		{/each}
		<!-- Next page -->
		<button
			disabled={$db.activePage + 1 === totalPages}
			onclick={() => updatePage(1)}
			class="btn join-item">&rsaquo;</button
		>
		<!-- Last page -->
		<button
			disabled={$db.activePage + 1 === totalPages}
			onclick={() => updatePage(totalPages - $db.activePage - 1)}
			class="btn join-item">&raquo;</button
		>
	</div>
{/if}
