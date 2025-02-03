<script>
	import { db } from '$lib/db';
	import { VOCAB_PROPERTIES as vp } from '$lib/constants';
	import ResultBadges from './ResultBadges.svelte';
	let { id, externalLink = false } = $props();
	const result = $db.index?.store?.[id] ?? {};
	$state.snapshot(result);

	console.log($db.index?.store);
</script>

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
						<ResultBadges {result} />
					</div>
				</li>
			</div>
		</ul>
	</div>
{/if}
