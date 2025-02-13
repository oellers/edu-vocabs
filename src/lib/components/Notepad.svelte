<script>
	import { db } from '$lib/db';
	import { t } from 'svelte-i18n';
	import NotepadVocab from '$lib/components/NotepadVocab.svelte';
</script>

<div class="flex w-full flex-col">
	<label for="my-drawer" aria-label="close sidebar" class="btn fixed right-2 top-2 ml-auto w-fit"
		>{$t('notepad.close')}</label
	>
	<div class="flex w-full flex-row gap-2 overflow-auto pb-4">
		{#key $db.selectedVocabs.length}
			{#each $db.selectedVocabs as v (v)}
				<NotepadVocab id={v} />
			{/each}
		{/key}
	</div>
</div>
