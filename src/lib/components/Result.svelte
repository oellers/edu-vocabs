<script>
	import { db } from '$lib/db';
	let { id } = $props();
	const result = $db.index?.store?.[id] ?? {};
</script>

<div class="flex w-full flex-col items-center justify-center gap-2">
	{#if result}
		<div class="mb-4 mt-2 w-full">
			<ul class="mt-2">
				<div class="flex flex-col gap-4">
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
				</div>
			</ul>
		</div>
	{/if}
</div>
