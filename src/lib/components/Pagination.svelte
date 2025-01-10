<script>
	import { db } from '$lib/db';

	function goToPage(page) {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	$: totalPages = Math.ceil($db.results.length / $db.resultsPerPage);
</script>

{#if $db.resultsPerPage < $db.results.length}
	<div class="join mb-4">
		<button
			disabled={$db.activePage === 0}
			onclick={() => {
				db.update((db) => {
					return { ...db, activePage: db.activePage - 1 };
				});
				goToPage();
			}}
			class="btn join-item">«</button
		>
		<button class="btn join-item">{$db.activePage + 1}</button>
		<button
			disabled={$db.activePage + 1 === totalPages}
			onclick={() => {
				db.update((db) => {
					return { ...db, activePage: db.activePage + 1 };
				});
				goToPage();
			}}
			class="btn join-item">»</button
		>
	</div>
{/if}
