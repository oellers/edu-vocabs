<script>
	import { db } from '$lib/db';
	import Pagination from '$lib/components/Pagination.svelte';

	function getPaginatedResults() {
		const startIndex = $db.activePage * $db.resultsPerPage;
		const endIndex = startIndex + $db.resultsPerPage;
		return $db.results.slice(startIndex, endIndex);
	}
</script>

<div class="flex w-full flex-col items-center justify-center gap-2">
	{#if $db.results.length}
		<div class="mb-4 mt-2 w-full">
			<p>Suchergebnisse: {$db.results.length}</p>
			<ul>
				<div class="flex flex-col gap-4">
					{#each getPaginatedResults() as result}
						<li>
							<div class="flex flex-row rounded border border-slate-600 py-2">
								<div class="m-2 w-3/4">
									<p class="text-lg font-bold">
										<a class="hover:underline" href={result.P973}>{result.name}</a>
										{result.P126 ? `(${result.P126})` : ''}
									</p>
									<p>{result.description}</p>
								</div>

								{#if result.about}
									<div class="m-2">
										<div
											class="
                    rounded-full
                    bg-info
                    p-1
                    text-center
                    text-sm
                    font-bold
                    text-white"
										>
											{result.about}
										</div>
									</div>
								{/if}
							</div>
						</li>
					{/each}
				</div>
			</ul>
		</div>
	{/if}

	<Pagination />
</div>
