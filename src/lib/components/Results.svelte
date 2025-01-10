<script>
import { db } from "$lib/db"
</script>

	{#if $db.results.length}
		<div class="mt-2">
			<ul>
				<div class="flex flex-col gap-4">
					{#each $db.results as result}
						<li>
							<div class="flex flex-row rounded border border-slate-600 py-2">
								<div class="m-2 w-3/4">
									<p class="text-lg font-bold">
										{result.name}
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

