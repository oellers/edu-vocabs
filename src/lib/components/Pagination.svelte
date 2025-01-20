<script>
	import { db, updatePagination } from '$lib/db';

	function goToPage() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	$: totalPages = Math.ceil($db.results.length / $db.resultsPerPage);
</script>

{#if $db.resultsPerPage < $db.results.length}
	<div class="join mb-4">
		<button
			disabled={$db.activePage === 0}
			onclick={() => {
				updatePagination(-1);
				goToPage();
			}}
			class="btn join-item">«</button
		>
		<button class="btn join-item">{$db.activePage + 1}</button>
		<button
			disabled={$db.activePage + 1 === totalPages}
			onclick={() => {
				updatePagination(1);
				goToPage();
			}}
			class="btn join-item">»</button
		>
	</div>
{/if}
