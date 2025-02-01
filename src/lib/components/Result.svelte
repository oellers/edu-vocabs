<script>
	import { db } from '$lib/db';
	import { VOCAB_PROPERTIES as vp } from '$lib/constants';
	let { id, externalLink = false } = $props();
	const result = $db.index?.store?.[id] ?? {};

	$state.snapshot(result);
</script>

<div class="flex w-full flex-col items-center justify-center gap-2">
	{#if result}
		<div class="w-full">
			<ul class="mt-2">
				<div class="flex flex-col gap-4">
					<li>
						<div class="flex flex-row rounded border border-slate-600 py-2">
							<div class="m-2 w-3/4">
								<p class="text-lg font-bold">
									<a
										class="hover:underline"
										href={externalLink
											? `/voc/${encodeURIComponent(result[vp.id])}`
											: result[vp.describedAt]}>{result[vp.name]}</a
									>
									{result[vp.maintainedBy] ? `(${result[vp.maintainedBy]})` : ''}
								</p>
								<p>{result[vp.description]}</p>
							</div>

							{#if result[vp.about]}
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
										{result[vp.about]}
									</div>
								</div>
							{/if}
							{#if result[vp.educationalLevel]}
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
										{result[vp.educationalLevel]}
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
