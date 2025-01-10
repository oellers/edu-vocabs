<script>
	import { db } from '$lib/db';

	function goToPage(page) {
		window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 Scrolls to the top smoothly
	}

	$: totalPages = Math.ceil($db.results.length / $db.resultsPerPage);
</script>

{#if $db.resultsPerPage < $db.results.length}
	<div class="join mb-4">
		{#each { length: totalPages }, p}
			<button
				onclick={() => {
					db.update((db) => {
						return { ...db, activePage: p };
					});
					goToPage();
				}}
				class="btn join-item"
				class:btn-active={$db.activePage == p}>{p + 1}</button
			>
		{/each}
	</div>
{/if}
