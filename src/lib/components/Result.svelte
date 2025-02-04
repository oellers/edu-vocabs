<script>
	import { db } from '$lib/db';
	import { VOCAB_PROPERTIES as vp } from '$lib/constants';
	import { config } from '$lib/config';
	import Badge from '$lib/components/Badge.svelte';
	import ResultMenu from './ResultMenu.svelte';
	let { id } = $props();
	const result = $db.index?.store?.[id] ?? {};
	$state.snapshot(result);
</script>

{#if result}
	<div>
		<ul class="mt-2 flex flex-col">
			<li class="flex flex-row flex-wrap rounded border border-slate-400">
				<div class="w-3/4 lg:pr-5">
					<div class="collapse collapse-open">
						<input type="checkbox" />
						<div class="collapse-title text-lg font-medium">
							{result[vp.name]}
							{result[vp.maintainedBy] ? `(${result[vp.maintainedBy]})` : ''}
						</div>
						<div class="collapse-content">
							<p>{result[vp.description]}</p>
						</div>
					</div>
				</div>
				<div class="mt-2 flex w-1/4 flex-wrap content-start justify-end p-2">
					<ResultMenu {result} />
				</div>
				<div class="flex w-full flex-wrap content-start p-2">
					<div class="divider !m-0 w-full"></div>
					{#each config.filterKeys as key}
						{#if result[vp[key]]}
							<Badge badgeLabel={result[vp[key]]} />
						{/if}
					{/each}
				</div>
			</li>
		</ul>
	</div>
{/if}
